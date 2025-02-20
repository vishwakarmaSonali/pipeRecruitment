import React, { createContext, useState, useContext, useMemo } from "react";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [modals, setModals] = useState({
    animatedModal: false,
    cc: false,
    createCandidateFormModalVisible: false,
    smartGenerateModalVisible: false,
    uploadResumeCandidateModalVisible: false,
    saveFiltersModalVisible: false,
    addToJobsModalVisible: false,
    addToFolderModalVisible: false,
    createFolderModalVisible: false,
    candidateInfoModalVisible: false,
    categoryDeleteModalVisible: false,
    labelDeleteModalVisible: false,
  });

  const isAnyModalOpen = useMemo(
    () => Object.values(modals).some((isVisible) => isVisible),
    [modals]
  );

  const setModalVisibility = (modalName, isVisible) => {
    setModals((prev) => ({
      ...prev,
      [modalName]: isVisible,
    }));
  };

  return (
    <ModalContext.Provider
      value={{ modals, setModalVisibility, isAnyModalOpen }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
