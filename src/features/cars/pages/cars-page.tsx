import Layout from "@/components/ui/layout";
import CarsList from "../components/cars-list";
import { useGetCars } from "../hooks/use-get-cars";
import Filters from "../components/filters";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@mui/material";
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
      <Filters setFilters={setFilters} />
      <Button
        onClick={() => navigate("/cars/new")}
        variant="contained"
        color="primary"
        sx={{
          maxWidth: "220px",
        }}
      >
        + Create a new car
      </Button>
      <CarsList data={data} loading={loading} />
      <span>{error?.message}</span>
    </Layout>
  );
}
