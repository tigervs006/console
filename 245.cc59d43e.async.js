(self.webpackChunkant_design_pro=self.webpackChunkant_design_pro||[]).push([[245],{40245:function(nn,Te,n){"use strict";n.d(Te,{b:function(){return Fn}});var tn=n(13062),fe=n(71230),Ue=n(89032),re=n(15746),H=n(21010),Se=n(14781),Me=n(23492),de=n(66456),Pe=n(80818),De=n(20228),Ie=n(11382),we=n(62999),Ee=n(95216),ze=n(54029),je=n(79166),ee=n(57663),D=n(71577),Be=n(49111),ve=n(19650),Bn=n(71194),Ne=n(97022),Ae=n(3182),p=n(11849),An=n(34792),X=n(48086),V=n(2824),On=n(402),ke=n(95574),an=n(94043),oe=n.n(an),Le=n(75860),rn=n(14854),Ke=n(59886),ln=n(21940),ye=n(22369),Rn=n(43185),Ve=n(9053),Tn=n(74379),Oe=n(38648),Mn=n(66126),un=n(7789),E=n(67294),on=n(36571),be=n(1870),We=n(7085),Qe=n(62298),e=n(85893),sn=function(t){var x,b,z,P,K,W,M,N,k,I,le,ne,se=Ne.Z.confirm,R=(x=t==null?void 0:t.crop)!==null&&x!==void 0?x:0,_=(b=t==null?void 0:t.size)!==null&&b!==void 0?b:0,Y=(z=t==null?void 0:t.maxUpload)!==null&&z!==void 0?z:0,C=(P=t==null?void 0:t.cropQuality)!==null&&P!==void 0?P:.6,d=(K=t==null?void 0:t.formTitle)!==null&&K!==void 0?K:"\u4E0A\u4F20\u56FE\u50CF",g=(W=t==null?void 0:t.listType)!==null&&W!==void 0?W:"text",B=(0,E.useState)(!1),f=(0,V.Z)(B,2),l=f[0],m=f[1],j=R?!1:(M=t==null?void 0:t.multiple)!==null&&M!==void 0?M:!0,S=t!=null&&t.astricts?t.astricts[0]:0,te=t!=null&&t.astricts?t.astricts[1]:0,me=(N=t==null?void 0:t.uploadUrl)!==null&&N!==void 0?N:"/console/attach/upload",ge=(0,H.tT)("file",function(q){return{uploadList:q.uploadList,setUploadList:q.setUploadList}}),pe=ge.uploadList,ae=ge.setUploadList,xe=t!=null&&t.aspects?t.aspects[0]/t.aspects[1]:1,A=t==null||(k=t.fileExt)===null||k===void 0?void 0:k.map(function(q){return".".concat(q)}).join(","),J=(I=t==null?void 0:t.fileMime)!==null&&I!==void 0?I:["video/mp4","image/png","image/gif","image/jpeg","audio/mpeg","image/x-icon","application/vnd.ms-works","application/vnd.ms-excel","image/vnd.microsoft.icon","application/octet-stream","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"],$=function(F){return new Promise(function(y,v){var a,u,o=(a=F==null?void 0:F.url)!==null&&a!==void 0?a:"",c;1<o.indexOf(".com/")&&(c=o.substring(o.indexOf(".com/")+4)),se({centered:!0,cancelText:"\u7B97\u4E86",title:"\u5F53\u771F\u8981\u5220\u9664?",icon:(0,e.jsx)(be.Z,{}),cancelButtonProps:{shape:"round"},okButtonProps:{danger:!0,shape:"round"},content:(u=o.match(/\/(\w+\.(?:png|jpg|gif|bmp))$/i))===null||u===void 0?void 0:u[1],onOk:function(){var U;(0,on.Yd)({filePath:(U=c)!==null&&U!==void 0?U:o}).then(function(O){O!=null&&O.success?y(!0):v("error")})},onCancel:function(){v("onCancel")}})})},Ce=function(F){var y,v,a=F.file,u=F.fileList;ae(u.slice());var o=F.file.status;switch(o){case"uploading":m(!0),X.default.info("File ".concat(a.name," is uploading..."));break;case"success":X.default.success("File ".concat(a.name," uploaded successfully"));break;case"removed":ae(u),X.default.success("File ".concat(a.name," removed successfully"));break;case"error":Oe.default.error({message:"Error",description:(y=a==null||(v=a.response)===null||v===void 0?void 0:v.msg)!==null&&y!==void 0?y:"File ".concat(a.name," upload failed")});break;case"done":t.fetch(),m(!1);var c=a.response.msg,h=a.response.success;ae(function(U){var O;return U.concat([(0,p.Z)((0,p.Z)({},a==null||(O=a.response)===null||O===void 0?void 0:O.data),{},{status:"done"})]).filter(function(ie){return!(ie!=null&&ie.response)})}),h?X.default.success("File ".concat(a.name," ").concat(c)):(ae([]),X.default.error("File ".concat(a.name," ").concat(c)));break;case void 0:m(!1),ae([]);break;default:throw new Error("Not implemented yet: undefined case")}},ce=function(F){var y=1024*1024,v=F.type;return new Promise(function(a,u){if(!J.includes(v))Oe.default.error({message:"\u6587\u4EF6\u7C7B\u578B\u9519\u8BEF",description:"\u8BF7\u4E0A\u4F20\u683C\u5F0F\u4E3A ".concat(J," \u7684\u6587\u4EF6")}),u(!1);else if(_&&F.size>_*y)Oe.default.error({message:"\u6587\u4EF6\u5927\u5C0F\u4E0D\u7B26\u5408\u8981\u6C42",description:"\u5355\u4E2A\u6587\u4EF6\u4E0D\u5F97\u8D85\u8FC7 ".concat(_,"M")}),u(!1);else if(0<=(F==null?void 0:F.type.indexOf("image"))){var o=new FileReader;o.readAsDataURL(F),o.onload=function(c){var h,U=(h=c.target)===null||h===void 0?void 0:h.result,O=document.createElement("img");O.src=typeof U=="string"?U:void 0,O.onload=function(){(S>O.width||te>O.height)&&(Oe.default.error({message:"\u56FE\u50CF\u5C3A\u5BF8\u4E0D\u7B26\u5408\u8981\u6C42",description:"\u8BF7\u4E0A\u4F20\u5BBD\u9AD8\u5927\u4E8E\u6216\u7B49\u4E8E ".concat(S,"X").concat(te," \u7684\u56FE\u50CF")}),u(!1)),a(!0)}}}else a(!0)})},Q={action:me,disabled:l,multiple:j,accept:A,listType:g,maxCount:Y,fileList:pe,showUploadList:!1,data:t.extraData,onRemove:$,onChange:Ce,progress:{strokeColor:{"0%":"#108ee9","100%":"#87d068"},strokeWidth:3,showInfo:!1},className:t==null?void 0:t.className,headers:{Authorization:(le=(ne=localStorage)===null||ne===void 0?void 0:ne.getItem("access_token"))!==null&&le!==void 0?le:""},beforeUpload:function(F){return ce(F).then(function(y){return y}).catch(function(y){return y})}};return(0,e.jsx)(e.Fragment,{children:R?(0,e.jsx)(un.Z,{grid:!0,quality:C,aspect:xe,modalTitle:"\u88C1\u526A\u56FE\u50CF",children:(0,e.jsx)(Ve.Z,(0,p.Z)((0,p.Z)({},Q),{},{children:(0,e.jsx)(D.Z,{icon:l?(0,e.jsx)(We.Z,{}):(0,e.jsx)(Qe.Z,{}),children:l?"Uploading":d})}))}):(0,e.jsx)(Ve.Z,(0,p.Z)((0,p.Z)({},Q),{},{children:(0,e.jsx)(D.Z,{icon:l?(0,e.jsx)(We.Z,{}):(0,e.jsx)(Qe.Z,{}),children:l?"Uploading":d})}))})},dn=n(57119),Re=n(73171),Ge=n(25592),He=n(15873),cn=n(73218),Xe=n(5405),Ye=n(57551),fn=n(95357),he=n(92066),vn=function(){var t,x,b=(0,he.av)(),z=b.show,P=ke.Z.Text,K={1:"",2:"?x-oss-process=image/auto-orient,1/interlace,1/resize,m_lfit,w_150/quality,q_90",3:"?imageMogr2/thumbnail/150x/interlace/1/rquality/90",4:"?x-bce-process=image/resize,limit_0,w_150/definition-enhance/quality,Q_80,c_le"},W=(0,E.useRef)(),M=(0,E.useRef)(),N=(0,E.useState)(0),k=(0,V.Z)(N,2),I=k[0],le=k[1],ne=(0,E.useState)(!0),se=(0,V.Z)(ne,2),R=se[0],_=se[1],Y=(0,E.useState)(),C=(0,V.Z)(Y,2),d=C[0],g=C[1],B=(0,E.useState)(),f=(0,V.Z)(B,2),l=f[0],m=f[1],j=(0,E.useState)(0),S=(0,V.Z)(j,2),te=S[0],me=S[1],ge=(0,H.tT)("file",function(i){return{setUploadList:i.setUploadList}}),pe=ge.setUploadList,ae=(0,E.useState)([]),xe=(0,V.Z)(ae,2),A=xe[0],J=xe[1],$=(0,H.tT)("attach",function(i){return{span:i.span,limit:i.limit,cateId:i.cateId,isModal:i.isModal,setOpen:i.setOpen,cateData:i.cateData,cateInfo:i.cateInfo,multiple:i.multiple,setCateId:i.setCateId,pagination:i.pagination,setPagination:i.setPagination,setExpandedKeys:i.setExpandedKeys}}),Ce=$.limit,ce=$.cateId,Q=$.isModal,q=$.setOpen,F=$.cateData,y=$.cateInfo,v=$.multiple,a=$.setCateId,u=$.pagination,o=$.span,c=$.setPagination,h=$.setExpandedKeys,U=function(s,r){z({id:r,event:s})},O=function(s){var r=s.id,T=s.data;switch(r){case"copy_cdn_url":navigator.clipboard.writeText(T.value).then(function(){return X.default.success("\u590D\u5236\u6587\u4EF6url\u6210\u529F")});break;case"copy_origin_url":navigator.clipboard.writeText(T.value).then(function(){return X.default.success("\u590D\u5236\u539F\u59CBurl\u6210\u529F")});break;case"copy_file_name":navigator.clipboard.writeText(T.value).then(function(){return X.default.success("\u590D\u5236\u6587\u4EF6\u540D\u79F0\u6210\u529F")});break;default:window.open(T.value,"_blank")}},ie=(0,H.QT)(ye.pb,{manual:!0,defaultParams:[(0,p.Z)({id:0},u)],onSuccess:function(s){le(s==null?void 0:s.total),g(s==null?void 0:s.list),J([])}}),Je=ie.run,Ze=ie.refresh,qe=ie.loading,_e=function(){var i=(0,Ae.Z)(oe().mark(function s(r){var T,w;return oe().wrap(function(ue){for(;;)switch(ue.prev=ue.next){case 0:return T=[],A.forEach(function(G){return T.push(G.id)}),w=(0,Le.f8)(F,function(G){return G.id==Array.of(r)}),1<w.length&&w.pop(),ue.next=6,(0,ye.pB)({id:T,pid:r}).then(function(G){G!=null&&G.success&&(J([]),X.default.success(G.msg),h(w),a(Array.of(r)))});case 6:case"end":return ue.stop()}},s)}));return function(r){return i.apply(this,arguments)}}();(0,E.useEffect)(function(){m(function(){return d==null?void 0:d.filter(function(i){return 0<=(i==null?void 0:i.type.indexOf("image"))})})},[d]),(0,E.useEffect)(function(){Je((0,p.Z)({id:ce.at(0)},u))},[ce,Je,u]);var Sn=function(s,r){var T;s.stopPropagation(),l==null||l.forEach(function(w,$e){r==w.id&&me($e)}),(T=W.current)===null||T===void 0||T.imagePreview(!0)},Pn=function(){var s=A.map(function(r){return{status:"done",name:r.name,url:r.static_path,uid:r.id.toString()}});pe(v?function(r){return r.concat(s).slice(-Ce)}:s.slice(-Ce)),q(!1)},Fe=function(s,r){s.stopPropagation(),Ne.Z.confirm({centered:!0,cancelText:"\u7B97\u4E86",title:"\u5F53\u771F\u8981\u5220\u9664?",icon:(0,e.jsx)(be.Z,{}),cancelButtonProps:{shape:"round"},okButtonProps:{danger:!0,shape:"round"},content:(0,e.jsxs)(ve.Z,{direction:"vertical",children:[(0,e.jsx)(P,{children:r instanceof Array?"\u8FD9 ".concat(r.length," \u4E2A\u6587\u4EF6"):"".concat(r.name," \u8FD9\u4E2A\u6587\u4EF6")}),(0,e.jsxs)(P,{type:"danger",children:[(0,e.jsx)(dn.Z,{})," \u6587\u4EF6\u4ECE\u5B58\u50A8\u4E2D\u5220\u9664\u540E\u5C06\u65E0\u6CD5\u6062\u590D"]})]}),onOk:function(){return(0,Ae.Z)(oe().mark(function w(){return oe().wrap(function(ue){for(;;)switch(ue.prev=ue.next){case 0:return ue.next=2,(0,ye.Ao)({attach:r instanceof Array?r:Array.of(r)}).then(function(G){G!=null&&G.success&&(Ze(),J([]),X.default.success(G.msg))});case 2:case"end":return ue.stop()}},w)}))()},onCancel:function(){var w;J([]),(w=M.current)===null||w===void 0||w.clearSelected()}})},Dn=[{width:80,title:"ID",dataIndex:"id"},{width:200,copyable:!0,title:"\u6587\u4EF6\u540D",dataIndex:"name"},{width:100,title:"\u6587\u4EF6\u7C7B\u578B",dataIndex:"type"},{width:100,title:"\u5B58\u50A8\u7C7B\u578B",dataIndex:"storage",valueEnum:{1:{text:"\u672C\u5730"},2:{text:"\u963F\u91CC\u4E91"},3:{text:"\u817E\u8BAF\u4E91"},4:{text:"\u767E\u5EA6\u4E91"}}},{copyable:!0,ellipsis:!0,title:"\u6587\u4EF6\u8DEF\u5F84",dataIndex:"static_path"},{width:150,title:"\u521B\u5EFA\u65F6\u95F4",dataIndex:"create_time"},{width:100,title:"\u64CD\u4F5C",search:!1,fixed:"right",render:function(s,r){return[(0,e.jsx)(ve.Z,{size:4,children:(0,e.jsx)(D.Z,{danger:!0,size:"small",type:"primary",shape:"round",icon:(0,e.jsx)(Re.Z,{}),onClick:function(w){return Fe(w,r)},children:"\u5220\u9664"})},"operation")]}}],en=function(s){s.stopPropagation(),_(function(r){return!r})},In=function(){return Q?(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)(D.Z,{icon:(0,e.jsx)(Ge.Z,{}),onClick:Ze,children:"\u5237\u65B0\u5217\u8868"}),(0,e.jsx)(je.Z,{count:A.length,children:(0,e.jsx)(D.Z,{disabled:!A.length,icon:(0,e.jsx)(He.Z,{}),onClick:function(){return Pn()},children:"\u4F7F\u7528\u9009\u4E2D"})}),(0,e.jsx)(D.Z,{danger:!0,icon:(0,e.jsx)(Re.Z,{}),disabled:!A.length,onClick:function(r){return Fe(r,A)},children:"\u5220\u9664\u6587\u4EF6"}),(0,e.jsx)(Ee.Z,{allowClear:!0,showSearch:!0,treeData:F,placeholder:"\u79FB\u52A8\u81F3...",treeNodeFilterProp:"name",onChange:_e,style:{minWidth:"150px"},disabled:!A.length,fieldNames:{label:"name",value:"id"}})]}):!Q&&R?(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)(D.Z,{icon:(0,e.jsx)(Ge.Z,{}),onClick:Ze,children:"\u5237\u65B0\u5217\u8868"}),(0,e.jsx)(je.Z,{count:A.length,children:(0,e.jsx)(D.Z,{icon:A.length?(0,e.jsx)(cn.Z,{}):(0,e.jsx)(He.Z,{}),onClick:function(){A.length?J([]):J(d!=null?d:[])},children:A.length?"\u6E05\u7A7A\u9009\u62E9":"\u5168\u90E8\u9009\u62E9"})}),(0,e.jsx)(D.Z,{danger:!0,icon:(0,e.jsx)(Re.Z,{}),disabled:!A.length,onClick:function(r){return Fe(r,A)},children:"\u5220\u9664\u6587\u4EF6"}),(0,e.jsx)(Ee.Z,{allowClear:!0,showSearch:!0,treeData:F,placeholder:"\u79FB\u52A8\u81F3...",treeNodeFilterProp:"name",onChange:_e,style:{minWidth:"150px"},disabled:!A.length,fieldNames:{label:"name",value:"id"}}),(0,e.jsx)(D.Z,{icon:R?(0,e.jsx)(Ye.Z,{}):(0,e.jsx)(Xe.Z,{}),onClick:function(r){return en(r)},children:R?"\u5217\u8868\u6A21\u5F0F":"\u7F29\u7565\u56FE\u6A21\u5F0F"})]}):(0,e.jsx)(D.Z,{icon:R?(0,e.jsx)(Ye.Z,{}):(0,e.jsx)(Xe.Z,{}),onClick:function(r){return en(r)},children:R?"\u5217\u8868\u6A21\u5F0F":"\u7F29\u7565\u56FE\u6A21\u5F0F"})};return(0,e.jsxs)(fe.Z,{children:[(0,e.jsx)(re.Z,{span:24,children:(0,e.jsxs)(ve.Z,{size:"middle",style:{marginBottom:"1rem"},children:[(0,e.jsx)(sn,(0,p.Z)((0,p.Z)({fetch:Ze},y==null?void 0:y.config),{},{formTitle:"\u4E0A\u4F20\u6587\u4EF6",extraData:{pid:(t=y==null?void 0:y.id)!==null&&t!==void 0?t:0,path:(x=y==null?void 0:y.dirname)!==null&&x!==void 0?x:"attach"}})),In()]})}),(0,e.jsx)(re.Z,{span:24,children:R?(0,e.jsx)(Ie.Z,{spinning:qe,tip:"Loading...",children:(0,e.jsx)(Ke.tP.Group,{size:"small",multiple:!0,style:{width:"100%"},value:A,onChange:function(s){return J(s)},children:(0,e.jsx)(fe.Z,{gutter:16,children:d==null?void 0:d.map(function(i){return(0,e.jsxs)(re.Z,{span:Q?4:o.span,children:[(0,e.jsx)("div",{onContextMenu:function(r){return U(r,i.id)},children:(0,e.jsx)(Ke.tP,{value:i,style:{overflow:"hidden",width:Q?"100px":"150px",height:Q?"100px":"150px"},cover:(0,e.jsxs)("div",{className:"ant-image",children:[0<=(i==null?void 0:i.type.indexOf("image"))?(0,e.jsx)("img",{alt:i.name,title:i.name,className:"ant-image-img",src:"".concat(i.real_path).concat(K[i.storage])}):(0,e.jsx)("img",{alt:"unknow",title:i.name,style:{width:"unset"},src:"/manage/unknow.svg"}),(0,e.jsx)("div",{className:"ant-image-mask",children:(0,e.jsxs)(ve.Z,{className:"ant-image-mask-info",children:[0<=(i==null?void 0:i.type.indexOf("image"))&&(0,e.jsx)(P,{className:"anticon",onClick:function(r){return Sn(r,i.id)},children:(0,e.jsxs)("p",{children:[(0,e.jsx)(fn.Z,{}),!Q&&"\u9884\u89C8"]})}),(0,e.jsx)(P,{className:"anticon",onClick:function(r){return Fe(r,i)},children:(0,e.jsxs)("p",{children:[(0,e.jsx)(Re.Z,{}),!Q&&"\u5220\u9664"]})})]})})]})})}),(0,e.jsxs)(he.v2,{id:i.id,theme:"light",animation:!1,children:[(0,e.jsx)(he.ck,{id:"copy_cdn_url",onClick:O,data:{value:i.static_path},children:(0,e.jsx)("span",{children:"\u590D\u5236\u6587\u4EF6url"})}),(0,e.jsx)(he.ck,{id:"copy_origin_url",onClick:O,data:{value:i.real_path},children:"\u590D\u5236\u539F\u59CBurl"}),(0,e.jsx)(he.ck,{id:"copy_file_name",onClick:O,data:{value:i.name},children:"\u590D\u5236\u6587\u4EF6\u540D\u79F0"}),(0,e.jsx)(he.ck,{id:"open_target_blank",onClick:O,data:{value:i.static_path},children:"\u65B0\u7A97\u53E3\u6253\u5F00\u6587\u4EF6"})]})]},i.id)})})})}):(0,e.jsx)(rn.ZP,{rowKey:"id",search:!1,actionRef:M,loading:qe,columns:Dn,pagination:!1,scroll:{y:600},dataSource:d,options:{reload:Ze},rowSelection:{selections:[Pe.Z.SELECTION_ALL,Pe.Z.SELECTION_INVERT]},tableAlertRender:function(s){var r=s.selectedRowKeys,T=s.onCleanSelected;return(0,e.jsx)(ve.Z,{size:24,children:(0,e.jsxs)("span",{children:["\u5DF2\u9009 ",r.length," \u9879",(0,e.jsx)("a",{style:{marginLeft:8},onClick:T,children:"\u53D6\u6D88\u9009\u62E9"})]})})},tableAlertOptionRender:function(s){var r=s.selectedRows;return(0,e.jsx)(ve.Z,{size:16,children:(0,e.jsx)(P,{type:"danger",onClick:function(w){return Fe(w,r)},children:"\u6279\u91CF\u5220\u9664"})})}})}),R&&(0,e.jsx)(re.Z,{span:24,children:(0,e.jsx)(ln.e,{curIdx:te,ref:W,imgList:l!=null?l:[]})}),(0,e.jsx)(re.Z,{span:24,children:(0,e.jsx)(Me.Z,{responsive:!0,size:"small",total:I,hideOnSinglePage:!0,style:{float:"right"},current:u.current,pageSize:u.pageSize,pageSizeOptions:[24,32,56,86,102,120],defaultPageSize:Q?24:u.pageSize,onChange:function(s,r){return c({current:s,pageSize:r})},onShowSizeChange:function(s,r){return c({current:s,pageSize:r})},showTotal:function(s,r){return"\u7B2C ".concat(r[0],"-").concat(r[1]," \u6761/\u603B\u5171 ").concat(I," \u6761")}})})]})},Ln=n(32157),hn=n(95033),$n=n(59250),mn=n(13013),Un=n(30887),gn=n(28682),wn=n(62350),pn=n(24565),zn=n(47673),xn=n(4107),Cn=n(96486),En=n.n(Cn),Z=n(22811),jn=(0,E.forwardRef)(function(L,t){var x=(0,E.useRef)(),b=(0,E.useState)(),z=(0,V.Z)(b,2),P=z[0],K=z[1],W=(0,H.QT)("/attach/default"),M=W.data,N=(0,H.tT)("attach",function(C){return{refresh:C.refresh,cateInfo:C.cateInfo,cateData:En().cloneDeep(C.cateData)}}),k=N.refresh,I=N.cateInfo,le=N.cateData;(0,E.useImperativeHandle)(t,function(){return{setPid:function(d){return K(d)}}});var ne=function(){var C=(0,Ae.Z)(oe().mark(function d(g){var B,f,l;return oe().wrap(function(j){for(;;)switch(j.prev=j.next){case 0:return l=L!=null&&L.path?(0,p.Z)((0,p.Z)({},g),{},{pid:P!=null?P:0}):(0,p.Z)((0,p.Z)({},g),{},{id:(B=I==null?void 0:I.id)!==null&&B!==void 0?B:0,pid:(f=P!=null?P:I==null?void 0:I.pid)!==null&&f!==void 0?f:0}),j.next=3,(0,ye.a1)(l).then(function(S){(S==null?void 0:S.success)&&X.default.success(S.msg)}).finally(function(){return k()});case 3:case"end":return j.stop()}},d)}));return function(g){return C.apply(this,arguments)}}(),se=(0,E.useState)({cropRequire:!1,limitRequire:!1,astrictRequire:!1,fileExtRequire:!1,fileMimeRequire:!1}),R=(0,V.Z)(se,2),_=R[0],Y=R[1];return(0,e.jsxs)(Z.aN,{drawerProps:{width:520,maskClosable:!1,destroyOnClose:!0,className:"create-drawer"},title:I!=null&&I.id?"\u7F16\u8F91\u76EE\u5F55":"\u65B0\u589E\u76EE\u5F55",submitter:{searchConfig:{resetText:"\u91CD\u7F6E"},submitButtonProps:{shape:"round"},resetButtonProps:{shape:"round",type:"default",onClick:function(){var d;return(d=x.current)===null||d===void 0?void 0:d.resetFields()}}},formRef:x,autoFocusFirstInput:!0,open:L.drawerOpen,validateTrigger:["onBlur"],onOpenChange:L.handleSetDrawerOpen,onFinish:function(d){return ne(d).then(function(){return!0})},initialValues:L!=null&&L.path?{path:L.path,option:0}:I,children:[(0,e.jsx)(Z.Ve,{name:"path",hasFeedback:!0,label:"\u4E0A\u7EA7\u76EE\u5F55",placeholder:"\u8BF7\u9009\u62E9\u4E0A\u7EA7\u76EE\u5F55",rules:[{required:!0,message:"\u8BF7\u9009\u62E9\u4E0A\u7EA7\u9644\u4EF6\u76EE\u5F55"}],fieldProps:{showSearch:!0,changeOnSelect:!0,options:le.map(function(C){return C.id||(C.disabled=!1),C}),onChange:function(d){return K(d.at(-1))},fieldNames:{label:"name",value:"id",children:"children"}},transform:function(d){return d instanceof Array?{path:d.join("-")}:{path:d}},convertValue:function(d){var g;return d instanceof Array?d:(g=d==null?void 0:d.split("-").map(Number))!==null&&g!==void 0?g:[0]}}),(0,e.jsx)(Z.V,{hasFeedback:!0,name:"name",label:"\u76EE\u5F55\u540D\u79F0",placeholder:"\u8BF7\u8F93\u5165\u76EE\u5F55\u540D\u79F0",fieldProps:{maxLength:64,showCount:!0,onBlur:function(d){var g;(L==null?void 0:L.path)&&((g=x.current)===null||g===void 0||g.setFieldValue("ename",(0,Le.Qh)(d.target.value).replace(/\s+/g,"")))}},rules:[{required:!0,message:"\u8BF7\u8F93\u5165\u76EE\u5F55\u540D\u79F0"},{type:"string",pattern:/^[\u4e00-\u9fa5\w]+$/,message:"\u76EE\u5F55\u540D\u79F0\u4E0D\u5F97\u5305\u542B\u7279\u6B8A\u7B26\u53F7"}]}),(0,e.jsx)(Z.V,{hasFeedback:!0,name:"ename",label:"\u76EE\u5F55\u522B\u540D",tooltip:"\u7CFB\u7EDF\u81EA\u52A8\u751F\u6210",placeholder:"\u8BF7\u8F93\u5165\u76EE\u5F55\u522B\u540D",fieldProps:{maxLength:64,showCount:!0},rules:[{required:!0,message:"\u8BF7\u8F93\u5165\u76EE\u5F55\u522B\u540D"},{type:"string",pattern:/^\w+$/,message:"\u76EE\u5F55\u522B\u540D\u53EA\u80FD\u662F\u5B57\u6BCD\u3001\u6570\u5B57\u548C\u4E0B\u5212\u7EBF\u7684\u7EC4\u5408"}]}),(0,e.jsx)(Z.$O.Group,{name:"option",label:"\u4E0A\u4F20\u914D\u7F6E",options:[{label:"\u9ED8\u8BA4\u914D\u7F6E",value:0},{label:"\u81EA\u5B9A\u4E49\u914D\u7F6E",value:1}]}),(0,e.jsx)(Z.ie,{name:["option"],children:function(d){var g=d.option;if(g)return[(0,e.jsxs)(Z.UW,{size:3,label:"\u914D\u7F6E\u9009\u9879",children:[(0,e.jsx)(Z.V2,{name:"limit",fieldProps:{onChange:function(f){var l;Y(function(m){return(0,p.Z)((0,p.Z)({},m),{},{limitRequire:f.target.checked})}),!f.target.checked&&((l=x.current)===null||l===void 0||l.setFieldValue("size",void 0))}},children:"\u6587\u4EF6\u5927\u5C0F"}),(0,e.jsx)(Z.V2,{name:"astrict",fieldProps:{onChange:function(f){var l;Y(function(m){return(0,p.Z)((0,p.Z)({},m),{},{astrictRequire:f.target.checked})}),!f.target.checked&&((l=x.current)===null||l===void 0||l.setFieldValue("astricts",void 0))}},children:"\u9650\u5236\u5BBD\u9AD8"}),(0,e.jsx)(Z.V2,{name:"crop",fieldProps:{onChange:function(f){var l;Y(function(m){return(0,p.Z)((0,p.Z)({},m),{},{cropRequire:f.target.checked})}),!f.target.checked&&((l=x.current)===null||l===void 0||l.setFieldValue("aspects",void 0))}},children:"\u542F\u7528\u88C1\u526A"}),(0,e.jsx)(Z.V2,{name:"suff",fieldProps:{onChange:function(f){var l;Y(function(m){return(0,p.Z)((0,p.Z)({},m),{},{fileExtRequire:f.target.checked})}),!f.target.checked&&((l=x.current)===null||l===void 0||l.setFieldValue("fileExt",void 0))}},children:"\u6587\u4EF6\u540E\u7F00"}),(0,e.jsx)(Z.V2,{name:"mime",fieldProps:{onChange:function(f){var l;Y(function(m){return(0,p.Z)((0,p.Z)({},m),{},{fileMimeRequire:f.target.checked})}),!f.target.checked&&((l=x.current)===null||l===void 0||l.setFieldValue("fileMime",void 0))}},children:"\u6587\u4EF6\u7C7B\u578B"})]},"options"),(0,e.jsx)(Z.ie,{name:["limit"],children:function(f){var l=f.limit;if(l)return(0,e.jsx)(Z.k_,{max:512,width:150,name:"size",label:"\u6587\u4EF6\u5927\u5C0F",tooltip:"\u4E0A\u4F20\u6587\u4EF6\u7684\u5927\u5C0F",fieldProps:{precision:0,addonAfter:"MB"},rules:[{required:_.limitRequire,message:"\u8BF7\u8BBE\u7F6E\u6587\u4EF6\u5927\u5C0F\u503C"}]},"size")}},"limit"),(0,e.jsx)(Z.ie,{name:["astrict"],children:function(f){var l=f.astrict;if(l)return[(0,e.jsx)(Z.e9,{name:"astricts",label:"\u9650\u5236\u5BBD\u9AD8",tooltip:"\u9650\u5236\u56FE\u50CF\u6700\u5C0F\u5BBD\u9AD8",fieldProps:{precision:0,addonAfter:"PX",onBlur:function(j){return j.stopPropagation()}},rules:[function(){return{validator:function(j,S){return S instanceof Array&&S.filter(function(te){return typeof te=="number"}).length==2?Promise.resolve():Promise.reject("\u8BF7\u5B8C\u5584\u56FE\u50CF\u5BBD\u9AD8\u53C2\u6570")}}}]},"astricts")]}},"astrict"),(0,e.jsx)(Z.ie,{name:["crop"],children:function(f){var l=f.crop;if(l)return[(0,e.jsx)(Z.e9,{name:"aspects",label:"\u88C1\u526A\u6BD4\u4F8B",tooltip:"\u9700\u4E3A\u6B63\u6574\u6570",fieldProps:{precision:0,onBlur:function(j){return j.stopPropagation()}},rules:[function(){return{validator:function(j,S){return S instanceof Array&&S.filter(function(te){return typeof te=="number"}).length==2?Promise.resolve():Promise.reject("\u8BF7\u5B8C\u5584\u88C1\u526A\u6BD4\u4F8B\u53C2\u6570")}}}]},"aspects")]}},"crop"),(0,e.jsx)(Z.ie,{name:["suff"],children:function(f){var l=f.suff;if(l){var m;return[(0,e.jsx)(Z._I,{name:"fileExt",label:"\u6587\u4EF6\u540E\u7F00",tooltip:"\u9650\u5236\u4E0A\u4F20\u7684\u6587\u4EF6\u540E\u7F00",fieldProps:{mode:"tags",maxTagCount:13,options:M==null||(m=M.list.fileExt)===null||m===void 0?void 0:m.map(function(j){return{label:j,value:j}})},rules:[{required:_.fileExtRequire,message:"\u8BF7\u8BBE\u7F6E\u6587\u4EF6\u540E\u7F00"}]},"fileExt")]}else return}},"suff"),(0,e.jsx)(Z.ie,{name:["mime"],children:function(f){var l=f.mime;if(l){var m;return[(0,e.jsx)(Z._I,{name:"fileMime",label:"\u6587\u4EF6\u7C7B\u578B",tooltip:"\u9650\u5236\u4E0A\u4F20\u7684\u6587\u4EF6\u7C7B\u578B",fieldProps:{mode:"tags",maxTagCount:10,options:M==null||(m=M.list.fileMime)===null||m===void 0?void 0:m.map(function(j){return{label:j,value:j}})},rules:[{required:_.fileMimeRequire,message:"\u8BF7\u8BBE\u7F6E\u6587\u4EF6\u7C7B\u578B"}]},"fileMime")]}else return}},"mime")]}})]})}),yn=n(44545),Zn=function(){var t=xn.Z.Search,x=ke.Z.Text,b=(0,E.useState)(),z=(0,V.Z)(b,2),P=z[0],K=z[1],W=(0,E.useRef)(),M=(0,E.useState)(""),N=(0,V.Z)(M,2),k=N[0],I=N[1],le=(0,E.useState)(!1),ne=(0,V.Z)(le,2),se=ne[0],R=ne[1],_=(0,E.useState)(!0),Y=(0,V.Z)(_,2),C=Y[0],d=Y[1],g=(0,H.tT)("attach",function(v){return{cateId:v.cateId,loading:v.loading,refresh:v.refresh,getInfo:v.getInfo,isModal:v.isModal,cateData:v.cateData,setCateId:v.setCateId,setCateInfo:v.setCateInfo,expandedKeys:v.expandedKeys,setPagination:v.setPagination,setExpandedKeys:v.setExpandedKeys}}),B=g.cateId,f=g.getInfo,l=g.refresh,m=g.loading,j=g.isModal,S=g.cateData,te=g.setCateId,me=g.setCateInfo,ge=g.expandedKeys,pe=g.setPagination,ae=g.setExpandedKeys,xe=function v(a,u){for(var o,c=0;c<u.length;c++){var h=u[c];h.children&&(h.children.some(function(U){return U.id===a})?o=h.id:v(a,h.children)&&(o=v(a,h.children)))}return o},A=function(a,u){var o;switch(a.key){case"update":a.domEvent.stopPropagation(),f({id:u}).then(function(){(0,Le.pQ)().then(function(){return R(!0)})});break;case"create":a.domEvent.stopPropagation(),(o=W.current)===null||o===void 0||o.setPid(u),u?f({id:u}).then(function(c){K(c==null?void 0:c.info.path.split("-").map(Number).concat(u).filter(function(h){return h}))}).finally(function(){return R(!0)}):(K([0]),R(!0),me(void 0));break;default:a.domEvent.stopPropagation()}},J=function(){var v=(0,Ae.Z)(oe().mark(function a(u){return oe().wrap(function(c){for(;;)switch(c.prev=c.next){case 0:return c.next=2,(0,ye.Od)({id:u}).then(function(h){return(h==null?void 0:h.success)&&X.default.success(h.msg),h==null?void 0:h.success}).finally(function(){return l()});case 2:return c.abrupt("return",c.sent);case 3:case"end":return c.stop()}},a)}));return function(u){return v.apply(this,arguments)}}(),$=function(a){var u=[{key:"create",label:"\u65B0\u589E\u76EE\u5F55"},{key:"update",label:"\u7F16\u8F91\u76EE\u5F55"},{key:"delete",label:(0,e.jsx)(pn.Z,{title:"\u786E\u8BA4\u5220\u9664\u8BE5\u76EE\u5F55?",onConfirm:function(){return J(a)},children:(0,e.jsx)(x,{children:"\u5220\u9664\u76EE\u5F55"})})}];return(0,e.jsx)(gn.Z,{onClick:function(c){return A(c,a)},items:a!=0?u:u.splice(0,1)})},Ce=function(a){return(0,e.jsxs)("div",{className:"customRender",children:[(0,e.jsx)(x,{children:a.title}),(0,e.jsx)(mn.Z,{trigger:["click"],placement:"bottomRight",overlay:function(){return $(a.key)},getPopupContainer:function(o){return o.parentNode},children:(0,e.jsx)(x,{onClick:function(o){return o==null?void 0:o.stopPropagation()},children:(0,e.jsx)(yn.Z,{className:"overlayDropDown"})})})]})},ce=[],Q=function v(a){for(var u=0;u<a.length;u++){var o=a[u],c=o.id,h=o.name;ce.push({key:c,title:h}),o.children&&v(o.children)}};Q(S);var q=function(a){ae(a),d(!1)},F=function(a){var u=a.target.value,o=ce.map(function(c){return u&&c.title.indexOf(u)>-1?xe(c.key,S):null}).filter(function(c,h,U){return c&&U.indexOf(c)===h});I(u),d(!0),ae(o)},y=(0,E.useMemo)(function(){var v=function a(u){return u.map(function(o){var c=o.name,h=c.indexOf(k),U=c.substring(0,h),O=c.slice(h+k.length),ie=h>-1?(0,e.jsxs)("span",{children:[U,(0,e.jsx)("span",{className:"site-tree-search-value",children:k}),O]}):(0,e.jsx)("span",{children:c});return o.children?{title:ie,key:o.id,children:a(o.children)}:{title:ie,key:o.id}})};return v(S)},[S,k]);return(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)(t,{allowClear:!0,onChange:F,className:"treeSearch",placeholder:"\u8BF7\u8F93\u5165\u5206\u7C7B\u540D\u79F0"}),(0,e.jsx)(Ie.Z,{spinning:m,tip:"Loading...",children:(0,e.jsx)(hn.Z,{treeData:y,onExpand:q,selectedKeys:B,defaultSelectedKeys:[0],titleRender:Ce,expandedKeys:ge,height:j?490:void 0,autoExpandParent:C,rootClassName:j?"modalTree":"normalTree",onSelect:function(a,u){var o=u.selected;o&&te(a),o&&!a.at(0)&&me(void 0),o&&a.at(0)&&f({id:a.at(0)}),o&&pe(function(c){return{current:1,pageSize:c.pageSize}})}})}),(0,e.jsx)(jn,{path:P,ref:W,drawerOpen:se,handleSetDrawerOpen:function(a){R(a),!a&&K(void 0)}})]})},Fn=function(t){var x,b,z,P=(x=t==null?void 0:t.gutter)!==null&&x!==void 0?x:[32,32],K=(b=t==null?void 0:t.previewSpan)!==null&&b!==void 0?b:20,W=(z=t==null?void 0:t.directorySpan)!==null&&z!==void 0?z:4,M=(0,H.tT)("attach",function(k){return{run:k.run}}),N=M.run;return(0,E.useEffect)(function(){N({pid:0})},[N]),(0,e.jsxs)(fe.Z,{gutter:P,style:{padding:"16px"},children:[(0,e.jsx)(re.Z,{span:W,children:(0,e.jsx)(Zn,{})}),(0,e.jsx)(re.Z,{span:K,children:(0,e.jsx)(vn,{})})]})}},21940:function(nn,Te,n){"use strict";n.d(Te,{e:function(){return Me}});var tn=n(12968),fe=n(40610),Ue=n(2824),re=n(75860),H=n(67294),Se=n(85893),Me=(0,H.forwardRef)(function(de,Pe){var De,Ie=(De=de==null?void 0:de.curIdx)!==null&&De!==void 0?De:0,we=(0,H.useState)(!1),Ee=(0,Ue.Z)(we,2),ze=Ee[0],je=Ee[1];return(0,H.useImperativeHandle)(Pe,function(){return{imagePreview:function(D){return je(D)}}}),(0,Se.jsx)("div",{style:{display:"none"},children:(0,Se.jsx)(fe.Z.PreviewGroup,{preview:{visible:ze,current:Ie,onVisibleChange:function(D){return je(D)}},children:de==null?void 0:de.imgList.map(function(ee){var D,Be;return(0,Se.jsx)(fe.Z,{src:(Be=ee==null?void 0:ee.url)!==null&&Be!==void 0?Be:ee.static_path},(D=ee==null?void 0:ee.id)!==null&&D!==void 0?D:(0,re.O1)(4))})})})})}}]);