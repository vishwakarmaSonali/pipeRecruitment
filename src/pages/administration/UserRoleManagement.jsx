import React, { useState } from "react";
import "./index.css";
import Navbar from "../../components/navbar/Navbar";
import Breadcrumb from "../../components/administration/Breadcrumb";
import { userRolePermissionData } from "./config";
import { ReactComponent as Tick } from "../../assets/icons/sourcingIcons/tick.svg";
import CommonAddButton from "../../components/common/CommonAddButton";
import { ReactComponent as AddIcon } from "../../assets/icons/plusIcon.svg";
import { ReactComponent as CancelIcon } from "../Recruitment/Candidates/assets/cancel.svg";
import { ReactComponent as RightIcon } from "../Recruitment/Candidates/assets/right.svg";
import { ReactComponent as EditIcon } from "../Recruitment/Candidates/assets/edit.svg";
import { ReactComponent as DeleteIcon } from "../Recruitment/Candidates/assets/delete.svg";
import { useModal } from "../../components/common/ModalProvider";
import CommonDeleteModal from "../../components/modals/CommonDeleteModal";

const UserRoleManagement = () => {
  const { modals, setModalVisibility } = useModal();
  const [selectedPermissions, setSelectedPermissions] = useState({});
  const predefinedRoles = ["Admin", "Recruiting Team Lead", "Recruiter"];
  const [roles, setRoles] = useState(predefinedRoles);
  const [editingIndex, setEditingIndex] = useState(null);
  const [newRole, setNewRole] = useState(null);
  const [tempValue, setTempValue] = useState("");
  const [selectedRole, setSelectedRole] = useState("Admin"); // Default selection
  const [selectedRoleIndex, setSelectedRoleIndex] = useState(null);

  // Add a new role
  const handleAddRole = () => {
    setNewRole("User Role");
    setSelectedRole("");
  };

  // Start editing an existing role
  const handleEdit = (index) => {
    setEditingIndex(index);
    setTempValue(roles[index]);
  };

  // Save edited or new role
  const handleSave = (index) => {
    if (newRole !== null) {
      setRoles([...roles, newRole]);
      setSelectedRole(newRole); // Set the new role as selected
      setNewRole(null);
    } else {
      const updatedRoles = [...roles];
      updatedRoles[index] = tempValue;
      setRoles(updatedRoles);
      setSelectedRole(tempValue); // Set the edited role as selected
      setEditingIndex(null);
    }
  };

  // Delete an existing role
  const handleDelete = (index) => {
    const updatedRoles = roles.filter((_, i) => i !== index);
    setRoles(updatedRoles);
    setModalVisibility("userRoleDeleteModalVisible", false);
    if (roles[index] === selectedRole) {
      setSelectedRole(updatedRoles[0] || ""); // Select the first available role
    }
  };

  // Cancel action
  const handleCancel = () => {
    if (newRole !== null) {
      setNewRole(null);
    } else {
      setEditingIndex(null);
    }
  };

  // Select a role when clicked
  const handleSelectRole = (role) => {
    setSelectedRole(role);
  };

  // Toggle individual permissions
  const handleToggle = (category, subCategory, permission) => {
    console.log(category, "<><><><>", subCategory, "<><><><>", permission);

    setSelectedPermissions((prev) => {
      const updated = { ...prev };

      // Ensure category exists in state
      if (!updated[category]) updated[category] = {};

      if (subCategory) {
        // Ensure subcategory exists
        if (!updated[category][subCategory]) {
          updated[category][subCategory] = [];
        }

        // Toggle selection (Select or Deselect)
        if (updated[category][subCategory].includes(permission)) {
          updated[category][subCategory] = updated[category][
            subCategory
          ].filter((p) => p !== permission);
        } else {
          updated[category][subCategory] = [
            ...updated[category][subCategory],
            permission,
          ];
        }

        // Cleanup: Remove empty subCategory
        if (updated[category][subCategory].length === 0) {
          delete updated[category][subCategory];
        }
      } else {
        // Handle category-level permissions (not inside a subCategory)
        if (!updated[category].permissions) {
          updated[category].permissions = [];
        }

        if (updated[category].permissions.includes(permission)) {
          // Deselect
          updated[category].permissions = updated[category].permissions.filter(
            (p) => p !== permission
          );
        } else {
          // Select
          updated[category].permissions = [
            ...updated[category].permissions,
            permission,
          ];
        }

        // Cleanup: Remove empty category permissions
        if (updated[category].permissions.length === 0) {
          delete updated[category].permissions;
        }
      }

      // Remove the category if it's now empty
      if (Object.keys(updated[category]).length === 0) {
        delete updated[category];
      }
      console.log(updated, "<><><><>");

      return { ...updated };
    });
  };

  // "Select All" toggle for a category
  const handleToggleAll = (category) => {
    setSelectedPermissions((prev) => {
      const updated = { ...prev };

      if (updated[category]) {
        // If the category is already selected, unselect all
        delete updated[category];
      } else {
        // If the category is not selected, select all
        updated[category] = {};

        // Get all permissions under the category
        const categoryData = userRolePermissionData[category];

        if (Array.isArray(categoryData)) {
          // Handle categories with array structure (e.g., Candidate, Clients, Jobs, Sourcing)
          const allPermissions = [];
          categoryData.forEach((item) => {
            if (typeof item === "string") {
              allPermissions.push(item);
            } else if (typeof item === "object") {
              Object.keys(item).forEach((subCategory) => {
                updated[category][subCategory] = item[subCategory];
              });
            }
          });
          if (allPermissions.length > 0) {
            updated[category].permissions = allPermissions;
          }
        } else {
          // Handle categories with nested object structure (e.g., Administration)
          Object.keys(categoryData).forEach((subCategory) => {
            const subCategoryData = categoryData[subCategory];
            if (Array.isArray(subCategoryData)) {
              updated[category][subCategory] = subCategoryData;
            } else if (typeof subCategoryData === "object") {
              Object.keys(subCategoryData).forEach((nestedSubCategory) => {
                updated[category][nestedSubCategory] =
                  subCategoryData[nestedSubCategory];
              });
            }
          });
        }
      }

      return updated;
    });
  };

  // Helper to check if "Select All" should be checked
  const isAllSelected = (category) => {
    if (!selectedPermissions[category]) return false;

    let allPermissions = [];

    // Flatten all permissions for the category
    if (Array.isArray(userRolePermissionData[category])) {
      // Handle categories with array structure (e.g., Candidate, Clients, Jobs, Sourcing)
      userRolePermissionData[category].forEach((item) => {
        if (typeof item === "string") {
          allPermissions.push(item);
        } else if (typeof item === "object") {
          Object.values(item).forEach((permissions) => {
            if (Array.isArray(permissions)) {
              allPermissions = [...allPermissions, ...permissions];
            }
          });
        }
      });
    } else {
      // Handle categories with nested object structure (e.g., Administration)
      Object.values(userRolePermissionData[category]).forEach((value) => {
        if (Array.isArray(value)) {
          // Direct permissions (e.g., "User Role Management")
          allPermissions = [...allPermissions, ...value];
        } else if (typeof value === "object") {
          // Nested subcategories (e.g., "User & Team Management")
          Object.values(value).forEach((permissions) => {
            if (Array.isArray(permissions)) {
              allPermissions = [...allPermissions, ...permissions];
            }
          });
        }
      });
    }

    // Flatten selected permissions for the category
    const selectedPermissionsFlat = Object.values(
      selectedPermissions[category] || {}
    ).flat();

    // Compare lengths
    return allPermissions.length === selectedPermissionsFlat.length;
  };
  return (
    <div className="sourcing-main-container">
      <Navbar />
      <Breadcrumb />
      <div className="user-role-management-main-container">
        <h2 className="font-16-medium color-dark-black">User Roles</h2>
        <p className="font-14-regular color-grey">
          Create and manage user roles to categorize and organize your users.
        </p>
        <div className="display-flex" style={{ gap: 26 }}>
          <div className="user-role-management-section-1">
            <div style={{ alignSelf: "flex-start" }}>
              <CommonAddButton
                title={"Add User Role"}
                disable={editingIndex !== null || newRole !== null}
                icon={<AddIcon stroke="white" />}
                onClick={handleAddRole}
              />
            </div>
            <div>
              {roles.map((role, index) => (
                <div
                  key={index}
                  className={`customize-label-item ${
                    selectedRole === role ? "selected-category-item" : ""
                  }`}
                  onClick={() => handleSelectRole(role)}
                >
                  {editingIndex === index ? (
                    <input
                      type="text"
                      value={tempValue}
                      onChange={(e) => setTempValue(e.target.value)}
                      className="customize-category-input color-dark-black"
                      autoFocus
                      onFocus={(e) => setTimeout(() => e.target.select(), 0)}
                      style={{ color: "#151B23" }}
                    />
                  ) : (
                    <span className="font-14-regular color-grey">{role}</span>
                  )}
                  <div className="display-flex" style={{ gap: 8 }}>
                    {editingIndex === index ? (
                      <>
                        <button onClick={handleCancel}>
                          <CancelIcon />
                        </button>
                        <button onClick={() => handleSave(index)}>
                          <RightIcon />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => {
                            setSelectedRoleIndex(index);
                            setTimeout(() => {
                              setModalVisibility(
                                "userRoleDeleteModalVisible",
                                true
                              );
                            }, 100);
                          }}
                        >
                          <DeleteIcon />
                        </button>
                        <button onClick={() => handleEdit(index)}>
                          <EditIcon />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}

              {newRole !== null && (
                <div className="customize-label-item selected-category-item">
                  <input
                    type="text"
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    className="customize-category-input color-dark-black"
                    autoFocus
                    onFocus={(e) => setTimeout(() => e.target.select(), 0)}
                    style={{ color: "#151B23" }}
                  />
                  <div className="display-flex" style={{ gap: 8 }}>
                    <button onClick={handleCancel}>
                      <CancelIcon />
                    </button>
                    <button onClick={handleSave}>
                      <RightIcon />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="user-role-management-section-2">
            <p className="font-16-medium color-dark-black">User Permission</p>
            <div className="user-permission-container">
              {Object.keys(userRolePermissionData).map((category, index) => (
                <div key={index} className="user-permission-item-container">
                  <div className="user-permission-item-header">
                    <div
                      className={`candidate-card-checkbox`}
                      onClick={() => handleToggleAll(category)}
                    >
                      {isAllSelected(category) && <Tick />}
                    </div>
                    <h3 className="font-16-medium color-dark-black">
                      {category}
                    </h3>
                  </div>

                  <div
                    className="display-column"
                    style={{ gap: 12, overflowY: "auto", padding: 10 }}
                  >
                    {Array.isArray(userRolePermissionData[category])
                      ? userRolePermissionData[category].map((item, index) => {
                          if (typeof item === "string") {
                            return (
                              <div
                                key={index}
                                className="display-flex align-center"
                                style={{ gap: 10 }}
                              >
                                <div
                                  className={`candidate-card-checkbox`}
                                  onClick={() =>
                                    handleToggle(category, null, item)
                                  }
                                >
                                  {selectedPermissions[
                                    category
                                  ]?.permissions?.includes(item) && <Tick />}
                                </div>
                                <label className="font-14-regular color-dark-black">
                                  {item}
                                </label>
                              </div>
                            );
                          } else if (typeof item === "object") {
                            return Object.keys(item).map((subCategory) => (
                              <div
                                key={subCategory}
                                className="display-column"
                                style={{ gap: 8 }}
                              >
                                <h4 className="font-14-regular color-grey">
                                  {subCategory}
                                </h4>
                                <div className="user-role-sub-div">
                                  {item[subCategory]?.map(
                                    (subPermission, subIndex) => (
                                      <div
                                        key={subIndex}
                                        className="display-flex align-center"
                                        style={{ gap: 10 }}
                                      >
                                        <div
                                          className={`candidate-card-checkbox`}
                                          onClick={() =>
                                            handleToggle(
                                              category,
                                              subCategory,
                                              subPermission
                                            )
                                          }
                                        >
                                          {selectedPermissions[category]?.[
                                            subCategory
                                          ]?.includes(subPermission) && (
                                            <Tick />
                                          )}
                                        </div>
                                        <label className="font-14-regular color-dark-black">
                                          {subPermission}
                                        </label>
                                      </div>
                                    )
                                  )}
                                </div>
                              </div>
                            ));
                          }
                          return null;
                        })
                      : Object.keys(userRolePermissionData[category]).map(
                          (subCategory) => (
                            <div
                              key={subCategory}
                              className="display-column"
                              style={{ gap: 8 }}
                            >
                              <h4 className="font-14-regular color-grey">
                                {subCategory}
                              </h4>
                              <div className="user-role-sub-div">
                                {Array.isArray(
                                  userRolePermissionData[category][subCategory]
                                )
                                  ? userRolePermissionData[category][
                                      subCategory
                                    ].map((permission, index) => (
                                      <div
                                        key={index}
                                        className="display-flex align-center"
                                        style={{ gap: 10 }}
                                      >
                                        <div
                                          className={`candidate-card-checkbox`}
                                          onClick={() =>
                                            handleToggle(
                                              category,
                                              subCategory,
                                              permission
                                            )
                                          }
                                        >
                                          {selectedPermissions[category]?.[
                                            subCategory
                                          ]?.includes(permission) && <Tick />}
                                        </div>
                                        <label className="font-14-regular color-dark-black">
                                          {permission}
                                        </label>
                                      </div>
                                    ))
                                  : Object.keys(
                                      userRolePermissionData[category][
                                        subCategory
                                      ]
                                    ).map((nestedKey) => (
                                      <div
                                        key={nestedKey}
                                        className="display-column"
                                        style={{ gap: 8 }}
                                      >
                                        <h4 className="font-14-medium color-dark-black">
                                          {nestedKey}
                                        </h4>
                                        <div
                                          className="user-role-sub-div"
                                          style={{ padding: 0 }}
                                        >
                                          {userRolePermissionData[category][
                                            subCategory
                                          ][nestedKey]?.map(
                                            (permission, index) => (
                                              <div
                                                key={index}
                                                className="display-flex align-center"
                                                style={{ gap: 10 }}
                                              >
                                                <div
                                                  className={`candidate-card-checkbox`}
                                                  onClick={() =>
                                                    handleToggle(
                                                      category,
                                                      nestedKey,
                                                      permission
                                                    )
                                                  }
                                                >
                                                  {selectedPermissions[
                                                    category
                                                  ]?.[nestedKey]?.includes(
                                                    permission
                                                  ) && <Tick />}
                                                </div>
                                                <label className="font-14-regular color-dark-black">
                                                  {permission}
                                                </label>
                                              </div>
                                            )
                                          )}
                                        </div>
                                      </div>
                                    ))}
                              </div>
                            </div>
                          )
                        )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <CommonDeleteModal
        visible={modals?.userRoleDeleteModalVisible}
        title={"Delete User Role"}
        description={
          "Are you sure you want to delete this user role? Any used instances will be also removed."
        }
        onClose={() => {
          setModalVisibility("userRoleDeleteModalVisible", false);
          setSelectedRoleIndex(null);
        }}
        onClickDelete={() => handleDelete(selectedRoleIndex)}
      />
    </div>
  );
};

export default UserRoleManagement;
