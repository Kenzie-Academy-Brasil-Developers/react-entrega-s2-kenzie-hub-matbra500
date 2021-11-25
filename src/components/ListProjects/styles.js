import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90vw;
  max-width: 430px;
  height: 350px;
  border-radius: 5px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.12), 0 2px 2px rgba(0, 0, 0, 0.12),
    0 4px 4px rgba(0, 0, 0, 0.12), 0 8px 8px rgba(0, 0, 0, 0.12),
    0 16px 16px rgba(0, 0, 0, 0.12);

  @media (min-width: 900px) {
    height: 500px;
  }
`;

export const Header = styled.div`
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  padding-bottom:10px;

  .list-title {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 16px;
    width: 100%;
    height: 100%;
    font-size: 20px;
  }

  .list-button {
    display: flex;
    justify-content: flex-end;
  }

  button {
    font-size: 20px;
  }
`;

export const Card = styled.div`
  width: 95%;
  display: flex;
  background-color: var(--lightgray);
  padding: 10px;
  border-radius: 5px;
  margin-top: 20px;

  .card-image {
    width: 71px;
    height: 77px;
    min-width: 71px;
    min-height: 77px;
    background-color: var(--blue);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
  }

  button {
    border: none;
    display: flex;
    align-items: flex-start;
    color: var(--mediumgray);
    height: 20px;
    font-size: 20px;
  }

  .card-description {
    margin-left: 15px;
    flex-grow: 2;
    h2 {
      padding-bottom: 10px;
      cursor: pointer;
      :hover {
        text-decoration: underline;
      }
    }
    div {
      height: 40px;
      display: flex;
      overflow-wrap: anywhere;
      overflow-y: scroll;
      scrollbar-width: none;
      -ms-overflow-style: none;

      ::-webkit-scrollbar {
        width: 0px;
      }
    }
    p {
      color: var(--mediumgray);

      flex-grow: 1;
    }
  }
`;

export const ContainerItens = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90vw;
  max-width: 430px;
  height: 350px;
  overflow: auto;

  @media (min-width: 900px) {
    height: 500px;
  }
`;
