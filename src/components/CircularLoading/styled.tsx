import styled from 'styled-components';

export const Container = styled.div`
  border: 6px solid #fff;
  border-radius: 50%;
  border-top: 6px solid #00b8e2;
  margin-top: 14px;
  width: 58px !important;
  height: 58px !important;
  align-self: center;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 0.6s linear infinite;

  @-webkit-keyframes spin {
    0% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
