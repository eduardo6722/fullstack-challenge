import { ChartInfoData } from 'interfaces';
import React from 'react';
import randomColor from 'utils/randomColor';
import { number } from 'yup';

interface ChartContextData {
  data: ChartInfoData[];
  handleEditChartItem: (chartInfoData: ChartInfoData) => void;
  handleRemoveChartItem: (id: number) => void;
  handleAddChartData: (chartInfoData: ChartInfoData) => void;
}

export const ChartContext = React.createContext<ChartContextData>(
  {} as ChartContextData
);

export const ChartProvider: React.FC = ({ children }) => {
  const [data, setData] = React.useState<ChartInfoData[]>([]);

  const handleAddChartData = React.useCallback(
    ({ participation, ...others }: ChartInfoData) => {
      setData((prev) => [
        ...prev,
        {
          ...others,
          id: Math.floor(Math.random() * (10000 - 1)),
          color: randomColor(),
          participation: Number(participation),
        },
      ]);
    },
    []
  );

  const handleRemoveChartItem = React.useCallback(
    (id: number) => setData((prev) => prev.filter((item) => item.id !== id)),
    []
  );

  const handleEditChartItem = React.useCallback(
    (chartInfoData: ChartInfoData) => {
      setData((prev) => {
        const newData = prev.filter((item) => item.id !== chartInfoData.id);
        newData.push(chartInfoData);
        return newData;
      });
    },
    []
  );

  return (
    <ChartContext.Provider
      value={{
        data,
        handleAddChartData,
        handleEditChartItem,
        handleRemoveChartItem,
      }}
    >
      {children}
    </ChartContext.Provider>
  );
};

export function useChartContext(): ChartContextData {
  const context = React.useContext(ChartContext);

  if (!context) {
    throw new Error('useChartContext must be within its context');
  }

  return context;
}
