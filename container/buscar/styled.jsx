import styled from 'styled-components'
import {
  BGColor,
  DarkSilver,
  PColor,
  SECBGColor
} from '../../public/colors'

export const MerchantBannerWrapperInfo = styled.div`
    line-height: 1.15;
    text-rendering: optimizeLegibility;
    font-size: 16px;
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    top: 0;
    left: 0;
    background-size: cover;
    background-position: 50%;
    border-radius: 4px;
    height: 250px;
    position: relative;
    justify-content: unset;
    padding-left: 30px;
    background-color: rgb(0 0 0 / 26%);
    background-blend-mode: overlay;
    max-width: 1366px;
    margin: auto ;
    background-image: ${({ bannerImage }) => { return bannerImage }};
    .merchant-banner__status-description {
      line-height: 1.15;
      font-size: 16px;
      box-sizing: border-box;
    }
    .merchant-banner__status-title {
    color: ${SECBGColor};
    font-weight: 400;
    line-height: 20px;
    margin: 0 0 4px;
    font-size: 25px;
    margin-bottom: 16px;
    text-align: left;
    }
    && > span {
      @media only screen and (min-width: 960px) {
        height: 70px;
        width: 70px;
        min-height: 70px;
        max-height: 70px;
        min-width: 70px;
        max-width: 70px;
        margin: 30px;
        place-content: center;
        display: grid;
        border: 1px solid ${SECBGColor};
        border-radius: 100%;
        && svg {
          fill: ${BGColor}
        }
      }
    }
`
export const Card = styled.div`
@media (min-width: 992px){
    flex: 0 0 33.33333%;
    max-width: 33.33333%;
}
@media (min-width: 768px) {
    flex: 0 0 50%;
    max-width: 100%;
}
`
export const Container = styled.div`
  max-width: 1366px;
  margin: auto;
`
export const Title = styled.h1`
font-size: 1.625rem;
    color: ${PColor};
    margin: 20px 0;
    text-align: center;
    font-weight: 500;
    font-family:  PFont-Medium;
`
export const Paragraph = styled.p`
    font-weight: 300;
    line-height: 29px;
    text-align: justify;
    list-style: initial;
    color: ${DarkSilver};
    font-family:  PFont-Light;
    margin: 7px 0px;
    font-size: 14px;

`
export const ContainerProductSearch = styled.div`
  display: grid;
  grid-gap: 28px;
  max-width: 1366px;
  margin: 30px auto 20px;
  @media only screen and (min-width: 960px) {
    grid-template-columns: repeat(auto-fill,minmax(275px,1fr));
    grid-gap: 30px;
  }

`
