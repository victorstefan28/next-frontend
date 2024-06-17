// components/AddCompetitionModal.tsx
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import apiCall from "@/utils/api";
import { HttpMethod } from "@/utils/httpMethods";
import { useLoading } from "@/hooks/useLoading";
import { ICompetition } from "@/types/competition";

interface AddNewMatchModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (athletes: { athleteRedId: string; athleteWhiteId: string }) => void;
  isEdit?: boolean;
  fetchData: () => void;
  competition: ICompetition;
}

const AddNewMatchModal: React.FC<AddNewMatchModalProps> = ({
  open,
  onClose,
  onAdd,
  isEdit = false,
  fetchData,
  competition,
}) => {
  const [athletes, setAthletes] = useState([]);
  const { incrementLoading, decrementLoading } = useLoading();
  const [athleteRed, setAthleteRed] = useState("");
  const [athleteWhite, setAthleteWhite] = useState("");

  const handleSubmit = () => {
    onAdd({ athleteRedId: athleteRed, athleteWhiteId: athleteWhite });
    apiCall(`/Match/competition/${competition.id}`, HttpMethod.POST, {
      athleteWhiteId: athleteWhite,
      athleteRedId: athleteRed,
      isSimulated: false,
    }).then(() => {
      fetchData();
    });
    onClose();
  };

  const fetchAllAthletes = async () => {
    incrementLoading();
    try {
      const response = await apiCall("/athlete", HttpMethod.GET);
      setAthletes(response);
    } catch (error) {
      console.error("Failed to fetch athletes", error);
    } finally {
      decrementLoading();
    }
  };

  useEffect(() => {
    fetchAllAthletes();
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        <Typography>Add new match</Typography>
      </DialogTitle>
      <DialogContent>
        <Select
          label="Athlete red"
          onChange={(e) => setAthleteRed(e.target.value as string)}
        >
          {athletes.map((athlete: any) => (
            <MenuItem key={athlete.id} value={athlete.id}>
              {athlete.name}
            </MenuItem>
          ))}
        </Select>
        <Select
          label="Athlete white"
          onChange={(e) => setAthleteWhite(e.target.value as string)}
        >
          {athletes.map((athlete: any) => (
            <MenuItem key={athlete.id} value={athlete.id}>
              {athlete.name}
            </MenuItem>
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

export default AddNewMatchModal;
