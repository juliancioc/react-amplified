import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 40px 20px;
  display: flex;
  justify-content: center;

  @media (max-width: 400px) {
    padding: 20px 0;
    width: 300px;
  }
`;

export const FooterContainer = styled.footer`
  margin-top: 50px;
  p {
    font-size: 12px;
   }
`;
