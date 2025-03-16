import React, { useEffect, useState } from "react";
import { ReactComponent as EditIcon } from "../../assets/icons/edit.svg";
import { ReactComponent as RightIcon } from "../../assets/icons/right-circle.svg";
import { ReactComponent as CancleIcon } from "../../assets/icons/close-circle.svg";
import CommonTextInput from "../common/CommonTextInput";
import { ReactComponent as ArrowIcon } from "../../assets/icons/arrowDown.svg";
import { ReactComponent as DashIcon } from "../../assets/icons/dash.svg";
import CommonSwitch from "../common/CommonSwitch";
import AddEducationDetailsModal from "../modals/AddEducationDetailsModal";
import {
  employmentStatus,
  genderOption,
  icons,
  languagesOptions,
} from "../../helpers/config";
import AddSocialLinksModal from "../modals/AddSocialLinksModal";
import { ReactComponent as CloseIcon } from "../../assets/icons/close.svg";
import AddSkillsModal from "../modals/AddSkillsModal";
import DateTimePicker from "../common/DateTimePicker";
import {
  formatCustomDate,
  formatDate,
  formatPhoneNumber,
  notifyError,
  notifySuccess,
} from "../../helpers/utils";
import CommonDropdown from "../common/CommonDropdown";
import LocationSearchDropdown from "../AutocompleteDropdowns/LocationSearchDropDown";
import PhoneInputComponent from "../common/PhoneInputComponent";
import CommonSearchDropdown from "../common/CommonSearchDropdown";
import DropdownWithInput from "./StyledDropdownInput";
import NationalitySearchDropdown from "../AutocompleteDropdowns/NationalitySearchDropDown";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { updateCandidateDetails } from "../../actions/candidateActions";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import CurrencySelector from "../common/CurrencyInput";
import getSymbolFromCurrency from "currency-symbol-map";

const ProfessionalDetails = ({ details, label, isLoading, rawData }) => {
  const dispatch = useDispatch();
  const { candidateId } = useSelector((state) => state?.candidates);
  const { domainData } = useSelector((state) => state?.customization);
  const [fields, setFields] = useState(details);
  const [editField, setEditField] = useState(null);
  const [tempValue, setTempValue] = useState("");
  const [collapse, setCollapse] = useState(true);
  const [socialLinkModalVisible, setSocialLinkModalVisible] = useState(false);
  const [addSkillModalVisible, setAddSkillModalVisible] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState(
    rawData?.salutation ? rawData?.salutation : "None"
  );
  const [updateLoading, setUpdateLoading] = useState(false);
  const [domainsData, setDomainsData] = useState([]);
  const [currentSalary, setCurrentSalary] = useState(
    rawData?.current_salary || ""
  );
  const [currentSalaryCurrency, setCurrentSalaryCurrency] = useState(
    rawData?.current_salary_currency
      ? { code: rawData?.current_salary_currency }
      : null
  );

  const [expectedSalary, setExpectedSalary] = useState(
    rawData?.expected_salary || ""
  );
  const [expectedSalaryCurrency, setExpectedSalaryCurrency] = useState(
    rawData?.expected_salary_currency
      ? { code: rawData?.expected_salary_currency }
      : null
  );

  const [countryCallingCode, setCountryCallingCode] = useState(
    rawData?.country_code || ""
  );
  const [phoneNumber, setPhoneNumber] = useState(rawData?.phone || "");

  useEffect(() => {
    if (!editField) {
      setExpectedSalary(rawData?.expected_salary || "");
      setExpectedSalaryCurrency(
        rawData?.expected_salary_currency
          ? { code: rawData?.expected_salary_currency }
          : null
      );
      setCurrentSalaryCurrency(
        rawData?.current_salary_currency
          ? { code: rawData?.current_salary_currency }
          : null
      );
      setCurrentSalary(rawData?.current_salary || "");
      setSelectedTitle(rawData?.salutation ? rawData?.salutation : "None");
      setCountryCallingCode(rawData?.country_code || "");
      setPhoneNumber(rawData?.phone || "");
    }
  }, [rawData, editField]);

  const handleDateSelect = (date) => {
    setTempValue(date);
  };

  useEffect(() => {
    const updatedData = domainData?.map((item) => item?.name);
    setDomainsData(updatedData);
  }, [domainData]);

  const handleEdit = (key, value) => {
    setEditField(key);
    if (value?.fe_input_type === "multi_select") {
      if (value?.value?.length > 0) {
        const refactorData = value?.value?.map((item) => item?.name);
        setTempValue(refactorData);
      }
    } else if (value?.fe_input_type === "array") {
      if (value?.value?.length > 0) {
        setTempValue(value?.value);
      }
    } else {
      setTempValue(value?.value);
    }
  };

  const handleSave = (key, value) => {
    if (key === "First Name") {
      setUpdateLoading(true);
      let httpBody = {
        first_name: tempValue?.trim(),
        ...(selectedTitle !== "None" && { salutation: selectedTitle }),
      };

      dispatch(updateCandidateDetails(candidateId, httpBody)).then(
        (response) => {
          if (response?.success) {
            notifySuccess(response?.message);
            setFields({
              ...fields,
              [key]: { ...value, value: tempValue },
            });
            setEditField(null);
            setUpdateLoading(false);
          } else {
            notifyError(response);
            setUpdateLoading(false);
          }
        }
      );
    } else if (value?.fe_input_type === "auto_search") {
      setUpdateLoading(true);

      let httpBody = {
        [value?.name]: typeof tempValue === "string" ? tempValue : tempValue[0],
      };

      dispatch(updateCandidateDetails(candidateId, httpBody)).then(
        (response) => {
          if (response?.success) {
            notifySuccess(response?.message);
            setFields({
              ...fields,
              [key]: {
                ...value,
                value: typeof tempValue === "string" ? tempValue : tempValue[0],
              },
            });
            setEditField(null);
            setUpdateLoading(false);
          } else {
            notifyError(response);
            setUpdateLoading(false);
          }
        }
      );
    } else if (value?.fe_input_type === "multi_select") {
      setUpdateLoading(true);
      const data =
        key === "Languages"
          ? tempValue?.length > 0
            ? tempValue?.map((item) => {
                return { name: item, proficiency: null };
              })
            : []
          : [];

      let httpBody = {
        [value?.name]: data,
      };

      dispatch(updateCandidateDetails(candidateId, httpBody)).then(
        (response) => {
          if (response?.success) {
            notifySuccess(response?.message);
            setFields({
              ...fields,
              [key]: {
                ...value,
                value: data,
              },
            });
            setEditField(null);
            setUpdateLoading(false);
          } else {
            notifyError(response);
            setUpdateLoading(false);
          }
        }
      );
    } else if (value?.fe_input_type === "array") {
      setUpdateLoading(true);

      let httpBody = {
        [value?.name]: tempValue,
      };

      dispatch(updateCandidateDetails(candidateId, httpBody)).then(
        (response) => {
          if (response?.success) {
            notifySuccess(response?.message);
            setFields({
              ...fields,
              [key]: {
                ...value,
                value: tempValue,
              },
            });
            setEditField(null);
            setUpdateLoading(false);
          } else {
            notifyError(response);
            setUpdateLoading(false);
          }
        }
      );
    } else if (
      value?.fe_input_type === "salary_input" &&
      value?.name === "current_salary"
    ) {
      setUpdateLoading(true);

      let httpBody = {
        current_salary: currentSalary,
        current_salary_currency: currentSalaryCurrency?.code,
      };

      dispatch(updateCandidateDetails(candidateId, httpBody)).then(
        (response) => {
          if (response?.success) {
            notifySuccess(response?.message);
            // setFields({
            //   ...fields,
            //   [key]: {
            //     ...value,
            //     value: tempValue,
            //   },
            // });
            setEditField(null);
            setUpdateLoading(false);
          } else {
            notifyError(response);
            setUpdateLoading(false);
          }
        }
      );
    } else if (
      value?.fe_input_type === "salary_input" &&
      value?.name === "expected_salary"
    ) {
      setUpdateLoading(true);

      let httpBody = {
        expected_salary: expectedSalary,
        expected_salary_currency: expectedSalaryCurrency?.code,
      };

      dispatch(updateCandidateDetails(candidateId, httpBody)).then(
        (response) => {
          if (response?.success) {
            notifySuccess(response?.message);
            // setFields({
            //   ...fields,
            //   [key]: {
            //     ...value,
            //     value: tempValue,
            //   },
            // });
            setEditField(null);
            setUpdateLoading(false);
          } else {
            notifyError(response);
            setUpdateLoading(false);
          }
        }
      );
    } else if (value?.fe_input_type === "phone_input") {
      setUpdateLoading(true);

      let httpBody = {
        phone: phoneNumber,
        country_code: countryCallingCode,
      };

      dispatch(updateCandidateDetails(candidateId, httpBody)).then(
        (response) => {
          if (response?.success) {
            notifySuccess(response?.message);
            setPhoneNumber(phoneNumber);
            setCountryCallingCode(countryCallingCode);
            setEditField(null);
            setUpdateLoading(false);
          } else {
            notifyError(response);
            setUpdateLoading(false);
          }
        }
      );
    } else {
      setUpdateLoading(true);
      let httpBody = {
        [value?.name]: tempValue?.trim(),
      };
      dispatch(updateCandidateDetails(candidateId, httpBody)).then(
        (response) => {
          if (response?.success) {
            notifySuccess(response?.message);
            setFields({
              ...fields,
              [key]: { ...value, value: tempValue },
            });
            setEditField(null);
            setUpdateLoading(false);
          } else {
            notifyError(response);
            setUpdateLoading(false);
          }
        }
      );
    }
  };

  const handleSkillAdd = (value) => {
    console.log(">>>>>>>>>>>>>>>>handleSkillAdd", value);
    setUpdateLoading(true);
    let httpBody = {
      skills: value,
    };
    dispatch(updateCandidateDetails(candidateId, httpBody)).then((response) => {
      if (response?.success) {
        notifySuccess(response?.message);
        setFields({
          ...fields,
          Skills: {
            ...value,
            value: value,
          },
        });
        setAddSkillModalVisible(false);
        setEditField(null);
        setUpdateLoading(false);
      } else {
        notifyError(response);
        setUpdateLoading(false);
      }
    });
  };

  const handleCancel = () => {
    setEditField(null);
  };

  const renderEditInput = (key, value) => {
    if (value?.fe_input_type === "date_time") {
      return (
        <DateTimePicker
          initialDate={value}
          onDateSelect={handleDateSelect}
          showTime={true}
        />
      );
    } else if (key === "First Name") {
      return (
        <DropdownWithInput
          selectedTitle={selectedTitle}
          setSelectedTitle={setSelectedTitle}
          firstName={tempValue}
          setFirstName={setTempValue}
        />
      );
    } else if (value?.fe_input_type === "date") {
      return (
        <DateTimePicker
          initialDate={tempValue}
          onDateSelect={handleDateSelect}
        />
      );
    } else if (value?.fe_input_type === "select") {
      const options = value?.name === "domain" ? domainsData : value?.options;
      return (
        <CommonDropdown
          options={options}
          placeholder={key}
          selectedValue={tempValue}
          onChange={setTempValue}
          candidateInfo={true}
        />
      );
    } else if (value?.fe_input_type === "salary_input") {
      if (value?.name === "current_salary") {
        return (
          <CurrencySelector
            label={key}
            selectedCurrency={currentSalaryCurrency}
            setSelectedCurrency={setCurrentSalaryCurrency}
            salary={currentSalary}
            setSalary={(value) => {
              if (/^\d*$/.test(value)) {
                setCurrentSalary(value);
              }
            }}
          />
        );
      } else {
        return (
          <CurrencySelector
            label={key}
            selectedCurrency={expectedSalaryCurrency}
            setSelectedCurrency={setExpectedSalaryCurrency}
            salary={expectedSalary}
            setSalary={(value) => {
              if (/^\d*$/.test(value)) {
                setExpectedSalary(value);
              }
            }}
          />
        );
      }
    } else if (key === "Employment Status") {
      return (
        <CommonDropdown
          options={employmentStatus}
          placeholder="Status"
          selectedValue={tempValue}
          onChange={setTempValue}
          optionKey="status"
          candidateInfo={true}
        />
      );
    } else if (key === "Location") {
      return (
        <LocationSearchDropdown
          selectedLocations={tempValue}
          setSelectedLocations={setTempValue}
          placeholder={"Location"}
        />
      );
    } else if (key === "Nationality") {
      return (
        <NationalitySearchDropdown
          selectedNationalities={tempValue}
          setSelectedNationalities={setTempValue}
          placeholder={"Nationality"}
          multipleSelect={false}
        />
      );
    } else if (value?.fe_input_type === "phone_input") {
      return (
        <PhoneInputComponent
          phoneNumber={phoneNumber}
          callingCode={countryCallingCode}
          selectedPhoneNumber={(item) => {
            setPhoneNumber(item?.phoneNumber);
            setCountryCallingCode(item?.callingCode);
          }}
          setValid={(item) => console.log(">>>>>>>>>setValid", item)}
        />
      );
    } else if (value?.fe_input_type === "multi_select") {
      if (key === "Languages")
        return (
          <CommonSearchDropdown
            options={languagesOptions}
            optionKey="name"
            placeholder="Language"
            multiSelect={true}
            selectedData={tempValue || []}
            onSelect={setTempValue}
          />
        );
    } else {
      return (
        <CommonTextInput
          type="text"
          placeholder={key}
          value={tempValue}
          onChange={(e) => setTempValue(e.target.value)}
        />
      );
    }
  };

  const renderItemValue = (key, value) => {
    if (value?.fe_input_type === "date_time") {
      return formatCustomDate(value?.value);
    } else if (value?.fe_input_type === "date") {
      return formatDate(value?.value);
    } else if (key === "Phone Number") {
      return `(${countryCallingCode}) ${phoneNumber}`;
    } else if (value?.fe_input_type === "salary_input") {
      if (value?.name === "current_salary") {
        return `${
          currentSalaryCurrency?.code &&
          getSymbolFromCurrency(currentSalaryCurrency?.code)
        } ${currentSalary}`;
      } else {
        return `${
          expectedSalaryCurrency?.code &&
          getSymbolFromCurrency(expectedSalaryCurrency?.code)
        } ${expectedSalary}`;
      }
    } else if (key === "First Name") {
      return rawData?.salutation
        ? `${rawData?.salutation} ${value?.value}`
        : value?.value;
    } else {
      return value?.value;
    }
  };

  const renderValues = (key, value) => {
    if (key === "Skills") {
      return (
        <div
          key={key}
          className="detail-row"
          style={{ alignItems: "flex-start" }}
        >
          <p className="font-14-medium color-dark-black flex-1">{key}</p>
          <div className="flex-2">
            {editField === key ? (
              <div
                className="flex-1 display-flex align-center"
                style={{ gap: 8 }}
              >
                <div className="display-column" style={{ gap: 12 }}>
                  <div
                    className="display-flex"
                    style={{ flexWrap: "wrap", gap: 6 }}
                  >
                    {tempValue?.map((item) => {
                      return (
                        <div className="candidate-info-skill-item">
                          {item?.name}{" "}
                          {item?.level && (
                            <span style={{ color: "#1761D8" }}>
                              {item?.level}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  <button
                    className="add-details-btn"
                    onClick={() => setAddSkillModalVisible(true)}
                  >
                    + Add
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex-1 display-flex-justify ">
                {value?.value ? (
                  <div
                    className="flex-1 display-flex align-center"
                    style={{ gap: 12 }}
                  >
                    <div
                      className="display-flex"
                      style={{ flexWrap: "wrap", gap: 6 }}
                    >
                      {value?.value?.map((item, index) => {
                        return (
                          <div
                            key={index}
                            className="candidate-info-skill-item"
                          >
                            {item?.name}{" "}
                            <span style={{ color: "#1761D8" }}>
                              {item?.level}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                    <button
                      className="edit-details-btn"
                      onClick={() => handleEdit(key, value)}
                      style={{ alignSelf: "flex-start" }}
                    >
                      <EditIcon />
                    </button>
                  </div>
                ) : (
                  <div
                    className="flex-1 display-flex align-center"
                    style={{ gap: 12 }}
                  >
                    <button
                      className="add-details-btn"
                      onClick={() => setAddSkillModalVisible(true)}
                    >
                      + Add
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      );
    } else if (value?.fe_input_type === "toggle") {
      return (
        <div key={key} className="detail-row">
          <p className="font-14-medium color-dark-black flex-1">{key}</p>
          <div className="flex-2">
            <CommonSwitch
              on={value?.value ? true : false}
              onToggle={() => {
                setFields({
                  ...fields,
                  [key]: { ...value, value: !value?.value },
                });
              }}
            />
          </div>
        </div>
      );
    } else if (key === "Social Links") {
      return (
        <div key={key} className="detail-row">
          <p className="font-14-medium color-dark-black flex-1">{key}</p>
          <div className="flex-2">
            {editField === key ? (
              <div
                className="flex-1 display-flex-justify align-center"
                style={{ gap: 8 }}
              >
                <div className="display-column" style={{ gap: 12 }}>
                  <div
                    className="display-flex"
                    style={{ flexWrap: "wrap", gap: 6 }}
                  >
                    {tempValue?.length > 0 &&
                      tempValue?.map((item, index) => (
                        <a
                          key={index}
                          className="social-link-item font-14-regular color-dark-black"
                        >
                          {icons[item?.name]}
                          <span>{item?.name}</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              const updateData = tempValue?.filter(
                                (item, i) => index !== i
                              );
                              setTempValue(updateData);
                            }}
                          >
                            <CloseIcon width={8} height={8} />
                          </button>
                        </a>
                      ))}
                  </div>
                  <button
                    className="add-details-btn"
                    onClick={() => setSocialLinkModalVisible(true)}
                  >
                    + Add
                  </button>
                </div>
                <div
                  className="display-flex"
                  style={{ gap: 8, alignSelf: "flex-start" }}
                >
                  <button onClick={handleCancel}>
                    <CancleIcon />
                  </button>
                  <button onClick={() => handleSave(key, value)}>
                    <RightIcon />
                  </button>
                </div>
              </div>
            ) : value?.value?.length > 0 ? (
              <div
                className="flex-1 display-flex align-center"
                style={{ gap: 12 }}
              >
                <div
                  className="display-flex"
                  style={{ flexWrap: "wrap", gap: 6 }}
                >
                  {value?.value?.map((item, index) => (
                    <a
                      key={index}
                      href={item?.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link-item font-14-regular color-dark-black"
                    >
                      {icons[item?.name]}
                      <span>{item?.name}</span>
                    </a>
                  ))}
                </div>
                <button
                  className="edit-details-btn"
                  onClick={() => handleEdit(key, value)}
                >
                  <EditIcon />
                </button>
              </div>
            ) : (
              <div
                className="flex-1 display-flex align-center"
                style={{ gap: 12 }}
              >
                <DashIcon />
                <button
                  className="edit-details-btn"
                  onClick={() => handleEdit(key, value)}
                >
                  <EditIcon />
                </button>
              </div>
            )}
          </div>
        </div>
      );
    } else if (key === "Languages") {
      return (
        <div key={key} className="detail-row">
          <p className="font-14-medium color-dark-black flex-1">{key}</p>
          <div className="flex-2">
            {editField === key ? (
              <div
                className="flex-1 display-flex align-center"
                style={{ gap: 8 }}
              >
                <div className="flex-1">{renderEditInput(key, value)}</div>
                <div
                  className="display-flex"
                  style={{ gap: 8, alignSelf: "flex-start" }}
                >
                  <button onClick={handleCancel}>
                    <CancleIcon />
                  </button>
                  <button onClick={() => handleSave(key, value)}>
                    <RightIcon />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex-1 display-flex-justify ">
                {value?.value ? (
                  <div
                    className="flex-1 display-flex align-center"
                    style={{ gap: 12 }}
                  >
                    <div
                      className="display-flex"
                      style={{ flexWrap: "wrap", gap: 6 }}
                    >
                      {value?.value?.map((item) => {
                        return (
                          <div className="selected-options-item font-14-regular color-dark-black">
                            {item?.name}
                          </div>
                        );
                      })}
                    </div>
                    <button
                      className="edit-details-btn"
                      onClick={() => handleEdit(key, value)}
                    >
                      <EditIcon />
                    </button>
                  </div>
                ) : (
                  <div
                    className="flex-1 display-flex align-center"
                    style={{ gap: 12 }}
                  >
                    <DashIcon />
                    <button
                      className="edit-details-btn"
                      onClick={() => handleEdit(key, "")}
                    >
                      <EditIcon />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      );
    } else if (key === "Job") {
      return (
        <div className="detail-row">
          <p className="font-14-medium color-dark-black flex-1">{key}</p>
          {value?.value ? (
            <div
              className="display-flex align-center flex-2"
              style={{ gap: 6 }}
            >
              <div className="w-h-32">
                <img src={value?.image} className="common-img" />
              </div>
              <div className="display-column" style={{ gap: 4 }}>
                {value?.name && (
                  <p className="font-14-medium color-dark-black">
                    {value?.name}
                  </p>
                )}

                {value?.position && (
                  <p className="font-10-regular color-dark-black">
                    {value?.position}
                  </p>
                )}
              </div>
            </div>
          ) : (
            <DashIcon />
          )}
        </div>
      );
    } else {
      return (
        <div key={key} className="detail-row">
          <p className="font-14-medium color-dark-black flex-1">{key}</p>
          <div className="flex-2">
            {editField === key ? (
              <div
                className="flex-1 display-flex align-center"
                style={{ gap: 8 }}
              >
                <div className="flex-1">{renderEditInput(key, value)}</div>

                <div className="display-flex" style={{ gap: 8 }}>
                  <button onClick={handleCancel}>
                    <CancleIcon />
                  </button>
                  <button onClick={() => handleSave(key, value)}>
                    <RightIcon />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex-1 display-flex-justify align-center">
                <div
                  className="flex-1 display-flex align-center"
                  style={{ gap: 12 }}
                >
                  {!!value?.value ? (
                    <span className="font-14-regular color-dark-blak ">
                      {renderItemValue(key, value)}
                    </span>
                  ) : (
                    <DashIcon />
                  )}
                  {value?.fe_input_type !== "disable" && (
                    <button
                      className="edit-details-btn"
                      onClick={() => handleEdit(key, value)}
                    >
                      <EditIcon />
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }
  };

  if (isLoading) {
    return (
      <div className="candidate-details-main-container">
        <div className="display-flex-justify align-center">
          <div className="display-flex align-center" style={{ gap: 12 }}>
            <Skeleton width={200} height={20} />
          </div>
        </div>
        <div className="divider-line" />
        <div
          className="display-flex candidate-experince-item"
          style={{ gap: 8 }}
        >
          <Skeleton containerClassName="flex-1" height={100} />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="candidate-details-main-container">
        <div className="display-flex align-center" style={{ gap: 12 }}>
          <h3 className="font-16-medium color-dark-black text-uppercase">
            {label}
          </h3>
          <button
            className={`${
              collapse ? "arrow-icon-btn-collpase" : "arrow-icon-btn"
            }`}
            onClick={() => setCollapse(!collapse)}
          >
            <ArrowIcon />
          </button>
        </div>
        {collapse && (
          <>
            <div className="divider-line" />
            <div className="details-container">
              {Object.entries(fields).map(([key, value]) =>
                renderValues(key, value)
              )}
            </div>
          </>
        )}
      </div>
      <AddSocialLinksModal
        visible={socialLinkModalVisible}
        onClose={() => setSocialLinkModalVisible(false)}
        onAddSocial={(value) => {
          const updateData = [
            ...tempValue,
            { name: value?.name, url: value?.url },
          ];
          setTempValue(updateData);
          setSocialLinkModalVisible(false);
        }}
      />
      <AddSkillsModal
        visible={addSkillModalVisible}
        onClose={() => setAddSkillModalVisible(false)}
        tags={tempValue || []}
        setTags={handleSkillAdd}
      />
    </>
  );
};

export default ProfessionalDetails;
