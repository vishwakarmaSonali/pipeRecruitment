import React, { useRef, useState, useEffect } from "react";
import "./index.css";
import CancelButton from "../../components/common/CancelButton";
import CommonButton from "../../components/common/CommonButton";
import Navbar from "../../components/navbar/Navbar";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import { PDFDocument, rgb, degrees } from "pdf-lib";
import CommonSwitch from "../../components/common/CommonSwitch";
import { ReactComponent as ArrowLeft } from "../../assets/icons/arrow-left.svg";
import { ReactComponent as ArrowRight } from "../../assets/icons/arrow-right.svg";
import { xBoot } from "../../helpers/assets";
import CandidateDescrtiptionComponent from "../../components/resume/CandidateDescrtiptionComponent";
import {
  customizeCandidateDetailsFields,
  demoDescriptionText,
  skillData,
} from "../../helpers/config";
import CandidateDetailsComponent from "../../components/resume/CandidateDetailsComponent";
import CandidateSkillsComponent from "../../components/resume/CandidateSkillsComponent";
import CandidateEmpoymentComponent from "../../components/resume/CandidateEmpoymentComponent";
import CandidateEducationComponent from "../../components/resume/CandidateEducationComponent";
import CustomCandidateDescription from "../../components/resume/customizable-fields/CustomCandidateDescription";
import CustomCandidateDetails from "../../components/resume/customizable-fields/CustomCandidateDetails";
import CustomSkills from "../../components/resume/customizable-fields/CustomSkills";
import AddSkillsModal from "../../components/modals/AddSkillsModal";
import CustomLanguage from "../../components/resume/customizable-fields/CustomLanguage";
import CandidateLanguageComponent from "../../components/resume/CandidateLanguageComponent";
import CustomEducationDetails from "../../components/resume/customizable-fields/CustomEducationDetails";
import CustomExperienceDetails from "../../components/resume/customizable-fields/CustomExperienceDetails";
import ReactDOM from "react-dom";

const CustomCvPage = () => {
  const navigate = useNavigate();

  const backHandler = () => {
    navigate(-1);
  };

  const [description, setDescription] = useState(demoDescriptionText);
  const [candidateDescriptionVisible, setCandidateDescriptionVisible] =
    useState(true);
  const [candidateDetailsVisible, setCandidateDetailsVisible] = useState(true);
  const [candidateSkillsVisible, setCandidateSkillsVisible] = useState(true);

  const mappedCandidateDetailsFields = customizeCandidateDetailsFields.reduce(
    (acc, field) => {
      acc[field.label] = {
        value: field.value,
        type: field.type,
        options: field.options,
        order: field.order,
        default: field.default,
        hide: field.hide,
      };
      return acc;
    },
    {}
  );

  const [candidateDetailsFields, setCandidateDetailsFields] = useState(
    mappedCandidateDetailsFields
  );

  const handleChangeToggleCandidateDetails = (label, key, newValue) => {
    setCandidateDetailsFields((prevFields) => ({
      ...prevFields,
      [label]: { ...prevFields[label], [key]: newValue }, // Update 'value' or 'hide'
    }));
  };

  const [candidateSkillData, setCandidateSkillData] = useState(skillData);
  const [addSkillModalVisible, setAddSkillModalVisible] = useState(false);

  const addSkillHandler = (value) => {
    setCandidateSkillData([
      ...candidateSkillData,
      {
        id: candidateSkillData?.length + 1,
        name: value?.name,
        rating: value?.score,
      },
    ]);
  };

  const removeSkillsHandler = (id, index) => {
    const updatedData = candidateSkillData?.filter((item, i) => index !== i);
    setCandidateSkillData(updatedData);
  };

  const [candidateLanguageVisible, setCandidateLanguageVisible] =
    useState(true);
  const [candidateLanguageData, setCandidateLanguageData] = useState([]);

  const addLanguageHandler = (data) => {
    setCandidateLanguageData([
      ...candidateLanguageData,
      { id: candidateLanguageData?.length + 1, ...data },
    ]);
  };

  const languageDeleteHandler = (index) => {
    const updatedData = candidateLanguageData?.filter((item, i) => index !== i);
    setCandidateLanguageData(updatedData);
  };

  const handleLanguageUpdate = (index, item) => {
    const updatedData = candidateLanguageData?.map((data, i) => {
      if (i == index) {
        return { ...item };
      } else {
        return { ...data };
      }
    });

    setCandidateLanguageData(updatedData);
  };

  const [candidateEducationVisible, setCandidateEducationVisible] =
    useState(true);
  const [candidateEductionData, setCandidateEducationData] = useState([]);

  const addEducationHandler = (data) => {
    setCandidateEducationData([
      ...candidateEductionData,
      { id: candidateEductionData?.length + 1, ...data },
    ]);
  };

  const educationDeleteHandler = (index) => {
    const updatedData = candidateEductionData?.filter((item, i) => index !== i);
    setCandidateEducationData(updatedData);
  };

  const handleEducationUpdate = (index, item) => {
    const updatedData = candidateEductionData?.map((data, i) => {
      if (i == index) {
        return { ...item };
      } else {
        return { ...data };
      }
    });

    setCandidateEducationData(updatedData);
  };

  const [candidateExperienceVisible, setCandidateExperienceVisible] =
    useState(true);
  const [candidatExperienceData, setCandidateExperienceData] = useState([]);

  const addExperienceHandler = (data) => {
    setCandidateExperienceData([
      ...candidatExperienceData,
      { id: candidatExperienceData?.length + 1, ...data },
    ]);
  };

  const handleExperienceUpdate = (index, item) => {
    const updatedData = candidatExperienceData?.map((data, i) => {
      if (i == index) {
        return { ...item };
      } else {
        return { ...data };
      }
    });

    setCandidateExperienceData(updatedData);
  };

  const experienceDeleteHandler = (index) => {
    const updatedData = candidatExperienceData?.filter(
      (item, i) => index !== i
    );
    setCandidateExperienceData(updatedData);
  };

  const [watermark, setWatermark] = useState(false);
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const pdfRef = useRef(null);
  const PAGE_HEIGHT = 842;
  const CONTENT_WIDTH = 500;

  const toggleWatermark = () => setWatermark(!watermark);

  const nextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") prevPage();
      if (e.key === "ArrowRight") nextPage();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentPage]);

  const exportAsPDF = async () => {
    try {
      const pdfDoc = await PDFDocument.create();
      const pageWidth = 595;
      const pageHeight = 842;

      // Create temporary container
      const tempContainer = document.createElement("div");
      tempContainer.style.position = "absolute";
      tempContainer.style.left = "-9999px";
      tempContainer.style.width = `${pageWidth}px`;
      document.body.appendChild(tempContainer);

      // Preserve original container reference
      const originalContainer = pdfRef.current;

      for (let i = 0; i < pages.length; i++) {
        // Clone the original container
        const clone = originalContainer?.cloneNode(true);

        // Filter to show only current page content
        const mainContainer = clone.querySelector(".resume-main-container");
        mainContainer.innerHTML = "";

        pages[i].forEach((section) => {
          const sectionDiv = document.createElement("div");
          sectionDiv.className = "document-section";
          ReactDOM.render(section.component, sectionDiv);
          mainContainer.appendChild(sectionDiv);
        });

        // Update page number
        const footer = clone.querySelector(".resume-footer-div p");
        if (footer) footer.textContent = `Page ${i + 1} / ${pages.length}`;

        tempContainer.appendChild(clone);

        // Capture with proper dimensions
        const canvas = await html2canvas(clone, {
          scale: 2,
          useCORS: true,
          logging: true,
          width: pageWidth,
          height: pageHeight,
          windowWidth: pageWidth * 2,
          windowHeight: pageHeight * 2,
        });

        const imgData = canvas.toDataURL("image/png");
        const page = pdfDoc.addPage([pageWidth, pageHeight]);
        const image = await pdfDoc.embedPng(imgData);
        page.drawImage(image, {
          x: 0,
          y: 0,
          width: pageWidth,
          height: pageHeight,
        });

        tempContainer.removeChild(clone);
      }

      document.body.removeChild(tempContainer);

      // Download PDF
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "resume.pdf";
      link.click();
    } catch (error) {
      console.error("PDF generation failed:", error);
    }
  };

  const renderHeaderComponent = () => {
    return (
      <div className="resume-header-div position-sticky">
        <p className="font-22-medium color-dark-black">Edit Custom CV</p>
        <div className="display-flex" style={{ gap: 8 }}>
          <CancelButton title={"Back"} onClick={backHandler} />
          <CommonButton title={"Save"} />
          <CommonButton
            title={"Export PDF"}
            disabled={false}
            onClick={exportAsPDF}
          />
        </div>
      </div>
    );
  };

  const renderResumeHeaderComponent = () => {
    return (
      <div className="resume-header">
        <div className="display-flex-justify">
          <div className="display-flex align-center" style={{ gap: 6 }}>
            <div className="w-h-32">
              <img src={xBoot} className="common-img" />
            </div>
            <span className="font-18-medium color-dark-black">xBoost</span>
          </div>
          <div className="display-column" style={{ gap: 4 }}>
            <p className="font-10-regular color-dark-black text-right">
              Olivia Carter
            </p>
            <p className="font-10-regular color-dark-black text-right">
              oliviacarter@mail.com
            </p>
            <p className="font-10-regular color-dark-black text-right">
              +1 (555) 987-6543
            </p>
          </div>
        </div>
        <div className="resume-header-divider" />
      </div>
    );
  };

  const allSections = [
    candidateDescriptionVisible &&
      !!description && {
        component: (
          <CandidateDescrtiptionComponent
            title="Candidate Description"
            data={description}
          />
        ),
        rawData: description,
        title: "Candidate Description",
      },
    candidateDetailsVisible && {
      component: (
        <CandidateDetailsComponent
          title="Candidate Details"
          data={candidateDetailsFields}
        />
      ),
      title: "Candidate Details",
    },
    candidateSkillsVisible &&
      candidateSkillData?.length > 0 && {
        component: (
          <CandidateSkillsComponent title="Skills" data={candidateSkillData} />
        ),
        title: "Skills",
      },
    candidateLanguageVisible &&
      candidateLanguageData?.length && {
        component: (
          <CandidateLanguageComponent
            title="Language"
            data={candidateLanguageData}
          />
        ),
        title: "Language",
      },
    candidateEducationVisible &&
      candidateEductionData?.length > 0 && {
        component: (
          <CandidateEducationComponent
            title="Education"
            data={candidateEductionData}
          />
        ),
        title: "Education",
      },
    candidateExperienceVisible &&
      candidatExperienceData?.length && {
        component: (
          <CandidateEmpoymentComponent
            title="Employment"
            data={candidatExperienceData}
          />
        ),
        title: "Employment",
      },
  ].filter(Boolean);

  const renderToDiv = (component) => {
    const div = document.createElement("div");
    div.style.position = "absolute";
    div.style.visibility = "hidden";
    div.style.width = "595px"; // Match your container width
    document.body.appendChild(div);

    return new Promise((resolve) => {
      ReactDOM.render(component, div, () => {
        resolve(div);
      });
    });
  };

  const measureComponentHeight = async (component) => {
    const container = await renderToDiv(
      <div>
        {renderResumeHeaderComponent()}
        <div className="resume-main-container">{component}</div>
        <div className="resume-footer-div">
          <p className="font-12-regular" style={{ color: "#D7D7D7" }}>
            Page {currentPage + 1} / {pages?.length}
          </p>
        </div>
      </div>
    );

    const height = container.clientHeight;
    ReactDOM.unmountComponentAtNode(container);
    container.remove();
    return height;
  };

  const splitSection = async (section) => {
    const fullHeight = await measureComponentHeight(section.component);

    if (fullHeight <= PAGE_HEIGHT) return [section];

    if (section.rawData) {
      const words = section.rawData.split(" ");
      const splits = [];
      let currentText = [];

      for (const word of words) {
        const testText = [...currentText, word].join(" ");
        const testComponent = (
          <CandidateDescrtiptionComponent
            title={section.title}
            data={testText}
          />
        );
        const testHeight = await measureComponentHeight(testComponent);

        if (testHeight + 20 > PAGE_HEIGHT) {
          splits.push({
            component: (
              <CandidateDescrtiptionComponent
                title={section.title}
                data={currentText.join(" ")}
              />
            ),
            rawData: currentText.join(" "),
            title: section.title,
          });
          currentText = [word];
        } else {
          currentText.push(word);
        }
      }

      if (currentText.length > 0) {
        splits.push({
          component: (
            <CandidateDescrtiptionComponent
              // title={section.title}
              data={currentText.join(" ")}
            />
          ),
          rawData: currentText.join(" "),
          title: section.title,
        });
      }

      return splits;
    }

    // For non-splittable components
    return [section];
  };

  useEffect(() => {
    const processPages = async () => {
      let pages = [];
      let currentPage = [];
      let currentHeight = 0;

      for (const section of allSections) {
        const splits = await splitSection(section);

        for (const split of splits) {
          const height = await measureComponentHeight(split.component);

          if (currentHeight + height > PAGE_HEIGHT) {
            pages.push(currentPage);
            currentPage = [];
            currentHeight = 0;
          }

          currentPage.push(split);
          currentHeight += height;
        }
      }

      if (currentPage.length > 0) pages.push(currentPage);
      setPages(pages);
    };

    processPages();
  }, [
    description,
    candidatExperienceData,
    candidateDetailsFields,
    candidateEductionData,
    candidateLanguageData,
    candidateSkillData,
    candidateEducationVisible,
    candidateDetailsVisible,
    candidateDescriptionVisible,
    candidateSkillsVisible,
    candidateLanguageVisible,
    candidateExperienceVisible,
  ]);

  return (
    <div className="sourcing-main-container">
      <Navbar />
      {renderHeaderComponent()}
      <div className="flex-1 display-flex" style={{ overflow: "auto" }}>
        <div
          className="flex-1 display-column"
          style={{ padding: 16, gap: 12, overflowY: "auto" }}
        >
          <CustomCandidateDescription
            description={description}
            setDescription={setDescription}
            on={candidateDescriptionVisible}
            onToggle={() =>
              setCandidateDescriptionVisible(!candidateDescriptionVisible)
            }
          />
          <CustomCandidateDetails
            on={candidateDetailsVisible}
            onToggle={() =>
              setCandidateDetailsVisible(!candidateDetailsVisible)
            }
            fields={candidateDetailsFields}
            onChange={handleChangeToggleCandidateDetails}
          />
          <CustomSkills
            on={candidateSkillsVisible}
            onToggle={() => setCandidateSkillsVisible(!candidateSkillsVisible)}
            data={candidateSkillData}
            addSkill={() => setAddSkillModalVisible(true)}
            removeSkill={(id, index) => removeSkillsHandler(id, index)}
          />
          <CustomLanguage
            on={candidateLanguageVisible}
            onToggle={() =>
              setCandidateLanguageVisible(!candidateLanguageVisible)
            }
            addLanguage={addLanguageHandler}
            data={candidateLanguageData}
            onDelete={(index) => languageDeleteHandler(index)}
            onUpdate={(index, value) => handleLanguageUpdate(index, value)}
          />
          <CustomExperienceDetails
            on={candidateExperienceVisible}
            onToggle={() =>
              setCandidateExperienceVisible(!candidateExperienceVisible)
            }
            addExperience={addExperienceHandler}
            data={candidatExperienceData}
            onUpdate={(index, data) => handleExperienceUpdate(index, data)}
            onDelete={(index) => experienceDeleteHandler(index)}
          />
          <CustomEducationDetails
            on={candidateEducationVisible}
            onToggle={() =>
              setCandidateEducationVisible(!candidateEducationVisible)
            }
            addEducation={addEducationHandler}
            data={candidateEductionData}
            onUpdate={(index, data) => handleEducationUpdate(index, data)}
            onDelete={(index) => educationDeleteHandler(index)}
          />
        </div>
        <div className="flex-1 cv-view-container">
          <div className="resume-container">
            {renderResumeHeaderComponent()}
            <div className="resume-main-container">
              {pages?.length > 0 &&
                pages[currentPage]?.map((section, index) => (
                  <div key={index} className="document-section">
                    {section.component}
                  </div>
                ))}
            </div>
            <div className="resume-footer-div">
              <p className="font-12-regular" style={{ color: "#D7D7D7" }}>
                Page {currentPage + 1} / {pages?.length}
              </p>
            </div>
            {watermark && <div className="water-mark-style">XBoost</div>}
          </div>

          <div
            className="display-flex-justify align-center"
            style={{ width: 600 }}
          >
            <div className="display-flex align-center" style={{ gap: 12 }}>
              <span className="font-14-regular color-dark-black">
                Watermark
              </span>
              <CommonSwitch on={watermark} onToggle={toggleWatermark} />
            </div>
            <div className="display-flex align-center" style={{ gap: 8 }}>
              <button onClick={prevPage} disabled={currentPage === 0}>
                <ArrowRight fill={currentPage === 0 ? "#797979" : "#151B23"} />
              </button>
              <div style={{ minWidth: 61 }}>
                <p className="font-12-regular color-dark-black">
                  Page {currentPage + 1} / {pages.length}
                </p>
              </div>
              <button
                onClick={nextPage}
                disabled={currentPage === pages.length - 1}
              >
                <ArrowLeft
                  fill={
                    currentPage === pages.length - 1 ? "#797979" : "#151B23"
                  }
                />
              </button>
            </div>
          </div>
        </div>
      </div>
      <AddSkillsModal
        visible={addSkillModalVisible}
        onClose={() => setAddSkillModalVisible(false)}
        setSkillValue={(value) => addSkillHandler(value)}
      />
    </div>
  );
};

export default CustomCvPage;
