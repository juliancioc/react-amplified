import styled from "styled-components";

export const Container = styled.div`
  .ant-modal-wrap{
    background-color: red;
    @media(min-width: 768px){
      padding-top: 50px;
    }
  }
`
export const ContentModal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  
  img {
    width: 180px;
    margin: 40px;
  }

  input {
    width: 290px;
  }
  button {
    border: none;
    width: 300px;
    height: 47px;
    border-radius: 24px;
    background-color: #236FBC;
    color: white;
    font-size: 15px;

    @media (min-width: 768px) {
      width: 400px;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    a {
      margin-top: 20px;
      text-decoration: underline;
      font-size: 14px;
    }

    p {
      margin: 20px 0;
      font-size: 14px;
      color: #434343;
      font-weight: 600;
    }

    & > div{
      height: 50px;
      border: 1px solid #434343;
    }

  }


  @media (min-width: 768px) {
    form {
      input {
        width: 80%;
      }
    }
  }
`;
