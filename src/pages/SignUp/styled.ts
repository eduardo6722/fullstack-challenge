import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  place-content: center;
  height: 100vh;
`;

export const Form = styled.form`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 12px;
  width: 100%;
  min-height: 160px;
  background-color: #00b8e2;
  display: flex;
  flex-wrap: wrap;

  div {
    max-width: 340px !important;

    button {
      max-width: 340px;
    }

    & + div {
      margin-top: 12px;
    }
  }

  a {
    text-decoration: none;
    margin: 12px 0;
    color: #fff;
    font-weight: 500;
    transition: 0.4s all;

    &:hover {
      font-weight: 700;
    }
  }
`;
