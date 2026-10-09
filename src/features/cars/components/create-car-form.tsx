import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateCar } from "../hooks/use-create-car";
import { createCarSchema } from "../schemas/create-car.schema";
import z from "zod";
import { Box, Button, Card, Typography } from "@mui/material";
import Select from "@/components/ui/select";
import { fillYears } from "../utils/fill-years";
import Error from "@/components/ui/error";
import { CAR_COLORS, CAR_CONFIGS, MAKES } from "../constants/cars";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

type CreateCartType = z.output<typeof createCarSchema>;

type CarImageValues = {
  mobile: string[];
  tablet: string[];
  desktop: string[];
};

type CreateCarForm = {
  onCreate: () => void;
};

export default function CreateCarForm({ onCreate }: CreateCarForm) {
  const [modelValues, setModelValues] = useState<string[]>([]);
  const [imageValues, setImageValues] = useState<CarImageValues>({
    mobile: [],
    tablet: [],
    desktop: [],
  });

  const { handleCreateCar, error, loading } = useCreateCar();

  const {
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createCarSchema),
    defaultValues: {
      id: uuidv4(),
    },
  });

  const onSubmit = async (data: CreateCartType) => {
    await handleCreateCar(data);
    onCreate();
  };

  const make = watch("make", "");
  const model = watch("model", "");

  useEffect(() => {
    if (!make) return;

    setModelValues(Object.keys(CAR_CONFIGS[make]));

    if (!model) return;

    console.log("all", CAR_CONFIGS[make][model]);

    const mobile = CAR_CONFIGS[make][model].filter((item: string) =>
      /mobile/i.test(item),
    );

    const tablet = CAR_CONFIGS[make][model].filter((item: string) =>
      /tablet/i.test(item),
    );

    const desktop = CAR_CONFIGS[make][model].filter((item: string) =>
      /desktop/i.test(item),
    );

    setImageValues({
      mobile,
      tablet,
      desktop,
    });
  }, [make, model]);

  console.log("models: ", modelValues);

  return (
    <Card
      sx={{
        padding: "22px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography typography="h6" mb={3}>
        Add a new car
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          maxWidth: "sm",
          gap: "22px",
        }}
      >
        <Select
          label="Make"
          values={MAKES}
          error={!!errors?.make}
          controlled={{
            name: "make",
            control,
          }}
        />
        <Select
          label="Model"
          values={modelValues}
          error={!!errors?.model}
          controlled={{
            name: "model",
            control,
          }}
        />
        <Select
          label="Year"
          values={fillYears()}
          error={!!errors?.year}
          controlled={{
            name: "year",
            control,
          }}
        />
        <Select
          label="Color"
          values={CAR_COLORS}
          error={!!errors?.color}
          controlled={{
            name: "color",
            control,
          }}
        />
        <Select
          label="Mobile"
          values={imageValues.mobile}
          error={!!errors?.mobile}
          controlled={{
            name: "mobile",
            control,
          }}
        />
        <Select
          label="Tablet"
          values={imageValues.tablet}
          error={!!errors?.tablet}
          controlled={{
            name: "tablet",
            control,
          }}
        />
        <Select
          label="Desktop"
          values={imageValues.desktop}
          error={!!errors?.desktop}
          controlled={{
            name: "desktop",
            control,
          }}
        />
        <Error message={error?.message || error?.cause?.message} />
        <Button variant="contained" type="submit" loading={loading}>
          Save
        </Button>
      </Box>
    </Card>
  );
}
