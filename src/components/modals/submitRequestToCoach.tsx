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
  onAdd: (username: string) => void;
}

const ApplyForCoach: React.FC<AddCompetitionModalProps> = ({
  open,
  onClose,
  onAdd,
}) => {
  const [name, setName] = useState("");

  const handleSubmit = () => {
    onAdd(name);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Apply for a coach</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Coach username"
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

export default ApplyForCoach;
