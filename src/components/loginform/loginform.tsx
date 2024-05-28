// components/LoginForm.tsx
import React, { useState, useContext } from "react";
import { TextField, Button, Grid, Typography, Paper } from "@mui/material";

import apiCall from "@/utils/api"; // Adjust the import path according to your project structure
import { useAuth } from "@/contexts/AuthContext";
import { HttpMethod } from "@/utils/httpMethods";
import { useRouter } from "next/navigation";
import extractErrorMessage from "@/utils/errorHandler";
import { toast } from "react-toastify";
import Link from "next/link";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setTokens } = useAuth();
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await apiCall("/auth/login", HttpMethod.POST, {
        username: email,
        password,
      });
      setTokens(response.accessToken, response.refreshToken);
      router.push("/home");
    } catch (error) {
      const errorMessages = extractErrorMessage(error);
      errorMessages.forEach((message: any) => toast.error(message));
    }
  };

  return (
    <Paper style={{ padding: 20 }}>
      <Typography variant="h6" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email or username"
              type="text"
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
            <Typography variant="caption" gutterBottom>
              Don't have an account? <Link href="/register">Register</Link>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Login
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default LoginForm;
