import Search from "@/components/ui/search";
import Select from "@/components/ui/select";
import { fillYears } from "../utils/fill-years";
import { Dispatch, SetStateAction } from "react";
import Flex from "@/components/ui/flex";
import { SORT_BY_OPTIONS } from "../constants/sort";

type FiltersProps = {
  setFilters: Dispatch<SetStateAction<CarFilters | undefined>>;
};

export default function Filters({ setFilters }: FiltersProps) {
  const handleSetFilters = (
    key: "model" | "year" | "sortBy",
    value: string,
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <Flex>
      <Search
        placeholder="Model"
        variant="outlined"
        handleChange={(value) => handleSetFilters("model", value)}
      />
      <Select
        label="year"
        variant="outlined"
        values={fillYears()}
        defaultValue="All"
        handleChange={(value) => handleSetFilters("year", value)}
      />
      <Select
        label="Sort by"
        variant="outlined"
        defaultValue="None"
        values={SORT_BY_OPTIONS}
        handleChange={(value) => handleSetFilters("sortBy", value)}
      />
    </Flex>
  );
}
