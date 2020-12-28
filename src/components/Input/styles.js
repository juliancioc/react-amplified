import styled, { css } from "styled-components";

import Tooltip from "../Tooltip";


export const Container = styled.div`
    border-radius: 30px;
    border: 2.5px solid #236FBC;
    padding: 18px 30px;
    height: 59px;
    margin: 0 0 20px 0;
    position: relative;
    width: 300px;
    z-index: 0;

    @media(min-width: 768px){
      width: 400px;
    }

    display: flex;
    align-items: center;
    
    label{
      position: absolute;
      left: 0;
      color: #797979 !important;
      z-index: 1;
      transition: 0.4s;
      bottom: 13px;

      &.active{
        background-color: white;
        bottom: 45px;
        font-size: 14px;
        padding: 0 5px;
      }
    }

    ${(props) =>
    props.isErrored &&
    css`
        border-color: #c53030;
      `}

    ${(props) =>
    props.isFocused &&
    css`
        color: #0161af;
        border-color: #236FBC;
      `}

    ${(props) =>
    props.isFilled &&
    css`
        color: #0161af;
      `}
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    
    input[type=number] {
        -moz-appearance: textfield;
    }

    @-moz-document url-prefix() {
      input[type=date] {padding-bottom: 25px;}
    }

    input {
        flex: 1;
        background: transparent;
        border: 0s;
        font-size: 17px;
        z-index: 2;

        &::placeholder {
            color: #797979;
            font-size: 17px;
        }
    }

    svg {
        margin-right: 16px
    }

    &.error{
      border-color: red;

      label, input{
        color: red;
      }
    }

`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #fff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
