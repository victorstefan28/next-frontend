// components/navbar/navbar.tsx
"use client";
import React from "react";
import Link from "next/link";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import theme from "@/theme/theme";

const useStyles = makeStyles({
  appBar: {
    backgroundColor: theme.palette.primary.main,
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

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Karate Platform
        </Typography>
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
