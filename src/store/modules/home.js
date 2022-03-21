import {requestHomeBanner,requestContentList} from '@/api/home.js'
const state = {
    homeBanner:{},
	contentList:{},
}
const mutations = {
	SET_HOMEBANNER(state,homeBanner){
		state.homeBanner = homeBanner
	},
	SET_CONTENTLIST(state,contentList){
		state.contentList = contentList
	},
}
const actions = {
	async getBannerList({commit}){
		const re = await requestHomeBanner()
		// console.log(re);
		if (re.code === '200')
    		commit("SET_HOMEBANNER", re.data.data)
	},
	async getContentList({commit},navId){
		const re = await requestContentList(navId)
		console.log(re,'re');
		// if (re.code === '200')
    		commit("SET_CONTENTLIST", re.data)
	},
}
const getters = {}
export default{
	state,
	mutations,
	actions,
	getters,
	namespaced:true
}