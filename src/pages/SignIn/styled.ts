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

    @media (max-width: 768px) {
      margin: 6px 0 !important;
    }
  }
`;
