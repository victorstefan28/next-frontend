"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { HttpMethod } from "@/utils/httpMethods";
import apiCall from "@/utils/api";
import extractErrorMessage from "@/utils/errorHandler";
import { toast } from "react-toastify";
import {
  Grid,
  Typography,
  CircularProgress,
  Box,
  Container,
} from "@mui/material";
import { CheckCircleOutline, ErrorOutline } from "@mui/icons-material";

const ConfirmAccountPage: React.FC = () => {
  const search = useSearchParams();
  const [isConfirmed, setIsConfirmed] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    const token = search.get("token");
    if (token) {
      confirmAccount(token as string);
    } else {
      setIsLoading(false);
    }
  }, [search]);

  const confirmAccount = async (jwt: string) => {
    try {
      const response = await apiCall(
        "/auth/confirm?token=" + jwt,
        HttpMethod.PATCH
      );
      setIsConfirmed(true);
    } catch (error) {
      const errorMessages = extractErrorMessage(error);
      errorMessages.forEach((message) => toast.error(message));
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {isLoading && (
          <>
            <CircularProgress />
            <Typography variant="h6" sx={{ mt: 2 }}>
              Confirming your account...
            </Typography>
          </>
        )}
        {!isLoading && isConfirmed && (
          <Grid container justifyContent="center" alignItems="center">
            <CheckCircleOutline color="success" sx={{ fontSize: 60 }} />
            <Typography variant="h5" sx={{ mt: 2, color: "success.main" }}>
              Your account has been confirmed!
            </Typography>
          </Grid>
        )}
        {!isLoading && isError && (
          <Grid container justifyContent="center" alignItems="center">
            <ErrorOutline color="error" sx={{ fontSize: 60 }} />
            <Typography variant="h5" sx={{ mt: 2, color: "error.main" }}>
              There was an error confirming your account.
            </Typography>
          </Grid>
        )}
      </Box>
    </Container>
  );
};

export default ConfirmAccountPage;
