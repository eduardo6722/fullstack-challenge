/* eslint-disable no-param-reassign */
import React from 'react';
import { toast } from 'react-toastify';

import { ChartInfoData } from 'interfaces';
import randomColor from 'utils/randomColor';

import { create, update, get, remove } from 'services/chart';

interface ChartContextData {
  data: ChartInfoData[];
  getData: () => Promise<void>;
  handleRemoveChartItem: (id: number) => Promise<void>;
  handleAddChartData: (chartInfoData: ChartInfoData) => Promise<void>;
  handleEditChartItem: (chartInfoData: ChartInfoData) => Promise<void>;
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

  const getData = React.useCallback(async () => {
    try {
      const response = await get();
      setData(response.data);
    } catch (error) {
      toast.error('Failed to get data');
    }
  }, []);

  const handleAddChartData = React.useCallback(
    async (chartData: ChartInfoData) => {
      try {
        if (isParticipationValid(data, Number(chartData.participation))) {
          toast.error('The participations amount cannot be over 100%');
        } else {
          const response = await create({ color: randomColor(), ...chartData });
          setData((prev) => [...prev, response.data]);
          toast.success('Successfully created!');
        }
      } catch (error) {
        toast.error('Failed to save data');
      }
    },
    [isParticipationValid, data]
  );

  const handleRemoveChartItem = React.useCallback(async (id: number) => {
    try {
      await remove(id);
      setData((prev) => prev.filter((item) => item.id !== id));
      toast.success('Successfully removed!');
    } catch (error) {
      toast.error('Failed to remove data');
    }
  }, []);

  const handleEditChartItem = React.useCallback(
    async (chartInfoData: ChartInfoData) => {
      try {
        if (
          isParticipationValid(
            data.filter((item) => item.id !== chartInfoData.id),
            Number(chartInfoData.participation)
          )
        ) {
          toast.error('The participations amount cannot be over 100%');
        } else {
          await update(chartInfoData);
          setData((prev) => {
            const newData = prev.filter((item) => item.id !== chartInfoData.id);
            newData.push(chartInfoData);
            return newData;
          });
          toast.success('Successfully updated!');
        }
      } catch (error) {
        toast.error('Failed to update data');
      }
    },
    [isParticipationValid, data]
  );

  return (
    <ChartContext.Provider
      value={{
        data,
        getData,
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
