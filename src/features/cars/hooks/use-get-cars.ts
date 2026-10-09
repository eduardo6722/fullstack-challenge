import { ApolloError, useQuery } from "@apollo/client";
import GetCars from "@/features/cars/api/get-cars.graphql";
import { normalizeFilters } from "../utils/normalize-filters";
import { Dispatch, SetStateAction, useState } from "react";
import { SORT_BY } from "../constants/sort";

type UseGetCarsReturnProps = {
  data: Car[];
  loading: boolean;
  error: ApolloError | undefined;
  refetch: () => void;
  setFilters: Dispatch<SetStateAction<CarFilters | undefined>>;
};

export function useGetCars(): UseGetCarsReturnProps {
  const [filters, setFilters] = useState<CarFilters>();

  const { loading, data, error, refetch } = useQuery<{ cars: Car[] }>(GetCars, {
    variables: {
      model: normalizeFilters(filters?.model),
      year: normalizeFilters(filters?.year),
    },
  });

  const parseData = () => {
    const cars = (JSON.parse(JSON.stringify(data?.cars || [])) as Car[]) || [];

    if (!cars.length) return [];
    if (filters?.sortBy === SORT_BY.NONE) return cars;

    switch (filters?.sortBy) {
      case SORT_BY.MODEL_ASC:
        return cars?.sort((a, b) => a.model.localeCompare(b.model));
      case SORT_BY.MODEL_DESC:
        return cars?.sort((a, b) => b.model.localeCompare(a.model));
      case SORT_BY.YEAR_ASC:
        return cars?.sort((a, b) =>
          String(a.year).localeCompare(String(b.year)),
        );
      case SORT_BY.YEAR_DESC:
        return cars?.sort((a, b) =>
          String(b.year).localeCompare(String(a.year)),
        );
      default:
        return cars;
    }
  };

  return {
    setFilters,
    data: parseData(),
    refetch,
    loading,
    error,
  };
}
