import React from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { PieChart } from 'react-minimal-pie-chart';
import { yupResolver } from '@hookform/resolvers/yup';
import { FaEdit, FaTrashAlt, FaPowerOff } from 'react-icons/fa';

import { useChartContext } from 'context/chart/ChartContext';

import Input from 'components/Input';
import Button from 'components/Button';

import { useAuth } from 'context/auth/AuthContext';
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

const schema = yup.object().shape({
  firstName: yup.string().required('Fill with your first name'),
  lastName: yup.string().required('Fill with your last name'),
  participation: yup
    .number()
    .min(1, 'Participation must be over 1%')
    .max(100, 'Participation must be under 100%'),
});

const Dashboard: React.FC = () => {
  const [editingId, setEditingId] = React.useState(0);
  const [isEditing, setIsEditing] = React.useState(false);
  const [editingColor, setEditingColor] = React.useState('');
  const { register, handleSubmit, setValue, reset, errors } = useForm<
    ChartInfoData
  >({
    resolver: yupResolver(schema),
  });

  const { signOut } = useAuth();

  const {
    data,
    getData,
    handleAddChartData,
    handleEditChartItem,
    handleRemoveChartItem,
  } = useChartContext();

  React.useEffect(() => {
    getData();
  }, [getData]);

  const onSubmit = React.useCallback(
    (values: ChartInfoData) => {
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
          error={!!errors.firstName?.message}
        />
        <Input
          type="text"
          name="lastName"
          register={register({ required: true })}
          placeholder="Last name"
          error={!!errors.lastName?.message}
        />
        <Input
          type="number"
          name="participation"
          register={register({ required: true })}
          placeholder="Participation"
          error={!!errors.participation?.message}
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
                          color="#00b8e2"
                          onClick={() => editItem(id as number)}
                        />
                        <FaTrashAlt
                          size={20}
                          color="#ed2945"
                          onClick={() => handleRemoveChartItem(id as number)}
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
      <div className="logout">
        <Button onClick={signOut}>
          <FaPowerOff size={20} />
          <span>LOGOUT</span>
        </Button>
      </div>
    </Container>
  );
};

export default Dashboard;
