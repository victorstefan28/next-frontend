// pages/index.tsx
"use client";
import React, { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  Container,
  Paper,
  Box,
  Card,
  CardContent,
  CardMedia,
  Button,
} from "@mui/material";
import Navbar from "@/components/navbar/navbar";
import { makeStyles } from "@mui/styles";
import theme from "@/theme/theme";
import apiCall from "@/utils/api";
import { HttpMethod } from "@/utils/httpMethods";
import { IAthlete } from "@/types/athlete";
import { ICompetition } from "@/types/competition";
import extractErrorMessage from "@/utils/errorHandler";
import { toast } from "react-toastify";
import Link from "next/link";

const useStyles = makeStyles({
  greetingBox: {
    padding: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
    marginBottom: theme.spacing(4),
  },
  card: {
    maxWidth: 345,
  },
  media: {
    height: 200,
  },
  sectionMargin: {
    marginBottom: theme.spacing(4),
  },
});

const Home = () => {
  const classes = useStyles();

  // Sample data for news and competitions
  const [newsItems, setNewsItems] = useState<IAthlete[]>([]);
  const [upcomingComp, setUpcomingComp] = useState<ICompetition[]>([]);
  useEffect(() => {
    const fetchTop3 = async () => {
      try {
        const res = await apiCall(
          "/Rank/athletes?PageNumber=0&PageSize=3",
          HttpMethod.GET
        );
        setNewsItems(res as IAthlete[]);
      } catch (error) {
        const errorMessages = extractErrorMessage(error);
        errorMessages.forEach((message) => toast.error(message));
      }
    };
    const fetchUpcomingCompetitions = async () => {
      try {
        const res = await apiCall("/Competition", HttpMethod.GET);
        const upcomingCompetitions = (res as ICompetition[]).filter(
          (item, index) => true
        );
        setUpcomingComp(upcomingCompetitions as ICompetition[]);
      } catch (error) {
        const errorMessages = extractErrorMessage(error);
        errorMessages.forEach((message) => toast.error(message));
      }
    };
    fetchTop3();
    fetchUpcomingCompetitions();
  }, []); // replace with actual news items
  const competitionItems = [{}, {}, {}]; // replace with actual competition items

  return (
    <Box>
      <Container>
        <Paper className={classes.greetingBox}>
          <Typography variant="h2">Welcome Back!</Typography>
          <Button variant="contained">
            <Link href="/fight" passHref>
              {" "}
              <Typography>Test the live fight mock-up </Typography>
            </Link>
          </Button>
        </Paper>

        {/* News Section */}
        <section className={classes.sectionMargin}>
          <Typography variant="h4" gutterBottom>
            Top athletes
          </Typography>

          <Grid container spacing={3}>
            {newsItems.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.media}
                    image="/athlete-placeholder.png"
                    title="Athlete"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {item.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {item.points} Points
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
            {!newsItems.length && (
              <Typography
                gutterBottom
                variant="h5"
                component="h2"
                style={{ padding: "40px", marginTop: "10px" }}
              >
                No athletes registered
              </Typography>
            )}
          </Grid>
        </section>

        <section className={classes.sectionMargin}>
          <Typography variant="h4" gutterBottom>
            Upcoming Competitions
          </Typography>
          <Grid container spacing={3}>
            {upcomingComp.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.media}
                    image="competition.png"
                    title="Competition Title"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {item.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {item.dayLeft} days left
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
            {!upcomingComp.length && (
              <Typography
                gutterBottom
                variant="h5"
                component="h2"
                style={{ padding: "40px", marginTop: "10px" }}
              >
                No competitions registered
              </Typography>
            )}
          </Grid>
        </section>
      </Container>
    </Box>
  );
};

export default Home;
