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
import { ICoach } from "@/types/coach";
import { Add, Delete, Edit } from "@mui/icons-material";
import AddClubModal from "../modals/addClub";
import apiCall from "@/utils/api";
import { HttpMethod } from "@/utils/httpMethods";

const CoachInfo = ({
  coach,
  onAdd,
  onEdit,
  onDelete,
}: {
  coach: ICoach;
  onAdd: (competition: { name: string }) => void;
  onEdit: (competition: { name: string }) => void;
  onDelete: () => void;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  return (
    <TableContainer component={Paper}>
      <Table aria-label="coach info table">
        <TableHead>
          <TableRow>
            <TableCell>Club Name</TableCell>
            <TableCell align="right">Coach Name</TableCell>
            <TableCell align="right">Athletes</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell component="th" scope="row">
              <AddClubModal
                open={isModalOpen}
                onAdd={onAdd}
                onClose={() => setIsModalOpen(false)}
              />
              {!coach.clubName ? (
                <>
                  No club registered
                  <Button onClick={() => setIsModalOpen(true)}>
                    <Add />
                  </Button>
                </>
              ) : (
                <>
                  <AddClubModal
                    open={isEditModalOpen}
                    onAdd={onEdit}
                    onClose={() => setIsEditModalOpen(false)}
                  />
                  {coach.clubName}
                  <Button onClick={() => setIsEditModalOpen(true)}>
                    <Edit />
                  </Button>
                  <Button onClick={() => onDelete()}>
                    <Delete />
                  </Button>
                </>
              )}
            </TableCell>
            <TableCell align="right">{coach.name}</TableCell>
            <TableCell align="right">
              {coach.athletesNames?.length
                ? coach.athletesNames?.join(",")
                : "No athletes registered"}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CoachInfo;
