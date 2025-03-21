import React, { useRef, useState, useEffect } from "react";
import "./index.css";
import CancelButton from "../../components/common/CancelButton";
import CommonButton from "../../components/common/CommonButton";
import Navbar from "../../components/navbar/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
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

import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  PDFDownloadLink,
  Image,
} from "@react-pdf/renderer";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { fetchCandidateDetails } from "../../actions/candidateActions";

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Helvetica",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    paddingBottom: 10,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  skillRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingVertical: 5,
  },
  tableCell: {
    flex: 1,
    fontSize: 10,
  },
});

const CustomCvPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const { candidateInfo, candidateDetailsLoading, candidateId } = useSelector(
    (state) => state.candidates
  );

  const backHandler = () => {
    navigate(-1);
  };
  const [isMounted, setIsMounted] = useState(false);
  const [description, setDescription] = useState(
    candidateInfo?.description || ""
  );
  const [candidateDescriptionVisible, setCandidateDescriptionVisible] =
    useState(true);
  const [candidateDetailsVisible, setCandidateDetailsVisible] = useState(true);
  const [candidateSkillsVisible, setCandidateSkillsVisible] = useState(true);
  const [candidateFields, setCandidateFields] = useState(
    customizeCandidateDetailsFields
  );

  const [candidateDetailsFields, setCandidateDetailsFields] = useState({});

  const handleChangeToggleCandidateDetails = (label, key, newValue) => {
    setCandidateDetailsFields((prevFields) => ({
      ...prevFields,
      [label]: { ...prevFields[label], [key]: newValue }, // Update 'value' or 'hide'
    }));
  };

  const [candidateSkillData, setCandidateSkillData] = useState([]);
  const [addSkillModalVisible, setAddSkillModalVisible] = useState(false);

  const addSkillHandler = (value) => {
    setCandidateSkillData([
      ...candidateSkillData,
      {
        name: value?.name,
        level: value?.score,
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
    console.log(">>>>>>>>>..dataAddEducationHandler", data);
    setCandidateEducationData([...candidateEductionData, data]);
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
    setCandidateExperienceData([...candidatExperienceData, data]);
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

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const exportAsPDF = async () => {
    try {
      if (!pdfRef.current) {
        console.error("Resume container element not found!");
        return;
      }

      const pdfDoc = await PDFDocument.create();
      const pageWidth = 595; // A4 width in points
      const pageHeight = 842; // A4 height in points

      // Create a temporary container
      const tempContainer = document.createElement("div");
      tempContainer.style.position = "absolute";
      tempContainer.style.left = "-9999px";
      document.body.appendChild(tempContainer);

      // Clone the resume container
      const originalContainer = pdfRef.current;
      const clone = originalContainer.cloneNode(true);

      // Process pages
      for (let i = 0; i < pages.length; i++) {
        const pageClone = clone.cloneNode(true);

        // Update content dynamically
        const mainContainer = pageClone.querySelector(".resume-main-container");
        mainContainer.innerHTML = "";

        pages[i].forEach((section) => {
          const sectionDiv = document.createElement("div");
          sectionDiv.className = "document-section";
          ReactDOM.render(section.component, sectionDiv);
          mainContainer.appendChild(sectionDiv);
        });

        // Update footer
        const footer = pageClone.querySelector(".resume-footer-div p");
        if (footer) footer.textContent = `Page ${i + 1} / ${pages.length}`;

        tempContainer.appendChild(pageClone);

        // Capture with html2canvas
        const canvas = await html2canvas(pageClone, {
          scale: 3, // Increased scale for better quality
          useCORS: true,
          backgroundColor: null, // Fix transparent background issues
          width: pageWidth,
          height: pageHeight,
          windowWidth: pageWidth * 3,
          windowHeight: pageHeight * 3,
          scrollY: -window.scrollY, // Ensure correct positioning
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

        tempContainer.removeChild(pageClone);
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
            disabled={!isMounted}
            onClick={exportAsPDF}
          />
          {/* <PDFExportButton /> */}
        </div>
      </div>
    );
  };

  const renderResumeHeaderComponent = () => {
    return (
      <div className="resume-header">
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "40px", // Set a fixed height
          }}
        >
          {/* Left Section: Logo + Text */}
          <div
            style={{
              position: "absolute",
              left: "0",
              top: "50%",
              transform: "translateY(-50%)",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <img
              src={xBoot}
              className="common-img"
              style={{
                width: "32px",
                height: "32px",
                display: "block",
              }}
            />
            <p
              className="font-18-medium color-dark-black"
              style={{ margin: 0 }}
            >
              xBoost
            </p>
          </div>

          {/* Right Section: User Info */}
          <div
            style={{
              position: "absolute",
              right: "0",
              top: "50%",
              transform: "translateY(-50%)",
              textAlign: "right",
            }}
          >
            <p
              className="font-10-regular color-dark-black"
              style={{ margin: 0 }}
            >
              Olivia Carter
            </p>
            <p
              className="font-10-regular color-dark-black"
              style={{ margin: 0 }}
            >
              oliviacarter@mail.com
            </p>
            <p
              className="font-10-regular color-dark-black"
              style={{ margin: 0 }}
            >
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

  // Create PDF document component
  const MyDocument = ({
    description,
    candidateDetailsFields,
    candidateSkillData,
    candidateLanguageData,
    candidateEductionData,
    candidatExperienceData,
  }) => (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image src={xBoot} style={{ width: 32, height: 32 }} />
            <Text style={{ fontSize: 18, marginLeft: 6 }}>xBoost</Text>
          </View>
          <View>
            <Text style={{ fontSize: 10 }}>Olivia Carter</Text>
            <Text style={{ fontSize: 10 }}>oliviacarter@mail.com</Text>
            <Text style={{ fontSize: 10 }}>+1 (555) 987-6543</Text>
          </View>
        </View>

        {/* Candidate Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Candidate Description</Text>
          <Text style={{ fontSize: 12 }}>{description}</Text>
        </View>

        {/* Candidate Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Candidate Details</Text>
          {Object.entries(candidateDetailsFields).map(([label, field]) => (
            <View key={label} style={styles.tableRow}>
              <Text style={styles.tableCell}>{label}</Text>
              <Text style={styles.tableCell}>{field.value}</Text>
            </View>
          ))}
        </View>

        {/* Skills */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          {candidateSkillData.map((skill, index) => (
            <View key={index} style={styles.skillRow}>
              <Text>{skill.name}</Text>
              <Text>{skill.rating}/10</Text>
            </View>
          ))}
        </View>

        {/* Languages */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Languages</Text>
          {candidateLanguageData.map((lang, index) => (
            <View key={index} style={styles.skillRow}>
              <Text>{lang.language}</Text>
              <Text>{lang.proficiency}</Text>
            </View>
          ))}
        </View>

        {/* Education */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {candidateEductionData.map((edu, index) => (
            <View key={index} style={{ marginBottom: 8 }}>
              <Text>{edu.degree}</Text>
              <Text>{edu.institution}</Text>
              <Text>{edu.duration}</Text>
            </View>
          ))}
        </View>

        {/* Experience */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Employment</Text>
          {candidatExperienceData.map((exp, index) => (
            <View key={index} style={{ marginBottom: 8 }}>
              <Text>{exp.jobTitle}</Text>
              <Text>{exp.company}</Text>
              <Text>{exp.duration}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );

  // Replace your exportAsPDF function with this
  const PDFExportButton = () => (
    <PDFDownloadLink
      document={
        <MyDocument
          description={description}
          candidateDetailsFields={candidateDetailsFields}
          candidateSkillData={candidateSkillData}
          candidateLanguageData={candidateLanguageData}
          candidateEductionData={candidateEductionData}
          candidatExperienceData={candidatExperienceData}
        />
      }
      fileName="resume.pdf"
    >
      {({ loading }) => (
        <CommonButton
          title={loading ? "Generating..." : "Export PDF"}
          disabled={loading || !isMounted}
        />
      )}
    </PDFDownloadLink>
  );

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const userId = searchParams.get("id");
    dispatch(fetchCandidateDetails(userId));
  }, [location]);

  useEffect(() => {
    setDescription(candidateInfo?.description || "");
    const updatedData = candidateFields?.map((item) => {
      if (item?.name === "first_name") {
        return { ...item, value: candidateInfo?.first_name || "" };
      } else if (item?.name === "last_name") {
        return { ...item, value: candidateInfo?.last_name || "" };
      } else if (item?.name === "gender") {
        return { ...item, value: candidateInfo?.gender || "" };
      } else if (item?.name === "current_job_title") {
        return { ...item, value: candidateInfo?.current_job_title || "" };
      } else if (item?.name === "current_employer") {
        return { ...item, value: candidateInfo?.current_employer || "" };
      } else if (item?.name === "email") {
        return { ...item, value: candidateInfo?.email || "" };
      } else if (item?.name === "location") {
        return { ...item, value: candidateInfo?.location || "" };
      } else if (item?.name === "phone_number") {
        return { ...item, value: candidateInfo?.phone_number || "" };
      } else {
        return item;
      }
    });
    setCandidateFields(updatedData);

    const mappedCandidateDetailsFields = updatedData.reduce((acc, field) => {
      acc[field.label] = {
        value: field.value,
        type: field.type,
        options: field.options,
        order: field.order,
        default: field.default,
        hide: field.hide,
      };
      return acc;
    }, {});

    setCandidateDetailsFields(mappedCandidateDetailsFields);

    setCandidateSkillData(candidateInfo?.skills || []);
    setCandidateLanguageData(candidateInfo?.languages || []);
    setCandidateExperienceData(candidateInfo?.employment_history || []);
    setCandidateEducationData(candidateInfo?.education || []);
  }, [candidateInfo]);

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
          <div ref={pdfRef} className="resume-container">
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
