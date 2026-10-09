type Car = {
  id: string;
  make: string;
  model: string;
  year: string;
  color: string;
  mobile: string;
  tablet: string;
  desktop: string;
};

type CarFilters = {
  model?: string;
  year?: number;
  sortBy?: string;
};

type CreateCarInput = Car;
