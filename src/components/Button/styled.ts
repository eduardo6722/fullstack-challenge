import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  width: 100%;
  max-width: 220px;
  button {
    width: 100%;
    max-width: 220px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 60px;
    border: 3px solid #fff;
    color: #fff;
    font-size: 24px;
    font-weight: bold;
    background: #00b8e2;
    transition: 0.3s all;

    &:hover {
      background: ${shade(0.2, '#00b8e2')};
    }
  }
`;
