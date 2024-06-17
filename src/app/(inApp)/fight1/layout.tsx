import Navbar from "@/components/navbar/navbar";
import { Container } from "@mui/material";

export default function CompetitionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <Navbar />
      <Container sx={{ width: "100vw" }}>{children}</Container>
    </section>
  );
}
