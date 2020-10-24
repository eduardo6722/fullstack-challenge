import { shade } from 'polished';
import styled from 'styled-components';

interface ChartLegendItemProps {
  color: string;
}

export const Container = styled.div`
  padding: 12px;

  article {
    width: 100%;
    display: flex;
    height: 200px;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    h1 {
      text-align: center;
      display: block;
      font-size: 36px;
      color: #394b50;
      font-weight: bolder;
    }

    p {
      text-align: center;
      color: #394b50;
      font-size: 18px;
    }
  }
`;

export const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px;
  width: 100%;
  min-height: 160px;
  background-color: #00b8e2;
  display: flex;
  flex-wrap: wrap;
  box-shadow: 0px 0px 20px -5px #111;
  border-radius: 12px;

  div {
    margin: 12px;
  }

  @media (max-width: 768px) {
    div {
      margin: 0;
    }
  }

  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

export const DataContainer = styled.div`
  width: 100%;
  display: flex;
  min-height: 460px;
  box-shadow: 0px 0px 20px -5px #111;
  border-radius: 12px;
  padding: 12px;

  h1 {
    font-size: 36px;
    color: #394b50;
    font-weight: bolder;
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const TableContainer = styled.section`
  display: flex;
  align-items: center;
  width: 50%;
  padding: 12px;
  overflow-x: auto;

  @media (max-width: 768px) {
    width: 100%;
  }

  table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;

    td:last-child {
      text-align: center;
    }

    thead {
      th:first-child {
        width: 15px;
      }
      th:last-child {
        width: 30px;
      }
    }
  }

  tbody {
    td {
      color: #111;

      svg {
        cursor: pointer;

        & + svg {
          margin-left: 6px;
        }
      }
    }

    tr {
      transition: 0.3s all;

      &:hover {
        background: ${shade(0.1, '#00b8e2')};
        font-weight: bold;

        svg {
          color: #fff !important;
        }
      }
    }
  }

  td,
  th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
  }

  tr:nth-child(even) {
    background-color: #dddddd;
  }
`;

export const ChartContainer = styled.section`
  display: flex;
  align-items: center;
  width: 50%;
  padding: 12px;

  .pie-chart {
    width: 100%;
    max-height: 300px;
  }

  @media (max-width: 768px) {
    width: 100%;
    flex-direction: column;
  }
`;

export const ChartLegend = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  width: 50%;

  @media (max-width: 768px) {
    margin-top: 12px;
    width: 100%;
  }
`;

export const ChartLegendItem = styled.div<ChartLegendItemProps>`
  display: flex;
  align-items: center;
  width: 100%;

  & + div {
    margin-top: 4px;
  }

  div {
    width: 30px;
    height: 30px;
    background-color: ${(props) => props.color};
    border-radius: 4px;
  }

  span {
    margin-left: 6px;
    color: ${(props) => props.color};
    font-weight: bold;
  }
`;
