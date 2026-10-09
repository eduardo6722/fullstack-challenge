import { renderHook, act } from "@testing-library/react";
import { ApolloError, useMutation } from "@apollo/client";
import { useCreateCar } from "../use-create-car";

jest.mock("@apollo/client", () => ({
  ...jest.requireActual("@apollo/client"),
  useMutation: jest.fn(),
}));

jest.mock("@/features/cars/api/create-car.graphql", () => ({
  __esModule: true,
  default: {},
}));

const mockedUseMutation = jest.mocked(useMutation);
const mockCreateCar = jest.fn();

const input = {
  make: "Audi",
  model: "R8",
  year: "2024",
  color: "Gray",
  mobile: "image-mobile.jpg",
  tablet: "image-tablet.jpg",
  desktop: "image-desktop.jpg",
} as CreateCarInput;

describe("useCreateCar", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockCreateCar.mockResolvedValue({ data: {} });

    mockedUseMutation.mockReturnValue([
      mockCreateCar,
      {
        loading: false,
        error: undefined,
        called: false,
        reset: jest.fn(),
      },
    ] as unknown as ReturnType<typeof useMutation>);
  });

  it("should create a car with the correct input", async () => {
    const { result } = renderHook(() => useCreateCar());

    await act(async () => {
      await result.current.handleCreateCar(input);
    });

    expect(mockCreateCar).toHaveBeenCalledWith({
      variables: { input },
    });

    expect(mockCreateCar).toHaveBeenCalledTimes(1);
  });

  it("should return loading state", () => {
    mockedUseMutation.mockReturnValue([
      mockCreateCar,
      {
        loading: true,
        error: undefined,
      },
    ] as unknown as ReturnType<typeof useMutation>);

    const { result } = renderHook(() => useCreateCar());

    expect(result.current.loading).toBe(true);
  });

  it("should return mutation error", () => {
    const error = new ApolloError({
      errorMessage: "Failed to create car",
    });

    mockedUseMutation.mockReturnValue([
      mockCreateCar,
      {
        loading: false,
        error,
      },
    ] as unknown as ReturnType<typeof useMutation>);

    const { result } = renderHook(() => useCreateCar());

    expect(result.current.error).toBe(error);
    expect(result.current.error?.message).toBe("Failed to create car");
  });

  it("should propagate mutation errors", async () => {
    const error = new Error("Network error");

    mockCreateCar.mockRejectedValue(error);

    const { result } = renderHook(() => useCreateCar());

    await expect(result.current.handleCreateCar(input)).rejects.toThrow(
      "Network error",
    );
  });
});
