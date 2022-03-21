import service from "@/utils/service";

// 请求‘为你推荐’和分类列表的数据
export const categoryList = () => {
  return service({
    url: "/item/cateList.json?__timestamp=1630131286110&categoryId=",
    method: "get",
  });
};
// 根据分类ID获取分类的列表
export const categorContentyList = (id) => {
  return service({
    url: "/item/cateList.json?__timestamp=1630131455012&categoryId=" + id,
    method: "get",
  });
};

// 获取某个分类下的商品列表
export const intoCategorList = (categoryId, subCategoryId) => {
  return service({
    url: `/item/list.json?__timestamp=1647606450139&categoryId=${categoryId}&subCategoryId=${subCategoryId}&categoryType=0`,
    // https://m.you.163.com/item/list.json?__timestamp=1647601943657&categoryId=1005000&subCategoryId=109323008&categoryType=0
    method: "get",
  });
};


