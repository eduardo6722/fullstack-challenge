import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 280px;

  input {
    width: 100%;
    height: 60px;
    border: none;
    padding: 22px;
    font-size: 18px;

    &::placeholder {
      color: #777;
    }

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    &[type='number'] {
      -moz-appearance: textfield;
    }
  }

  @media (max-width: 768px) {
    padding: 12px;
  }
`;
