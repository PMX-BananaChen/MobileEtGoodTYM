(this["webpackJsonp"]=this["webpackJsonp"]||[]).push([["chunk-15f551c9"],{"41cc":function(e,t,i){"use strict";i.r(t);var a=i("9e4d"),r=i("b15e");for(var s in r)["default"].indexOf(s)<0&&function(e){i.d(t,e,(function(){return r[e]}))}(s);var n=i("f0c5"),o=Object(n["a"])(r["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],void 0);t["default"]=o.exports},"4d1a":function(e,t,i){"use strict";(function(e){var a=i("4ea4");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=i("34ce"),s=a(i("a4e5")),n=i("4e90"),o=i("0127"),l=i("1519"),c=a(i("d763")),u=(c.default.baseUrl,c.default.imagePath),m={data:function(){return{id:"",userNo:this.$store.state.userNo,titles:"\u72b6\u6001",titlesv:"\u5f85\u7b7e\u6838",showT:!1,opinShow:!1,opinionsList:[],opinionsLists:[],errorMsg:{resulta:""},showLoading:!0,loadText:"\u52a0\u8f7d\u4e2d...",form:{formno:"",empno:"",empname:"",empnames:"",factory:"",dept:"",area:"",company:"",releasedate:null,releaseperiod:null,releasetype:0,releasetypes:"",itemtype:null,carriertype:null,carrier:"",carriers:"",carrierin:"",vehicle:null,vehicles:"",licenseplate:null,placedelivery:null,placedeliverys:"",deliverystation:null,leavestatus:null,livingdorm:null,thatdorm:null,computerequipment:null,securitystation:null,projectcode:"",projectitem:"",sealno:"",sealno2:"",picture:null,pictureurl:null,picture2:null,pictureurl2:null,stateid:null,privates:[],byos:[],companys:[],projects:[],remark:"",returntype:"",checkno:"",backremark:""},active:1,goodprivatev:!1,goodbyov:!1,goodcompanyv:!1,goodprojectv:!1,imageUrls:[],imageUrls2:[],imageItem:[],tabbars:[{name:"/apply",title:"\u7533\u8bf7",normal:i("ee30"),active:i("4a3f8")},{name:"/login",title:"\u5de5\u4f5c\u53f0",normal:i("5928"),active:i("7269")},{name:"/mynavigation",title:"\u6211\u7684",normal:i("0a36"),active:i("b9b8")}]}},created:function(){var t=uni.getStorageSync("UserNo"),i=uni.getStorageSync("UserId");null===t||""===t?(this.id=window.location.href.split("?id=")[1],this.id=this.id.split("&")[0],this.userNo=this.id,uni.setStorageSync("UserNo",this.id),e("log",this.id," at pages/waitcheckdetail.vue:284"),e("log","44"," at pages/waitcheckdetail.vue:285")):(this.id=t,e("log","33"," at pages/waitcheckdetail.vue:290"),e("log",this.id," at pages/waitcheckdetail.vue:291")),null===i||""===i?this.setUser():this.getdata()},methods:{tabIndex:function(t){t=Number(t),this.active=t,uni.setStorageSync("TableIndex","/waitcheckdetail");var i=this.tabbars[t].name;e("log",i," at pages/waitcheckdetail.vue:312"),this.$router.push(i)},backHome:function(){this.$router.push(uni.getStorageSync("TableIndex"))},setUser:function(){var t=this,i=uni.getStorageSync("UserId");if(""===i||null===i){var a=s.default.getUrlParam("code");a?(e("log","ss===>"+a," at pages/waitcheckdetail.vue:327"),(0,o.getCode)(a).then((function(i){if(1===i.code){e("log","\u6388\u6743\u6210\u529f"," at pages/waitcheckdetail.vue:331");var a=i.data.empNo.trim();uni.setStorageSync("UserId",a),t.setUserName(a),e("log",a," at pages/waitcheckdetail.vue:335")}})).catch((function(t){e("log",t," at pages/waitcheckdetail.vue:339")}))):(e("log","a"+a," at pages/waitcheckdetail.vue:342"),s.default.getCodeApi("releaseGood"))}},setUserName:function(t){var i=this;null!==t&&""!==t&&(0,l.getEmployee)(t).then((function(t){"\u64cd\u4f5c\u6210\u529f"===t.msg?(uni.setStorageSync("UserName",t.data.empName),uni.setStorageSync("Sex",t.data.empSex),i.getdata()):e("log",err," at pages/waitcheckdetail.vue:357")})).catch((function(t){e("log",t," at pages/waitcheckdetail.vue:361")}))},getdata:function(){var e=this;(0,r.getReleaseGood)(e.id).then((function(t){if(200===t.code)if(e.form=t.data,"1"===e.form.mainresult&&"null"===e.form.stateid)e.showT=!0,e.showLoading=!1,e.butonShow=!0;else{e.listboxs=!0;var i=u;switch(e.form.releasetype.replace(" ","")){case"1":e.goodprivatev=!0,e.goodbyov=!1,e.goodcompanyv=!1,e.goodprojectv=!1,e.form.releasetypes="\u54e1\u5de5\u79c1\u4eba\u7269\u54c1";e.form.privates.forEach((function(t){if(e.imageItem=[],null===t.picture||""===t.picture);else{for(var a=0;a<t.picture.split(";").length;a++){var r=i+t.picture.split(";")[a];e.imageItem.push(r)}e.imageUrls.push(e.imageItem)}1}));break;case"2":e.goodbyov=!0,e.goodprivatev=!1,e.goodcompanyv=!1,e.goodprojectv=!1,e.form.releasetypes="\u5ee0\u5546/\u8a2a\u5ba2\u81ea\u5e36";e.form.byos.forEach((function(t){if(e.imageItem=[],null===t.picture||""===t.picture);else{for(var a=0;a<t.picture.split(";").length;a++){var r=i+t.picture.split(";")[a];e.imageItem.push(r)}e.imageUrls.push(e.imageItem)}1}));break;case"3":if("12"===e.form.itemtype){if(e.goodbyov=!1,e.goodprivatev=!1,e.goodcompanyv=!1,e.goodprojectv=!0,null===e.form.picture||""===e.form.picture);else for(var a=0;a<e.form.picture.split(";").length;a++)e.imageUrls.push(i+e.form.picture.split(";")[a]);if(null===e.form.picture2||""===e.form.picture2);else for(a=0;a<e.form.picture2.split(";").length;a++)e.imageUrls2.push(i+e.form.picture2.split(";")[a])}else e.goodbyov=!1,e.goodprivatev=!1,e.goodcompanyv=!0,e.goodprojectv=!1;e.form.releasetypes="\u516c\u53f8\u7269\u54c1";break;default:break}switch(e.form.empnames=e.form.empname+e.form.empno+" "+e.form.factory+" "+e.form.dept,e.form.carriers=e.form.carrier+e.form.carrierin,e.form.placedelivery.replace(" ","")){case"18":e.form.placedeliverys="\u5ee0\u5340\u5167";break;case"19":e.form.placedeliverys="\u5ee0\u5340\u5916";break}"12"===e.form.itemtype?e.form.projectitem="\u4fdd\u5bc6\u5c01\u689d\u865f\uff1a"+e.form.sealno+"-"+e.form.sealno2:e.form.projectitem="\u5426","16"===e.form.vehicle?e.form.vehicles="\u6b65\u884c":e.form.vehicles="\u8eca\u8f1b "+e.form.licenseplate,e.showLoading=!1,0===e.form.length&&(e.errorMsg.resulta="\u6570\u636e\u5f02\u5e38!")}}))},previewImage:function(e){uni.previewImage({urls:this.imageUrls,current:this.imageUrls[e]})},previewImage2:function(e){uni.previewImage({urls:this.imageUrls2,current:this.imageUrls2[e]})}},components:{Loading:n.Loading}};t.default=m}).call(this,i("0de9")["default"])},"9e4d":function(e,t,i){"use strict";i.d(t,"b",(function(){return r})),i.d(t,"c",(function(){return s})),i.d(t,"a",(function(){return a}));var a={uniRow:i("6940").default,uniCol:i("e6ad").default,uniTable:i("db29").default,uniTr:i("d08c").default,uniTh:i("76cd").default,uniTd:i("d326").default},r=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("form",{ref:"form"},[i("div",{directives:[{name:"show",rawName:"v-show",value:e._$s(1,"v-show",e.showT),expression:"_$s(1,'v-show',showT)"}],staticClass:e._$s(1,"sc","van-divider--center"),attrs:{_i:1}}),i("div",[i("van-nav-bar",{attrs:{"left-arrow":!0,_i:3},on:{"click-left":e.backHome}})],1),i("div",[i("loading",{attrs:{text:e.loadText,_i:5},model:{value:e._$s(5,"v-model",e.showLoading),callback:function(t){e.showLoading=t},expression:"showLoading"}})],1),e._$s(6,"i",!e.showT)?i("div",[i("div"),i("uni-row",{attrs:{_i:8}},[i("uni-col",{attrs:{span:6,_i:9}},[i("van-field",{attrs:{label:"\u7cfb\u7d71\u55ae\u865f\uff1a",_i:10}})],1),i("uni-col",{attrs:{span:18,_i:11}},[i("van-cell",{attrs:{center:"false",value:e.form.formno,_i:12}})],1)],1),i("van-cell",{attrs:{title:"\u653e\u884c\u985e\u578b\uff1a",value:e.form.releasetypes,_i:13}}),i("van-cell",{attrs:{title:"\u7533\u8acb\u4eba\uff1a",value:e.form.empnames,_i:14}}),i("van-cell",{attrs:{title:"\u651c\u5e36\u4eba\uff1a",value:e.form.carriers,_i:15}}),i("van-cell",{attrs:{title:"\u9001\u8ca8\u5730\u9ede\uff1a",value:e.form.placedeliverys,_i:16}}),i("van-cell",{attrs:{title:"\u5c08\u6848\u7269\u54c1\uff1a",value:e.form.projectitem,_i:17}}),i("van-cell",{attrs:{title:"\u5099\u8a3b\uff1a",value:e.form.remark,_i:18}}),i("van-cell",{attrs:{title:"\u4ea4\u901a\u5de5\u5177\uff1a",value:e.form.vehicles,_i:19}}),i("van-field",{attrs:{label:"\u653e\u884c\u5167\u5bb9\uff1a",_i:20}}),e._$s(21,"i",e.goodprivatev)?i("view",[i("uni-table",{ref:"tableprivate",attrs:{_i:22}},[i("uni-tr",{attrs:{_i:23}},[i("uni-th",{attrs:{align:"center",_i:24}},[e._v(""),i("span")]),i("uni-th",{attrs:{width:"150px;",align:"center",_i:26}},[e._v(""),i("span")]),i("uni-th",{attrs:{align:"center",_i:28}},[e._v(""),i("span")]),i("uni-th",{attrs:{align:"center",_i:30}},[e._v(""),i("span")]),i("uni-th",{attrs:{align:"center",_i:32}},[e._v(""),i("span")])],1),e._l(e._$s(34,"f",{forItems:e.form.privates}),(function(t,a,r,s){return i("uni-tr",{key:e._$s(34,"f",{forIndex:r,key:a}),attrs:{_i:"34-"+s}},[i("uni-td",{attrs:{align:"center",_i:"35-"+s}},[e._v(e._$s("35-"+s,"t0-0",e._s(a+1)))]),i("uni-td",{attrs:{_i:"36-"+s}},[e._v(e._$s("36-"+s,"t0-0",e._s(t.itemname)))]),i("uni-td",{attrs:{_i:"37-"+s}},[i("view",{staticClass:e._$s("38-"+s,"sc","name"),attrs:{_i:"38-"+s}},[e._v(e._$s("38-"+s,"t0-0",e._s(t.unit)))])]),i("uni-td",{attrs:{align:"center",_i:"39-"+s}},[e._v(e._$s("39-"+s,"t0-0",e._s(t.quantity)))]),i("uni-td",{attrs:{align:"center",_i:"40-"+s}},[i("uni-image-preview",{attrs:{urls:e.imageUrls[a],_i:"41-"+s}}),e._l(e._$s("42-"+s,"f",{forItems:e.imageUrls[a]}),(function(t,a,r,n){return i("image",{key:e._$s("42-"+s,"f",{forIndex:r,key:a}),attrs:{src:e._$s("42-"+s+"-"+n,"a-src",t),_i:"42-"+s+"-"+n},on:{click:function(t){return e.previewImage(a)}}})}))],2)],1)}))],2)],1):e._e(),e._$s(43,"i",e.goodbyov)?i("view",[i("uni-table",{ref:"tablebyo",attrs:{_i:44}},[i("uni-tr",{attrs:{_i:45}},[i("uni-th",{attrs:{align:"center",_i:46}},[e._v(""),i("span")]),i("uni-th",{attrs:{width:"150px;",align:"center",_i:48}},[e._v(""),i("span")]),i("uni-th",{attrs:{align:"center",_i:50}},[e._v(""),i("span")]),i("uni-th",{attrs:{align:"center",_i:52}},[e._v(""),i("span")]),i("uni-th",{attrs:{align:"center",_i:54}},[e._v(""),i("span")])],1),e._l(e._$s(56,"f",{forItems:e.form.byos}),(function(t,a,r,s){return i("uni-tr",{key:e._$s(56,"f",{forIndex:r,key:a}),attrs:{_i:"56-"+s}},[i("uni-td",{attrs:{align:"center",_i:"57-"+s}},[e._v(e._$s("57-"+s,"t0-0",e._s(a+1)))]),i("uni-td",{attrs:{_i:"58-"+s}},[e._v(e._$s("58-"+s,"t0-0",e._s(t.itemname)))]),i("uni-td",{attrs:{_i:"59-"+s}},[i("view",{staticClass:e._$s("60-"+s,"sc","name"),attrs:{_i:"60-"+s}},[e._v(e._$s("60-"+s,"t0-0",e._s(t.unit)))])]),i("uni-td",{attrs:{align:"center",_i:"61-"+s}},[e._v(e._$s("61-"+s,"t0-0",e._s(t.quantity)))]),i("uni-td",{attrs:{align:"center",_i:"62-"+s}},[i("uni-image-preview",{attrs:{urls:e.imageUrls[a],_i:"63-"+s}}),e._l(e._$s("64-"+s,"f",{forItems:e.imageUrls[a]}),(function(t,a,r,n){return i("image",{key:e._$s("64-"+s,"f",{forIndex:r,key:a}),attrs:{src:e._$s("64-"+s+"-"+n,"a-src",t),_i:"64-"+s+"-"+n},on:{click:function(t){return e.previewImage(a)}}})}))],2)],1)}))],2)],1):e._e(),e._$s(65,"i",e.goodcompanyv)?i("view",[i("uni-table",{ref:"tablecompany",attrs:{border:!0,_i:66}},[i("uni-tr",{attrs:{_i:67}},[i("uni-th",{attrs:{width:"150",align:"center",_i:68}},[e._v("")]),i("uni-th",{attrs:{width:"80",align:"center",_i:69}},[e._v("")]),i("uni-th",{attrs:{align:"center",_i:70}},[e._v("")]),i("uni-th",{attrs:{width:"204",align:"center",_i:71}},[e._v("")])],1),e._l(e._$s(72,"f",{forItems:e.form.companys}),(function(t,a,r,s){return i("uni-tr",{key:e._$s(72,"f",{forIndex:r,key:a}),attrs:{_i:"72-"+s}},[i("uni-td",{attrs:{_i:"73-"+s}},[e._v(e._$s("73-"+s,"t0-0",e._s(t.itemname)))]),i("uni-td",{attrs:{_i:"74-"+s}},[i("view",{staticClass:e._$s("75-"+s,"sc","name"),attrs:{_i:"75-"+s}},[e._v(e._$s("75-"+s,"t0-0",e._s(t.unit)))])]),i("uni-td",{attrs:{align:"center",_i:"76-"+s}},[e._v(e._$s("76-"+s,"t0-0",e._s(t.quantity)))]),i("uni-td",{attrs:{align:"center",_i:"77-"+s}},[e._v(e._$s("77-"+s,"t0-0",e._s(t.reason)))])],1)}))],2)],1):e._e(),e._$s(78,"i",e.goodprojectv)?i("view",[i("van-cell",{attrs:{label:"\u7ba1\u5236\u5c08\u6848\u4ee3\u865f:",placeholder:"\u4ee3\u865f",required:!0,_i:79},model:{value:e._$s(79,"v-model",e.form.projectcode),callback:function(t){e.$set(e.form,"projectcode",t)},expression:"form.projectcode"}}),i("uni-row",{attrs:{_i:80}},[i("uni-col",{attrs:{span:12,_i:81}},[i("van-cell",{attrs:{label:"\u4fdd\u5bc6\u5c01\u689d\u7de8\u865f:",placeholder:"\u7de8\u865f1",required:!0,_i:82},model:{value:e._$s(82,"v-model",e.form.sealno),callback:function(t){e.$set(e.form,"sealno",t)},expression:"form.sealno"}})],1),i("uni-col",{attrs:{span:12,_i:83}},[i("van-cell",{attrs:{_i:84},model:{value:e._$s(84,"v-model",e.form.sealno2),callback:function(t){e.$set(e.form,"sealno2",t)},expression:"form.sealno2"}})],1)],1),i("uni-row",{attrs:{_i:85}},[i("uni-col",{attrs:{_i:86}},[i("van-cell",{attrs:{title:"\u5305\u88dd\u7bb1\u7167\u7247(\u53ef\u898b\u5c01\u689d)",_i:87}})],1)],1),i("uni-row",{attrs:{_i:88}},[i("uni-col",{attrs:{_i:89}},[i("uni-image-preview",{attrs:{urls:e.imageUrls,_i:90}}),e._l(e._$s(91,"f",{forItems:e.imageUrls}),(function(t,a,r,s){return i("image",{key:e._$s(91,"f",{forIndex:r,key:a}),attrs:{src:e._$s("91-"+s,"a-src",t),_i:"91-"+s},on:{click:function(t){return e.previewImage(a)}}})}))],2)],1),i("uni-row",{attrs:{_i:92}},[i("uni-col",{attrs:{_i:93}},[i("uni-image-preview",{attrs:{urls:e.imageUrls2,_i:94}}),e._l(e._$s(95,"f",{forItems:e.imageUrls2}),(function(t,a,r,s){return i("image",{key:e._$s(95,"f",{forIndex:r,key:a}),attrs:{src:e._$s("95-"+s,"a-src",t),_i:"95-"+s},on:{click:function(t){return e.previewImage2(a)}}})}))],2)],1),i("uni-table",{ref:"tableproject",attrs:{border:!0,_i:96}},[i("uni-tr",{attrs:{_i:97}},[i("uni-th",{attrs:{width:"150",align:"center",_i:98}},[e._v("")]),i("uni-th",{attrs:{width:"80",align:"center",_i:99}},[e._v("")]),i("uni-th",{attrs:{align:"center",_i:100}},[e._v("")]),i("uni-th",{attrs:{width:"204",align:"center",_i:101}},[e._v("")])],1),e._l(e._$s(102,"f",{forItems:e.form.projects}),(function(t,a,r,s){return i("uni-tr",{key:e._$s(102,"f",{forIndex:r,key:a}),attrs:{_i:"102-"+s}},[i("uni-td",{attrs:{_i:"103-"+s}},[e._v(e._$s("103-"+s,"t0-0",e._s(t.itemname)))]),i("uni-td",{attrs:{_i:"104-"+s}},[i("view",{staticClass:e._$s("105-"+s,"sc","name"),attrs:{_i:"105-"+s}},[e._v(e._$s("105-"+s,"t0-0",e._s(t.unit)))])]),i("uni-td",{attrs:{align:"center",_i:"106-"+s}},[e._v(e._$s("106-"+s,"t0-0",e._s(t.quantity)))]),i("uni-td",{attrs:{align:"center",_i:"107-"+s}},[e._v(e._$s("107-"+s,"t0-0",e._s(t.reason)))])],1)}))],2)],1):e._e(),i("van-field",{directives:[{name:"show",rawName:"v-show",value:e._$s(108,"v-show",!1),expression:"_$s(108,'v-show',false)"}],attrs:{_i:108},model:{value:e._$s(108,"v-model",e.form.returntype),callback:function(t){e.$set(e.form,"returntype",t)},expression:"form.returntype"}}),i("van-field",{directives:[{name:"show",rawName:"v-show",value:e._$s(109,"v-show",!1),expression:"_$s(109,'v-show',false)"}],attrs:{_i:109},model:{value:e._$s(109,"v-model",e.form.checkno),callback:function(t){e.$set(e.form,"checkno",t)},expression:"form.checkno"}})],1):e._e(),i("van-cell",{attrs:{title:"\u5ba1\u6838\u72b6\u6001",_i:110},model:{value:e._$s(110,"v-model",e.titlesv),callback:function(t){e.titlesv=t},expression:"titlesv"}}),i("van-field",{attrs:{_i:111},model:{value:e._$s(111,"v-model",e.form.returntype),callback:function(t){e.$set(e.form,"returntype",t)},expression:"form.returntype"}}),i("van-field",{attrs:{_i:112},model:{value:e._$s(112,"v-model",e.form.returntype),callback:function(t){e.$set(e.form,"returntype",t)},expression:"form.returntype"}}),i("van-tabbar",{staticClass:e._$s(113,"sc","weui-tabbar"),attrs:{"active-color":"#ff4c7f",_i:113},model:{value:e._$s(113,"v-model",e.active),callback:function(t){e.active=t},expression:"active"}},e._l(e._$s(114,"f",{forItems:e.tabbars}),(function(t,a,r,s){return i("van-tabbar-item",{key:e._$s(114,"f",{forIndex:r,key:"tabbar"+a}),attrs:{to:t.name,_i:"114-"+s},on:{click:function(t){return e.tabIndex(a)}},scopedSlots:e._u([{key:"icon",fn:function(e,a,r){return[i("img",{staticStyle:{width:"20px",height:"20px"},attrs:{src:a._$s("117-"+s+"-"+r,"a-src",e.active?t.active:t.normal),_i:"117-"+s+"-"+r}})]}}],null,!0)},[i("span",[e._v(e._$s("115-"+s,"t0-0",e._s(t.title)))])])})),1)],1)},s=[]},b15e:function(e,t,i){"use strict";i.r(t);var a=i("4d1a"),r=i.n(a);for(var s in a)["default"].indexOf(s)<0&&function(e){i.d(t,e,(function(){return a[e]}))}(s);t["default"]=r.a}}]);