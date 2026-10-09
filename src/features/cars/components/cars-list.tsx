import { Grid } from "@mui/material";
import Car from "./car";
import SkeletonLoading from "./skeleton-loading";

type CarsListProps = {
  data: Car[];
  loading: boolean;
};

export default function CarsList({ data, loading }: CarsListProps) {
  if (loading) return <SkeletonLoading />;

  return (
    <Grid container spacing={3}>
      {data?.map((car, index) => (
        <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}>
          <Car {...car}>{index + 1}</Car>
        </Grid>
      ))}
    </Grid>
  );
}
