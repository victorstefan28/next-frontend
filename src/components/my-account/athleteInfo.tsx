import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { IAthlete } from "@/types/athlete";
import ApplyForCoach from "../modals/submitRequestToCoach";

const AthleteInfo = ({
  athlete,
  onAdd,
}: {
  athlete: IAthlete;
  onAdd: (username: string) => void;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="athlete info table">
        <TableHead>
          <TableRow>
            <TableCell>Points</TableCell>
            <TableCell align="right">Athlete Name</TableCell>
            <TableCell align="right">Coach Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell component="th" scope="row">
              {athlete.points}
            </TableCell>
            <TableCell align="right">{athlete.name}</TableCell>
            <TableCell align="right">
              {athlete.coachName ?? (
                <>
                  <ApplyForCoach
                    onAdd={onAdd}
                    open={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                  />
                  <Button onClick={() => setIsModalOpen(true)}>
                    Apply for a coach
                  </Button>
                </>
              )}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AthleteInfo;
