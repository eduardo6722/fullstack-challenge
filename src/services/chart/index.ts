import { AxiosResponse } from 'axios';

import api from 'services/api';
import { ChartInfoData, ResponseMessage } from 'interfaces';
import { commonHeader } from 'services/common';

const create = (data: ChartInfoData): Promise<AxiosResponse<ChartInfoData>> => {
  return api.post('/chart', data, {
    headers: commonHeader(),
  });
};

const update = ({
  id,
  ...others
}: ChartInfoData): Promise<AxiosResponse<ResponseMessage>> => {
  return api.put(
    `/chart/${id}`,
    { ...others },
    {
      headers: commonHeader(),
    }
  );
};

const get = (): Promise<AxiosResponse<ChartInfoData[]>> => {
  return api.get('/chart', {
    headers: commonHeader(),
  });
};

const remove = (id: number): Promise<AxiosResponse<ResponseMessage>> => {
  return api.delete(`/chart/${id}`, {
    headers: commonHeader(),
  });
};

export { create, update, get, remove };
