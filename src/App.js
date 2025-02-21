import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Sourcing from "./pages/Tools/Sourcing/Sourcing";
import Client from "./pages/Recruitment/Client";
import Candidates from "./pages/Recruitment/Candidates/Candidates";
import "./App.css";
import { ModalProvider, useModal } from "./components/common/ModalProvider";
import "react-toastify/dist/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";
import { ToastContainer, Bounce } from "react-toastify";
import UploadResumePage from "./pages/Recruitment/Candidates/UploadResumePage";
import SingleResumeHistoryPage from "./pages/Recruitment/Candidates/SingleResumeHistoryPage";
import UploadResumeCsvJsonPage from "./pages/Recruitment/Candidates/UploadResumeCsvJsonPage";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store/store";
import CandidateInfo from "./pages/Recruitment/Candidates/CandidateInfo";
import CandidateCustomization from "./pages/Recruitment/Candidates/CandidateCustomization";
import CreateCandidateForm from "./components/candidate/CreateCandidate";
import CreateCandidateUploadResume from "./components/candidate/CandidateUploadResume";
import CandidateUploadResumeCsvJsonPage from "./components/candidate/CandidateUploadCSVPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/sourcing" replace />,
  },
  {
    path: "/client",
    element: <Client />,
  },
  {
    path: "/sourcing",
    element: <Sourcing />,
  },
  {
    path: "/candidates",
    element: <Candidates />,
  },
  {
    path: "/candidate/upload-resume",
    element: <UploadResumePage />,
  },
  {
    path: "/candidate/resume-history-info",
    element: <SingleResumeHistoryPage />,
  },
  {
    path: "/candidate/upload-resume-csv-json",
    element: <UploadResumeCsvJsonPage />,
  },
  {
    path: "/candidate/candidate-info",
    element: <CandidateInfo />,
  },
  {
    path: "/candidate-customization",
    element: <CandidateCustomization />,
  },
  {
    path: "/candidate/create-candidate-form",
    element: <CreateCandidateForm />,
  },
  {
    path: "/candidate/create-candidate-resume-upload",
    element: <CreateCandidateUploadResume />,
  },
  {
    path: "/candidate/create-candidate-upload-resume",
    element: <CandidateUploadResumeCsvJsonPage />,
  },
]);

const App = () => {
  const { isAnyModalOpen } = useModal();
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <>
          <div className={`main-content`}>
            <RouterProvider router={router} />
          </div>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            pauseOnHover
            draggable
            transition={Bounce}
            theme="light"
            toastClassName={"custom-toast"}
            limit={1}
          />
        </>
      </PersistGate>
    </Provider>
  );
};

export default function RootApp() {
  return (
    <ModalProvider>
      <App />
    </ModalProvider>
  );
}
