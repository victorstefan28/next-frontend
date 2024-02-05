// components/AddCompetitionModal.tsx
import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";

interface AddCompetitionModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (competition: {
    name: string;
    startDate: string;
    endDate: string;
  }) => void;
}

const AddCompetitionModal: React.FC<AddCompetitionModalProps> = ({
  open,
  onClose,
  onAdd,
}) => {
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = () => {
    console.log("Submitting form");
    onAdd({ name, startDate, endDate });
    onClose(); // Close the modal after submission
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Competition</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Competition Name"
          type="text"
          fullWidth
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Start Date"
          type="date"
          fullWidth
          variant="outlined"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          margin="dense"
          label="End Date"
          type="date"
          fullWidth
          variant="outlined"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddCompetitionModal;
