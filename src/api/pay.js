// 请求获取订单信息
import request from "@/utils/request";

// 根据订单编号请求支付二维码
export const reqOrderInfo = (orderId) => {
  return request({
    url: `/api/payment/weixin/createNative/${orderId}`,
    method: "get",
  });
};

//获取支付状态
export const requestOrderStatus = (orderId) => {
  return request.get(`/api/payment/weixin/queryPayStatus/${orderId}`)
}