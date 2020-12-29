import styled from "styled-components";

export const Container = styled.div`
  background: #5636d3;
  padding: 30px 0;

  @media (max-width: 400px) {
    width: 100%;
    min-width: 300px;

    .flag {
      flex: auto;
    }
  }

  header {
    width: 1120px;
    margin: 0 auto;
    padding: ${({ size }) => (size === "small" ? "0 20px " : "0 20px 150px")};
    display: flex;
    align-items: center;
    justify-content: space-between;

    .flag {
      color: white;
      display: flex;
      align-items: center;
      width: 250px;
      justify-content: space-between;

      p {
        margin: 0;
      }

      button {
        background: transparent;
        border: none;
      }

      .dolar {
        display: flex;
        align-items: center;

        img {
          margin-right: 5px;
        }
      }
    }

    @media (max-width: 1100px) {
      width: 100vw;
      display: flex;
      flex-direction: column;

      .flag {
        max-width: 150px;
        margin-top: 15px;
        flex-direction: column;

        button {
          margin-bottom: 15px;
        }
      }
    }

    nav {
      a {
        color: #fff;
        text-decoration: none;
        font-size: 16px;
        transition: opacity 0.2s;

        & + a {
          margin-left: 32px;
        }

        &:hover {
          opacity: 0.6;
        }
      }
    }
  }
`;
