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
import ArchiveCandidates from "./pages/Recruitment/Candidates/ArchiveCandidatesPage";
import FolderAddCandidates from "./pages/Recruitment/Candidates/FoldersList";
import IndividualFilterCandidateListPage from "./pages/Recruitment/Candidates/IndividualFolderCandidateList";
import MergeDuplicateCandidatesPage from "./pages/Recruitment/Candidates/MergeDuplicateCandidates";
import OriginalResumePage from "./pages/resume/OriginalResumePage";
import CustomCvPage from "./pages/resume/CustomCvPage";
import ReportPage from "./pages/resume/ReportPage";
import CustomReportPage from "./pages/resume/CustomReportPage";
import LoginAdmin from "./pages/Login/Login";
import { useSelector } from "react-redux";
import Administration from "./pages/administration/Administration";
import UserTeamManagement from "./pages/administration/UserTeamManagement";
import UserRoleManagement from "./pages/administration/UserRoleManagement";
import SignUpPage from "./pages/SignUp/SignUpPage";

// 🔹 Protected Route Wrapper
const ProtectedRoute = ({ element }) => {
  const token = useSelector((state) => state.auth.token);
  return token ? element : <Navigate to="/login" replace />;
};

// 🔹 Global Error Boundary (prevents app from crashing)
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <h2>Oops! Something went wrong. Please refresh the page.</h2>;
    }
    return this.props.children;
  }
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  // {
  //   path: "/sourcing",
  //   element: <Navigate to="/sourcing" replace />,
  // },
  {
    path: "/client",
    element: <Client />,
  },
  {
    path: "/login",
    element: <LoginAdmin />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
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
  {
    path: "/archive-candidates",
    element: <ArchiveCandidates />,
  },
  {
    path: "/folder-candidates",
    element: <FolderAddCandidates />,
  },
  {
    path: "/individual-folder/:folderId",
    element: <IndividualFilterCandidateListPage />,
  },
  {
    path: "/candidate/original-resume",
    element: <OriginalResumePage />,
  },
  {
    path: "/candidate/custom-cv",
    element: <CustomCvPage />,
  },
  {
    path: "/candidate/report",
    element: <CustomReportPage />,
  },
  {
    path: "/merge-candidate",
    element: <MergeDuplicateCandidatesPage />,
  },
  {
    path: "/administration",
    element: <Administration />,
  },
  {
    path: "/user-team-management",
    element: <UserTeamManagement />,
  },
  {
    path: "/user-roles-permissions",
    element: <UserRoleManagement />,
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
