import { Box, Card } from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

type CarProps = Car;

export default function Car({
  id,
  model,
  make,
  year,
  color,
  desktop,
  tablet,
  mobile,
}: CarProps) {
  return (
    <Card key={id} sx={{ flex: 1 }}>
      <CardHeader title={model} subheader={make} />
      <CardMedia
        component="picture"
        sx={{
          display: "block",
          width: "100%",
        }}
      >
        <source media="(max-width: 639px)" srcSet={mobile} />
        <source media="(max-width: 1023px)" srcSet={tablet} />
        <Box
          component="img"
          src={desktop}
          alt="media"
          sx={{
            width: "100%",
            height: "auto",
          }}
        />
      </CardMedia>
      <CardContent>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {year} - {color}
        </Typography>
      </CardContent>
    </Card>
  );
}
