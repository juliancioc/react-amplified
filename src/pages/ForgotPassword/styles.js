import styled from "styled-components";

export const Container = styled.div`

`;

export const ContentModal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  a {
    margin-top: 20px;
  }

  img {
    width: 180px;
    margin: 40px;
  }

  input {
    width: 290px;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;

    p {
      margin: 20px 0 0 0;
      font-size: 20px;
      color: #3c505a;
    }

    button {
      width: 350px;
      border-radius: 6px;
      box-shadow: 0px 3px 6px #00000029;
      background: #0c5faf;
    }
  }

  .btn-create-account {
    background: #51ae30;
    width: 350px;
    border-radius: 6px;
    box-shadow: 0px 3px 6px #00000029;
  }
`;
