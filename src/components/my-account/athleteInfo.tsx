import React from "react";
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

const AthleteInfo = ({ athlete }: { athlete: IAthlete }) => {
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
                  <Button>Apply for a coach</Button>
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
