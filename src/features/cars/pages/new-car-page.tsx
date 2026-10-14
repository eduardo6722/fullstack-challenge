import Layout from "@/components/ui/layout";
import CreateCarForm from "../components/create-car-form";
import { Box, Button, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

export default function NewCarPage() {
  const navigate = useNavigate();

  const goHome = (refresh?: boolean) => {
    navigate(refresh ? "/?refresh=true" : "/");
  };

  return (
    <Layout
      maxWidth="sm"
      sx={{
        minHeight: "100vh",
      }}
    >
      <Button
        startIcon={<ArrowBackIcon />}
        sx={{ alignSelf: "flex-start" }}
        onClick={() => goHome()}
      >
        Back to list
      </Button>
      <Box>
        <Typography component="h1" variant="h4" sx={{ mb: 1 }}>
          Add a new car
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Enter the car details and select an image for each screen size.
        </Typography>
      </Box>
      <CreateCarForm onCreate={() => goHome(true)} />
    </Layout>
  );
}
