import styled from "styled-components";

export const ContentModal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  a {
    margin-top: 20px;
  }

  .btn-modal-info {
    width: 100px;
    height: 40px;
    border-radius: 20px;
    font-size: 14px;
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
      border: none;
      width: 306px;
      height: 47px;
      border-radius: 24px;
      background-color: #236fbc;
      color: white;
      font-size: 15px;
      width: 290px;

      @media(min-width: 768px){
        width: 400px;
      }
    }
  }
`;

export const InputMaskStyle = styled.div`
  & > input{
    width: 300px !important;
    height: 59px !important;
    border: 2.5px solid #236FBC;
    border-radius: 30px;
    padding: 18px 30px;
    margin: 0 0 10px 0;  

    @media(min-width: 768px){
      width: 400px !important;
    }
  }
`
