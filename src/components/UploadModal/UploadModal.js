import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function UploadImage({ open, onClose }) {
  return (
    <div>
      <Dialog open={open} onClose={onClose}>
        <DialogContent sx={{ minWidth: "500px" }}>
          <DialogContentText>Upload your image</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Image Url"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={onClose}>
            Upload
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
