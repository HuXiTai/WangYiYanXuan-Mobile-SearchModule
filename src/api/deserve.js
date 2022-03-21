import myAxios from "@/utils/deserve"

//请求轮播图数据
export const requestSwiper = () => {
    return myAxios.get("/v1/know/navWap.json")
}

//请求瀑布流的数据
export const requestWaterfall = () => {
    return myAxios.get(`/v1/find/recAuto.json?page=3&size=10`)
}