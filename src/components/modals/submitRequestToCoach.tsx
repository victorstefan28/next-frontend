// components/AddCompetitionModal.tsx
"use client";
import React, { useEffect, useMemo, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import apiCall from "@/utils/api";
import { HttpMethod } from "@/utils/httpMethods";
import extractErrorMessage from "@/utils/errorHandler";
import { toast } from "react-toastify";

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
  const [coaches, setCoaches] = useState([]);

  const handleSubmit = () => {
    onAdd(name);
    setName("");
    onClose();
  };

  useEffect(() => {
    const fetchCoaches = async () => {
      try {
        const response = await apiCall("/coach", HttpMethod.GET);
        setCoaches(response);
      } catch (error) {
        const errorMessages = extractErrorMessage(error);
        errorMessages.forEach((message) => toast.error(message));
      }
    };

    fetchCoaches();
  }, [open]);
  console.log(coaches);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Apply for a coach</DialogTitle>
      <DialogContent>
        {/* <TextField
          autoFocus
          margin="dense"
          label="Coach username"
          type="text"
          fullWidth
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
        /> */}
        <Select
          label="Coach"
          onChange={(e) => setName(e.target.value as string)}
          value={name}
          placeholder="Select a coach"
          fullWidth
        >
          {coaches.map((coach: any) => (
            <MenuItem value={coach.username}>{coach.name}</MenuItem>
          ))}
        </Select>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ApplyForCoach;
