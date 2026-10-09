import { act, renderHook } from "@testing-library/react";
import { ApolloError, useQuery } from "@apollo/client";
import { useGetCars } from "../use-get-cars";
import { SORT_BY } from "../../constants/sort";

jest.mock("@apollo/client", () => ({
  ...jest.requireActual("@apollo/client"),
  useQuery: jest.fn(),
}));

jest.mock("@/features/cars/api/get-cars.graphql", () => ({
  __esModule: true,
  default: {},
}));

const mockedUseQuery = jest.mocked(useQuery);
const mockRefetch = jest.fn();

const cars = [
  { id: "1", make: "Audi", model: "A1", year: 2024 },
  { id: "2", make: "Audi", model: "A6", year: 2022 },
] as unknown as Car[];

const mockQuery = (
  options: {
    data?: { cars: Car[] };
    loading?: boolean;
    error?: ApolloError;
  } = {},
) => {
  mockedUseQuery.mockReturnValue({
    data: options.data ?? { cars },
    loading: options.loading ?? false,
    error: options.error,
    refetch: mockRefetch,
  } as unknown as ReturnType<typeof useQuery>);
};

describe("useGetCars", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockQuery();
  });

  it("should return cars", () => {
    const { result } = renderHook(() => useGetCars());

    expect(result.current.data).toEqual(cars);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeUndefined();
  });

  it("should return empty array when no data exists", () => {
    mockQuery({ data: { cars: [] } });

    const { result } = renderHook(() => useGetCars());

    expect(result.current.data).toEqual([]);
  });

  it("should sort cars by model ascending", () => {
    const { result } = renderHook(() => useGetCars());

    act(() => {
      result.current.setFilters({
        sortBy: SORT_BY.MODEL_ASC,
      });
    });

    expect(result.current.data.map((car) => car.model)).toEqual(["A1", "A6"]);
  });

  it("should sort cars by model descending", () => {
    const { result } = renderHook(() => useGetCars());

    act(() => {
      result.current.setFilters({
        sortBy: SORT_BY.MODEL_DESC,
      });
    });

    expect(result.current.data.map((car) => car.model)).toEqual(["A6", "A1"]);
  });

  it("should sort cars by year ascending", () => {
    const { result } = renderHook(() => useGetCars());

    act(() => {
      result.current.setFilters({
        sortBy: SORT_BY.YEAR_ASC,
      });
    });

    expect(result.current.data.map((car) => car.year)).toEqual([2022, 2024]);
  });

  it("should sort cars by year descending", () => {
    const { result } = renderHook(() => useGetCars());

    act(() => {
      result.current.setFilters({
        sortBy: SORT_BY.YEAR_DESC,
      });
    });

    expect(result.current.data.map((car) => car.year)).toEqual([2024, 2022]);
  });

  it("should preserve original order when sorting is NONE", () => {
    const { result } = renderHook(() => useGetCars());

    act(() => {
      result.current.setFilters({
        sortBy: SORT_BY.NONE,
      });
    });

    expect(result.current.data).toEqual(cars);
  });
});
