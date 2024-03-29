import styled, { css } from 'styled-components';
import { BGColor, PColor, SFColor } from 'public/colors';

export const SliderContainer = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const SliderWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  height: 100%; 
`

export const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`
export const SliderItem = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  width: 100%;
  min-width: 100%;
  max-width: 100%;
  justify-content: center;
  background-color: ${ BGColor };

`;
export const ContentList = styled.div`
    position: relative;
    flex-direction: space-between;
    width: 100%;
    background: transparent;
    overflow: hidden;
    text-decoration: none;
    height: auto;
    cursor: pointer;
    &:hover{
      box-shadow: 0px 4px 10px rgb(0 0 0 / 5%), 0px 4px 16px rgb(0 0 0 / 8%);
      border-color: transparent;
    }
    ${ ({ show }) => show
    && css`
        box-shadow: 0px 4px 10px rgb(0 0 0 / 5%), 0px 4px 16px rgb(0 0 0 / 8%);
        border-color: transparent;
        
        
        ` }
        `

export const Navigation = styled.ul`
  position: absolute;
  bottom: 20px;
  margin: 0;
  padding: 0;
  left: 0;
  display: flex;
  justify-content: center;
  background-color: transparent;
`;

export const NavigationItem = styled.li`
    width: 7px;
    min-width: 7px;
    max-width: 7px;
    height: 7px;
    min-height: 7px;
    max-height: 7px;
    border-radius: 50%;
    cursor: pointer;
    color: transparent;
    border: 0;
    outline: none;
    transition: .5s ease;
    margin-left: 20px;
    background-color: ${BGColor};
  ${ props => props.active &&
    css`
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background-color: ${ PColor };
    ` };
`;

export const Control = styled.button`
    position: absolute;
    top: 50%;
    color: ${ props => props.color || SFColor };
    align-items:center;
    width: 40px;
    height: 40px;
    padding: 0;
    transform: translate(0, -50%);
    box-shadow: 1px 6px 14px rgb(0 0 0 / 20%);
    cursor: pointer;
    transition: all 0.2s ease;
    border: none;
    outline: none;
    justify-content: center;
    display: flex;
    border-radius: 4px;
    height: 80px;
    &:disabled{
        opacity: 59%;
        background-color:#b4b4b4;
    }
  ${ props => !props.display ? css`display: block;` : css`display: none;` };

`

export const ControlLeft = styled(Control)`
  left: 0;
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
`;
export const ControlRight = styled(Control)`
  right: 0;
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
  color: ${ props => props.color || SFColor };

`;

export const BigElement = styled.div`
`;