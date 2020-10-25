import { AxiosResponse } from 'axios';

import api from 'services/api';
import { ChartInfoData, ResponseMessage } from 'interfaces';

const create = (data: ChartInfoData): Promise<AxiosResponse<ChartInfoData>> => {
  return api.post('/chart', data);
};

const update = ({
  id,
  ...others
}: ChartInfoData): Promise<AxiosResponse<ResponseMessage>> => {
  return api.put(`/chart/${id}`, { ...others });
};

const get = (): Promise<AxiosResponse<ChartInfoData[]>> => {
  return api.get('/chart');
};

const remove = (id: number): Promise<AxiosResponse<ResponseMessage>> => {
  return api.delete(`/chart/${id}`);
};

export { create, update, get, remove };
