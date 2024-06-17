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
  Typography,
} from "@mui/material";
import { ICoach } from "@/types/coach";
import { Add, Check, Delete, Edit } from "@mui/icons-material";
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

  const handleAccept = async (requestUser: string) => {
    // Implement accept logic

    const _ = await apiCall(
      `Coach/me/requests-join/athlete/${requestUser}`,
      HttpMethod.PATCH,
      {
        requestStatus: "ACCEPTED",
      }
    );
    coach.requests = coach.requests?.filter(
      (request) => request.requestedByUser !== requestUser
    );
  };

  const handleReject = async (requestUser: string) => {
    const _ = await apiCall(
      `Coach/me/requests-join/athlete/${requestUser}`,
      HttpMethod.PATCH,
      {
        requestStatus: "DECLINED",
      }
    );
    coach.requests = coach.requests?.filter(
      (request) => request.requestedByUser !== requestUser
    );
  };

  const handleAcceptParticipate = async (request: any) => {
    // Implement accept logic

    const _ = await apiCall(
      `Coach/me/requests-participate/athlete/${request.requestedByUser}/competition/${request.competitionId}`,
      HttpMethod.PATCH,
      {
        requestStatus: "ACCEPTED",
      }
    );
    coach.requests = coach.requests?.filter(
      (request_) => request_.requestedByUser !== request.requestedByUser
    );
  };

  const handleRejectParticipate = async (request: any) => {
    const _ = await apiCall(
      `Coach/me/requests-join/athlete/${request.requestedByUser}/competition/${request.competitionId}`,
      HttpMethod.PATCH,
      {
        requestStatus: "DECLINED",
      }
    );
    coach.requests = coach.requests?.filter(
      (request_) => request_.requestedByUser !== request.requestedByUser
    );
  };

  console.log(coach);

  return (
    <>
      <TableContainer sx={{ marginTop: 2 }} component={Paper}>
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

      {coach.requests?.length !== 0 && (
        <>
          <Typography variant="h6" sx={{ marginTop: 2 }}>
            Requests to join
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Athlet username</TableCell>
                  <TableCell align="right">Created at</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {coach.requests?.map((request) => (
                  <TableRow>
                    <TableCell component="th" scope="row">
                      {request.requestedByUser}
                    </TableCell>
                    <TableCell align="right">
                      {new Date(request.requestDate).toDateString()}
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        sx={{ color: "green" }}
                        onClick={() => {
                          handleAccept(request.requestedByUser);
                        }}
                      >
                        <Check />
                      </Button>
                      <Button
                        onClick={() => {
                          handleReject(request.requestedByUser);
                        }}
                      >
                        <Delete />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}

      {coach.participate?.length !== 0 && (
        <>
          <Typography variant="h6" sx={{ marginTop: 2 }}>
            Requests to participate to competition
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Athlet username</TableCell>
                  <TableCell align="right">Created at</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {coach.participate?.map((request) => (
                  <TableRow>
                    <TableCell component="th" scope="row">
                      {request.requestedByUser}
                    </TableCell>
                    <TableCell align="right">
                      {new Date(request.requestDate).toDateString()}
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        sx={{ color: "green" }}
                        onClick={() => {
                          handleAcceptParticipate(request);
                        }}
                      >
                        <Check />
                      </Button>
                      <Button
                        onClick={() => {
                          handleRejectParticipate(request);
                        }}
                      >
                        <Delete />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </>
  );
};

export default CoachInfo;
