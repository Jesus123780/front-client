import styled, { css } from 'styled-components'
import {
  BColor,
  BGColor,
  BGVColor,
  DarkSilver,
  SFVColor,
  PColor
} from '../../public/colors'

export const ItemWrapper = styled.div`
  height: min-content;
  padding: 10px;
  border-radius: 4px;
  grid-template-columns: 85px 1fr;
  grid-column-gap: 20px;
  cursor: pointer;
  display: grid;
  padding: 16px;
  .close {
    font-weight: bold;
  }
  ${(props) => {
    return props.isOpen
      ? css`
          filter: none;
          opacity: 1;
        `
      : css`
          filter: grayscale(1);
          opacity: 0.3;
        `
  }}
  /* background-color: ${BGColor}!important; */
    &:hover {
    background-color: ${`${SFVColor}69`};
  }
  .Name {
    margin-bottom: 10px;
    font-size: 16px;
    font-family: PFont-Light;
    color: var(--color-neutral-gray-dark);
    font-size: 20px;
    line-height: 1.2;
    padding-right: 10px;
    font-weight: 300;
  }
  .store_info {
    color: ${`${BGVColor}`};
  }
  .store_image {
    border-radius: 50%;
    background-color: ${BGColor};
    box-shadow: 1px 1px 10px #00000012;
    width: 85px;
    height: 85px;
    min-width: 85px;
    object-fit: contain;
    min-height: 85px;
    border: 1px solid #f2f2f2;
  }
`
export const MerchantListWrapper = styled.div`
  @media only screen and (min-width: 560px) {
    grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  }
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  grid-gap: 0;
  gap: 0;
  .store_info_min_order_time {
    color: #717171;
    font-size: 0.75rem;
    font-weight: 300;
    line-height: 0.9375rem;
  }
  .store_info__separator {
    margin-left: 5px;
    margin-right: 5px px;
  }
`
export const Content = styled.div`
  margin: auto;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: space-between;
  width: 100%;
  max-width: 1366px !important;
  .wrapper-query {
    line-height: 1.15;
    font-size: 16px;
    overflow-y: auto;
    height: calc(100% - 80px);
    padding: 16px;
  }
  .content-ripple-action__query {
    -webkit-box-align: center;
    align-items: center;
    display: flex;
    -webkit-box-pack: end;
    justify-content: flex-end;
    padding: 20px;
    height: 80px;
    width: 100%;
    position: absolute;
    bottom: 0;
  }
`
export const Section = styled.section`
  .merchant-list-v2 {
    line-height: 1.15;
    display: grid;
    grid-gap: 0;
    gap: 0;
    grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  }
  .cardstack-component-header {
    font-size: 16px;
    box-sizing: border-box;
    margin: 0 0 10px;
    margin-bottom: 24px;
  }
  .merchant-list-v2__item-wrapper {
    line-height: 1.15;
    font-size: 16px;
    transition: 0.2s;
    height: min-content;
    border-radius: 4px;
    text-decoration: none;
  }
`
export const CtnBox = styled.div`
  width: 100px;

  &:hover {
    transform: scale(1.05);
    transition: transform 0.2s ease-out;
  }
  img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
`
export const ItemCategory = styled.div`
  width: 100%;
  border: 1px solid ${SFVColor};
  border-radius: 3%;
  height: 100px;
  align-items: center;
  display: grid;
  /* width: 100px ; */
  height: 130px;
`
export const ContentStores = styled.div`
  width: 100%;
  display: grid;
  grid-auto-flow: column;
  place-content: space-around;
  margin: 10px 0;
  overflow: hidden;
  grid-template-columns: 30% repeat(auto-fill, 30%);
`
export const H2 = styled.h2`
  color: ${BColor};
  font-size: 20px;
  margin: 20px 0 20px 0;
  font-family: PFont-Light;
  font-weight: 400;
`
export const ContentFilter = styled.div`
  padding: 10px;
  display: grid;
  place-content: center;
  justify-items: center;
  gap: 20px;
  grid-template-columns: repeat(auto-fill, 30.33%);
`
export const CtnItemFilter = styled.div`
  padding: 10px;
  place-content: center;
  display: flex;
  border: 1px solid #ccc;
  border-radius: 60%;
  height: 100px;
  align-items: center;
  min-height: 100px;
  width: 100px;
  min-width: 100px;
`
export const List = styled.div`
  margin: auto;
  display: flex;
  flex-grow: 1;
  justify-content: space-between;
  width: 100%;
  max-width: 1766px !important;
  .title-cat {
    margin-top: 10px;
    font-size: 14px;
    font-family: PFont-Light;
    font-weight: 400;
  }
`
export const ContainerFilter = styled.div`
  margin: 30px 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`
export const WrapFlex = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`
export const ItemFilter = styled.button`
  display: flex;
  margin-left: 5px;
  align-items: center;
  justify-content: center;
  height: 32px;
  background: #ffffff;
  border: 1px solid #dcdcdc;
  border-radius: 20px;
  padding: 7px 14px;
  color: ${DarkSilver};
  font-size: 0.875rem;
  cursor: pointer;
  min-width: 5.375rem;
  font-family: PFont-Light;
  ${({ active }) => {
    return (
      active &&
      css`
        background-color: #fcebea;
        color: ${PColor};
      `
    )
  }}
`
export const CardProduct = styled.div`
  height: 300px;
  width: 100%;
  border-radius: 2%;
  box-shadow: 1px 1px 3px #7c7c7c54;
`
export const ContainerCardProduct = styled.div`
  display: grid;
  gap: 5px;
  grid-template-columns: 23% repeat(auto-fill, 23%);
`
