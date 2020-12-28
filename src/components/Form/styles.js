import styled from 'styled-components';

export const Container = styled.section`
    max-width: 1120px;
    margin: 0 auto;

    @media (max-width: 400px) {
        width: 300px;
    }
`;

export const ContainerContent = styled.div`
    width: 100%;
    max-width: 1120px;
    margin: 0 auto;

    @media screen and (min-width: 200px) and (max-width: 464px) {
        width: 250px;
    }
`;

export const FormCalc = styled.form`
    display: flex;
    align-items: center;
    flex-direction: column;

    .title-form {
        margin-bottom: 40px;
    }
    
    @media (max-width: 656px) {
      .MuiFormControl-root {
          width: 30ch;
      }
    }
`;

export const ContainerButton = styled.div`
    button {
        margin: 15px 9px; 
    }
`;

export const ContainerImpost = styled.div`
    @media (max-width: 676px) {
        > div {
            width: 25ch
        }
    }
`;