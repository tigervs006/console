(self.webpackChunkant_design_pro=self.webpackChunkant_design_pro||[]).push([[8299],{47828:function(){},99882:function(Z,P,e){"use strict";e.d(P,{wk:function(){return D},rQ:function(){return C},V5:function(){return f},Od:function(){return g},mJ:function(){return v},m4:function(){return h},R$:function(){return K}});var _=e(36571),D=function(u){return(0,_.qC)("/channel/save",u)},C=function(u){return(0,_.Yu)("/channel/list",u)},f=function(u){return(0,_.Yu)("/channel/cate",u)},g=function(u){return(0,_.qC)("/channel/del",u)},v=function(u){return(0,_.qC)("/module/save",u)},h=function(u){return(0,_.Yu)("/module/list",u)},K=function(u){return(0,_.qC)("/module/del",u)}},7446:function(Z,P,e){"use strict";e.d(P,{S:function(){return _e}});var _=e(77576),D=e(85979),C=e(34792),f=e(48086),g=e(32059),v=e(3182),h=e(2824),K=e(94043),c=e.n(K),u=e(67294),te=e(36571),ne=e(85893),_e=function(s){var S,W,w,y,$,b=(S=s==null?void 0:s.fieldKey)!==null&&S!==void 0?S:"status",j=(W=s==null?void 0:s.disabled)!==null&&W!==void 0?W:!1,ae=(w=s==null?void 0:s.echoChecked)!==null&&w!==void 0?w:"\u663E\u793A",M=(y=s==null?void 0:s.echoUnChecked)!==null&&y!==void 0?y:"\u9690\u85CF",re=(0,u.useState)(!1),i=(0,h.Z)(re,2),F=i[0],z=i[1],Y=($=s==null?void 0:s.statusField)!==null&&$!==void 0?$:s.record.status,V=function(){var x=(0,v.Z)(c().mark(function A(I,N,G){return c().wrap(function(T){for(;;)switch(T.prev=T.next){case 0:return N.stopPropagation(),z(!0),T.next=4,(0,te.qC)(s.url,(0,g.Z)({id:G.id},b,I?1:0)).then(function(B){z(!1),(B==null?void 0:B.success)&&f.default.success(B.msg)});case 4:case"end":return T.stop()}},A)}));return function(I,N,G){return x.apply(this,arguments)}}();return(0,ne.jsx)(D.Z,{"data-inspector-line":"53","data-inspector-column":"8","data-inspector-relative-path":"src\\pages\\components\\RecordSwitch\\index.tsx",loading:F,disabled:j,checkedChildren:ae,defaultChecked:!!Y,unCheckedChildren:M,onChange:function(A,I){return V(A,I,s.record)}},s.record.id)}},86514:function(Z,P,e){"use strict";e.r(P);var _=e(66456),D=e(80818),C=e(49111),f=e(19650),g=e(57663),v=e(71577),h=e(71153),K=e(60331),c=e(11849),u=e(77883),te=e(29149),ne=e(93224),_e=e(34792),ue=e(48086),s=e(3182),S=e(402),W=e(95574),w=e(71194),y=e(97022),$=e(12968),b=e(40610),j=e(2824),ae=e(94043),M=e.n(ae),re=e(30381),i=e.n(re),F=e(21010),z=e(14854),Y=e(75860),V=e(9006),x=e(67294),A=e(99882),I=e(46298),N=e(7446),G=e(1870),ce=e(15873),T=e(8212),B=e(76570),Ee=e(73171),r=e(85893),he=function(L){var se={UMI_ENV:"pre",REACT_APP_ENV:"pre",REACT_APP_PUBLIC_PATH:"/console/",REACT_APP_PREFIX_URL:"https://www.brandsz.cn"}.REACT_APP_PUBLIC_PATH,H=(0,x.useState)(!1),Q=(0,j.Z)(H,2),J=Q[0],X=Q[1],k=function(){return L.album.map(function(U){return(0,r.jsx)(b.Z,{"data-inspector-line":"30","data-inspector-column":"39","data-inspector-relative-path":"src\\pages\\product\\list\\index.tsx",src:U},(0,Y.O1)(4))})};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(b.Z,{"data-inspector-line":"34","data-inspector-column":"12","data-inspector-relative-path":"src\\pages\\product\\list\\index.tsx",width:50,src:L==null?void 0:L.album[0],preview:{visible:!1},onClick:function(){return X(!0)},fallback:"".concat(se,"logo.svg")}),(0,r.jsx)("div",{"data-inspector-line":"41","data-inspector-column":"12","data-inspector-relative-path":"src\\pages\\product\\list\\index.tsx",style:{display:"none"},children:(0,r.jsx)(b.Z.PreviewGroup,{"data-inspector-line":"42","data-inspector-column":"16","data-inspector-relative-path":"src\\pages\\product\\list\\index.tsx",preview:{visible:J,onVisibleChange:function(U){return X(U)}},children:k()})})]})};P.default=function(){var ve=y.Z.confirm,L=W.Z.Text,se=(0,F.tT)("resize",function(l){return{resize:l.resize}}),H=se.resize,Q=(0,x.useState)(!1),J=(0,j.Z)(Q,2),X=J[0],k=J[1],q=(0,x.useState)([]),U=(0,j.Z)(q,2),me=U[0],fe=U[1],ee=(0,x.useRef)(),Pe=function(){var l=(0,s.Z)(M().mark(function t(){return M().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,(0,A.V5)({nid:2}).then(function(o){var d,p;return fe(o==null||(d=o.data)===null||d===void 0?void 0:d.list),o==null||(p=o.data)===null||p===void 0?void 0:p.list.map(function(O){return{value:O.id,label:O.cname}})});case 2:return n.abrupt("return",n.sent);case 3:case"end":return n.stop()}},t)}));return function(){return l.apply(this,arguments)}}(),De=function(t){F.m8.push({pathname:"/product/edit",query:{id:t.id}})},Me=function(t){var a;me.forEach(function(n){n.id===t.pid&&(a=n.fullpath)}),window.open("/".concat(a).concat(t.id,".html"),"preview")},pe=function(t){var a=[],n=[];t instanceof Array&&t.forEach(function(o){a.push(o.id),n.push("\u300A".concat(o.title,"\u300B"))}),ve({centered:!0,cancelText:"\u7B97\u4E86",title:"\u5F53\u771F\u8981\u5220\u9664?",icon:(0,r.jsx)(G.Z,{"data-inspector-line":"113","data-inspector-column":"18","data-inspector-relative-path":"src\\pages\\product\\list\\index.tsx"}),cancelButtonProps:{shape:"round"},okButtonProps:{danger:!0,shape:"round"},content:t instanceof Array?"".concat(n.slice(0,3).join("\uFF0C")," \u7B49 ").concat(n.length," \u4E2A\u5546\u54C1"):"".concat(t.title," \u8FD9\u4E2A\u5546\u54C1"),onOk:function(){return(0,s.Z)(M().mark(function d(){return M().wrap(function(O){for(;;)switch(O.prev=O.next){case 0:return O.next=2,(0,V.Od)({id:t instanceof Array?a:t.id}).then(function(m){var E,R;(E=ee.current)===null||E===void 0||E.reload(),(m==null?void 0:m.success)&&ue.default.success(m.msg),t instanceof Array&&((R=ee.current)===null||R===void 0||R.clearSelected())});case 2:case"end":return O.stop()}},d)}))()},onCancel:function(){var d;t instanceof Array&&((d=ee.current)===null||d===void 0||d.clearSelected())}})},Oe=[{width:80,title:"ID",dataIndex:"id",renderFormItem:function(t,a){var n=a.defaultRender,o=(0,ne.Z)(a,["defaultRender"]);return(0,r.jsx)(te.Z,(0,c.Z)((0,c.Z)({"data-inspector-line":"137","data-inspector-column":"23","data-inspector-relative-path":"src\\pages\\product\\list\\index.tsx"},o),{},{placeholder:"\u8BF7\u8F93\u5165\u6587\u6863ID",formatter:function(p){return p.replace(/^(0+)|\D+/g,"")}}))}},{width:100,search:!1,title:"\u5546\u54C1\u56FE",render:function(t,a){return(0,r.jsx)(he,{"data-inspector-line":"144","data-inspector-column":"35","data-inspector-relative-path":"src\\pages\\product\\list\\index.tsx",album:a.album})}},{width:300,ellipsis:!0,title:"\u5546\u54C1\u540D\u79F0",dataIndex:"title",fieldProps:{placeholder:"\u8BF7\u8F93\u5165\u5927\u81F4\u7684\u5546\u54C1\u540D\u79F0"}},{width:150,title:"\u5546\u54C1\u5206\u7C7B",dataIndex:"pid",valueType:"select",request:function(){return Pe()},fieldProps:{mode:"multiple",maxTagCount:3},render:function(t,a){return a.channel.cname}},{width:336,search:!1,ellipsis:!0,title:"\u5546\u54C1\u5356\u70B9",dataIndex:"special",render:function(t,a){return a.special.map(function(n){return(0,r.jsx)(K.Z,{"data-inspector-line":"170","data-inspector-column":"20","data-inspector-relative-path":"src\\pages\\product\\list\\index.tsx",color:"red",icon:(0,r.jsx)(ce.Z,{"data-inspector-line":"170","data-inspector-column":"65","data-inspector-relative-path":"src\\pages\\product\\list\\index.tsx"}),children:n},(0,Y.O1)(4))})}},{title:"\u4E0A\u67B6\u65F6\u95F4",hideInTable:!0,valueType:"dateRange",dataIndex:"dateRange",fieldProps:{showNow:!0,showTime:!0,format:"YYYY-MM-DD HH:mm:ss",placeholder:["\u5F00\u59CB\u65F6\u95F4","\u7ED3\u675F\u65F6\u95F4"],ranges:{Today:[i()(),i()()],Yestoday:[i()().day(i()().day()-1),i()().day(i()().day()-1)],thisWeek:[i()().startOf("week"),i()().endOf("week")],lastWeek:[i()().week(i()().week()-1).startOf("week"),i()().week(i()().week()-1).endOf("week")],thisMonth:[i()().startOf("month"),i()().endOf("month")],lastMonth:[i()().month(i()().month()-1).startOf("month"),i()().month(i()().month()-1).endOf("month")]}}},{width:150,sorter:!0,search:!1,title:"\u603B\u6D4F\u89C8\u91CF",dataIndex:"click"},{width:150,sorter:!0,search:!1,title:"\u5546\u54C1\u4EF7\u683C",dataIndex:"price",render:function(t,a){return"\uFFE5 ".concat(a.price)}},{width:150,sorter:!0,search:!1,title:"\u5546\u54C1\u9500\u91CF",dataIndex:"sales"},{width:150,sorter:!0,search:!1,title:"\u5546\u54C1\u8BE2\u76D8",dataIndex:"inquiries"},{width:150,sorter:!0,search:!1,title:"\u5546\u54C1\u5E93\u5B58",dataIndex:"stock"},{width:150,search:!1,filters:!0,onFilter:!0,title:"\u5546\u54C1\u72B6\u6001",filterMode:"tree",dataIndex:"status",valueType:"select",valueEnum:{1:{text:"\u4E0A\u67B6",status:"Enabled"},0:{text:"\u4E0B\u67B6",status:"Disabled"}},render:function(t,a){return(0,r.jsx)(N.S,{"data-inspector-line":"266","data-inspector-column":"23","data-inspector-relative-path":"src\\pages\\product\\list\\index.tsx",record:a,url:"/product/status",echoChecked:"\u4E0A\u67B6",echoUnChecked:"\u4E0B\u67B6"})}},{width:250,title:"\u64CD\u4F5C",search:!1,fixed:"right",render:function(t,a){return[(0,r.jsxs)(f.Z,{"data-inspector-line":"275","data-inspector-column":"16","data-inspector-relative-path":"src\\pages\\product\\list\\index.tsx",size:4,children:[(0,r.jsx)(v.Z,{"data-inspector-line":"276","data-inspector-column":"20","data-inspector-relative-path":"src\\pages\\product\\list\\index.tsx",size:"small",shape:"round",icon:(0,r.jsx)(T.Z,{"data-inspector-line":"276","data-inspector-column":"61","data-inspector-relative-path":"src\\pages\\product\\list\\index.tsx"}),onClick:function(){return De(a)},children:"\u7F16\u8F91"}),(0,r.jsx)(v.Z,{"data-inspector-line":"279","data-inspector-column":"20","data-inspector-relative-path":"src\\pages\\product\\list\\index.tsx",size:"small",type:"primary",shape:"round",icon:(0,r.jsx)(B.Z,{"data-inspector-line":"279","data-inspector-column":"76","data-inspector-relative-path":"src\\pages\\product\\list\\index.tsx"}),onClick:function(){return Me(a)},children:"\u6D4F\u89C8"}),(0,r.jsx)(v.Z,{"data-inspector-line":"282","data-inspector-column":"20","data-inspector-relative-path":"src\\pages\\product\\list\\index.tsx",danger:!0,size:"small",type:"primary",shape:"round",icon:(0,r.jsx)(Ee.Z,{"data-inspector-line":"282","data-inspector-column":"83","data-inspector-relative-path":"src\\pages\\product\\list\\index.tsx"}),onClick:function(){return pe(a)},children:"\u5220\u9664"})]},"operation")]}}],Ce=function(){var l=(0,s.Z)(M().mark(function t(a,n,o){var d,p;return M().wrap(function(m){for(;;)switch(m.prev=m.next){case 0:d=(0,c.Z)((0,c.Z)((0,c.Z)({},a),n),o);for(p in d)(d[p]===""||d[p]===null||d[p]===void 0)&&delete d[p];return m.next=4,(0,V.rQ)(d).then(function(E){var R,ie,de,le,oe;return k(!1),{data:(R=E==null||(ie=E.data)===null||ie===void 0?void 0:ie.list)!==null&&R!==void 0?R:[],total:(de=E==null||(le=E.data)===null||le===void 0?void 0:le.total)!==null&&de!==void 0?de:0,success:(oe=E==null?void 0:E.success)!==null&&oe!==void 0?oe:!0}});case 4:return m.abrupt("return",m.sent);case 5:case"end":return m.stop()}},t)}));return function(a,n,o){return l.apply(this,arguments)}}();return(0,r.jsx)(I.ZP,{"data-inspector-line":"311","data-inspector-column":"8","data-inspector-relative-path":"src\\pages\\product\\list\\index.tsx",children:(0,r.jsx)(z.ZP,{"data-inspector-line":"312","data-inspector-column":"12","data-inspector-relative-path":"src\\pages\\product\\list\\index.tsx",rowKey:"id",actionRef:ee,columns:Oe,request:Ce,scroll:H.tableScroll,search:{labelWidth:"auto",defaultCollapsed:!1,optionRender:function(t){return[(0,r.jsx)(v.Z,{"data-inspector-line":"322","data-inspector-column":"24","data-inspector-relative-path":"src\\pages\\product\\list\\index.tsx",shape:"round",onClick:function(){var n;return t==null||(n=t.form)===null||n===void 0?void 0:n.resetFields()},children:"\u91CD\u7F6E"},"reset"),(0,r.jsx)(v.Z,{"data-inspector-line":"325","data-inspector-column":"24","data-inspector-relative-path":"src\\pages\\product\\list\\index.tsx",shape:"round",type:"primary",loading:X,onClick:function(){var n;k(!0),t==null||(n=t.form)===null||n===void 0||n.submit()},children:"\u67E5\u8BE2"},"query")]}},rowSelection:{selections:[D.Z.SELECTION_ALL,D.Z.SELECTION_INVERT]},pagination:{pageSize:H.pageSize,hideOnSinglePage:!0},tableAlertRender:function(t){var a=t.selectedRowKeys,n=t.selectedRows,o=t.onCleanSelected;return(0,r.jsxs)(f.Z,{"data-inspector-line":"344","data-inspector-column":"20","data-inspector-relative-path":"src\\pages\\product\\list\\index.tsx",size:24,children:[(0,r.jsxs)("span",{"data-inspector-line":"345","data-inspector-column":"24","data-inspector-relative-path":"src\\pages\\product\\list\\index.tsx",children:["\u5DF2\u9009 ",a.length," \u9879",(0,r.jsx)("a",{"data-inspector-line":"347","data-inspector-column":"28","data-inspector-relative-path":"src\\pages\\product\\list\\index.tsx",style:{marginLeft:8},onClick:o,children:"\u53D6\u6D88\u9009\u62E9"})]}),(0,r.jsxs)("span",{"data-inspector-line":"351","data-inspector-column":"24","data-inspector-relative-path":"src\\pages\\product\\list\\index.tsx",children:["\u603B\u6D4F\u89C8\u91CF ",(0,r.jsx)(L,{"data-inspector-line":"352","data-inspector-column":"33","data-inspector-relative-path":"src\\pages\\product\\list\\index.tsx",type:"danger",children:n&&n.reduce(function(d,p){return d+p.click},0)})," \u6B21"]})]})},tableAlertOptionRender:function(t){var a=t.selectedRows;return(0,r.jsx)(f.Z,{"data-inspector-line":"358","data-inspector-column":"24","data-inspector-relative-path":"src\\pages\\product\\list\\index.tsx",size:16,children:(0,r.jsx)("a",{"data-inspector-line":"359","data-inspector-column":"28","data-inspector-relative-path":"src\\pages\\product\\list\\index.tsx",onClick:function(){return pe(a)},children:"\u6279\u91CF\u5220\u9664"})})}})})}},9006:function(Z,P,e){"use strict";e.d(P,{C5:function(){return D},gg:function(){return C},Od:function(){return f},rQ:function(){return g}});var _=e(36571),D=function(h){return(0,_.Yu)("/product",h)},C=function(h){return(0,_.qC)("/product/save",h)},f=function(h){return(0,_.qC)("/product/del",h)},g=function(h){return(0,_.Yu)("/product/list",h)}},402:function(Z,P,e){"use strict";var _=e(38663),D=e.n(_),C=e(47828),f=e.n(C),g=e(47673),v=e(22385)}}]);
