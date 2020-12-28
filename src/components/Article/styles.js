import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 20px;
  display: flex;
  justify-content: center;

  @media (max-width: 400px) {
    padding: 20px 0;
    width: 300px;
  }
`;

export const ArticleContainer = styled.div`
  h1 {
    font-size: 22px;
  }

  span {
    font-weight: bold
  }
    
  h2 {
    margin-top: 25px;
    font-size: 16px;
  }

  p {
    font-size: 14px;
  }

  .links {
    margin-top: 25px;
  }
`;
