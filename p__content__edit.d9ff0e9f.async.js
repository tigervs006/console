(self.webpackChunkant_design_pro=self.webpackChunkant_design_pro||[]).push([[548],{99882:function(ie,y,e){"use strict";e.d(y,{wk:function(){return x},rQ:function(){return V},V5:function(){return b},Od:function(){return M},mJ:function(){return X},m4:function(){return A},R$:function(){return P}});var E=e(36571),x=function(v){return(0,E.qC)("/channel/save",v)},V=function(v){return(0,E.Yu)("/channel/list",v)},b=function(v){return(0,E.Yu)("/channel/cate",v)},M=function(v){return(0,E.qC)("/channel/del",v)},X=function(v){return(0,E.qC)("/module/save",v)},A=function(v){return(0,E.Yu)("/module/list",v)},P=function(v){return(0,E.qC)("/module/del",v)}},10975:function(ie,y,e){"use strict";e.d(y,{Z:function(){return O}});var E=e(49111),x=e(19650),V=e(3182),b=e(34792),M=e(48086),X=e(402),A=e(95574),P=e(69610),D=e(54941),v=e(81306),w=e(19809),_e=e(94043),N=e.n(_e),de=e(67294),ue=e(21010),T=e(72757),ce=e.n(T),ve=e(5234),H=e.n(ve),l=e(8212),se=e(7085),g=e(85893),O=function(U){(0,v.Z)(I,U);var k=(0,w.Z)(I);function I(C){var p,F;return(0,P.Z)(this,I),F=k.call(this,C),F.state={saving:!1,defaultType:"secondary",defaultStatus:"waiting for input...",uploadPath:(p=C==null?void 0:C.uploadPath)!==null&&p!==void 0?p:"article/content",content:(C==null?void 0:C.content)||"<p>\u6765\u5427\uFF0C\u8BF7\u5F00\u59CB\u4F60\u7684\u8868\u6F14...</p>"},F}return(0,D.Z)(I,[{key:"render",value:function(){var p=this,F=A.Z.Text,q=function(f){console.log("\u81EA\u52A8\u4FDD\u5B58\uFF1A",f),M.default.success("\u81EA\u52A8\u4FDD\u5B58\u6210\u529F")},Z={autosave:{waitingTime:6e4,save:function(f){return q(f.getData())}}},ee=function(f){var S=f.plugins.get("WordCount"),_=document.getElementById("word-count");_==null||_.appendChild(S.wordCountContainer);var n=f.plugins.get("PendingActions");n.on("change:hasAny",function($,h,te){te?p.setState({saving:!0,defaultType:"danger",defaultStatus:"inputing..."}):p.setState({saving:!1,defaultType:"success",defaultStatus:"Auto save succeeded!"})}),f.plugins.get("FileRepository").createUploadAdapter=function($){var h=p.state;return{upload:function(){return(0,V.Z)(N().mark(function ne(){var m,W;return N().wrap(function(j){for(;;)switch(j.prev=j.next){case 0:return j.next=2,$.file;case 2:return m=j.sent,W=new FormData,W.append("file",m),W.append("path",h.uploadPath),j.abrupt("return",new Promise(function(){var Y=(0,V.Z)(N().mark(function Q(J,re){return N().wrap(function(G){for(;;)switch(G.prev=G.next){case 0:return G.next=2,(0,ue.WY)("/attach/upload",{method:"post",data:W}).then(function(u){if(u!=null&&u.success){var a;M.default.success(u==null?void 0:u.msg),J({default:u==null||(a=u.data)===null||a===void 0?void 0:a.url})}else re()});case 2:case"end":return G.stop()}},Q)}));return function(Q,J){return Y.apply(this,arguments)}}()));case 7:case"end":return j.stop()}},ne)}))()}}}};return(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(T.CKEditor,{config:Z,editor:H(),data:this.state.content,onReady:function(f){return ee(f)},onChange:function(f,S){p.setState({content:S.getData()},function(){return p.props.setContent(S.getData())})}}),(0,g.jsxs)("div",{className:"edit-footer-info",children:[(0,g.jsx)("div",{id:"word-count"}),(0,g.jsxs)(x.Z,{children:[(0,g.jsxs)(F,{strong:!0,children:[(0,g.jsx)(l.Z,{})," Editor status:"]}),(0,g.jsxs)(F,{type:this.state.defaultType,children:[this.state.saving&&(0,g.jsx)(se.Z,{})," ",this.state.defaultStatus]})]})]})]})}}]),I}(de.Component)},78980:function(ie,y,e){"use strict";e.d(y,{p:function(){return se}});var E=e(57663),x=e(71577),V=e(49111),b=e(19650),M=e(2824),X=e(402),A=e(95574),P=e(96486),D=e.n(P),v=e(21010),w=e(40245),_e=e(61193),N=e.n(_e),de=e(21940),ue=e(22811),T=e(67294),ce=e(95357),ve=e(54549),H=e(85008),l=e(85893),se=function(O){var U,k=A.Z.Text,I=(U=O==null?void 0:O.limit)!==null&&U!==void 0?U:1,C=(0,T.useRef)(),p=(0,T.useState)(0),F=(0,M.Z)(p,2),q=F[0],Z=F[1],ee=(0,T.useRef)(null),z=(0,T.useState)(!1),f=(0,M.Z)(z,2),S=f[0],_=f[1],n=(0,T.useState)({left:0,top:0,bottom:0,right:0}),$=(0,M.Z)(n,2),h=$[0],te=$[1],ne=(0,v.tT)("file",function(t){return{uploadList:t.uploadList,setUploadList:t.setUploadList}}),m=ne.uploadList,W=ne.setUploadList,B=(0,v.tT)("attach",function(t){return{open:t.open,span:t.span,setOpen:t.setOpen,isModal:t.isModal,setLimit:t.setLimit,setCateId:t.setCateId,setIsModal:t.setIsModal,setMultiple:t.setMultiple,setPagination:t.setPagination,setExpandedKeys:t.setExpandedKeys}}),j=B.open,Y=B.setOpen,Q=B.setLimit,J=B.setCateId,re=B.setIsModal,le=B.setMultiple,G=B.span,u=B.setPagination,a=B.setExpandedKeys;(0,T.useEffect)(function(){Q(I),le(1<I)},[I,Q,le]),(0,T.useEffect)(function(){O.setFieldValue(m==null?void 0:m.map(function(t){return t.url}))},[m]);var r=function(i,o){var L,R=(L=ee.current)===null||L===void 0?void 0:L.getBoundingClientRect(),ae=window.document.documentElement,oe=ae.clientWidth,K=ae.clientHeight;!R||te({top:-R.top+o.y,left:-R.left+o.x,right:oe-(R.right-o.x),bottom:K-(R.bottom-o.y)})},c=function(i){W(function(o){var L=D().cloneDeep(o);return L.splice(i,1).filter(function(R){return R}),L})},s=function(i){var o;Z(i),(o=C.current)===null||o===void 0||o.imagePreview(!0)},d=function(){J([0]),Y(!0),a([]),u({current:1,pageSize:24})};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsxs)(b.Z,{size:"large",className:"ant-image-container",children:[m?m==null?void 0:m.map(function(t,i){return(0,l.jsxs)("div",{className:"ant-image",children:[(0,l.jsx)("img",{src:t.url,alt:t.name,className:"ant-image-img"}),(0,l.jsx)("div",{className:"ant-image-mask",children:(0,l.jsx)(b.Z,{className:"ant-image-mask-info",children:(0,l.jsx)(k,{className:"anticon",onClick:function(){return s(i)},children:(0,l.jsxs)("p",{children:[(0,l.jsx)(ce.Z,{}),"\u9884\u89C8"]})})})}),(0,l.jsx)(x.Z,{shape:"circle",icon:(0,l.jsx)(ve.Z,{style:{fontSize:".8rem"}}),onClick:function(){return c(i)}})]},t.uid)}):null,I>m.length&&(0,l.jsx)("div",{className:"ant-image-select",children:(0,l.jsx)(H.Z,{id:"select",onClick:function(){return d()}})})]}),(0,l.jsx)(de.e,{ref:C,curIdx:q,imgList:m}),(0,l.jsx)(ue.Yr,{width:960,open:j,submitter:!1,onOpenChange:function(i){return re(i)},modalProps:{centered:!0,maskClosable:!1,destroyOnClose:!0,afterClose:function(){J([0]),a([]),u({current:1,pageSize:G.pageSize})},onCancel:function(){return Y(!1)},modalRender:function(i){return(0,l.jsx)(N(),{bounds:h,disabled:S,onStart:function(L,R){return r(L,R)},children:(0,l.jsx)("div",{ref:ee,children:i})})}},title:(0,l.jsx)("div",{style:{width:"100%",cursor:"move"},onMouseOut:function(){_(!0)},onMouseOver:function(){S&&_(!1)},children:"\u6587\u4EF6\u7BA1\u7406"}),children:(0,l.jsx)(w.b,{previewSpan:18,directorySpan:6})})]})}},84619:function(ie,y,e){"use strict";e.r(y);var E=e(57663),x=e(71577),V=e(47673),b=e(4107),M=e(11849),X=e(34792),A=e(48086),P=e(49111),D=e(19650),v=e(88983),w=e(47933),_e=e(12968),N=e(40610),de=e(402),ue=e(95574),T=e(71194),ce=e(97022),ve=e(74379),H=e(38648),l=e(3182),se=e(2824),g=e(94043),O=e.n(g),U=e(21010),k=e(67294),I=e(99882),C=e(10975),p=e(46298),F=e(78980),q=e(7524),Z=e(75860),ee=e(15873),z=e(95357),f=e(258),S=e(54977),_=e(22811),n=e(85893);y.default=function(){var $,h=(0,k.useRef)(),te={NODE_ENV:"production"}.REACT_APP_PUBLIC_PATH,ne=(0,k.useState)(function(){var u;return(u=h.current)===null||u===void 0?void 0:u.getFieldValue("content")}),m=(0,se.Z)(ne,2),W=m[0],B=m[1],j=(0,U.tT)("file",function(u){return{setUploadList:u.setUploadList}}),Y=j.setUploadList,Q=function(){var u=(0,l.Z)(O().mark(function a(){return O().wrap(function(c){for(;;)switch(c.prev=c.next){case 0:return c.next=2,(0,I.V5)({nid:1}).then(function(s){var d;return(d=s.data)===null||d===void 0?void 0:d.list.map(function(t){return{value:t.id,label:t.cname}})});case 2:return c.abrupt("return",c.sent);case 3:case"end":return c.stop()}},a)}));return function(){return u.apply(this,arguments)}}(),J=function(){var a,r,c;if(!W)return H.default.error({message:"\u6B63\u6587\u5185\u5BB9\u4E3A\u7A7A",description:"\u8BF7\u5148\u5B8C\u5584\u6B63\u6587\u5185\u5BB9\u5E76\u63D2\u5165\u56FE\u50CF"});var s=(0,Z.l3)(W);switch(!0){case s.length==1:H.default.success({message:"\u63D0\u53D6\u56FE\u50CF\u6210\u529F",description:(0,Z.BX)(s.toString())}),(a=h.current)===null||a===void 0||a.setFieldValue("litpic",s.at(0));break;case 1<s.length:!((r=h.current)!==null&&r!==void 0&&r.getFieldValue("litpic"))&&((c=h.current)===null||c===void 0||c.setFieldValue("litpic",s.at(0))),ce.Z.confirm({centered:!0,title:"\u8BF7\u9009\u62E9\u60A8\u8981\u4F7F\u7528\u7684\u56FE\u50CF",icon:(0,n.jsx)(ee.Z,{}),okButtonProps:{shape:"round"},cancelButtonProps:{shape:"round"},content:(0,n.jsx)(w.ZP.Group,{defaultValue:s[0],onChange:function(t){var i;return(i=h.current)===null||i===void 0?void 0:i.setFieldValue("litpic",t.target.value)},children:(0,n.jsx)(D.Z,{size:"middle",direction:"vertical",children:s.map(function(d){return(0,n.jsx)(w.ZP,{value:d,children:(0,n.jsx)(N.Z,{src:d,width:200,fallback:"".concat(te,"logo.svg"),preview:{mask:(0,n.jsxs)(ue.Z.Text,{style:{color:"white"},children:[(0,n.jsx)(z.Z,{})," \u9884\u89C8"]})}})},(0,Z.O1)(3))})})})});break;default:H.default.error({message:"\u63D0\u53D6\u56FE\u50CF\u5931\u8D25",description:"\u6B63\u6587\u4E2D\u4E0D\u5305\u542B\u56FE\u50CF"})}},re=function(a){var r;B(a),(r=h.current)===null||r===void 0||r.setFieldsValue({content:a})},le=function(){var u=(0,l.Z)(O().mark(function a(r){var c,s,d;return O().wrap(function(i){for(;;)switch(i.prev=i.next){case 0:return i.next=2,(0,q.Vj)(Object.assign(r,{content:W,id:(c=(s=U.m8.location.query)===null||s===void 0?void 0:s.id)!==null&&c!==void 0?c:null,author:(d=r==null?void 0:r.author)!==null&&d!==void 0?d:localStorage.getItem("user")})).then(function(o){(o==null?void 0:o.success)&&A.default.success(o.msg),(o==null?void 0:o.success)&&(0,Z.pQ)(2e3).then(function(){return U.m8.push({pathname:"/content/list"})})});case 2:case"end":return i.stop()}},a)}));return function(r){return u.apply(this,arguments)}}(),G=function(){var u=(0,l.Z)(O().mark(function a(r){return O().wrap(function(s){for(;;)switch(s.prev=s.next){case 0:if(!(r!=null&&r.id)){s.next=6;break}return s.next=3,(0,q.L5)((0,M.Z)({},r)).then(function(d){var t,i,o,L,R,ae,oe,K=(t=d==null||(i=d.data)===null||i===void 0?void 0:i.info)!==null&&t!==void 0?t:{};return B((o=K==null||(L=K.content)===null||L===void 0?void 0:L.content)!==null&&o!==void 0?o:null),Y([{status:"done",url:K.litpic,name:(R=(0,Z.BX)(K.litpic))!==null&&R!==void 0?R:"",uid:Math.floor(Math.random()*100).toString()}]),(0,M.Z)((0,M.Z)({},K),{},{content:(ae=K==null||(oe=K.content)===null||oe===void 0?void 0:oe.content)!==null&&ae!==void 0?ae:null})});case 3:return s.abrupt("return",s.sent);case 6:return Y([]),s.abrupt("return",{});case 8:case"end":return s.stop()}},a)}));return function(r){return u.apply(this,arguments)}}();return(0,n.jsx)(p.ZP,{children:(0,n.jsxs)(_.ZP,{formRef:h,layout:"vertical",wrapperCol:{md:{span:16},lg:{span:16},xl:{span:8}},initialValues:{isCrop:1,is_recom:1},submitter:{render:function(a,r){return(0,n.jsx)(D.Z,{size:"middle",children:r},"spaceGroup")},resetButtonProps:{shape:"round",icon:(0,n.jsx)(f.Z,{})},submitButtonProps:{type:"primary",shape:"round",icon:(0,n.jsx)(S.Z,{})}},validateTrigger:["onBlur"],params:{id:($=U.m8.location.query)===null||$===void 0?void 0:$.id},onFinish:function(a){return le(a)},request:function(a){return G(a)},children:[(0,n.jsx)(_._I,{hasFeedback:!0,width:"sm",name:"cid",label:"\u680F\u76EE",request:Q,tooltip:"\u6587\u6863\u53D1\u5E03\u7684\u680F\u76EE",fieldProps:{allowClear:!1},rules:[{required:!0,message:"\u9009\u62E9\u6587\u6863\u53D1\u5E03\u7684\u680F\u76EE"}]}),(0,n.jsx)(_.V,{hasFeedback:!0,label:"\u6807\u9898",name:"title",tooltip:"\u9650\u523632\u4E2A\u5B57\u7B26",placeholder:"\u8BF7\u8F93\u5165\u6587\u6863\u6807\u9898",getValueFromEvent:function(a){return a.target.value.trim()},fieldProps:{maxLength:32,showCount:!0},rules:[{required:!0,message:"\u8BF7\u8F93\u5165\u6587\u6863\u6807\u9898"},{min:15,message:"\u6587\u6863\u6807\u9898\u4E0D\u5B9C\u592A\u77ED"}]}),(0,n.jsx)(_.V,{hasFeedback:!0,label:"\u5173\u952E\u8BCD",name:"keywords",tooltip:"\u8BF7\u7528\u7A7A\u683C\u5206\u9694",placeholder:"\u8BF7\u8F93\u5165\u5173\u952E\u8BCD",fieldProps:{showCount:!0,maxLength:64},rules:[{required:!0,message:"\u8BF7\u8F93\u5165\u5173\u952E\u8BCD"},{min:10,message:"\u518D\u591A\u6765\u4E24\u4E2A\u5173\u952E\u8BCD"},{type:"string",pattern:/^[^\u2018-\u2027\uff01-\uff0f\uff1a-\uff20\u3002]+$/,message:"\u5173\u952E\u8BCD\u53EA\u80FD\u4F7F\u7528\u82F1\u6587\u9017\u53F7\u6216\u7A7A\u683C\u5206\u9694"}]}),(0,n.jsx)(_.$J,{hasFeedback:!0,label:"\u6587\u6863\u7B80\u8FF0",name:"description",tooltip:"SEO\u4F18\u5316\u5F88\u91CD\u8981",placeholder:"\u8BF7\u8F93\u5165\u6587\u6863\u7B80\u8FF0",getValueFromEvent:function(a){return a.target.value.trim()},fieldProps:{allowClear:!0,showCount:!0,maxLength:256,autoSize:{minRows:5,maxRows:8}},rules:[{required:!0,message:"\u8BF7\u8F93\u5165\u6587\u6863\u7B80\u8FF0"},{min:50,message:"\u518D\u591A\u51E0\u53E5\u6587\u6863\u7B80\u8FF0",type:"string"}]}),(0,n.jsx)(_._I,{options:[{value:"upload",label:"\u4E0A\u4F20\u56FE\u50CF"},{value:"extract",label:"\u63D0\u53D6\u56FE\u50CF"},{value:"input",label:"\u56FE\u50CF\u7F51\u5740"}],width:"xs",label:"\u4E0A\u4F20\u65B9\u5F0F",name:"uploadMode",initialValue:["upload"],tooltip:"\u4E0A\u4F20/\u63D0\u53D6/\u8F93\u5165\u56FE\u50CF\u7F51\u5740",fieldProps:{allowClear:!1,onChange:function(){var a;if(!((a=U.m8.location.query)!==null&&a!==void 0&&a.id)){var r;Y([]),(r=h.current)===null||r===void 0||r.setFieldsValue({litpic:[]})}}}}),(0,n.jsx)(_.ie,{name:["uploadMode"],children:function(a){var r=a.uploadMode;switch(r){case"input":return(0,n.jsx)(_.V,{hasFeedback:!0,name:"litpic",label:"\u56FE\u50CF\u7F51\u5740",tooltip:"\u76F4\u63A5\u8F93\u5165\u56FE\u50CF\u7F51\u5740",placeholder:"\u8BF7\u8F93\u5165\u8F93\u5165\u56FE\u7247\u7F51\u5740",getValueFromEvent:function(s){return s.target.value.trim()},rules:[{required:!0,message:"\u8BF7\u8F93\u5165\u56FE\u50CF\u7F51\u5740\u6216\u9009\u62E9\u4E0A\u4F20\u56FE\u50CF\u4F5C\u4E3A\u6587\u6863\u5C01\u9762"},{type:"url",message:"\u8BF7\u8F93\u5165\u6709\u6548\u7684url\u5730\u5740"}]});case"extract":return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(_.ZP.Item,{hasFeedback:!0,name:"litpic",label:"\u63D0\u53D6\u56FE\u50CF",tooltip:"\u4ECE\u6B63\u6587\u63D0\u53D6\u4E00\u5F20\u56FE\u50CF\u4F5C\u4E3A\u5C01\u9762",rules:[{required:!0,message:"\u8BF7\u70B9\u51FB\u6309\u94AE\u4ECE\u6B63\u6587\u4E2D\u63D0\u53D6\u4E00\u5F20\u56FE\u50CF\u4F5C\u4E3A\u6587\u6863\u5C01\u9762"},{type:"url",message:"\u8BF7\u8F93\u5165\u6709\u6548\u7684url\u5730\u5740"}],children:(0,n.jsx)(b.Z,{readOnly:!0,placeholder:"\u4ECE\u6B63\u6587\u63D0\u53D6\u4E00\u5F20\u56FE\u50CF\u4F5C\u4E3A\u5C01\u9762"})}),(0,n.jsx)(_.ZP.Item,{children:(0,n.jsx)(x.Z,{shape:"round",type:"primary",onClick:J,children:"\u63D0\u53D6\u56FE\u50CF"})})]});default:return(0,n.jsx)(_.ZP.Item,{name:"litpic",rules:[{required:!0,message:"\u8BF7\u5B8C\u5584\u6587\u6863\u5C01\u9762"},{type:"array",max:1,message:"\u6587\u6863\u5C01\u9762\u53EA\u9700\u89811\u5F20\u56FE\u7247\u5C31\u884C\u4E86"}],transform:function(s){return s instanceof Array?{litpic:s.at(-1)}:{litpic:s}},children:(0,n.jsx)(F.p,{setFieldValue:function(s){var d;return(d=h.current)===null||d===void 0?void 0:d.setFieldValue("litpic",s)}})})}}}),(0,n.jsx)(_.ZP.Item,{label:"\u6587\u6863\u5C5E\u6027",tooltip:"\u8BBE\u7F6E\u6587\u6863\u5C5E\u6027",children:(0,n.jsxs)(D.Z,{children:[(0,n.jsx)(_.V2,{name:"is_head",children:"\u5934\u6761"}),(0,n.jsx)(_.V2,{name:"is_recom",children:"\u63A8\u8350"}),(0,n.jsx)(_.V2,{name:"is_litpic",children:"\u56FE\u6587"})]})}),(0,n.jsx)(_.ZP.Item,{name:"content",label:"\u6587\u6863\u5185\u5BB9",tooltip:"\u6587\u6863\u5185\u5BB9",wrapperCol:{xs:{span:24},sm:{span:24},xl:{span:16}},rules:[{required:!0,message:"\u6587\u6863\u5185\u5BB9\u4E0D\u5F97\u4E3A\u7A7A"},{min:100,message:"\u9020\u53E5\u5462?\u518D\u591A\u8BF4\u51E0\u53E5\u5427..."}],children:(0,n.jsx)(C.Z,{content:W,setContent:re})})]})})}},7524:function(ie,y,e){"use strict";e.d(y,{Au:function(){return x},Vj:function(){return V},rQ:function(){return b},L5:function(){return M},Od:function(){return X}});var E=e(36571),x=function(){return(0,E.Yu)("/article/author")},V=function(P){return(0,E.qC)("/article/save",P)},b=function(P){return(0,E.Yu)("/article/list",P)},M=function(P){return(0,E.Yu)("/article",P)},X=function(P){return(0,E.qC)("/article/del",P)}}}]);
