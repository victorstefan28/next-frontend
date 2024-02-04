// components/RegisterForm.tsx
"use client";
import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Paper,
  Select,
  MenuItem,
} from "@mui/material";
import apiCall from "@/utils/api";
import { HttpMethod } from "@/utils/httpMethods";
import extractErrorMessage from "@/utils/errorHandler";
import { toast } from "react-toastify";

enum RegisterType {
  Null = "",
  Coach = "coach",
  Athlete = "athlete",
  User = "user",
}

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [registerType, setRegisterType] = useState<RegisterType>(
    RegisterType.User
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let endpoint = "/register";
    switch (registerType) {
      case RegisterType.Coach:
        endpoint = "/register/coach";
        break;
      case RegisterType.Athlete:
        endpoint = "/register/athlete";
        break;
    }

    try {
      apiCall(endpoint, HttpMethod.POST, {
        username,
        email,
        password,
        name,
      }).then(() => {
        toast.success("Account successfully created");
      });
    } catch (error) {
      const errorMessages = extractErrorMessage(error);
      errorMessages.forEach((message) => toast.error(message));
    }
  };

  return (
    <Paper style={{ padding: 20 }}>
      <Typography variant="h6" gutterBottom>
        Register
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={registerType}
              label="Register as"
              onChange={(e) => setRegisterType(e.target.value as RegisterType)}
            >
              <MenuItem value={RegisterType.Athlete}>Athlete</MenuItem>
              <MenuItem value={RegisterType.Coach}>Coach</MenuItem>
              <MenuItem value={RegisterType.User}>User</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Register
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default RegisterForm;
