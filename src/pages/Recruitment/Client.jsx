import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Header from "../../components/Header/Header";
import SavedFiltersList from "../../components/savedFiilterList";

const Client = () => {

  return (
    <div
      className="w-full h-screen bg-gray-100 overflow-hidden"
      style={{ boxSizing: "border-box", display: "flex" }}
    >
      <Sidebar />
      <div
        className="overflow-auto scroll-width-none"
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Header title={"Client Management"} />
        <div
          className="scroll-width-none"
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#fff",
          }}
        >
         <SavedFiltersList />
        </div>
      </div>
    </div>
  );
};

export default Client;
