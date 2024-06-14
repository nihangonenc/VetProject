import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

function GeneralModal({ openModal, handleCloseModal, errorMessage }) {
  return (
    <Modal
      open={openModal}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          textAlign: "center",
          bgcolor: "background.paper",
          border: "10px solid #a20622",
          borderRadius: "2rem",
          color: " #a20622",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Could Not Be Created
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {errorMessage}
        </Typography>
      </Box>
    </Modal>
  );
}

export default GeneralModal;
