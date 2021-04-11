import styled from "styled-components";
// @ts-ignore
import {shade} from 'polished'
import backgroundimagiSigin from '../../assets/sign-up-background.png';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;

`;


export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  place-content: center;

  width: 100%;
  max-width: 700px;

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;
  }

  h1 {
    margin-bottom: 24px;

  }





  a {
    color: white;
    display: block;
    margin-top: 25px;
    text-decoration: none;
    transition: background-color0 .2s;

    &:hover {
      background: ${shade(0.2, 'white')};
    }
  }

  > a {
    color: #FFF;
    display: block;
    margin-top: 25px;
    text-decoration: none;
    transition: background-color0 .2s;

    display: flex;
    align-items: center;

    &:hover {
      background: ${shade(0.2, '#FFF')};
    }

    svg {
      margin-right: 16px;
    }

  }

`;


export const BackGround = styled.div`
  flex: 1;
  background: url("${backgroundimagiSigin}") no-repeat center;
  background-size: cover;
`;
