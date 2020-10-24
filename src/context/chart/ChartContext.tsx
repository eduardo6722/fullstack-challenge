/* eslint-disable no-param-reassign */
import React from 'react';
import { toast } from 'react-toastify';

import { ChartInfoData } from 'interfaces';
import randomColor from 'utils/randomColor';

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

  const isParticipationValid = React.useCallback(
    (list: ChartInfoData[], participation: number) =>
      list?.reduce((acc, curr) => {
        acc += Number(curr.participation);
        return acc;
      }, 0) +
        Number(participation) >
      100,
    []
  );

  const handleAddChartData = React.useCallback(
    ({ participation, ...others }: ChartInfoData) => {
      if (isParticipationValid(data, Number(participation))) {
        toast.error('The participations amount cannot be over 100%');
      } else {
        setData((prev) => [
          ...prev,
          {
            ...others,
            id: Math.floor(Math.random() * (10000 - 1)),
            color: randomColor(),
            participation: Number(participation),
          },
        ]);
      }
    },
    [isParticipationValid, data]
  );

  const handleRemoveChartItem = React.useCallback(
    (id: number) => setData((prev) => prev.filter((item) => item.id !== id)),
    []
  );

  const handleEditChartItem = React.useCallback(
    (chartInfoData: ChartInfoData) => {
      if (
        isParticipationValid(
          data.filter((item) => item.id !== chartInfoData.id),
          Number(chartInfoData.participation)
        )
      ) {
        toast.error('The participations amount cannot be over 100%');
      } else {
        setData((prev) => {
          const newData = prev.filter((item) => item.id !== chartInfoData.id);
          newData.push(chartInfoData);
          return newData;
        });
      }
    },
    [isParticipationValid, data]
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
