"use client";
import React, { useEffect, useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { HttpMethod } from "@/utils/httpMethods";
import AddCompetitionModal from "@/components/modals/addCompetitionModal";
import apiCall from "@/utils/api";
import { Preview } from "@mui/icons-material";
import extractErrorMessage from "@/utils/errorHandler";
import { toast } from "react-toastify";
import { ICompetition } from "@/types/competition";
import { useAuth } from "@/contexts/AuthContext";

const CompetitionsPage = () => {
  const [competitions, setCompetitions] = useState<ICompetition[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isAdmin } = useAuth();

  const handleDelete = async (competitionId: any) => {
    // Implement deletion logic
    try {
      apiCall(`/competition/${competitionId}`, HttpMethod.DELETE).then(() => {
        fetchCompetitions();
      });
    } catch (error) {
      const errorMessages = extractErrorMessage(error);
      errorMessages.forEach((message) => toast.error(message));
    }
  };
  const fetchCompetitions = async () => {
    try {
      const data = await apiCall("/competition", HttpMethod.GET);
      setCompetitions(data as ICompetition[]);
    } catch (err: any) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchCompetitions();
  }, []); // Empty dependency array means this effect runs once on mount

  const handleAddCompetition = async (competition: {
    name: string;
    startDate: string;
    endDate: string;
  }) => {
    try {
      await apiCall("/competition", HttpMethod.POST, competition);
      fetchCompetitions();
    } catch (error) {
      const errorMessages = extractErrorMessage(error);
      errorMessages.forEach((message) => toast.error(message));
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ padding: 3 }}>
      {isAdmin && (
        <Box sx={{ marginBottom: 2 }}>
          <Button variant="contained" onClick={() => setIsModalOpen(true)}>
            Add New Competition
          </Button>
          <AddCompetitionModal
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onAdd={handleAddCompetition}
          />
        </Box>
      )}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Number of participants</TableCell>
              <TableCell>Days left until start</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {competitions.map((competition) => (
              <TableRow key={competition.id}>
                <TableCell>{competition.name}</TableCell>
                <TableCell>{competition.numberOfParticipants}</TableCell>
                <TableCell>{competition.dayLeft}</TableCell>
                <TableCell>
                  {isAdmin && (
                    <Button
                      variant="outlined"
                      color="secondary"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleDelete(competition.id)}
                    >
                      Delete
                    </Button>
                  )}
                  <Button
                    sx={{ mx: 3 }}
                    variant="contained"
                    color="secondary"
                    startIcon={<Preview />}
                    href={`/competitions/${competition.id}`}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CompetitionsPage;
