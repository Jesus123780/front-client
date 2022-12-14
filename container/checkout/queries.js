import { gql } from '@apollo/client'

export const DELETE_ONE_ITEM_SHOPPING_PRODUCT = gql`
mutation deleteOneItem($cState: Int, $ShoppingCard: ID) {
  deleteOneItem(cState: $cState, ShoppingCard: $ShoppingCard){
    success
    message
  }
}
`
export const CREATE_MULTIPLE_ORDER_PRODUCTS = gql`
mutation createMultipleOrderStore($input: SET_INPUT_SHOPPING_PRODUCTS_ITEMS) {
  createMultipleOrderStore(input: $input){
    success
    message
  }
}
`
export const GET_STATE_ORDER = gql`
subscription {
  numberIncremented
}
`
export const PUSH_NOTIFICATION_ORDER_STORE = gql`
query pushNotificationOrder($pCodeRef: String, $idStore: ID) {
  pushNotificationOrder(pCodeRef: $pCodeRef, idStore: $idStore) {
    pdpId
    id
    idStore
    pId
    ppState
    pCodeRef
    pPDate
    pSState
    pPStateP
    payMethodPState
    pPRecoger
    totalProductsPrice
    unidProducts
    pDatCre
    pDatMod
  }
}
`
