import React from "react";

const Logout = ({ handleLogout }) => {
  return (
    <div
      className="d-flex justify-content-center"
      style={{
        position: "absolute",
        bottom: "20px",
        left: "50%",
        transform: "translateX(-50%)",
      }}
    >
      <button
        style={{
          marginTop: "500px",
          color: "white",
          backgroundColor: "#0d6efd",
          padding: "8px 16px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          textAlign: "center",
        }}
        onClick={handleLogout}
      >
        Log Out
      </button>
    </div>
  );
};

export default Logout;
