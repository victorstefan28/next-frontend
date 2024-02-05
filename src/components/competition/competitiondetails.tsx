// components/CompetitionDetails.tsx

import React from "react";

import {
  Card,
  CardContent,
  Typography,
  Box,
  List,
  ListItem,
} from "@mui/material";
import { ICompetition } from "@/types/competition";

interface CompetitionDetailsProps {
  competition: ICompetition;
}

const CompetitionDetails: React.FC<CompetitionDetailsProps> = ({
  competition,
}) => {
  return (
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
            <div>Age: {participant.points}</div>
          </ListItem>
        ))}
      </List>
    </Card>
  );
};

export default CompetitionDetails;
