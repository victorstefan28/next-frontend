"use client";
import {
  createTheme,
  ThemeProvider,
  Grid,
  Typography,
  Button,
  TextField,
  Divider,
  Card,
} from "@mui/material";
import { useState, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./ActionLog.css";
interface Fighter {
  name: string;
  points: number;
  kicks: { [key: string]: number };
}

interface Kick {
  points: { [key: string]: number };
  quality_factor: number;
  target_body_parts: string[];
}

interface Time {
  minutes: number;
  seconds: number;
}

const kicksData = {
  kicks: {
    mae_geri: {
      points: {
        ippon: 1.0,
        waza_ari: 0.5,
        yuko: 0.33,
      },
      quality_factor: 0.8,
      target_body_parts: ["abdomen", "chest", "face"],
    },
    yoko_geri: {
      points: {
        ippon: 1.0,
        waza_ari: 0.5,
        yuko: 0.33,
      },
      quality_factor: 0.9,
      target_body_parts: ["abdomen", "chest", "face"],
    },
    mawashi_geri: {
      points: {
        ippon: 1.0,
        waza_ari: 0.5,
        yuko: 0.33,
      },
      quality_factor: 0.85,
      target_body_parts: ["abdomen", "chest", "face"],
    },
    ushiro_geri: {
      points: {
        ippon: 1.0,
        waza_ari: 0.5,
        yuko: 0.33,
      },
      quality_factor: 0.9,
      target_body_parts: ["abdomen", "chest"],
    },
    ura_mawashi_geri: {
      points: {
        ippon: 1.0,
        waza_ari: 0.5,
        yuko: 0.33,
      },
      quality_factor: 0.88,
      target_body_parts: ["face", "head"],
    },
  },
};

const theme = createTheme({
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
  },
});

const LiveFightPage = () => {
  const [fighter1, setFighter1] = useState<Fighter>({
    name: "John Doe",
    points: 0,
    kicks: {},
  });
  const [fighter2, setFighter2] = useState<Fighter>({
    name: "Jane Doe",
    points: 0,
    kicks: {},
  });

  const [time, setTime] = useState<Time>({ minutes: 0, seconds: 0 });
  const [isRunning, setIsRunning] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [chatLog, setChatLog] = useState<string[]>([]);
  const [actionLog, setActionLog] = useState<string[]>([]);
  const [statistics, setStatistics] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    let intervalId: number;

    if (isRunning) {
      intervalId = window.setInterval(() => {
        if (time.seconds === 59) {
          setTime({ minutes: time.minutes + 1, seconds: 0 });
        } else {
          setTime({ minutes: time.minutes, seconds: time.seconds + 1 });
        }
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isRunning, time]);

  useEffect(() => {
    let simulateIntervalId: number;

    if (isSimulating) {
      simulateIntervalId = window.setInterval(() => {
        handleSimulate();
      }, 1000);
    }
    setIsRunning(isSimulating);

    return () => {
      clearInterval(simulateIntervalId);
    };
  }, [isSimulating]);

  const handleSendMessage = () => {
    setChatLog([...chatLog, chatMessage]);
    setChatMessage("");
  };

  const getRandomKickType = () => {
    const kickTypes = ["ippon", "waza_ari", "yuko"];
    return kickTypes[Math.floor(Math.random() * kickTypes.length)];
  };

  const getRandomKick = () => {
    const kickNames = Object.keys(kicksData.kicks);
    return kickNames[Math.floor(Math.random() * kickNames.length)];
  };

  const getRandomBodyPart = (kick: string) => {
    const bodyParts =
      kicksData.kicks[kick as keyof typeof kicksData.kicks].target_body_parts;
    return bodyParts[Math.floor(Math.random() * bodyParts.length)];
  };

  const handleScorePoint = (
    fighter: "fighter1" | "fighter2",
    kick: string,
    kickType: string,
    bodyPart: string
  ) => {
    const kickData = kicksData.kicks[kick as keyof typeof kicksData.kicks];

    if (kickData) {
      const points = kickData.points[kickType as keyof typeof kickData.points];

      if (fighter === "fighter1") {
        setFighter1((prevFighter1) => {
          const newPoints = prevFighter1.points + points;
          const newKicks = {
            ...prevFighter1.kicks,
            [kick]: (prevFighter1.kicks[kick] || 0) + 1,
          };
          return { ...prevFighter1, points: newPoints, kicks: newKicks };
        });
      } else {
        setFighter2((prevFighter2) => {
          const newPoints = prevFighter2.points + points;
          const newKicks = {
            ...prevFighter2.kicks,
            [kick]: (prevFighter2.kicks[kick] || 0) + 1,
          };
          return { ...prevFighter2, points: newPoints, kicks: newKicks };
        });
      }

      setActionLog((prevActionLog) => [
        ...prevActionLog,
        `${
          fighter === "fighter1" ? fighter1.name : fighter2.name
        } scored ${kickType} with ${kick} kick to ${bodyPart}`,
      ]);

      setStatistics((prevStatistics) => ({
        ...prevStatistics,
        [bodyPart]: (prevStatistics[bodyPart] || 0) + 1,
      }));
    }
  };

  const handleSimulate = () => {
    const kick = getRandomKick();
    const kickType = getRandomKickType();
    const bodyPart = getRandomBodyPart(kick);

    handleScorePoint(
      Math.random() < 0.5 ? "fighter1" : "fighter2",
      kick,
      kickType,
      bodyPart
    );
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsSimulating(false);
    setTime({ minutes: 0, seconds: 0 });
    setFighter1({ name: "John Doe", points: 0, kicks: {} });
    setFighter2({ name: "Jane Doe", points: 0, kicks: {} });
    setActionLog([]);
    setStatistics({});
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={2} sx={{ padding: 2 }}>
        {/* Fighter 1 info */}
        <Grid item xs={4}>
          <Card sx={{ padding: 2 }}>
            <Typography variant="h4">{fighter1.name}</Typography>
            <Typography variant="h6">Points: {fighter1.points}</Typography>
            {Object.keys(kicksData.kicks).map((kick) => (
              <Button
                key={kick}
                variant="contained"
                color="primary"
                onClick={() =>
                  handleScorePoint(
                    "fighter1",
                    kick,
                    getRandomKickType(),
                    getRandomBodyPart(kick)
                  )
                }
              >
                {kick}
              </Button>
            ))}
          </Card>
        </Grid>

        {/* Timer and controls */}
        <Grid item xs={4} sx={{ textAlign: "center" }}>
          <Typography variant="h2">
            {time.minutes.toString().padStart(2, "0")}:
            {time.seconds.toString().padStart(2, "0")}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setIsRunning(true)}
          >
            Start
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setIsRunning(false)}
          >
            Stop
          </Button>
          <Button variant="contained" color="error" onClick={handleReset}>
            Reset
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => setIsSimulating(!isSimulating)}
          >
            {isSimulating ? "Stop Simulate" : "Start Simulate"}
          </Button>

          {/* Action log */}
          <Grid item xs={12} sx={{ marginTop: 2 }}>
            <Typography variant="h5">Action Log:</Typography>
            <div
              style={{
                maxHeight: "200px",
                overflow: "scroll",
                display: "flex",
                flexDirection: "column-reverse",
              }}
            >
              <TransitionGroup>
                {actionLog.map((action, index) => (
                  <CSSTransition key={index} timeout={1000} classNames="fade">
                    <Typography>{action}</Typography>
                  </CSSTransition>
                ))}
              </TransitionGroup>
            </div>
          </Grid>
        </Grid>

        {/* Fighter 2 info */}
        <Grid item xs={4}>
          <Card sx={{ padding: 2 }}>
            <Typography variant="h4">{fighter2.name}</Typography>
            <Typography variant="h6">Points: {fighter2.points}</Typography>
            {Object.keys(kicksData.kicks).map((kick) => (
              <Button
                key={kick}
                variant="contained"
                color="primary"
                onClick={() =>
                  handleScorePoint(
                    "fighter2",
                    kick,
                    getRandomKickType(),
                    getRandomBodyPart(kick)
                  )
                }
              >
                {kick}
              </Button>
            ))}
          </Card>
        </Grid>

        {/* Chat log */}
        <Grid item xs={12} sx={{ marginTop: 2 }}>
          <Divider />
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Typography variant="h5">Chat Log:</Typography>
              {chatLog.map((message, index) => (
                <Typography key={index}>{message}</Typography>
              ))}
              <TextField
                fullWidth
                value={chatMessage}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setChatMessage(e.target.value)
                }
                placeholder="Type a message..."
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleSendMessage}
              >
                Send
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h5">Statistics:</Typography>
              {Object.keys(statistics).map((bodyPart, index) => (
                <Typography key={index}>
                  {bodyPart}: {statistics[bodyPart]}
                </Typography>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default LiveFightPage;
