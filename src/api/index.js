import myAxios from "@/utils/request";
import qs from "qs";

//获取默认关键字和热门关键字
export const getHotKey = () => {
  return myAxios.get("/search/init.json");
};

//获取实时关键字列表
export const getRealTimeKeyList = (realTimeKey) => {
  return myAxios.post(
    "/search/searchAutoComplete.json",
    qs.stringify(realTimeKey)
  );
};

//获取搜索商品数据
export const getSearchGoods = (keyWord) => {
  return myAxios.get(`/search/search.json?${qs.stringify(keyWord)}`);
};
