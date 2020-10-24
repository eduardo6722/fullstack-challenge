import React from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { PieChart } from 'react-minimal-pie-chart';

import { useChartContext } from 'context/chart/ChartContext';

import Input from 'components/Input';
import Button from 'components/Button';

import { ChartData, ChartInfoData } from 'interfaces';

import {
  Form,
  Container,
  ChartLegend,
  DataContainer,
  ChartContainer,
  TableContainer,
  ChartLegendItem,
} from './styled';

interface Map {
  [key: string]: string;
}

const Dashboard: React.FC = () => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editingId, setEditingId] = React.useState(0);
  const [editingColor, setEditingColor] = React.useState('');
  const { register, handleSubmit, setValue, reset } = useForm<ChartInfoData>();

  const {
    data,
    handleAddChartData,
    handleEditChartItem,
    handleRemoveChartItem,
  } = useChartContext();

  const onSubmit = React.useCallback(
    (values: any) => {
      if (isEditing) {
        handleEditChartItem({ id: editingId, color: editingColor, ...values });
        setIsEditing(false);
      } else {
        handleAddChartData(values);
      }
      reset();
    },
    [
      reset,
      isEditing,
      editingId,
      editingColor,
      handleAddChartData,
      handleEditChartItem,
    ]
  );

  const parsedChartData = React.useCallback(
    (values: ChartInfoData[]): ChartData[] => {
      return values?.map(
        ({ id, firstName, lastName, participation, color }) => {
          const newItem: ChartData = {
            id,
            title: `${firstName} ${lastName}`,
            color,
            value: Number(participation),
          };
          return newItem;
        }
      );
    },
    []
  );

  const editItem = React.useCallback(
    (id: number) => {
      const editing = data.find((item) => item.id === id);

      if (editing) {
        const { firstName, lastName, participation, color } = editing;

        setEditingId(id);
        setEditingColor(color as string);
        setValue('firstName', firstName);
        setValue('lastName', lastName);
        setValue('participation', participation);

        setIsEditing(true);
      }
    },
    [data, setValue]
  );

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          name="firstName"
          register={register({ required: true })}
          placeholder="First name"
        />
        <Input
          type="text"
          name="lastName"
          register={register({ required: true })}
          placeholder="Last name"
        />
        <Input
          type="number"
          name="participation"
          register={register({ required: true })}
          placeholder="Participation"
        />
        <Button type="submit">{isEditing ? 'SAVE' : 'SEND'}</Button>
      </Form>
      <article>
        <h1>DATA</h1>
        <p>Check the statistics and data</p>
      </article>
      <DataContainer>
        {data?.length ? (
          <>
            <TableContainer>
              <table>
                <thead>
                  <tr>
                    <th />
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th align="center">Participation</th>
                    <th>Options</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.map(({ id, firstName, lastName, participation }) => (
                    <tr key={id}>
                      <td>{id}</td>
                      <td>{firstName}</td>
                      <td>{lastName}</td>
                      <td align="center">{`${participation}%`}</td>
                      <td>
                        <FaEdit
                          size={20}
                          onClick={() => editItem(id as number)}
                        />
                        <FaTrashAlt
                          onClick={() => handleRemoveChartItem(id as number)}
                          size={20}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </TableContainer>
            <ChartContainer>
              <PieChart
                className="pie-chart"
                lineWidth={50}
                data={parsedChartData(data) as any}
              />
              <ChartLegend>
                <div>
                  {parsedChartData(data)?.map(({ id, title, color }) => (
                    <ChartLegendItem key={id} color={color as string}>
                      <div />
                      <span>{title}</span>
                    </ChartLegendItem>
                  ))}
                </div>
              </ChartLegend>
            </ChartContainer>
          </>
        ) : (
          <h1>No data yet</h1>
        )}
      </DataContainer>
    </Container>
  );
};

export default Dashboard;
