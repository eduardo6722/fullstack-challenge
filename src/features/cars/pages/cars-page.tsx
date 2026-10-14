import Layout from "@/components/ui/layout";
import CarsList from "../components/cars-list";
import { useGetCars } from "../hooks/use-get-cars";
import Filters from "../components/filters";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import { useEffect } from "react";

export default function CarsPage() {
  const { data, error, loading, setFilters, refetch } = useGetCars();

  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get("refresh") === "true") {
      refetch();

      setSearchParams(
        (prev) => {
          const params = new URLSearchParams(prev);
          params.delete("refresh");
          return params;
        },
        { replace: true },
      );
    }
  }, [refetch, searchParams, setSearchParams]);

  return (
    <Layout>
      <Box>
        <Typography component="h1" variant="h4" sx={{ mb: 1 }}>
          Cars
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Browse your cars, filter by model or year, and add a new car.
        </Typography>
      </Box>
      <Filters setFilters={setFilters} />
      <Button
        onClick={() => navigate("/cars/new")}
        variant="contained"
        color="primary"
        sx={{
          alignSelf: "flex-start",
        }}
      >
        + Create a new car
      </Button>
      <CarsList data={data} loading={loading} />
      <span>{error?.message}</span>
    </Layout>
  );
}
