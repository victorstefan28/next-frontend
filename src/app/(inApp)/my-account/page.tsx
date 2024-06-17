"use client";
import AthleteInfo from "@/components/my-account/athleteInfo";
import CoachInfo from "@/components/my-account/coachInfo";
import { useLoading } from "@/hooks/useLoading";
import { IAthlete } from "@/types/athlete";
import { ICoach } from "@/types/coach";
import apiCall, { refreshTokenFunc } from "@/utils/api";
import extractErrorMessage from "@/utils/errorHandler";
import { HttpMethod } from "@/utils/httpMethods";
import { parseJwt } from "@/utils/isJwtExpired";
import { Check, X } from "@mui/icons-material";
import { Typography } from "@mui/material";

import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const MyAccountPage = () => {
  const [userRole, setUserRole] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const [identityUserInfo, setIdentityUserInfo] = useState<any>({});

  const { incrementLoading, decrementLoading } = useLoading();
  const fetchData = async () => {
    const token = localStorage.getItem("accessToken");
    incrementLoading();
    if (token) {
      let decodedToken = parseJwt(token);
      if (!decodedToken) {
        const refreshResult = await refreshTokenFunc();
        console.log(refreshResult);
        decodedToken = refreshResult;
      }
      setIdentityUserInfo(decodedToken);
      console.log(decodedToken);
      setUserRole(decodedToken.role);
      const role = decodedToken.role;
      try {
        if (role == "Coach") {
          apiCall("/coach/me", HttpMethod.GET).then((response) => {
            setUserInfo(response);
          });
          apiCall("coach/me/requests-join", HttpMethod.GET).then(
            (response: any[]) => {
              setUserInfo((prev) => {
                return {
                  ...prev,
                  requests: response.filter(
                    (r) => r.requestStatus === "PENDING"
                  ),
                };
              });
            }
          );
          apiCall("coach/me/requests-participate", HttpMethod.GET).then(
            (response: any[]) => {
              setUserInfo((prev) => {
                return {
                  ...prev,
                  participate: response.filter(
                    (r) => r.requestStatus === "PENDING"
                  ),
                };
              });
            }
          );
        } else if (role == "Athlete") {
          apiCall("/athlete/me", HttpMethod.GET).then((response) => {
            setUserInfo(response);
          });
        }
      } catch (error) {
        const errorMessages = extractErrorMessage(error);
        errorMessages.forEach((message) => toast.error(message));
      } finally {
        decrementLoading();
      }
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleAddClub = async (club: { name: string }) => {
    try {
      await apiCall("/club", HttpMethod.POST, club);
      fetchData();
    } catch (error) {
      const errorMessages = extractErrorMessage(error);
      errorMessages.forEach((message) => toast.error(message));
    }
  };
  const handleEditClub = async (club: { name: string }) => {
    try {
      await apiCall("/club", HttpMethod.PATCH, club);
      fetchData();
    } catch (error) {
      const errorMessages = extractErrorMessage(error);
      errorMessages.forEach((message) => toast.error(message));
    }
  };

  const handleDeleteClub = async () => {
    try {
      await apiCall("/club", HttpMethod.DELETE);
      fetchData();
    } catch (error) {
      const errorMessages = extractErrorMessage(error);
      errorMessages.forEach((message) => toast.error(message));
    }
  };
  const handleAddRequest = async (username: string) => {
    try {
      await apiCall("/Request/join/coach/" + username, HttpMethod.POST);
      fetchData();
    } catch (error) {
      const errorMessages = extractErrorMessage(error);
      errorMessages.forEach((message) => toast.error(message));
    }
  };

  return (
    <div>
      <h1>My Account</h1>
      Username: {identityUserInfo?.unique_name}
      <br />
      <Typography>
        Email confirmed:{" "}
        {identityUserInfo?.EmailConfirmed ? (
          <>
            <Check />
          </>
        ) : (
          <>
            <X />
          </>
        )}
      </Typography>
      <Typography>Role: {userRole}</Typography>
      {userRole === "Coach" && userInfo && (
        <CoachInfo
          onAdd={handleAddClub}
          onEdit={handleEditClub}
          onDelete={handleDeleteClub}
          coach={userInfo as ICoach}
        />
      )}
      {userRole === "Athlete" && userInfo && (
        <AthleteInfo onAdd={handleAddRequest} athlete={userInfo as IAthlete} />
      )}
    </div>
  );
};

export default MyAccountPage;
