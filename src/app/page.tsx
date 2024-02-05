import { Metadata } from "next";
import Link from "next/link";
import {
  Typography,
  Button,
  Container,
  Grid,
  Box,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";

export const metadata: Metadata = {
  title: "Karate Competition Platform",
  description: "Join and manage karate competitions",
};

const Home: React.FC = () => {
  return (
    <Container>
      {/* Hero Section */}
      <Box
        sx={{
          my: 4,
          textAlign: "center",
          backgroundImage: "url(/karate-banner.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center", // Adjust as needed
          backgroundRepeat: "no-repeat",
          height: "30vh", // Adjust the height as needed
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "common.white", // Ensure text contrast
        }}
      >
        <Typography variant="h3" gutterBottom color="common.white">
          Welcome to the Karate Competition Platform!
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          href="/register"
        >
          Join Now
        </Button>
        <Button
          sx={{ mt: 2 }}
          variant="contained"
          color="primary"
          size="small"
          component={Link}
          href="/login"
        >
          Sign in
        </Button>
      </Box>

      {/* About Section */}
      <Grid container spacing={3} sx={{ my: 4 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia
              component="img"
              height="300"
              image="/karate-demo-2.jpg"
              alt="Karate Demo"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Discover Karate
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Explore the world of Karate and join a global community of
                enthusiasts and professionals.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia
              component="img"
              height="300"
              image="/karate-demo-1.jpg"
              alt="Karate Training"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Train and Compete
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Participate in events, competitions, and get access to top-notch
                training resources.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Footer */}
      <Box sx={{ my: 4, textAlign: "center" }}>
        <Typography variant="body1">
          &copy; {new Date().getFullYear()} Karate Competition Platform
        </Typography>
      </Box>
    </Container>
  );
};

export default Home;
