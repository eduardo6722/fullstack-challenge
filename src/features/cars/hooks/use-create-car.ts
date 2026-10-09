import CreateCar from "@/features/cars/api/create-car.graphql";
import { ApolloError, useMutation } from "@apollo/client";

type UseCreateCarReturnProps = {
  handleCreateCar: (input: CreateCarInput) => Promise<void>;
  loading: boolean;
  error: ApolloError | undefined;
};

export function useCreateCar(): UseCreateCarReturnProps {
  const [createCar, { loading, error }] = useMutation(CreateCar);

  const handleCreateCar = async (input: CreateCarInput) => {
    await createCar({
      variables: { input },
    });
  };

  return {
    handleCreateCar,
    loading,
    error,
  };
}
