import React from "react";

export default function Banner({ text }) {
  return (
    <>
      <div>
        <strong>{text}</strong>

        <div
          className="banner-section"
          style={{
            border: "1px solid grey",
            padding: "10px",
            borderRadius: "5px",
            cursor: "pointer",
            backgroundColor: "#ffffff",
            color: "#000000",
            display: "grid",
            gridTemplateColumns: `repeat(1, 1fr)`,
            gap: "16px",
            textAlign: "center",
            paddingTop: "20px",
            paddingBottom: "20px",
          }}
        >
          <div
            style={{
              border: "1px solid grey",
              padding: "40px",
              paddingTop: "40px",
              paddingBottom: "40px",
              borderRadius: "5px",
              cursor: "pointer",
              backgroundColor: "#cccccc",
              color: "#000000",
              display: "grid",
              gridTemplateColumns: `repeat(1, 1fr)`,
              gap: "16px",
              position: "relative",
            }}
          >
            {/* Your inner content here */}
            <div
              style={{
                position: "absolute",
                bottom: "20px",
                left: "50%",
                transform: "translateX(-50%)",
                fontSize: "30px",
              }}
            >
              ...
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
