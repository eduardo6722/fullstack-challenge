import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Skeleton from "@mui/material/Skeleton";
import { Grid } from "@mui/material";

function Loading() {
  return (
    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
      <Card sx={{ flex: 1 }}>
        <CardHeader
          title={
            <Skeleton
              animation="wave"
              height={40}
              width="30%"
              style={{ marginBottom: 4 }}
            />
          }
          subheader={<Skeleton animation="wave" height={20} width="40%" />}
        />

        <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />

        <CardContent>
          <Skeleton animation="wave" height={16} width="16%" />
        </CardContent>
      </Card>
    </Grid>
  );
}

export default function SkeletonLoading() {
  return (
    <Grid container spacing={3}>
      <Loading />
      <Loading />
      <Loading />
    </Grid>
  );
}
