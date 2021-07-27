import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  overflow-y: auto;
`;

export const ImageContainer = styled.div`
  display: flex;
  margin-top: 1%;
  align-items: center;
  justify-content: center;

  img {
    max-height: 400px;
    max-width: 300px;
  }
`;

export const ItemInformation = styled.div`
  margin-top: 2rem;

  input {
      width: 100%;
      padding: 0 1.5rem;
      height: 2rem;
      border-radius: 0.25rem;
      border: 1px solid #d7d7d7;
      background: #e7e9ee;
      font-weight: 400;
      font-size: 1rem;
      &::placeholder {
          color: var(--text-body);
      }
      & + input {
          margin-top: 1rem;
      }
  }

  button {
      width: 100%;
      margin-top:1rem;
      font-size: 1rem;
      color: #FFF;
      background: var(--blue-light);
      border: 0;
      padding: 0 2rem;
      border-radius: 0.25rem;
      height: 3rem;
      transition: filter 0.2s;
      &:hover {
          filter: brightness(0.9);
      }
  }
`;

export const FormRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FormItem = styled.div`
  margin-bottom: 2rem;
  width: 100%;

  & + div {
    padding-left: 2rem;
  }
`;
