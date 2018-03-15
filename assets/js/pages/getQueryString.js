export {
	getQueryString,
	getResult,
}
//获取URL参数
function getQueryString(name) {
	let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	let r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
};
//限购判断逻辑
function getResult(obj) {

	let [item0 = 0, item1 = 0, item2 = 0, item3 = 0, item4 = 0, item5 = 0, item6 = 0, item7 = 0, item8 = 0] = [obj.item0, obj.item1, obj.item2, obj.item3, obj.item4, obj.item5, obj.item6, obj.item7, obj.item8];
	let factor0, factor1, factor2, factor3, factor4, factor5, factor6, factor7, factor8, factor9, factor10;
	let own, factorNo, ownHouse;
	let dom = getQueryString('dom');
	let marr = getQueryString('marr');
	let soc = getQueryString('soc');
	let identity = dom == 0 && marr != 0 || dom == 1 && marr == 1;

	factorNo = dom == 1 && marr == 2;
	//上海户口单身
	factor0 = dom == 0 && marr == 0 && item0 != 3 && item1 == 0 && item2 == 0 && item3 == 0;

	//上海户口已婚
	factor1 = identity && item0 == 3 && item1 == 0 && item2 == 0 && item3 == 0 && item4 != 3 && item5 == 0 && item6 == 0 && item7 == 0;
	factor2 = identity && item0 != 3 && item1 == 0 && item2 == 0 && item3 == 0 && item4 != 3 && item5 == 0 && item6 == 0 && item7 == 0;
	factor3 = identity && item0 != 3 && item1 == 0 && item2 == 0 && item3 == 0 && item4 == 3 && item5 == 0 && item6 == 0 && item7 == 0;
	factor4 = identity && item0 != 3 && item1 == 1 && item2 == 0 && item3 == 0 && item4 != 3 && item5 == 0 && item6 == 0 && item7 == 0;
	factor5 = identity && item0 != 3 && item1 == 0 && item2 == 0 && item3 == 0 && item4 != 3 && item5 == 1 && item6 == 0 && item7 == 0;
	factor6 = identity && item0 != 3 && item1 == 0 && item2 == 0 && item3 == 1 && item4 != 3 && item5 == 0 && item6 == 0 && item7 == 0;
	factor7 = identity && item0 != 3 && item1 == 0 && item2 == 0 && item3 == 0 && item4 != 3 && item5 == 0 && item6 == 0 && item7 == 1;
	factor8 = identity && item0 != 3 && item1 == 0 && item2 == 1 && item3 == 0 && item4 != 3 && item5 == 0 && item6 == 0 && item7 == 0;
	factor9 = identity && item0 != 3 && item1 == 0 && item2 == 0 && item3 == 0 && item4 != 3 && item5 == 0 && item6 == 1 && item7 == 0;
	//双方均不为上海户口
	factor10 = dom == 1 && marr == 2 && soc == 1 && item0 != 3 && item1 == 0 && item2 == 0 && item3 == 0 && item4 != 3 && item5 == 0 && item6 == 0 && item7 == 0;
	//判断是否拥有房屋
	ownHouse = dom == 2 || factorNo || factor0 || factor1 || factor3 || factor4 || factor5 || factor6 || factor7 || factor8 || factor9;
	ownHouse ? own = 1 : factor2 ? own = 2 : own = 0;
	//判断非上海户口单身
	soc !== null ? factor10 ? own = 1 : own = 0 : "";

	return own;
};