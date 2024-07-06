import { PacmanLoader } from "react-spinners";

const override = {
  display: "block",
  margin: "100px auto",
};

interface LoadingSpinnerProps {
  isLoading: boolean;
}

const LoadingSpinner = ({ isLoading }: LoadingSpinnerProps) => {
  return (
    <PacmanLoader
      color="#4338ca"
      loading={isLoading}
      cssOverride={override}
      size={100}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};

export default LoadingSpinner;
