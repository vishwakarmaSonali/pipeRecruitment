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
]);

const App = () => {
  const { isAnyModalOpen } = useModal();
  return (
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
  );
};

export default function RootApp() {
  return (
    <ModalProvider>
      <App />
    </ModalProvider>
  );
}
