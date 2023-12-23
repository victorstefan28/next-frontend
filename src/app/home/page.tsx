// pages/index.tsx
"use client";
import React from "react";
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
    height: 140,
  },
  sectionMargin: {
    marginBottom: theme.spacing(4),
  },
});

const Home = () => {
  const classes = useStyles();

  // Sample data for news and competitions
  const newsItems = [{}, {}, {}]; // replace with actual news items
  const competitionItems = [{}, {}, {}]; // replace with actual competition items

  return (
    <Box>
      <Navbar />
      <Container>
        <Paper className={classes.greetingBox}>
          <Typography variant="h2">Welcome Back, [Username]!</Typography>
          <Typography variant="body1">Here's what's new today:</Typography>
        </Paper>

        {/* News Section */}
        <section className={classes.sectionMargin}>
          <Typography variant="h4" gutterBottom>
            Latest News
          </Typography>
          <Grid container spacing={3}>
            {newsItems.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.media}
                    image="/static/news-placeholder.jpg" // Replace with actual image path
                    title="News Title"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      News Headline
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      News Summary
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </section>

        {/* Competitions Section */}
        <section className={classes.sectionMargin}>
          <Typography variant="h4" gutterBottom>
            Upcoming Competitions
          </Typography>
          <Grid container spacing={3}>
            {competitionItems.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.media}
                    image="/static/competition-placeholder.jpg" // Replace with actual image path
                    title="Competition Title"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Competition Name
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Competition Details
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </section>
      </Container>
    </Box>
  );
};

export default Home;
