// components/navbar/navbar.tsx
"use client";
import React from "react";
import Link from "next/link";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import theme from "@/theme/theme";
import { useAuth } from "@/contexts/AuthContext";
import { DoorBack, DoorBackOutlined } from "@mui/icons-material";

const useStyles = makeStyles({
  appBar: {
    backgroundColor: theme.palette.primary.dark,
  },
  title: {
    flexGrow: 1,
  },
  link: {
    textDecoration: "none",
    color: "white",
    marginRight: theme.spacing(2),
    "&:hover": {
      textDecoration: "underline",
    },
  },
});

const Navbar = () => {
  const classes = useStyles();
  const { clearTokens } = useAuth();

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Karate Platform
        </Typography>
        <Button
          onClick={() => clearTokens()}
          color="inherit"
          className={classes.link}
        >
          <DoorBackOutlined />
          Sign-out
        </Button>
        <Link href="/home" passHref>
          <Button color="inherit" className={classes.link}>
            Dashboard
          </Button>
        </Link>
        <Link href="/my-account" passHref>
          <Button color="inherit" className={classes.link}>
            My Account
          </Button>
        </Link>
        <Link href="/competitions" passHref>
          <Button color="inherit" className={classes.link}>
            Competitions
          </Button>
        </Link>
        {/* Add other links as needed */}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
