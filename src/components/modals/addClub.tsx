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
  onAdd: (competition: { name: string }) => void;
  isEdit?: boolean;
}

const AddClubModal: React.FC<AddCompetitionModalProps> = ({
  open,
  onClose,
  onAdd,
  isEdit = false,
}) => {
  const [name, setName] = useState("");

  const handleSubmit = () => {
    onAdd({ name });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{isEdit ? "Edit club name" : "Add New Club"}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Club Name"
          type="text"
          fullWidth
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddClubModal;
