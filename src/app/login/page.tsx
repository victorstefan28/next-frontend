// pages/login.tsx
"use client";
import React from "react";

import { Container } from "@mui/material";
import LoginForm from "@/components/loginform/loginform";

const LoginPage = () => {
  return (
    <Container maxWidth="sm">
      <LoginForm />
    </Container>
  );
};

export default LoginPage;
