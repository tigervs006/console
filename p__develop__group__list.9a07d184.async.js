(self.webpackChunkant_design_pro=self.webpackChunkant_design_pro||[]).push([[253],{78980:function(o,_,e){"use strict";e.d(_,{p:function(){return b}});var i=e(57663),c=e(71577),l=e(49111),v=e(19650),P=e(2824),m=e(402),d=e(95574),p=e(96486),C=e.n(p),x=e(21010),y=e(40245),$=e(61193),W=e.n($),N=e(21940),n=e(22811),t=e(67294),w=e(95357),Z=e(54549),A=e(85008),a=e(85893),b=function(r){var F,Y=d.Z.Text,R=(F=r==null?void 0:r.limit)!==null&&F!==void 0?F:1,G=(0,t.useRef)(),V=(0,t.useState)(0),j=(0,P.Z)(V,2),Q=j[0],k=j[1],B=(0,t.useRef)(null),h=(0,t.useState)(!1),z=(0,P.Z)(h,2),u=z[0],M=z[1],D=(0,t.useState)({left:0,top:0,bottom:0,right:0}),E=(0,P.Z)(D,2),g=E[0],f=E[1],I=(0,x.tT)("file",function(s){return{uploadList:s.uploadList,setUploadList:s.setUploadList}}),L=I.uploadList,re=I.setUploadList,U=(0,x.tT)("attach",function(s){return{open:s.open,span:s.span,setOpen:s.setOpen,isModal:s.isModal,setLimit:s.setLimit,setCateId:s.setCateId,setIsModal:s.setIsModal,setMultiple:s.setMultiple,setPagination:s.setPagination,setExpandedKeys:s.setExpandedKeys}}),ae=U.open,X=U.setOpen,J=U.setLimit,q=U.setCateId,se=U.setIsModal,ee=U.setMultiple,ie=U.span,_e=U.setPagination,te=U.setExpandedKeys;(0,t.useEffect)(function(){J(R),ee(1<R)},[R,J,ee]),(0,t.useEffect)(function(){r.setFieldValue(L==null?void 0:L.map(function(s){return s.url}))},[L]);var oe=function(T,O){var S,K=(S=B.current)===null||S===void 0?void 0:S.getBoundingClientRect(),ne=window.document.documentElement,me=ne.clientWidth,ce=ne.clientHeight;!K||f({top:-K.top+O.y,left:-K.left+O.x,right:me-(K.right-O.x),bottom:ce-(K.bottom-O.y)})},ue=function(T){re(function(O){var S=C().cloneDeep(O);return S.splice(T,1).filter(function(K){return K}),S})},le=function(T){var O;k(T),(O=G.current)===null||O===void 0||O.imagePreview(!0)},de=function(){q([0]),X(!0),te([]),_e({current:1,pageSize:24})};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)(v.Z,{size:"large",className:"ant-image-container",children:[L?L==null?void 0:L.map(function(s,T){return(0,a.jsxs)("div",{className:"ant-image",children:[(0,a.jsx)("img",{src:s.url,alt:s.name,className:"ant-image-img"}),(0,a.jsx)("div",{className:"ant-image-mask",children:(0,a.jsx)(v.Z,{className:"ant-image-mask-info",children:(0,a.jsx)(Y,{className:"anticon",onClick:function(){return le(T)},children:(0,a.jsxs)("p",{children:[(0,a.jsx)(w.Z,{}),"\u9884\u89C8"]})})})}),(0,a.jsx)(c.Z,{shape:"circle",icon:(0,a.jsx)(Z.Z,{style:{fontSize:".8rem"}}),onClick:function(){return ue(T)}})]},s.uid)}):null,R>L.length&&(0,a.jsx)("div",{className:"ant-image-select",children:(0,a.jsx)(A.Z,{id:"select",onClick:function(){return de()}})})]}),(0,a.jsx)(N.e,{ref:G,curIdx:Q,imgList:L}),(0,a.jsx)(n.Yr,{width:960,open:ae,submitter:!1,onOpenChange:function(T){return se(T)},modalProps:{centered:!0,maskClosable:!1,destroyOnClose:!0,afterClose:function(){q([0]),te([]),_e({current:1,pageSize:ie.pageSize})},onCancel:function(){return X(!1)},modalRender:function(T){return(0,a.jsx)(W(),{bounds:g,disabled:u,onStart:function(S,K){return oe(S,K)},children:(0,a.jsx)("div",{ref:B,children:T})})}},title:(0,a.jsx)("div",{style:{width:"100%",cursor:"move"},onMouseOut:function(){M(!0)},onMouseOver:function(){u&&M(!1)},children:"\u6587\u4EF6\u7BA1\u7406"}),children:(0,a.jsx)(y.b,{previewSpan:18,directorySpan:6})})]})}},7446:function(o,_,e){"use strict";e.d(_,{S:function(){return W}});var i=e(77576),c=e(85979),l=e(34792),v=e(48086),P=e(32059),m=e(3182),d=e(2824),p=e(94043),C=e.n(p),x=e(67294),y=e(36571),$=e(85893),W=function(n){var t,w,Z,A,a,b=(t=n==null?void 0:n.fieldKey)!==null&&t!==void 0?t:"status",H=(w=n==null?void 0:n.disabled)!==null&&w!==void 0?w:!1,r=(Z=n==null?void 0:n.echoChecked)!==null&&Z!==void 0?Z:"\u663E\u793A",F=(A=n==null?void 0:n.echoUnChecked)!==null&&A!==void 0?A:"\u9690\u85CF",Y=(0,x.useState)(!1),R=(0,d.Z)(Y,2),G=R[0],V=R[1],j=(a=n==null?void 0:n.statusField)!==null&&a!==void 0?a:n.record.status,Q=function(){var k=(0,m.Z)(C().mark(function B(h,z,u){return C().wrap(function(D){for(;;)switch(D.prev=D.next){case 0:return z.stopPropagation(),V(!0),D.next=4,(0,y.qC)(n.url,(0,P.Z)({id:u.id},b,h?1:0)).then(function(E){V(!1),(E==null?void 0:E.success)&&v.default.success(E.msg)});case 4:case"end":return D.stop()}},B)}));return function(h,z,u){return k.apply(this,arguments)}}();return(0,$.jsx)(c.Z,{loading:G,disabled:H,checkedChildren:r,defaultChecked:!!j,unCheckedChildren:F,onChange:function(B,h){return Q(B,h,n.record)}},n.record.id)}},50506:function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var antd_es_table_style__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(66456),antd_es_table__WEBPACK_IMPORTED_MODULE_25__=__webpack_require__(80818),D_website_brandManage_node_modules_umijs_babel_preset_umi_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_23__=__webpack_require__(11849),D_website_brandManage_node_modules_umijs_babel_preset_umi_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_22__=__webpack_require__(86582),antd_es_space_style__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(49111),antd_es_space__WEBPACK_IMPORTED_MODULE_18__=__webpack_require__(19650),antd_es_button_style__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(57663),antd_es_button__WEBPACK_IMPORTED_MODULE_19__=__webpack_require__(71577),antd_es_message_style__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(34792),antd_es_message__WEBPACK_IMPORTED_MODULE_17__=__webpack_require__(48086),D_website_brandManage_node_modules_umijs_babel_preset_umi_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_16__=__webpack_require__(3182),antd_es_modal_style__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(71194),antd_es_modal__WEBPACK_IMPORTED_MODULE_14__=__webpack_require__(97022),D_website_brandManage_node_modules_umijs_babel_preset_umi_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_13__=__webpack_require__(2824),D_website_brandManage_node_modules_umijs_babel_preset_umi_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(94043),D_website_brandManage_node_modules_umijs_babel_preset_umi_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_5___default=__webpack_require__.n(D_website_brandManage_node_modules_umijs_babel_preset_umi_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_5__),react__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(67294),_ant_design_pro_table__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__(14854),_modules_createData__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__(93707),umi__WEBPACK_IMPORTED_MODULE_12__=__webpack_require__(21010),_ant_design_pro_layout__WEBPACK_IMPORTED_MODULE_24__=__webpack_require__(46298),_pages_components_RecordSwitch__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__(7446),_services__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__(54321),_ant_design_icons__WEBPACK_IMPORTED_MODULE_15__=__webpack_require__(1870),_ant_design_icons__WEBPACK_IMPORTED_MODULE_20__=__webpack_require__(8212),_ant_design_icons__WEBPACK_IMPORTED_MODULE_21__=__webpack_require__(73171),_ant_design_icons__WEBPACK_IMPORTED_MODULE_26__=__webpack_require__(49101),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__=__webpack_require__(85893);__webpack_exports__.default=function(){var _history$location$que,id=(_history$location$que=umi__WEBPACK_IMPORTED_MODULE_12__.m8.location.query)===null||_history$location$que===void 0?void 0:_history$location$que.id,createRef=(0,react__WEBPACK_IMPORTED_MODULE_6__.useRef)(),_useModel=(0,umi__WEBPACK_IMPORTED_MODULE_12__.tT)("resize",function(o){return{resize:o.resize}}),resize=_useModel.resize,_useState=(0,react__WEBPACK_IMPORTED_MODULE_6__.useState)(),_useState2=(0,D_website_brandManage_node_modules_umijs_babel_preset_umi_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_13__.Z)(_useState,2),records=_useState2[0],setRecords=_useState2[1],_useState3=(0,react__WEBPACK_IMPORTED_MODULE_6__.useState)(!1),_useState4=(0,D_website_brandManage_node_modules_umijs_babel_preset_umi_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_13__.Z)(_useState3,2),create=_useState4[0],setCreate=_useState4[1],_useState5=(0,react__WEBPACK_IMPORTED_MODULE_6__.useState)(),_useState6=(0,D_website_brandManage_node_modules_umijs_babel_preset_umi_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_13__.Z)(_useState5,2),currentPageSize=_useState6[0],setCurrentPageSize=_useState6[1],_useState7=(0,react__WEBPACK_IMPORTED_MODULE_6__.useState)(),_useState8=(0,D_website_brandManage_node_modules_umijs_babel_preset_umi_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_13__.Z)(_useState7,2),tableColumns=_useState8[0],setTableColumns=_useState8[1],ref=(0,react__WEBPACK_IMPORTED_MODULE_6__.useRef)(),_useState9=(0,react__WEBPACK_IMPORTED_MODULE_6__.useState)([]),_useState10=(0,D_website_brandManage_node_modules_umijs_babel_preset_umi_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_13__.Z)(_useState9,2),formColumns=_useState10[0],setFormColumns=_useState10[1],handleCreate=function(){var _;setCreate(!0),setRecords(void 0),(_=createRef.current)===null||_===void 0||_.setModal(!0)},handleEdit=function(_){var e;setRecords(_),setCreate(!1),(e=createRef.current)===null||e===void 0||e.setModal(!0)},handleDelete=function(_){var e=[],i=[];_ instanceof Array&&_.forEach(function(c){var l;e.push(c.id),i.push((l=c==null?void 0:c.name)!==null&&l!==void 0?l:"")}),antd_es_modal__WEBPACK_IMPORTED_MODULE_14__.Z.confirm({centered:!0,cancelText:"\u7B97\u4E86",title:"\u5F53\u771F\u8981\u5220\u9664?",icon:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_ant_design_icons__WEBPACK_IMPORTED_MODULE_15__.Z,{}),cancelButtonProps:{shape:"round"},okButtonProps:{danger:!0,shape:"round"},content:_ instanceof Array?"".concat(i.slice(0,3).join("\uFF0C")," \u7B49 ").concat(i.length," \u4E2A\u6570\u636E\u8BB0\u5F55"):"".concat(_.name," \u8FD9\u4E2A\u6570\u636E\u8BB0\u5F55"),onOk:function(){return(0,D_website_brandManage_node_modules_umijs_babel_preset_umi_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_16__.Z)(D_website_brandManage_node_modules_umijs_babel_preset_umi_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_5___default().mark(function l(){return D_website_brandManage_node_modules_umijs_babel_preset_umi_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_5___default().wrap(function(P){for(;;)switch(P.prev=P.next){case 0:return P.next=2,(0,_services__WEBPACK_IMPORTED_MODULE_10__.qv)({id:_ instanceof Array?e:_.id}).then(function(m){var d;(m==null?void 0:m.success)&&antd_es_message__WEBPACK_IMPORTED_MODULE_17__.default.success(m.msg),_ instanceof Array&&((d=ref.current)===null||d===void 0||d.clearSelected())}).finally(function(){var m;return(m=ref.current)===null||m===void 0?void 0:m.reload()});case 2:case"end":return P.stop()}},l)}))()},onCancel:function(){var l;_ instanceof Array&&((l=ref.current)===null||l===void 0||l.clearSelected())}})},defaultColumns=[{width:80,title:"\u5E8F\u53F7",dataIndex:"id"},{title:"\u72B6\u6001",filters:!0,hideInSearch:!0,dataIndex:"status",valueType:"select",valueEnum:{0:{text:"\u7981\u7528"},1:{text:"\u542F\u7528"}},render:function(_,e){return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_pages_components_RecordSwitch__WEBPACK_IMPORTED_MODULE_9__.S,{record:e,url:"/develop/group_data/status",echoChecked:"\u542F\u7528",echoUnChecked:"\u7981\u7528"})}},{sorter:!0,title:"\u521B\u5EFA\u65F6\u95F4",hideInForm:!0,hideInSearch:!0,dataIndex:"create_time"},{title:"\u521B\u5EFA\u65F6\u95F4",hideInTable:!0,dataIndex:"create_time",valueType:"dateTimeRange"},{sorter:!0,title:"\u66F4\u65B0\u65F6\u95F4",hideInForm:!0,hideInSearch:!0,dataIndex:"update_time"},{title:"\u66F4\u65B0\u65F6\u95F4",hideInTable:!0,dataIndex:"update_time",valueType:"dateTimeRange"},{title:"\u64CD\u4F5C",hideInSearch:!0,render:function(_,e){return[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)(antd_es_space__WEBPACK_IMPORTED_MODULE_18__.Z,{size:4,children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(antd_es_button__WEBPACK_IMPORTED_MODULE_19__.Z,{size:"small",shape:"round",icon:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_ant_design_icons__WEBPACK_IMPORTED_MODULE_20__.Z,{}),onClick:function(){return handleEdit(e)},children:"\u7F16\u8F91"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(antd_es_button__WEBPACK_IMPORTED_MODULE_19__.Z,{danger:!0,size:"small",type:"primary",shape:"round",icon:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_ant_design_icons__WEBPACK_IMPORTED_MODULE_21__.Z,{}),onClick:function(){return handleDelete(e)},children:"\u5220\u9664"})]},"operation")]}}];(0,umi__WEBPACK_IMPORTED_MODULE_12__.QT)(_services__WEBPACK_IMPORTED_MODULE_10__.Ge,{defaultParams:[{id}],onSuccess:function(res){var _res$info$formProps,_res$info,_res$info$tableProps,_res$info2,formProps=(_res$info$formProps=res==null||(_res$info=res.info)===null||_res$info===void 0?void 0:_res$info.formProps)!==null&&_res$info$formProps!==void 0?_res$info$formProps:[],tableProps=(_res$info$tableProps=res==null||(_res$info2=res.info)===null||_res$info2===void 0?void 0:_res$info2.tableProps)!==null&&_res$info$tableProps!==void 0?_res$info$tableProps:[];formProps==null||formProps.map(function(item){var _item$colProps,_item$formItemProps,_item$formItemProps2;if(item!=null&&(_item$colProps=item.colProps)!==null&&_item$colProps!==void 0&&_item$colProps.at(0)?item.colProps=JSON.parse(item.colProps.at(0)):item==null||delete item.colProps,item!=null&&item.transform&&(item.transform=eval(item.transform)),item!=null&&item.convertValue&&(item.convertValue=eval(item.convertValue)),item!=null&&item.required&&(item.formItemProps={rules:[{required:!0,message:"".concat(item.title,"\u4E0D\u5F97\u4E3A\u7A7A")}]}),item!=null&&item.rules&&item!==null&&item!==void 0&&(_item$formItemProps=item.formItemProps)!==null&&_item$formItemProps!==void 0&&_item$formItemProps.rules){var _item$formItemProps$r;(_item$formItemProps$r=item.formItemProps.rules).push.apply(_item$formItemProps$r,(0,D_website_brandManage_node_modules_umijs_babel_preset_umi_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_22__.Z)(item.rules.map(function(o){return{pattern:new RegExp(o.pattern.at(0)),message:o.message}})))}item!=null&&item.rules&&!(item!=null&&(_item$formItemProps2=item.formItemProps)!==null&&_item$formItemProps2!==void 0&&_item$formItemProps2.rules)&&(item.formItemProps={rules:item.rules.map(function(o){return{pattern:new RegExp(o.pattern.at(0)),message:o.message}})}),item==null||delete item.rules,item==null||delete item.required,item==null||delete item.transform,item==null||delete item.convertValue}),setFormColumns(formProps),setTableColumns(function(){return defaultColumns.splice.apply(defaultColumns,[1,0].concat((0,D_website_brandManage_node_modules_umijs_babel_preset_umi_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_22__.Z)(tableProps))),defaultColumns})}});var tableData=function(){var o=(0,D_website_brandManage_node_modules_umijs_babel_preset_umi_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_16__.Z)(D_website_brandManage_node_modules_umijs_babel_preset_umi_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_5___default().mark(function _(e,i,c){var l,v;return D_website_brandManage_node_modules_umijs_babel_preset_umi_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_5___default().wrap(function(m){for(;;)switch(m.prev=m.next){case 0:l=(0,D_website_brandManage_node_modules_umijs_babel_preset_umi_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_23__.Z)((0,D_website_brandManage_node_modules_umijs_babel_preset_umi_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_23__.Z)((0,D_website_brandManage_node_modules_umijs_babel_preset_umi_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_23__.Z)({},e),i),c);for(v in l)(l[v]===""||l[v]===null||l[v]===void 0)&&delete l[v];return m.next=4,(0,_services__WEBPACK_IMPORTED_MODULE_10__.LL)(l).then(function(d){var p,C;return{success:d==null?void 0:d.success,data:d==null||(p=d.data)===null||p===void 0?void 0:p.list,total:d==null||(C=d.data)===null||C===void 0?void 0:C.total}});case 4:return m.abrupt("return",m.sent);case 5:case"end":return m.stop()}},_)}));return function(e,i,c){return o.apply(this,arguments)}}();return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)(_ant_design_pro_layout__WEBPACK_IMPORTED_MODULE_24__.ZP,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_ant_design_pro_table__WEBPACK_IMPORTED_MODULE_7__.QV,{actionRef:ref,request:tableData,params:{gid:id},columns:tableColumns,search:{filterType:"light"},scroll:resize.tableScroll,rowKey:function(_){return _.id},onChange:function(_){return setCurrentPageSize(_.pageSize)},rowSelection:{selections:[antd_es_table__WEBPACK_IMPORTED_MODULE_25__.Z.SELECTION_ALL,antd_es_table__WEBPACK_IMPORTED_MODULE_25__.Z.SELECTION_INVERT]},pagination:{pageSize:currentPageSize!=null?currentPageSize:resize.pageSize,hideOnSinglePage:!0},headerTitle:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(antd_es_button__WEBPACK_IMPORTED_MODULE_19__.Z,{shape:"round",type:"primary",icon:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_ant_design_icons__WEBPACK_IMPORTED_MODULE_26__.Z,{}),onClick:function(){return handleCreate()},children:"\u65B0\u589E\u8BB0\u5F55"},"clientCreate"),tableAlertRender:function(_){var e=_.selectedRowKeys,i=_.onCleanSelected;return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(antd_es_space__WEBPACK_IMPORTED_MODULE_18__.Z,{size:24,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("span",{children:["\u5DF2\u9009 ",e.length," \u9879",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("a",{style:{marginLeft:8},onClick:i,children:"\u53D6\u6D88\u9009\u62E9"})]})})},tableAlertOptionRender:function(_){var e=_.selectedRows;return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(antd_es_space__WEBPACK_IMPORTED_MODULE_18__.Z,{size:16,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("a",{onClick:function(){return handleDelete(e)},children:"\u6279\u91CF\u5220\u9664"})})}}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_modules_createData__WEBPACK_IMPORTED_MODULE_8__.D,{ref:createRef,record:records,isCreate:create,formColumns,gid:id,reloadTable:function(){var _;return(_=ref.current)===null||_===void 0?void 0:_.reload()}})]})}},93707:function(o,_,e){"use strict";e.d(_,{D:function(){return H}});var i=e(71194),c=e(97022),l=e(13062),v=e(71230),P=e(11849),m=e(34792),d=e(48086),p=e(3182),C=e(2824),x=e(402),y=e(95574),$=e(94043),W=e.n($),N=e(21010),n=e(54321),t=e(8212),w=e(22811),Z=e(78980),A=e(75860),a=e(67294),b=e(85893),H=(0,a.forwardRef)(function(r,F){var Y=y.Z.Text,R=(0,a.useRef)(),G=r.isCreate?"\u65B0\u589E\u8BB0\u5F55":"\u7F16\u8F91\u8BB0\u5F55",V=(0,N.tT)("file",function(u){return{setUploadList:u.setUploadList}}),j=V.setUploadList,Q=(0,a.useState)(!1),k=(0,C.Z)(Q,2),B=k[0],h=k[1];(0,a.useImperativeHandle)(F,function(){return{setModal:h}}),(0,a.useEffect)(function(){var u;if(r.formColumns.forEach(function(g){(g.valueType==="upload"||g.valueType==="uploads")&&(u=g.dataIndex)}),r!=null&&r.record){for(var M in r.record)if(u&&M===u){var D,E=r.record[M];j((D=E==null?void 0:E.map(function(g){var f;return{url:g,status:"done",uid:(0,A.O1)(4),name:(f=(0,A.BX)(g))!==null&&f!==void 0?f:""}}))!==null&&D!==void 0?D:[])}}},[r.record,r.formColumns,j]),r.formColumns.map(function(u){(u.valueType==="upload"||u.valueType==="uploads")&&(u.renderFormItem=function(M,D,E){var g=u.valueType==="uploads"?10:void 0;return(0,b.jsx)(Z.p,{limit:g,setFieldValue:function(I){return E.setFieldValue([u.dataIndex],I)}})})});var z=function(){var u=(0,p.Z)(W().mark(function M(D){var E;return W().wrap(function(f){for(;;)switch(f.prev=f.next){case 0:if(r!=null&&r.gid){f.next=2;break}return f.abrupt("return",new Promise(function(I){d.default.error("\u7F3A\u5931\u5173\u952E\u53C2\u6570\uFF1Agid"),I(!1)}));case 2:return f.next=4,(0,n.hW)((0,P.Z)((0,P.Z)({},D),{},{id:r==null||(E=r.record)===null||E===void 0?void 0:E.id,gid:r==null?void 0:r.gid})).then(function(I){(I==null?void 0:I.success)&&d.default.success(I.msg),(0,A.pQ)(2e3).then(function(){return r.reloadTable()})}).finally(function(){return h(!1)});case 4:return f.abrupt("return",f.sent);case 5:case"end":return f.stop()}},M)}));return function(D){return u.apply(this,arguments)}}();return(0,b.jsx)(c.Z,{centered:!0,width:500,footer:!1,destroyOnClose:!0,open:B,maskClosable:!1,title:(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(t.Z,{}),(0,b.jsxs)(Y,{children:[" ",G]})]}),onCancel:function(){return h(!1)},afterClose:function(){return j([])},children:(0,b.jsx)(w.l,{grid:!0,layoutType:"Form",formRef:R,rowProps:{gutter:[8,0]},onFinish:z,colProps:{span:24},columns:r.formColumns,validateTrigger:["onBlur"],initialValues:r==null?void 0:r.record,submitter:{submitButtonProps:{shape:"round"},searchConfig:{resetText:"\u91CD\u7F6E"},resetButtonProps:{shape:"round",type:"default",onClick:function(){var M;return(M=R.current)===null||M===void 0?void 0:M.resetFields()}},render:function(M,D){return(0,b.jsx)(v.Z,{justify:"end",style:{gap:"8px"},children:D})}}})})})},54321:function(o,_,e){"use strict";e.d(_,{ZF:function(){return c},Ge:function(){return l},tN:function(){return v},X8:function(){return P},qv:function(){return m},hW:function(){return d},LL:function(){return p},ei:function(){return C},DM:function(){return x},zQ:function(){return y},_7:function(){return $},r1:function(){return W},gw:function(){return N}});var i=e(36571),c=function(t){return(0,i.qC)("/develop/group/save",t)},l=function(t){return(0,i.Yu)("/develop/group/info",t)},v=function(t){return(0,i.qC)("/develop/group/delete",t)},P=function(t){return(0,i.Yu)("/develop/group/list",t)},m=function(t){return(0,i.qC)("/develop/group_data/delete",t)},d=function(t){return(0,i.qC)("/develop/group_data/save",t)},p=function(t){return(0,i.Yu)("/develop/group_data/list",t)},C=function(t){return(0,i.qC)("/develop/config/save",t)},x=function(t){return(0,i.Yu)("/develop/config/list",t)},y=function(t){return(0,i.qC)("/develop/config/delete",t)},$=function(t){return(0,i.qC)("/develop/config_data/save",t)},W=function(t){return(0,i.Yu)("/develop/config_data/list",t)},N=function(t){return(0,i.qC)("/develop/config_data/delete",t)}}}]);