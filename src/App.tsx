import { Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import router from "./components/auth/Routes";

const theme = createTheme({
  palette: {
    mode: "dark"
  }
});


function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <RouterProvider router={router} />
      </Container>
    </ThemeProvider>
  );
}

export default App;
