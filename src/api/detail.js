import myAxios from '@/utils/request.js'

export const getDetailData = (skuId) => {

  return myAxios.get(`/api/item/${skuId}`)

}

export const getAddToCart = (skuId, skuNum) => {
  return myAxios.post("/api/cart/addToCart/" + skuId + "/" + skuNum)
}
export const getShopList = () => {
  return myAxios.get("/api/cart/cartList")
}
export const getCheckedGoods = (skuID, isChecked) => {
  return myAxios.get(`/api/cart/checkCart/${skuID}/${isChecked}`)
}
export const getChangeAllChecked = (isChecked, skuIdList) => {
  return myAxios.post(`/api/cart/batchCheckCart/${isChecked}`, skuIdList)
}

export const getDeleteGoods = (skuId) => {
  return myAxios.delete(`/api/cart/deleteCart/${skuId}`)
}

//请求交易页数据
export const getTradeInfo = () => {
  return myAxios.get(`/api/order/auth/trade`)
}


export const getOrderNo = (tradeNo, orderInfo) => {
  return myAxios.post(`/api/order/auth/submitOrder?tradeNo=${tradeNo}`, orderInfo)
}