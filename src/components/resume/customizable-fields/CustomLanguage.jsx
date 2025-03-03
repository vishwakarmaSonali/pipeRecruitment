import React, { useState } from "react";
import "./index.css";
import CommonSwitch from "../../common/CommonSwitch";
import { languagesOptions, proficiency } from "../../../helpers/config";
import CommonDropdown from "../../common/CommonDropdown";
import CommonButton from "../../common/CommonButton";
import CancelButton from "../../common/CancelButton";
import LanguageSearchDropdown from "../../AutocompleteDropdowns/LanguageSearchDropdown";
import { ReactComponent as EditIcon } from "../../../pages/Recruitment/Candidates/assets/edit.svg";
import { ReactComponent as DeleteIcon } from "../../../pages/Recruitment/Candidates/assets/delete.svg";

const CustomLanguage = ({
  on,
  onToggle,
  addLanguage,
  data,
  onDelete,
  onUpdate,
}) => {
  const [addLanguageFieldVisible, setAddLanguageFieldVisible] = useState(false);
  const [proficiencyValue, setProficiencyValue] = useState("");
  const [languageValue, setLanguageValue] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const resetData = () => {
    setProficiencyValue("");
    setLanguageValue("");
    setAddLanguageFieldVisible(false);
    setEditIndex(null);
  };

  const handleAddLanguage = () => {
    if (editIndex !== null) {
      // Update existing entry
      onUpdate(editIndex, {
        proficiency: proficiencyValue,
        language: languageValue,
      });
    } else {
      // Add new entry
      addLanguage({ proficiency: proficiencyValue, language: languageValue });
    }
    resetData();
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setLanguageValue(data[index]?.language);
    setProficiencyValue(data[index]?.proficiency);
    setAddLanguageFieldVisible(true);
  };

  const renderAddLanguage = () => {
    return (
      <div className="custom-add-language-container">
        <div className="display-flex" style={{ gap: 10 }}>
          <LanguageSearchDropdown
            options={languagesOptions}
            optionKey="name"
            placeholder="Language"
            selectedData={languageValue}
            onSelect={(value) => setLanguageValue(value?.name)}
          />
          <CommonDropdown
            options={proficiency}
            placeholder="Proficiency"
            selectedValue={proficiencyValue}
            onChange={setProficiencyValue}
            candidateInfo={true}
          />
        </div>
        <div
          className="display-flex"
          style={{ gap: 8, justifyContent: "flex-end" }}
        >
          <CancelButton title={"Cancel"} onClick={resetData} />
          <CommonButton
            title={editIndex !== null ? "Update" : "Add"}
            onClick={handleAddLanguage}
            disabled={!languageValue || !proficiencyValue}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="candidate-details-main-container">
      <div className="display-flex-justify align-center">
        <div className="display-flex align-center" style={{ gap: 12 }}>
          <h3 className="font-16-medium color-dark-black text-uppercase">
            Language
          </h3>
        </div>
        <CommonSwitch on={on} onToggle={onToggle} />
      </div>
      <div className="divider-line" />
      <div className="display-column" style={{ gap: 20 }}>
        {data?.map((item, index) => (
          <div key={index} className="display-flex-justify">
            {editIndex === index ? (
              <div className="flex-1">{renderAddLanguage()}</div>
            ) : (
              <>
                <div className="display-column" style={{ gap: 8 }}>
                  <p className="font-14-medium color-dark-black">
                    {item?.language}
                  </p>
                  <p className="font-14-regular color-grey">
                    {item?.proficiency}
                  </p>
                </div>
                <div
                  className="display-flex"
                  style={{ gap: 8, alignSelf: "flex-start" }}
                >
                  <button onClick={() => onDelete(index)}>
                    <DeleteIcon />
                  </button>
                  <button onClick={() => handleEdit(index)}>
                    <EditIcon />
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
        {addLanguageFieldVisible && editIndex === null && renderAddLanguage()}
        {!addLanguageFieldVisible && (
          <button
            className="add-details-btn"
            onClick={() => setAddLanguageFieldVisible(true)}
          >
            + Add
          </button>
        )}
      </div>
    </div>
  );
};

export default CustomLanguage;
