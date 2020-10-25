import styled, { css } from 'styled-components';

interface ContainerProps {
  error?: boolean;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 280px;
  border-radius: 6px;

  @media (max-width: 768px) {
    margin: 12px !important;
  }

  ${(props) =>
    props.error &&
    css`
      border: 2px solid #ed2945;
    `}

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
`;
