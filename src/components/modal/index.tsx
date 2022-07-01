/** @jsxImportSource theme-ui */
import * as React from "react";
import { Box, Heading, Link, Paragraph } from "theme-ui";

export interface ModalProps {
  onClick: () => void;
}

export const Modal: React.FC<ModalProps> = ({ children, onClick }) => {
  return (
    <Box
      sx={{
        backgroundColor: "rgba(0.5, 0.5, 0.5, 0.7)",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
      }}
      className="modal-bg"
      onClick={onClick}
    >
      <Box
        className="modal-container"
        sx={{
          position: "absolute",
          boxSizing: "content-box",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
