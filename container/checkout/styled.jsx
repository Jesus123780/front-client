import styled, { css, keyframes } from 'styled-components'
import { BGColor, PColor } from '../../public/colors'

export const AnimationRight = keyframes`
0% {
    transform: translateX(50vw);
    opacity: 0;
}
100% {
    transform: translateY(0);
    opacity: 1;
}
`
export const AnimationLeft = keyframes`
0% {
    transform: translateX(-50vw);
    opacity: 0;
}

100% {
    transform: translateY(0);
    opacity: 1;
}
`
export const ContainerAnimation = styled.div`
${props => { return props.active === 1 ? css`animation: ${AnimationRight} 200ms;` : css`animation: ${AnimationRight} 200ms;` }}

`
export const ContainerAnimationTow = styled.div`
${props => { return props.active === 2 ? css`animation: ${AnimationLeft} 200ms;` : css`animation: ${AnimationLeft} 200ms;` }}

`
export const Anchor = styled.div`
    text-decoration: underline;
    color: ${PColor};
    cursor: pointer;
    text-align-last: end;
    font-size: 12px;
`
export const Text = styled.div`
    font-size: ${({ size }) => { return size || '1.7123rem' }};
    text-align: ${({ align }) => { return align || 'start' }};
    color: ${({ color }) => { return color }};
`
export const Card = styled.div`
    padding: 30px;
    
`
export const CardPro = styled(Card)`
    box-shadow: 0 0.75rem 2rem #bdbdbdbd;
    margin-top: 75px;
`
export const Column = css`
    flex-direction: column;
`
export const Wrapper = styled.div`
    border: ${({ border }) => { return border && `1px solid ${PColor}` }};
    border-radius: 5px;
    ${props => { return props.styles && props.styles }}
`

export const ContentInfo = styled.div`
    padding: 30px 0;
    background-color: ${BGColor};
    border-radius: 3px;
    .delivery-location {
      font-family: PFont-Light;
      width: 80%;
      cursor: pointer;
      display: flex;
      margin-right: 12px;
      flex-direction: column;
      @media (max-width: 768px){

      }
      & button {
        background-color: transparent;
      }
    }
    .ctn-location {
        display: flex;
        place-content: center;
        align-items: center;
        cursor: pointer;
    }
`
export const Body = styled.div`
    line-height: 1.15;
    margin: 0;
    overflow: hidden;
    scroll-behavior: auto;
    width: 100%;
    max-width: 1366px;
    margin: 0 auto;
    display: grid;
    /* grid-template-columns: 50% 50%; */
    grid-column-gap: 20px;
    grid-template-columns: repeat( auto-fit, minmax(45%, 1fr) );
`
