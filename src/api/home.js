import
service
from "@/utils/service"
export const requestHomeBanner = () => {
    return service.get('/xhr/index.json?__timestamp=1630131808529');
}
export const requestContentList = (navId) => {
    return service.get(`item/list.json?__timestamp=1630136511866&categoryId=${navId}`)
}