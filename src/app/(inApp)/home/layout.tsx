import Navbar from "@/components/navbar/navbar";
import theme from "@/theme/theme";
import { Container, ThemeProvider } from "@mui/material";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <ThemeProvider theme={theme}>
        <Navbar />
        <Container
          sx={{
            width: "100vw",
          }}
        >
          {children}
        </Container>
      </ThemeProvider>
    </section>
  );
}
