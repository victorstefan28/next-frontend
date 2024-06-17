import Navbar from "@/components/navbar/navbar";
import theme from "@/theme/theme";
import { Container, CssBaseline, ThemeProvider } from "@mui/material";

export default function AccountLayout({
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
