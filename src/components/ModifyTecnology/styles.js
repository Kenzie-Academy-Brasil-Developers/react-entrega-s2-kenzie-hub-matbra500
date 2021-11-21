import styled from "styled-components";

export const FormContainer = styled.div`
  width: 320px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: whitesmoke;
  border: 2px solid var(--green);
  border-radius: 5px;
  margin: 0 auto;
  text-align: center;
  margin-top: 30px;
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);

  .button {
    margin-top: 20px;
    width: 150px;
    background-color: var(--green);
    font-size: 16px;
  }

  .name {
    border-top: 10px solid transparent;
  }
`;

export const CancelButton = styled.button`
  border-radius: 100%;
  border: none;
  color: var(--mediumgray);
  background-color: whitesmoke;
  width: 10%;
  float: right;
`;
