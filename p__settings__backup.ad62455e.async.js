(self.webpackChunkant_design_pro=self.webpackChunkant_design_pro||[]).push([[155],{47828:function(){},80914:function(F,b,t){"use strict";t.r(b),t.d(b,{default:function(){return re}});var f=t(49111),D=t(19650),p=t(3182),W=t(34792),g=t(48086),S=t(11849),Y=t(66456),k=t(80818),O=t(2824),Q=t(402),M=t(95574),V=t(71194),$=t(97022),w=t(94043),c=t.n(w),A=t(21010),C=t(67294),d=t(14854),i=t(22811),E=t(51804),s=t(85893),te=function(x){var v,I,Z=function(){var j=(0,p.Z)(c().mark(function P(){return c().wrap(function(y){for(;;)switch(y.prev=y.next){case 0:return y.next=2,(0,E.um)({tablename:x.record.name}).then(function(m){var h,L;return{data:m==null||(h=m.data)===null||h===void 0?void 0:h.list,success:m==null?void 0:m.success,total:m==null||(L=m.data)===null||L===void 0?void 0:L.total}});case 2:return y.abrupt("return",y.sent);case 3:case"end":return y.stop()}},P)}));return function(){return j.apply(this,arguments)}}(),B=[{title:"\u5B57\u6BB5",dataIndex:"COLUMN_NAME"},{title:"\u7C7B\u578B",dataIndex:"COLUMN_TYPE"},{title:"\u9ED8\u8BA4",dataIndex:"COLUMN_DEFAULT"},{title:"\u975E\u7A7A",dataIndex:"IS_NULLABLE"},{title:"\u81EA\u589E",dataIndex:"EXTRA"},{title:"\u5907\u6CE8",ellipsis:!0,dataIndex:"COLUMN_COMMENT"}];return(0,s.jsx)(i.Yr,{submitter:!1,modalProps:{centered:!0,maskClosable:!1,destroyOnClose:!0},open:x.modalOpen,onOpenChange:x.setModalOpen,title:"".concat((v=x.record)===null||v===void 0?void 0:v.name," ").concat((I=x.record)===null||I===void 0?void 0:I.comment),children:(0,s.jsx)(d.QV,{rowKey:"id",search:!1,columns:B,pagination:!1,request:Z,scroll:{y:800},toolBarRender:!1})})},ne=t(46298),ae=t(1870),re=function(){var G=$.Z.confirm,x=M.Z.Text,v=M.Z.Link,I=(0,A.tT)("resize",function(r){return{resize:r.resize}}),Z=I.resize,B=(0,C.useState)(!1),j=(0,O.Z)(B,2),P=j[0],N=j[1],y=(0,C.useState)("backup"),m=(0,O.Z)(y,2),h=m[0],L=m[1],ie=(0,C.useState)(),X=(0,O.Z)(ie,2),ue=X[0],le=X[1],T=(0,C.useRef)(),U={backup:{selection:!1,url:"/system/database/record",pagination:{pageSize:Z.pageSize,hideOnSinglePage:!0}},database:{pagination:!1,url:"/system/database/list",selection:{selections:[k.Z.SELECTION_ALL,k.Z.SELECTION_INVERT,k.Z.SELECTION_NONE]}}},oe=(0,C.useState)(),H=(0,O.Z)(oe,2),R=H[0],J=H[1];(0,C.useEffect)(function(){(R==null?void 0:R.part)&&(0,E.CU)((0,S.Z)({},R)).then(function(r){var n;(r==null?void 0:r.success)&&g.default.success(r.msg),(r==null?void 0:r.data)&&J({gz:(n=r.data)===null||n===void 0?void 0:n.gz,part:r.data.part,start:r.data.start})})},[R]);var se=function(){var r=(0,p.Z)(c().mark(function n(){return c().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,(0,A.WY)(U[h].url,{method:"get"}).then(function(l){var o,u;return{data:l==null||(o=l.data)===null||o===void 0?void 0:o.list,success:l==null?void 0:l.success,total:l==null||(u=l.data)===null||u===void 0?void 0:u.total}});case 2:return a.abrupt("return",a.sent);case 3:case"end":return a.stop()}},n)}));return function(){return r.apply(this,arguments)}}(),ce=function(){var r=(0,p.Z)(c().mark(function n(e){return c().wrap(function(l){for(;;)switch(l.prev=l.next){case 0:return l.next=2,(0,E.LR)({time:e.time}).then(function(o){(o==null?void 0:o.data)&&window.open("/console/public/download?key=".concat(o.data.key))});case 2:case"end":return l.stop()}},n)}));return function(e){return r.apply(this,arguments)}}(),_=function(){var r=(0,p.Z)(c().mark(function n(e){var a;return c().wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return a=e instanceof Array?e.map(function(u){return u.name}):e.name,o.next=3,(0,E.D$)({tables:a}).then(function(u){(u==null?void 0:u.success)&&g.default.success(u.msg)});case 3:case"end":return o.stop()}},n)}));return function(e){return r.apply(this,arguments)}}(),q=function(){var r=(0,p.Z)(c().mark(function n(e){var a;return c().wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return a=e instanceof Array?e.map(function(u){return u.name}):e.name,o.next=3,(0,E.Ru)({tables:a}).then(function(u){(u==null?void 0:u.success)&&g.default.success(u.msg)});case 3:case"end":return o.stop()}},n)}));return function(e){return r.apply(this,arguments)}}(),ee=function(){var r=(0,p.Z)(c().mark(function n(e){var a;return c().wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return a=e instanceof Array?e.map(function(u){return u.name}):e.name,o.next=3,(0,E.tL)({tables:a}).then(function(u){(u==null?void 0:u.success)&&g.default.success(u.msg)});case 3:case"end":return o.stop()}},n)}));return function(e){return r.apply(this,arguments)}}(),de=function(){var r=(0,p.Z)(c().mark(function n(e){return c().wrap(function(l){for(;;)switch(l.prev=l.next){case 0:N(!0),le({name:e.name,comment:e.comment});case 2:case"end":return l.stop()}},n)}));return function(e){return r.apply(this,arguments)}}(),fe=function(n,e){n.stopPropagation(),G({centered:!0,cancelText:"\u7B97\u4E86",title:"\u5F53\u771F\u8981\u5220\u9664?",icon:(0,s.jsx)(ae.Z,{}),cancelButtonProps:{shape:"round"},content:"".concat(e.filename," \u8FD9\u4E2A\u5907\u4EFD\u6587\u4EF6"),okButtonProps:{danger:!0,shape:"round"},onOk:function(){return(0,p.Z)(c().mark(function l(){return c().wrap(function(u){for(;;)switch(u.prev=u.next){case 0:return u.next=2,(0,E.Ao)({filename:e.time}).then(function(z){var K;(K=T.current)===null||K===void 0||K.reload(),(z==null?void 0:z.success)&&g.default.success(z.msg)});case 2:case"end":return u.stop()}},l)}))()}})},ve={backup:[{copyable:!0,title:"\u5907\u4EFD\u6587\u4EF6",dataIndex:"filename"},{copyable:!0,title:"\u6587\u4EF6\u6807\u8BC6",dataIndex:"time"},{title:"\u6587\u4EF6\u5927\u5C0F",dataIndex:"size"},{title:"\u5206\u5377\u6570\u91CF",dataIndex:"part"},{title:"\u6587\u4EF6\u538B\u7F29",dataIndex:"compress"},{title:"\u5907\u4EFD\u65F6\u95F4",dataIndex:"backtime"},{title:"\u64CD\u4F5C",fixed:"right",render:function(n,e){return[(0,s.jsxs)(D.Z,{size:"middle",children:[(0,s.jsx)(v,{onClick:function(){return ce(e)},children:"\u4E0B\u8F7D"},"link_download"),(0,s.jsx)(v,{type:"warning",onClick:function(){return J({part:e.part,time:e.time})},children:"\u6062\u590D"},"link_revert"),(0,s.jsx)(v,{type:"danger",onClick:function(l){return fe(l,e)},children:"\u5220\u9664"},"link_delete")]},"operation")]}}],database:[{copyable:!0,title:"\u6570\u636E\u8868",dataIndex:"name"},{title:"\u8868\u5907\u6CE8",dataIndex:"comment"},{title:"\u8868\u5F15\u64CE",dataIndex:"engine"},{title:"\u5B57\u7B26\u96C6",dataIndex:"collation"},{title:"\u8868\u5927\u5C0F",dataIndex:"size"},{title:"\u8868\u884C\u6570",dataIndex:"rows"},{title:"\u6700\u8FD1\u66F4\u65B0",dataIndex:"update_time"},{title:"\u64CD\u4F5C",fixed:"right",render:function(n,e){return[(0,s.jsxs)(D.Z,{size:"middle",children:[(0,s.jsx)(v,{onClick:function(){return _(e)},children:"\u5907\u4EFD"},"link_backup"),(0,s.jsx)(v,{onClick:function(){return q(e)},children:"\u4FEE\u590D"},"link_repair"),(0,s.jsx)(v,{onClick:function(){return ee(e)},children:"\u4F18\u5316"},"link_optimize"),(0,s.jsx)(v,{onClick:function(){return de(e)},children:"\u67B6\u6784"},"link_detail")]},"operations")]}}]};return(0,s.jsxs)(ne.ZP,{children:[(0,s.jsx)(d.QV,{rowKey:"id",search:!1,actionRef:T,request:se,scroll:Z.tableScroll,columns:ve[h],pagination:U[h].pagination,rowSelection:U[h].selection,toolbar:{menu:{type:"tab",activeKey:h,onChange:function(n){var e,a;(e=T.current)===null||e===void 0||e.clearSelected(),L(n),(a=T.current)===null||a===void 0||a.reload()},items:[{key:"backup",label:"\u5907\u4EFD\u8BB0\u5F55"},{key:"database",label:"\u6570\u636E\u5217\u8868"}]}},tableAlertRender:function(n){var e=n.selectedRowKeys,a=n.onCleanSelected;return(0,s.jsxs)(D.Z,{size:"large",children:[(0,s.jsxs)(x,{children:["\u5DF2\u9009\u62E9 ",e.length," \u9879"]}),(0,s.jsx)(v,{onClick:a,children:"\u53D6\u6D88\u9009\u62E9"})]})},tableAlertOptionRender:function(n){var e=n.selectedRows;return(0,s.jsxs)(D.Z,{size:"large",children:[(0,s.jsx)(v,{onClick:function(){return _(e)},children:"\u5907\u4EFD\u8868"},"backup"),(0,s.jsx)(v,{onClick:function(){return q(e)},children:"\u4FEE\u590D\u8868"},"repair"),(0,s.jsx)(v,{onClick:function(){return ee(e)},children:"\u4F18\u5316\u8868"},"optimize")]},"batchAction")}}),(0,s.jsx)(te,{record:ue,modalOpen:P,setModalOpen:function(n){return N(n)}})]})}},51804:function(F,b,t){"use strict";t.d(b,{um:function(){return g},Ao:function(){return S},D$:function(){return Y},Ru:function(){return k},tL:function(){return O},LR:function(){return Q},LB:function(){return M},Od:function(){return V},e0:function(){return $},pU:function(){return w},rF:function(){return c},mm:function(){return A},CU:function(){return C}});var f=t(36571),D=function(){return getData("/system/database/list")},p=function(){return getData("/system/database/record")},W=function(i){return getData("/system/list",i)},g=function(i){return(0,f.Yu)("/system/database/info",i)},S=function(i){return(0,f.qC)("/system/database/remove",i)},Y=function(i){return(0,f.qC)("/system/database/backup",i)},k=function(i){return(0,f.qC)("/system/database/repair",i)},O=function(i){return(0,f.qC)("/system/database/optimize",i)},Q=function(i){return(0,f.qC)("/system/database/download",i)},M=function(i){return(0,f.qC)("/region/save",i)},V=function(i){return(0,f.qC)("/region/del",i)},$=function(i){return(0,f.Yu)("/system/record",i)},w=function(i){return(0,f.Yu)("/develop/config_data/list",i)},c=function(i){return(0,f.qC)("/develop/config_data/update_list",i)},A=function(i){return(0,f.Yu)("/region/list",i,{useCache:!0,ttl:0})},C=function(i){return(0,f.qC)("/system/database/revert",i)}},402:function(F,b,t){"use strict";var f=t(38663),D=t.n(f),p=t(47828),W=t.n(p),g=t(47673),S=t(22385)}}]);
