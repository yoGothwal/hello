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

          padding: "8px 16px",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          textAlign: "center",

          color: "#0d6efd",
        }}
        onClick={handleLogout}
      >
        Log Out
      </button>
    </div>
  );
};

export default Logout;
