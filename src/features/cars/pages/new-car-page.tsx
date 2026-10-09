import Layout from "@/components/ui/layout";
import CreateCarForm from "../components/create-car-form";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function NewCarPage() {
  const navigate = useNavigate();

  const goHome = (refresh?: boolean) => {
    navigate(refresh ? "/?refresh=true" : "/");
  };

  return (
    <Layout
      sx={{
        minHeight: "100vh",
        padding: "22px",
      }}
    >
      <Button onClick={() => goHome()}>Back to list</Button>
      <CreateCarForm onCreate={() => goHome(true)} />
    </Layout>
  );
}
