(self.webpackChunkant_design_pro=self.webpackChunkant_design_pro||[]).push([[421],{7446:function(q,O,e){"use strict";e.d(O,{S:function(){return B}});var c=e(77576),D=e(85979),w=e(34792),p=e(48086),j=e(32059),E=e(3182),m=e(2824),Z=e(94043),R=e.n(Z),$=e(67294),I=e(36571),g=e(85893),B=function(n){var a,h,K,y,U,L=(a=n==null?void 0:n.fieldKey)!==null&&a!==void 0?a:"status",W=(h=n==null?void 0:n.disabled)!==null&&h!==void 0?h:!1,N=(K=n==null?void 0:n.echoChecked)!==null&&K!==void 0?K:"\u663E\u793A",G=(y=n==null?void 0:n.echoUnChecked)!==null&&y!==void 0?y:"\u9690\u85CF",Q=(0,$.useState)(!1),F=(0,m.Z)(Q,2),H=F[0],l=F[1],V=(U=n==null?void 0:n.statusField)!==null&&U!==void 0?U:n.record.status,S=function(){var Y=(0,E.Z)(R().mark(function C(T,x,A){return R().wrap(function(v){for(;;)switch(v.prev=v.next){case 0:return x.stopPropagation(),l(!0),v.next=4,(0,I.qC)(n.url,(0,j.Z)({id:A.id},L,T?1:0)).then(function(b){l(!1),(b==null?void 0:b.success)&&p.default.success(b.msg)});case 4:case"end":return v.stop()}},C)}));return function(T,x,A){return Y.apply(this,arguments)}}();return(0,g.jsx)(D.Z,{loading:H,disabled:W,checkedChildren:N,defaultChecked:!!V,unCheckedChildren:G,onChange:function(C,T){return S(C,T,n.record)}},n.record.id)}},15617:function(q,O,e){"use strict";e.r(O);var c=e(66456),D=e(80818),w=e(49111),p=e(19650),j=e(57663),E=e(71577),m=e(11849),Z=e(71194),R=e(97022),$=e(34792),I=e(48086),g=e(3182),B=e(2824),z=e(94043),n=e.n(z),a=e(21010),h=e(67294),K=e(46298),y=e(14854),U=e(7446),L=e(75860),W=e(54321),N=e(1870),G=e(8212),Q=e(34707),F=e(73171),H=e(49101),l=e(85893);O.default=function(){var V={status:1,name:"routine_",cname:"\u57FA\u672C\u914D\u7F6E",id:(0,L.O1)(4)},S=(0,h.useRef)(),Y=(0,a.tT)("resize",function(_){return{resize:_.resize}}),C=Y.resize,T=(0,h.useState)([]),x=(0,B.Z)(T,2),A=x[0],ee=x[1],v=(0,h.useRef)(),b=function(){var _=(0,g.Z)(n().mark(function u(t){return n().wrap(function(i){for(;;)switch(i.prev=i.next){case 0:return i.next=2,(0,W.ei)(t).then(function(r){(r==null?void 0:r.success)&&I.default.success(r.msg),(r==null?void 0:r.success)&&(0,L.pQ)(2e3).then(function(){var o;return(o=v.current)===null||o===void 0?void 0:o.reload()})});case 2:case"end":return i.stop()}},u)}));return function(t){return _.apply(this,arguments)}}(),te=function(u){a.m8.push({pathname:"/develop/config/list",query:{id:u.toString()}})},ne=function(u,t){u.stopPropagation();var s=[],i=[];t instanceof Array&&t.forEach(function(r){var o;s.push(r.id),i.push((o=r==null?void 0:r.cname)!==null&&o!==void 0?o:"")}),R.Z.confirm({centered:!0,cancelText:"\u7B97\u4E86",title:"\u5F53\u771F\u8981\u5220\u9664?",icon:(0,l.jsx)(N.Z,{}),cancelButtonProps:{shape:"round"},okButtonProps:{danger:!0,shape:"round"},content:t instanceof Array?"".concat(i.slice(0,3).join("\uFF0C")," \u7B49 ").concat(i.length," \u4E2A\u914D\u7F6E\u5206\u7C7B"):"".concat(t.name," \u8FD9\u4E2A\u914D\u7F6E\u5206\u7C7B"),onOk:function(){return(0,g.Z)(n().mark(function o(){return n().wrap(function(f){for(;;)switch(f.prev=f.next){case 0:return f.next=2,(0,W.zQ)({id:t instanceof Array?s:t.id}).then(function(d){var P;(d==null?void 0:d.success)&&I.default.success(d.msg),t instanceof Array&&((P=v.current)===null||P===void 0||P.clearSelected()),(d==null?void 0:d.success)&&(0,L.pQ)(2e3).then(function(){var M;return(M=v.current)===null||M===void 0?void 0:M.reload()})});case 2:case"end":return f.stop()}},o)}))()},onCancel:function(){var o;t instanceof Array&&((o=v.current)===null||o===void 0||o.clearSelected())}})},ae=function(){var _=(0,g.Z)(n().mark(function u(t,s,i){var r,o;return n().wrap(function(f){for(;;)switch(f.prev=f.next){case 0:r=(0,m.Z)((0,m.Z)((0,m.Z)({},t),s),i);for(o in r)(r[o]===""||r[o]===null||r[o]===void 0)&&delete r[o];return f.next=4,(0,W.DM)(r).then(function(d){var P,M,X,J,k;return{data:(P=d==null||(M=d.data)===null||M===void 0?void 0:M.list)!==null&&P!==void 0?P:[],total:(X=d==null||(J=d.data)===null||J===void 0?void 0:J.total)!==null&&X!==void 0?X:0,success:(k=d==null?void 0:d.success)!==null&&k!==void 0?k:!0}});case 4:return f.abrupt("return",f.sent);case 5:case"end":return f.stop()}},u)}));return function(t,s,i){return _.apply(this,arguments)}}(),re=[{title:"\u5E8F\u53F7",readonly:!0,dataIndex:"id"},{title:"\u5206\u7C7B\u540D\u79F0",dataIndex:"cname",hideInSearch:!0,formItemProps:function(){return{rules:[{required:!0,message:"\u5206\u7C7B\u540D\u79F0\u4E3A\u5FC5\u586B\u9879"}]}},fieldProps:{onBlur:function(u){var t,s,i=(t=S.current)===null||t===void 0?void 0:t.getRowData(A.toString()),r=(0,L.Qh)(u.target.value).replace(/\s+/g,"");typeof i.id=="string"&&((s=S.current)===null||s===void 0||s.setRowData(A.toString(),{name:"routine_".concat(r)}))}}},{title:"\u5206\u7C7B\u540D\u79F0",hideInTable:!0,dataIndex:"cname"},{title:"\u5206\u7C7B\u522B\u540D",dataIndex:"name",hideInSearch:!0,formItemProps:function(){return{rules:[{required:!0,message:"\u5206\u7C7B\u522B\u540D\u4E3A\u5FC5\u586B\u9879"}]}}},{sorter:!0,readonly:!0,title:"\u521B\u5EFA\u65F6\u95F4",hideInSearch:!0,dataIndex:"create_time"},{title:"\u521B\u5EFA\u65F6\u95F4",hideInTable:!0,dataIndex:"dateRange",valueType:"dateRange",fieldProps:{showNow:!0,showTime:!0,format:"YYYY-MM-DD HH:mm:ss"}},{filters:!0,onFilter:!0,title:"\u5206\u7C7B\u72B6\u6001",filterMode:"tree",hideInSearch:!0,dataIndex:"status",valueType:"select",valueEnum:{0:{text:"\u7981\u7528",status:"disenabled"},1:{text:"\u542F\u7528",status:"enabled"}},fieldProps:{allowClear:!1,options:[{label:"\u7981\u7528",value:0},{label:"\u542F\u7528",value:1}]},render:function(u,t){return(0,l.jsx)(U.S,{echoChecked:"\u542F\u7528",echoUnChecked:"\u7981\u7528",record:t,url:"/develop/config/status"})}},{title:"\u64CD\u4F5C",valueType:"option",render:function(u,t,s,i){return[(0,l.jsxs)(p.Z,{size:4,children:[(0,l.jsx)(E.Z,{size:"small",shape:"round",icon:(0,l.jsx)(G.Z,{}),onClick:function(){var o;return i==null||(o=i.startEditable)===null||o===void 0?void 0:o.call(i,t.id)},children:"\u7F16\u8F91"}),(0,l.jsx)(E.Z,{size:"small",shape:"round",icon:(0,l.jsx)(Q.Z,{}),onClick:function(){return te(t.id)},children:"\u8BE6\u60C5"}),(0,l.jsx)(E.Z,{danger:!0,size:"small",shape:"round",type:"primary",icon:(0,l.jsx)(F.Z,{}),onClick:function(o){return ne(o,t)},children:"\u5220\u9664"})]},"operation")]}}];return(0,l.jsx)(K.ZP,{children:(0,l.jsx)(y.nx,{rowKey:"id",actionRef:v,columns:re,request:ae,search:{filterType:"light"},editableFormRef:S,recordCreatorProps:!1,scroll:C.tableScroll,editable:{editableKeys:A,type:"multiple",onChange:ee,onSave:function(u,t){return b(t)},actionRender:function(u,t,s){return[s.save,s.cancel]}},pagination:{pageSize:C.pageSize,hideOnSinglePage:!0},rowSelection:{checkStrictly:!1,selections:[D.Z.SELECTION_ALL,D.Z.SELECTION_INVERT,D.Z.SELECTION_NONE]},headerTitle:(0,l.jsx)(E.Z,{shape:"round",type:"primary",icon:(0,l.jsx)(H.Z,{}),onClick:function(){var u,t;return(u=v.current)===null||u===void 0||(t=u.addEditRecord)===null||t===void 0?void 0:t.call(u,V)},children:"\u65B0\u589E\u5206\u7C7B"},"createLink"),tableAlertRender:function(u){var t=u.selectedRowKeys,s=u.onCleanSelected;return(0,l.jsxs)("span",{children:["\u5DF2\u9009 ",t.length," \u4E2A\u5206\u7C7B",(0,l.jsx)("a",{style:{marginLeft:8},onClick:s,children:"\u53D6\u6D88\u9009\u62E9"})]})},tableAlertOptionRender:function(u){var t=u.selectedRows;return(0,l.jsx)(p.Z,{size:16,children:(0,l.jsx)("a",{onClick:function(i){return ne(i,t)},children:"\u6279\u91CF\u5220\u9664"})})}})})}},54321:function(q,O,e){"use strict";e.d(O,{ZF:function(){return D},Ge:function(){return w},tN:function(){return p},X8:function(){return j},qv:function(){return E},hW:function(){return m},LL:function(){return Z},ei:function(){return R},DM:function(){return $},zQ:function(){return I},_7:function(){return g},r1:function(){return B},gw:function(){return z}});var c=e(36571),D=function(a){return(0,c.qC)("/develop/group/save",a)},w=function(a){return(0,c.Yu)("/develop/group/info",a)},p=function(a){return(0,c.qC)("/develop/group/delete",a)},j=function(a){return(0,c.Yu)("/develop/group/list",a)},E=function(a){return(0,c.qC)("/develop/group_data/delete",a)},m=function(a){return(0,c.qC)("/develop/group_data/save",a)},Z=function(a){return(0,c.Yu)("/develop/group_data/list",a)},R=function(a){return(0,c.qC)("/develop/config/save",a)},$=function(a){return(0,c.Yu)("/develop/config/list",a)},I=function(a){return(0,c.qC)("/develop/config/delete",a)},g=function(a){return(0,c.qC)("/develop/config_data/save",a)},B=function(a){return(0,c.Yu)("/develop/config_data/list",a)},z=function(a){return(0,c.qC)("/develop/config_data/delete",a)}}}]);
