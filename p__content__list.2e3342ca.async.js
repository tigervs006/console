(self.webpackChunkant_design_pro=self.webpackChunkant_design_pro||[]).push([[268],{47828:function(){},99882:function(Z,M,e){"use strict";e.d(M,{wk:function(){return O},rQ:function(){return A},V5:function(){return h},Od:function(){return I},mJ:function(){return f},m4:function(){return P},R$:function(){return c}});var o=e(36571),O=function(i){return(0,o.qC)("/channel/save",i)},A=function(i){return(0,o.Yu)("/channel/list",i)},h=function(i){return(0,o.Yu)("/channel/cate",i)},I=function(i){return(0,o.qC)("/channel/del",i)},f=function(i){return(0,o.qC)("/module/save",i)},P=function(i){return(0,o.Yu)("/module/list",i)},c=function(i){return(0,o.qC)("/module/del",i)}},7446:function(Z,M,e){"use strict";e.d(M,{S:function(){return te}});var o=e(77576),O=e(85979),A=e(34792),h=e(48086),I=e(32059),f=e(3182),P=e(2824),c=e(94043),D=e.n(c),i=e(67294),N=e(36571),C=e(85893),te=function(r){var g,S,x,$,b,Q=(g=r==null?void 0:r.fieldKey)!==null&&g!==void 0?g:"status",T=(S=r==null?void 0:r.disabled)!==null&&S!==void 0?S:!1,V=(x=r==null?void 0:r.echoChecked)!==null&&x!==void 0?x:"\u663E\u793A",l=($=r==null?void 0:r.echoUnChecked)!==null&&$!==void 0?$:"\u9690\u85CF",H=(0,i.useState)(!1),B=(0,P.Z)(H,2),G=B[0],y=B[1],J=(b=r==null?void 0:r.statusField)!==null&&b!==void 0?b:r.record.status,j=function(){var F=(0,f.Z)(D().mark(function K(U,w,z){return D().wrap(function(W){for(;;)switch(W.prev=W.next){case 0:return w.stopPropagation(),y(!0),W.next=4,(0,N.qC)(r.url,(0,I.Z)({id:z.id},Q,U?1:0)).then(function(p){y(!1),(p==null?void 0:p.success)&&h.default.success(p.msg)});case 4:case"end":return W.stop()}},K)}));return function(U,w,z){return F.apply(this,arguments)}}();return(0,C.jsx)(O.Z,{loading:G,disabled:T,checkedChildren:V,defaultChecked:!!J,unCheckedChildren:l,onChange:function(K,U){return j(K,U,r.record)}},r.record.id)}},86947:function(Z,M,e){"use strict";e.r(M);var o=e(66456),O=e(80818),A=e(49111),h=e(19650),I=e(57663),f=e(71577),P=e(71153),c=e(60331),D=e(77883),i=e(29149),N=e(93224),C=e(11849),te=e(34792),ne=e(48086),r=e(3182),g=e(2824),S=e(402),x=e(95574),$=e(71194),b=e(97022),Q=e(94043),T=e.n(Q),V=e(30381),l=e.n(V),H=e(14854),B=e(67294),G=e(99882),y=e(21010),J=e(46298),j=e(7524),F=e(7446),K=e(1870),U=e(8212),w=e(76570),z=e(73171),_=e(85893);M.default=function(){var W=b.Z.confirm,p=x.Z.Text,de=(0,y.tT)("resize",function(s){return{resize:s.resize}}),ae=de.resize,oe=(0,B.useState)(),_e=(0,g.Z)(oe,2),ie=_e[0],ce=_e[1],ve=(0,B.useState)(!1),re=(0,g.Z)(ve,2),Ee=re[0],le=re[1],fe=(0,B.useState)([]),ue=(0,g.Z)(fe,2),me=ue[0],he=ue[1],Y=(0,B.useRef)(),De=function(){var s=(0,r.Z)(T().mark(function t(){return T().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,(0,G.V5)({nid:1}).then(function(d){var u,v;return he(d==null||(u=d.data)===null||u===void 0?void 0:u.list),d==null||(v=d.data)===null||v===void 0?void 0:v.list.map(function(R){return{value:R.id,label:R.cname}})});case 2:return n.abrupt("return",n.sent);case 3:case"end":return n.stop()}},t)}));return function(){return s.apply(this,arguments)}}();(0,y.QT)(j.Au,{onSuccess:function(t){var a={};t==null||t.list.map(function(n){a.anonymous={text:"\u4F5A\u540D",status:"anonymous"},a[n.name]={text:n.cname,status:n.name}}),ce(a)}});var Me=function(t){y.m8.push({pathname:"/content/edit",query:{id:t.id.toString()}})},Oe=function(t){var a;me.forEach(function(n){n.id===t.cid&&(a=n.fullpath)}),window.open("/".concat(a).concat(t.id,".html"),"preview")},se=function(t){var a=[],n=[];t instanceof Array&&t.forEach(function(d){a.push(d.id),n.push("\u300A".concat(d.title,"\u300B"))}),W({centered:!0,cancelText:"\u7B97\u4E86",title:"\u5F53\u771F\u8981\u5220\u9664?",icon:(0,_.jsx)(K.Z,{}),cancelButtonProps:{shape:"round"},okButtonProps:{danger:!0,shape:"round"},content:t instanceof Array?"".concat(n.slice(0,3).join("\uFF0C")," \u7B49 ").concat(n.length," \u7BC7\u6587\u6863"):"".concat(t.title," \u8FD9\u7BC7\u6587\u6863"),onOk:function(){return(0,r.Z)(T().mark(function u(){return T().wrap(function(R){for(;;)switch(R.prev=R.next){case 0:return R.next=2,(0,j.Od)({id:t instanceof Array?a:t.id}).then(function(m){var E,L;(E=Y.current)===null||E===void 0||E.reload(),(m==null?void 0:m.success)&&ne.default.success(m.msg),t instanceof Array&&((L=Y.current)===null||L===void 0||L.clearSelected())});case 2:case"end":return R.stop()}},u)}))()},onCancel:function(){var u;t instanceof Array&&((u=Y.current)===null||u===void 0||u.clearSelected())}})},Pe=function(){var s=(0,r.Z)(T().mark(function t(a,n,d){var u,v;return T().wrap(function(m){for(;;)switch(m.prev=m.next){case 0:u=(0,C.Z)((0,C.Z)((0,C.Z)({},a),n),d);for(v in u)(u[v]===""||u[v]===null||u[v]===void 0)&&delete u[v];return m.next=4,(0,j.rQ)(u).then(function(E){var L,X,k,q,ee;return le(!1),{data:(L=E==null||(X=E.data)===null||X===void 0?void 0:X.list)!==null&&L!==void 0?L:[],total:(k=E==null||(q=E.data)===null||q===void 0?void 0:q.total)!==null&&k!==void 0?k:0,success:(ee=E==null?void 0:E.success)!==null&&ee!==void 0?ee:!0}});case 4:return m.abrupt("return",m.sent);case 5:case"end":return m.stop()}},t)}));return function(a,n,d){return s.apply(this,arguments)}}(),Ce=[{width:80,title:"ID",dataIndex:"id",renderFormItem:function(t,a){var n=a.defaultRender,d=(0,N.Z)(a,["defaultRender"]);return(0,_.jsx)(i.Z,(0,C.Z)((0,C.Z)({},d),{},{placeholder:"\u8BF7\u8F93\u5165\u6587\u6863ID",formatter:function(v){return v.replace(/^(0+)|\D+/g,"")}}))}},{width:150,title:"\u4F5C\u8005",search:!1,filters:!0,onFilter:!0,filterMode:"tree",dataIndex:"author",valueType:"select",valueEnum:(0,C.Z)({},ie)},{width:350,ellipsis:!0,title:"\u6587\u6863\u6807\u9898",dataIndex:"title",fieldProps:{placeholder:"\u8BF7\u8F93\u5165\u5927\u81F4\u7684\u6587\u6863\u6807\u9898"}},{width:150,title:"\u6240\u5C5E\u680F\u76EE",dataIndex:"cid",valueType:"select",request:function(){return De()},fieldProps:{mode:"multiple",maxTagCount:3},render:function(t,a){return a.channel.cname}},{width:150,sorter:!0,search:!1,title:"\u6D4F\u89C8\u603B\u91CF",dataIndex:"click"},{width:200,sorter:!0,title:"\u53D1\u5E03\u65F6\u95F4",hideInSearch:!0,valueType:"dateTime",dataIndex:"create_time"},{title:"\u53D1\u5E03\u65F6\u95F4",hideInTable:!0,valueType:"dateRange",dataIndex:"create_time",search:{transform:function(t){var a,n;return{startTime:(a=t==null?void 0:t[0])!==null&&a!==void 0?a:null,endTime:(n=t==null?void 0:t[1])!==null&&n!==void 0?n:null}}},fieldProps:{showNow:!0,showTime:!0,format:"YYYY-MM-DD HH:mm:ss",placeholder:["\u5F00\u59CB\u65F6\u95F4","\u7ED3\u675F\u65F6\u95F4"],ranges:{Today:[l()(),l()()],Yestoday:[l()().day(l()().day()-1),l()().day(l()().day()-1)],thisWeek:[l()().startOf("week"),l()().endOf("week")],lastWeek:[l()().week(l()().week()-1).startOf("week"),l()().week(l()().week()-1).endOf("week")],thisMonth:[l()().startOf("month"),l()().endOf("month")],lastMonth:[l()().month(l()().month()-1).startOf("month"),l()().month(l()().month()-1).endOf("month")]}}},{width:200,sorter:!0,search:!1,title:"\u66F4\u65B0\u65F6\u95F4",dataIndex:"update_time"},{width:150,search:!1,filters:!0,onFilter:!0,title:"\u53D1\u5E03\u65B9\u5F0F",filterMode:"tree",valueType:"select",dataIndex:"is_collect",valueEnum:{1:{text:"\u91C7\u96C6",status:"Collect"},0:{text:"\u539F\u521B",status:"Origin"}},render:function(t,a){return[a.is_collect?(0,_.jsx)(c.Z,{color:"blue",children:"\u91C7\u96C6"},a.id):(0,_.jsx)(c.Z,{color:"magenta",children:"\u539F\u521B"},a.id)]}},{width:150,search:!1,filters:!0,onFilter:!0,title:"\u6587\u6863\u72B6\u6001",filterMode:"tree",dataIndex:"status",valueType:"select",valueEnum:{1:{text:"\u663E\u793A",status:"Show"},0:{text:"\u9690\u85CF",status:"Hide"}},render:function(t,a){return(0,_.jsx)(F.S,{record:a,url:"/article/status",echoChecked:"\u663E\u793A",echoUnChecked:"\u9690\u85CF"})}},{width:250,title:"\u64CD\u4F5C",search:!1,fixed:"right",render:function(t,a){return[(0,_.jsxs)(h.Z,{size:4,children:[(0,_.jsx)(f.Z,{size:"small",shape:"round",icon:(0,_.jsx)(U.Z,{}),onClick:function(){return Me(a)},children:"\u7F16\u8F91"}),(0,_.jsx)(f.Z,{size:"small",type:"primary",shape:"round",icon:(0,_.jsx)(w.Z,{}),onClick:function(){return Oe(a)},children:"\u6D4F\u89C8"}),(0,_.jsx)(f.Z,{danger:!0,size:"small",type:"primary",shape:"round",icon:(0,_.jsx)(z.Z,{}),onClick:function(){return se(a)},children:"\u5220\u9664"})]},"operation")]}}];return(0,_.jsx)(J.ZP,{children:(0,_.jsx)(H.ZP,{rowKey:"id",actionRef:Y,columns:Ce,request:Pe,scroll:ae.tableScroll,search:{labelWidth:"auto",defaultCollapsed:!1,optionRender:function(t){return[(0,_.jsx)(f.Z,{shape:"round",onClick:function(){var n;return t==null||(n=t.form)===null||n===void 0?void 0:n.resetFields()},children:"\u91CD\u7F6E"},"reset"),(0,_.jsx)(f.Z,{shape:"round",type:"primary",loading:Ee,onClick:function(){var n;le(!0),t==null||(n=t.form)===null||n===void 0||n.submit()},children:"\u67E5\u8BE2"},"query")]}},rowSelection:{selections:[O.Z.SELECTION_ALL,O.Z.SELECTION_INVERT]},pagination:{pageSize:ae.pageSize,hideOnSinglePage:!0},tableAlertRender:function(t){var a=t.selectedRowKeys,n=t.selectedRows,d=t.onCleanSelected;return(0,_.jsxs)(h.Z,{size:24,children:[(0,_.jsxs)("span",{children:["\u5DF2\u9009 ",a.length," \u9879",(0,_.jsx)("a",{style:{marginLeft:8},onClick:d,children:"\u53D6\u6D88\u9009\u62E9"})]}),(0,_.jsxs)("span",{children:["\u603B\u6D4F\u89C8\u91CF ",(0,_.jsx)(p,{type:"danger",children:n&&n.reduce(function(u,v){return u+v.click},0)})," \u6B21"]})]})},tableAlertOptionRender:function(t){var a=t.selectedRows;return(0,_.jsx)(h.Z,{size:16,children:(0,_.jsx)("a",{onClick:function(){return se(a)},children:"\u6279\u91CF\u5220\u9664"})})}})})}},7524:function(Z,M,e){"use strict";e.d(M,{Au:function(){return O},Vj:function(){return A},rQ:function(){return h},L5:function(){return I},Od:function(){return f}});var o=e(36571),O=function(){return(0,o.Yu)("/article/author")},A=function(c){return(0,o.qC)("/article/save",c)},h=function(c){return(0,o.Yu)("/article/list",c)},I=function(c){return(0,o.Yu)("/article",c)},f=function(c){return(0,o.qC)("/article/del",c)}},402:function(Z,M,e){"use strict";var o=e(38663),O=e.n(o),A=e(47828),h=e.n(A),I=e(47673),f=e(22385)}}]);