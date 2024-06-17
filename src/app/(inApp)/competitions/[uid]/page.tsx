// pages/competition/[id].tsx
"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Box, CircularProgress } from "@mui/material";
import { HttpMethod } from "@/utils/httpMethods";
import { ICompetition, IParticipant } from "@/types/competition";
import apiCall from "@/utils/api";
import CompetitionDetails from "@/components/competition/competitiondetails";

const CompetitionPage = ({ params }: { params: { uid: string } }) => {
  const router = usePathname();

  const [competition, setCompetition] = useState<ICompetition | null>(null);
  const [loading, setLoading] = useState(false);
  const fetchCompetition = async () => {
    setLoading(true);
    try {
      const data: ICompetition = await apiCall(
        `/competition/${params.uid}`,
        HttpMethod.GET
      );
      setCompetition(data);
      apiCall(`/competition/${params.uid}/athletes`, HttpMethod.GET).then(
        (res: IParticipant[]) => {
          setCompetition(
            (prev) => ({ ...prev, participants: res } as ICompetition)
          );
        }
      );
    } catch (error) {
      console.error("Failed to fetch competition", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (params.uid) {
      fetchCompetition();
    }
  }, [params.uid]);

  if (loading) {
    return <CircularProgress />;
  }

  if (!competition) {
    return <Box>No competition found.</Box>;
  }

  return (
    <CompetitionDetails
      competition={competition}
      fetchData={fetchCompetition}
    />
  );
};

export default CompetitionPage;
