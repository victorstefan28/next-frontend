// pages/register.tsx
"use client";
import React from "react";

import { Container } from "@mui/material";
import RegisterForm from "@/components/registerform/registerForm";

const RegisterPage = () => {
  return (
    <Container maxWidth="sm">
      <RegisterForm />
    </Container>
  );
};

export default RegisterPage;
