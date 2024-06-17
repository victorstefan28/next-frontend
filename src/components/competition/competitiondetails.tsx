// components/CompetitionDetails.tsx

import React, { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  Typography,
  Box,
  List,
  ListItem,
  Button,
} from "@mui/material";
import { ICompetition } from "@/types/competition";
import apiCall from "@/utils/api";
import { HttpMethod } from "@/utils/httpMethods";
import { toast } from "react-toastify";
import extractErrorMessage from "@/utils/errorHandler";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import AddNewMatchModal from "./addnewmatchmodal";

interface CompetitionDetailsProps {
  competition: ICompetition;
  fetchData: () => void;
}

const CompetitionDetails: React.FC<CompetitionDetailsProps> = ({
  competition,
  fetchData,
}) => {
  const [matches, setMatches] = useState([]);
  const [openAddModal, setOpenAddModal] = useState(false);

  const {} = useAuth();
  const requestToJoin = async () => {
    // api call to request to join
    try {
      const response = await apiCall(
        `Request/participate/competition/${competition.id}`,
        HttpMethod.POST
      );
      toast.success("Request sent successfully");
    } catch (err) {
      const errorMessages = extractErrorMessage(err);
      errorMessages.forEach((message) => toast.error(message));
    }
  };

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await apiCall(
          `/Match/competition/${competition.id}`,
          HttpMethod.GET
        );
        setMatches(res);
      } catch (error) {
        const errorMessages = extractErrorMessage(error);
        errorMessages.forEach((message) => toast.error(message));
      }
    };
    fetchMatches();
  }, [competition]);

  return (
    <>
      <Card>
        <CardContent>
          <Typography variant="h4" component="h2" gutterBottom>
            {competition.name}
          </Typography>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body1">
              Start Date: {new Date(competition.startDate).toLocaleDateString()}
            </Typography>
            <Typography variant="body1">
              End Date: {new Date(competition.endDate).toLocaleDateString()}
            </Typography>
            <Typography variant="body1">Name: {competition.name}</Typography>
          </Box>
        </CardContent>
        <List>
          {competition?.participants?.map((participant) => (
            <ListItem>
              <div>Name: {participant.name}</div>
              <div>Points: {participant.points}</div>
            </ListItem>
          ))}
        </List>
        <Button
          variant="contained"
          color="primary"
          sx={{ margin: 2 }}
          onClick={() => {
            requestToJoin();
          }}
        >
          Request to join the competition
        </Button>
        <Button
          variant="contained"
          color="primary"
          sx={{ margin: 2 }}
          onClick={() => {
            setOpenAddModal(true);
          }}
        >
          Add match
        </Button>

        <List>
          <Typography variant="h5">Matches</Typography>
          {matches.map((match: any) => (
            <ListItem>
              <Card>
                <Typography>
                  <Link href={`/fight/${match.id}`}>
                    Go to match {match.id}
                  </Link>
                </Typography>
                <Typography>Red: {match.athleteRedName}</Typography>
                <Typography>
                  White: {match.athleteWhiteName ?? "Not assigned yet"}
                </Typography>
              </Card>
            </ListItem>
          ))}
        </List>
      </Card>
      <AddNewMatchModal
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        onAdd={() => {}}
        competition={competition}
        fetchData={fetchData}
      />
    </>
  );
};

export default CompetitionDetails;
