import React, { useState } from "react";
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
  candidateDescription,
  candidateDetailsData,
  educationData,
  experienceData,
  language,
  skillData,
} from "../../helpers/config";
import CandidateDetailsComponent from "../../components/resume/CandidateDetailsComponent";
import CandidateSkillsComponent from "../../components/resume/CandidateSkillsComponent";
import CandidateEmpoymentComponent from "../../components/resume/CandidateEmpoymentComponent";
import CandidateEducationComponent from "../../components/resume/CandidateEducationComponent";

const CustomCvPage = () => {
  const navigate = useNavigate();
  const [watermark, setWatermark] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const backHandler = () => {
    navigate(-1);
  };

  const toggleWatermark = () => setWatermark(!watermark);
  const nextPage = () => setCurrentPage((prev) => prev + 1);
  const prevPage = () => setCurrentPage((prev) => (prev > 1 ? prev - 1 : 1));

  const exportAsPDF = async () => {
    const resume = document.getElementById("resume");
    const canvas = await html2canvas(resume);
    const imgData = canvas.toDataURL("image/png");

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595, 842]);
    const image = await pdfDoc.embedPng(imgData);
    page.drawImage(image, { x: 0, y: 0, width: 595, height: 842 });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "resume.pdf";
    link.click();
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
      <div className="display-column" style={{ gap: 14 }}>
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
  return (
    <div className="sourcing-main-container">
      <Navbar />
      {renderHeaderComponent()}
      <div className="flex-1 display-flex" style={{ overflow: "auto" }}>
        <div className="flex-1"></div>
        <div className="flex-1 cv-view-container">
          <div id="resume" className="resume-container">
            <div className="resume-main-container">
              {renderResumeHeaderComponent()}
              {currentPage == 1 && (
                <div className="display-column" style={{ gap: 20 }}>
                  <CandidateDescrtiptionComponent
                    title={"Candidate Description"}
                    data={candidateDescription?.candidateDescription}
                  />
                  <CandidateDetailsComponent
                    title={"Candidate Details"}
                    data={candidateDetailsData}
                  />
                  <CandidateSkillsComponent title={"Skills"} data={skillData} />
                  <CandidateDetailsComponent
                    title={"Language"}
                    data={language}
                  />
                </div>
              )}

              {currentPage === 2 && (
                <CandidateEmpoymentComponent
                  title={"Employment"}
                  data={experienceData}
                />
              )}

              {currentPage === 3 && (
                <CandidateEducationComponent
                  title={"Education"}
                  data={educationData}
                />
              )}

              {watermark && <div className="water-mark-style">XBoost</div>}
            </div>

            <div className="resume-footer-div">
              <p className="font-12-regular" style={{ color: "#D7D7D7" }}>
                Page {currentPage} / 3
              </p>
            </div>
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
              <button onClick={prevPage} disabled={currentPage === 1}>
                <ArrowRight />
              </button>
              <div style={{ minWidth: 61 }}>
                <p className="font-12-regular color-dark-black">
                  Page {currentPage} / 3
                </p>
              </div>
              <button onClick={nextPage} disabled={currentPage === 3}>
                <ArrowLeft />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomCvPage;
