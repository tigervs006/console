(self.webpackChunkant_design_pro=self.webpackChunkant_design_pro||[]).push([[7739],{64335:function(Ze,ie,i){"use strict";var z=i(67294),w=(0,z.createContext)({});ie.Z=w},46298:function(Ze,ie,i){"use strict";i.d(ie,{ZP:function(){return Kt}});var z=i(38663),w=i(70883),L=i(22122),X=i(96156),I=i(6610),g=i(5991),ee=i(10379),ve=i(60446),Ne=i(90484),le=i(36228),me=i.n(le),he=i(8189),Fe=i(10366),s=i(67294),q=i(53124),pe=i(85061),Re=i(96523);function He(n){var e,a=function(o){return function(){e=null,n.apply(void 0,(0,pe.Z)(o))}},t=function(){if(e==null){for(var o=arguments.length,d=new Array(o),u=0;u<o;u++)d[u]=arguments[u];e=(0,Re.Z)(a(d))}};return t.cancel=function(){Re.Z.cancel(e),e=null},t}function ge(){return function(e,a,t){var r=t.value,o=!1;return{configurable:!0,get:function(){if(o||this===e.prototype||this.hasOwnProperty(a))return r;var u=He(r.bind(this));return o=!0,Object.defineProperty(this,a,{value:u,configurable:!0,writable:!0}),o=!1,u}}}}var Oe=i(73935);function We(n,e,a,t){var r=Oe.unstable_batchedUpdates?function(d){Oe.unstable_batchedUpdates(a,d)}:a;return n.addEventListener&&n.addEventListener(e,r,t),{remove:function(){n.removeEventListener&&n.removeEventListener(e,r,t)}}}function se(n){return n!==window?n.getBoundingClientRect():{top:0,bottom:window.innerHeight}}function Be(n,e,a){if(a!==void 0&&e.top>n.top-a)return a+e.top}function Te(n,e,a){if(a!==void 0&&e.bottom<n.bottom+a){var t=window.innerHeight-e.bottom;return a+t}}var Se=["resize","scroll","touchstart","touchmove","touchend","pageshow","load"],te=[];function _e(){return te}function ze(n,e){if(!!n){var a=te.find(function(t){return t.target===n});a?a.affixList.push(e):(a={target:n,affixList:[e],eventHandlers:{}},te.push(a),Se.forEach(function(t){a.eventHandlers[t]=We(n,t,function(){a.affixList.forEach(function(r){r.lazyUpdatePosition()})})}))}}function Me(n){var e=te.find(function(a){var t=a.affixList.some(function(r){return r===n});return t&&(a.affixList=a.affixList.filter(function(r){return r!==n})),t});e&&e.affixList.length===0&&(te=te.filter(function(a){return a!==e}),Se.forEach(function(a){var t=e.eventHandlers[a];t&&t.remove&&t.remove()}))}var Ae=function(n,e,a,t){var r=arguments.length,o=r<3?e:t===null?t=Object.getOwnPropertyDescriptor(e,a):t,d;if((typeof Reflect=="undefined"?"undefined":(0,Ne.Z)(Reflect))==="object"&&typeof Reflect.decorate=="function")o=Reflect.decorate(n,e,a,t);else for(var u=n.length-1;u>=0;u--)(d=n[u])&&(o=(r<3?d(o):r>3?d(e,a,o):d(e,a))||o);return r>3&&o&&Object.defineProperty(e,a,o),o};function Ue(){return typeof window!="undefined"?window:null}var ae;(function(n){n[n.None=0]="None",n[n.Prepare=1]="Prepare"})(ae||(ae={}));var re=function(n){(0,ee.Z)(a,n);var e=(0,ve.Z)(a);function a(){var t;return(0,I.Z)(this,a),t=e.apply(this,arguments),t.state={status:ae.None,lastAffix:!1,prevTarget:null},t.getOffsetTop=function(){var r=t.props,o=r.offsetBottom,d=r.offsetTop;return o===void 0&&d===void 0?0:d},t.getOffsetBottom=function(){return t.props.offsetBottom},t.savePlaceholderNode=function(r){t.placeholderNode=r},t.saveFixedNode=function(r){t.fixedNode=r},t.measure=function(){var r=t.state,o=r.status,d=r.lastAffix,u=t.props.onChange,m=t.getTargetFunc();if(!(o!==ae.Prepare||!t.fixedNode||!t.placeholderNode||!m)){var h=t.getOffsetTop(),C=t.getOffsetBottom(),P=m();if(!!P){var c={status:ae.None},R=se(P),v=se(t.placeholderNode),b=Be(v,R,h),M=Te(v,R,C);v.top===0&&v.left===0&&v.width===0&&v.height===0||(b!==void 0?(c.affixStyle={position:"fixed",top:b,width:v.width,height:v.height},c.placeholderStyle={width:v.width,height:v.height}):M!==void 0&&(c.affixStyle={position:"fixed",bottom:M,width:v.width,height:v.height},c.placeholderStyle={width:v.width,height:v.height}),c.lastAffix=!!c.affixStyle,u&&d!==c.lastAffix&&u(c.lastAffix),t.setState(c))}}},t.prepareMeasure=function(){if(t.setState({status:ae.Prepare,affixStyle:void 0,placeholderStyle:void 0}),!1)var r},t}return(0,g.Z)(a,[{key:"getTargetFunc",value:function(){var r=this.context.getTargetContainer,o=this.props.target;return o!==void 0?o:r!=null?r:Ue}},{key:"componentDidMount",value:function(){var r=this,o=this.getTargetFunc();o&&(this.timeout=setTimeout(function(){ze(o(),r),r.updatePosition()}))}},{key:"componentDidUpdate",value:function(r){var o=this.state.prevTarget,d=this.getTargetFunc(),u=(d==null?void 0:d())||null;o!==u&&(Me(this),u&&(ze(u,this),this.updatePosition()),this.setState({prevTarget:u})),(r.offsetTop!==this.props.offsetTop||r.offsetBottom!==this.props.offsetBottom)&&this.updatePosition(),this.measure()}},{key:"componentWillUnmount",value:function(){clearTimeout(this.timeout),Me(this),this.updatePosition.cancel(),this.lazyUpdatePosition.cancel()}},{key:"updatePosition",value:function(){this.prepareMeasure()}},{key:"lazyUpdatePosition",value:function(){var r=this.getTargetFunc(),o=this.state.affixStyle;if(r&&o){var d=this.getOffsetTop(),u=this.getOffsetBottom(),m=r();if(m&&this.placeholderNode){var h=se(m),C=se(this.placeholderNode),P=Be(C,h,d),c=Te(C,h,u);if(P!==void 0&&o.top===P||c!==void 0&&o.bottom===c)return}}this.prepareMeasure()}},{key:"render",value:function(){var r=this,o=this.state,d=o.affixStyle,u=o.placeholderStyle,m=this.props,h=m.affixPrefixCls,C=m.children,P=me()((0,X.Z)({},h,!!d)),c=(0,Fe.Z)(this.props,["prefixCls","offsetTop","offsetBottom","target","onChange","affixPrefixCls"]);return s.createElement(he.Z,{onResize:function(){r.updatePosition()}},s.createElement("div",(0,L.Z)({},c,{ref:this.savePlaceholderNode}),d&&s.createElement("div",{style:u,"aria-hidden":"true"}),s.createElement("div",{className:P,ref:this.saveFixedNode,style:d},s.createElement(he.Z,{onResize:function(){r.updatePosition()}},C))))}}]),a}(s.Component);re.contextType=q.E_,Ae([ge()],re.prototype,"updatePosition",null),Ae([ge()],re.prototype,"lazyUpdatePosition",null);var ke=s.forwardRef(function(n,e){var a=n.prefixCls,t=s.useContext(q.E_),r=t.getPrefixCls,o=r("affix",a),d=(0,L.Z)((0,L.Z)({},n),{affixPrefixCls:o});return s.createElement(re,(0,L.Z)({},d,{ref:e}))}),Ke=ke,et=i(84305),Y=i(88182),tt=i(59903),at=i(94233),A=i(81262),l=i(59250),x=i(30887),B=i(49111),O=i(28481),f=i(28991),j={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M872 474H286.9l350.2-304c5.6-4.9 2.2-14-5.2-14h-88.5c-3.9 0-7.6 1.4-10.5 3.9L155 487.8a31.96 31.96 0 000 48.3L535.1 866c1.5 1.3 3.3 2 5.2 2h91.5c7.4 0 10.8-9.2 5.2-14L286.9 550H872c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z"}}]},name:"arrow-left",theme:"outlined"},N=j,E=i(27029),p=function(e,a){return s.createElement(E.Z,(0,f.Z)((0,f.Z)({},e),{},{ref:a,icon:N}))};p.displayName="ArrowLeftOutlined";var D=s.forwardRef(p),T={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M869 487.8L491.2 159.9c-2.9-2.5-6.6-3.9-10.5-3.9h-88.5c-7.4 0-10.8 9.2-5.2 14l350.2 304H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h585.1L386.9 854c-5.6 4.9-2.2 14 5.2 14h91.5c1.9 0 3.8-.7 5.2-2L869 536.2a32.07 32.07 0 000-48.4z"}}]},name:"arrow-right",theme:"outlined"},$=T,J=function(e,a){return s.createElement(E.Z,(0,f.Z)((0,f.Z)({},e),{},{ref:a,icon:$}))};J.displayName="ArrowRightOutlined";var xe=s.forwardRef(J),je=i(9475),Ge=i(51890),Ve=i(37419),K=i(28682),ne=i(96159),ce=i(57254),de=i(81555),ue=function(n,e){var a={};for(var t in n)Object.prototype.hasOwnProperty.call(n,t)&&e.indexOf(t)<0&&(a[t]=n[t]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,t=Object.getOwnPropertySymbols(n);r<t.length;r++)e.indexOf(t[r])<0&&Object.prototype.propertyIsEnumerable.call(n,t[r])&&(a[t[r]]=n[t[r]]);return a},Ce=function(e){var a=e.prefixCls,t=e.separator,r=t===void 0?"/":t,o=e.children,d=e.menu,u=e.overlay,m=e.dropdownProps,h=ue(e,["prefixCls","separator","children","menu","overlay","dropdownProps"]),C=s.useContext(q.E_),P=C.getPrefixCls,c=P("breadcrumb",a),R=function(M){return d||u?s.createElement(de.Z,(0,L.Z)({menu:d,overlay:u,placement:"bottom"},m),s.createElement("span",{className:"".concat(c,"-overlay-link")},M,s.createElement(ce.Z,null))):M},v;return"href"in h?v=s.createElement("a",(0,L.Z)({className:"".concat(c,"-link")},h),o):v=s.createElement("span",(0,L.Z)({className:"".concat(c,"-link")},h),o),v=R(v),o!=null?s.createElement("li",null,v,r&&s.createElement("span",{className:"".concat(c,"-separator")},r)):null};Ce.__ANT_BREADCRUMB_ITEM=!0;var we=Ce,Pe=function(e){var a=e.children,t=s.useContext(q.E_),r=t.getPrefixCls,o=r("breadcrumb");return s.createElement("span",{className:"".concat(o,"-separator")},a||"/")};Pe.__ANT_BREADCRUMB_SEPARATOR=!0;var De=Pe,Xe=function(n,e){var a={};for(var t in n)Object.prototype.hasOwnProperty.call(n,t)&&e.indexOf(t)<0&&(a[t]=n[t]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,t=Object.getOwnPropertySymbols(n);r<t.length;r++)e.indexOf(t[r])<0&&Object.prototype.propertyIsEnumerable.call(n,t[r])&&(a[t[r]]=n[t[r]]);return a};function Le(n,e){if(!n.breadcrumbName)return null;var a=Object.keys(e).join("|"),t=n.breadcrumbName.replace(new RegExp(":(".concat(a,")"),"g"),function(r,o){return e[o]||r});return t}function Ye(n,e,a,t){var r=a.indexOf(n)===a.length-1,o=Le(n,e);return r?s.createElement("span",null,o):s.createElement("a",{href:"#/".concat(t.join("/"))},o)}var Ie=function(e,a){return e=(e||"").replace(/^\//,""),Object.keys(a).forEach(function(t){e=e.replace(":".concat(t),a[t])}),e},vt=function(e,a,t){var r=(0,pe.Z)(e),o=Ie(a||"",t);return o&&r.push(o),r},Je=function(e){var a=e.prefixCls,t=e.separator,r=t===void 0?"/":t,o=e.style,d=e.className,u=e.routes,m=e.children,h=e.itemRender,C=h===void 0?Ye:h,P=e.params,c=P===void 0?{}:P,R=Xe(e,["prefixCls","separator","style","className","routes","children","itemRender","params"]),v=s.useContext(q.E_),b=v.getPrefixCls,M=v.direction,Z,F=b("breadcrumb",a);if(u&&u.length>0){var H=[];Z=u.map(function(S){var G=Ie(S.path,c);G&&H.push(G);var k;S.children&&S.children.length&&(k=s.createElement(K.Z,{items:S.children.map(function(V){return{key:V.path||V.breadcrumbName,label:C(V,c,u,vt(H,V.path,c))}})}));var Q={separator:r};return k&&(Q.overlay=k),s.createElement(we,(0,L.Z)({},Q,{key:G||S.breadcrumbName}),C(S,c,u,H))})}else m&&(Z=(0,Ve.Z)(m).map(function(S,G){return S&&(0,ne.Tm)(S,{separator:r,key:G})}));var W=me()(F,(0,X.Z)({},"".concat(F,"-rtl"),M==="rtl"),d);return s.createElement("nav",(0,L.Z)({className:W,style:o},R),s.createElement("ol",null,Z))};Je.Item=we,Je.Separator=De;var mt=Je,ht=mt,gt=i(42051),xt=i(19650),Ct=i(99032),Pt=function(e,a,t){return!a||!t?null:s.createElement(gt.Z,{componentName:"PageHeader"},function(r){return s.createElement("div",{className:"".concat(e,"-back")},s.createElement(Ct.Z,{onClick:function(d){t==null||t(d)},className:"".concat(e,"-back-button"),"aria-label":r.back},a))})},yt=function(e){return s.createElement(ht,(0,L.Z)({},e))},bt=function(e){var a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"ltr";return e.backIcon!==void 0?e.backIcon:a==="rtl"?s.createElement(xe,null):s.createElement(D,null)},Et=function(e,a){var t=arguments.length>2&&arguments[2]!==void 0?arguments[2]:"ltr",r=a.title,o=a.avatar,d=a.subTitle,u=a.tags,m=a.extra,h=a.onBack,C="".concat(e,"-heading"),P=r||d||u||m;if(!P)return null;var c=bt(a,t),R=Pt(e,c,h),v=R||o||P;return s.createElement("div",{className:C},v&&s.createElement("div",{className:"".concat(C,"-left")},R,o&&s.createElement(Ge.C,(0,L.Z)({},o)),r&&s.createElement("span",{className:"".concat(C,"-title"),title:typeof r=="string"?r:void 0},r),d&&s.createElement("span",{className:"".concat(C,"-sub-title"),title:typeof d=="string"?d:void 0},d),u&&s.createElement("span",{className:"".concat(C,"-tags")},u)),m&&s.createElement("span",{className:"".concat(C,"-extra")},s.createElement(xt.Z,null,m)))},Zt=function(e,a){return a?s.createElement("div",{className:"".concat(e,"-footer")},a):null},Nt=function(e,a){return s.createElement("div",{className:"".concat(e,"-content")},a)},pt=function(e){var a=(0,je.Z)(!1),t=(0,O.Z)(a,2),r=t[0],o=t[1],d=function(m){var h=m.width;o(h<768,!0)};return s.createElement(q.C,null,function(u){var m,h=u.getPrefixCls,C=u.pageHeader,P=u.direction,c,R=e.prefixCls,v=e.style,b=e.footer,M=e.children,Z=e.breadcrumb,F=e.breadcrumbRender,H=e.className,W=!0;"ghost"in e?W=e.ghost:C&&"ghost"in C&&(W=C.ghost);var S=h("page-header",R),G=function(){return(Z==null?void 0:Z.routes)?yt(Z):null},k=G(),Q=Z&&"props"in Z,V=(c=F==null?void 0:F(e,k))!==null&&c!==void 0?c:k,U=Q?Z:V,fe=me()(S,H,(m={"has-breadcrumb":!!U,"has-footer":!!b},(0,X.Z)(m,"".concat(S,"-ghost"),W),(0,X.Z)(m,"".concat(S,"-rtl"),P==="rtl"),(0,X.Z)(m,"".concat(S,"-compact"),r),m));return s.createElement(he.Z,{onResize:d},s.createElement("div",{className:fe,style:v},U,Et(S,e,P),M&&Nt(S,M),Zt(S,b)))})},Rt=pt,Qe=i(81253),oa=i(18106),rt=i(72059),y=i(85893),Ot=i(3997),ye=i.n(Ot),$e=i(64335),Bt=i(97435),la=i(56264),Tt=["children","className","extra","style","renderContent"],St=function(e){var a=e.children,t=e.className,r=e.extra,o=e.style,d=e.renderContent,u=(0,Qe.Z)(e,Tt),m=(0,s.useContext)(Y.ZP.ConfigContext),h=m.getPrefixCls,C=e.prefixCls||h("pro"),P="".concat(C,"-footer-bar"),c=(0,s.useContext)($e.Z),R=(0,s.useMemo)(function(){var b=c.hasSiderMenu,M=c.isMobile,Z=c.siderWidth;if(!!b)return Z?M?"100%":"calc(100% - ".concat(Z,"px)"):"100%"},[c.collapsed,c.hasSiderMenu,c.isMobile,c.siderWidth]),v=(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)("div",{className:"".concat(P,"-left"),children:r}),(0,y.jsx)("div",{className:"".concat(P,"-right"),children:a})]});return(0,s.useEffect)(function(){return!c||!(c==null?void 0:c.setHasFooterToolbar)?function(){}:(c==null||c.setHasFooterToolbar(!0),function(){var b;c==null||(b=c.setHasFooterToolbar)===null||b===void 0||b.call(c,!1)})},[]),(0,y.jsx)("div",(0,f.Z)((0,f.Z)({className:ye()(t,"".concat(P)),style:(0,f.Z)({width:R},o)},(0,Bt.Z)(u,["prefixCls"])),{},{children:d?d((0,f.Z)((0,f.Z)((0,f.Z)({},e),c),{},{leftWidth:R}),v):v}))},zt=St,sa=i(53645),Mt=function(e){var a=(0,s.useContext)($e.Z),t=e.children,r=e.contentWidth,o=e.className,d=e.style,u=(0,s.useContext)(Y.ZP.ConfigContext),m=u.getPrefixCls,h=e.prefixCls||m("pro"),C=r||a.contentWidth,P="".concat(h,"-grid-content");return(0,y.jsx)("div",{className:ye()(P,o,{wide:C==="Fixed"}),style:d,children:(0,y.jsx)("div",{className:"".concat(h,"-grid-content-children"),children:t})})},At=Mt,jt=i(83832),wt=function(e){if(!e)return 1;var a=e.backingStorePixelRatio||e.webkitBackingStorePixelRatio||e.mozBackingStorePixelRatio||e.msBackingStorePixelRatio||e.oBackingStorePixelRatio||e.backingStorePixelRatio||1;return(window.devicePixelRatio||1)/a},Dt=function(e){var a=e.children,t=e.style,r=e.className,o=e.markStyle,d=e.markClassName,u=e.zIndex,m=u===void 0?9:u,h=e.gapX,C=h===void 0?212:h,P=e.gapY,c=P===void 0?222:P,R=e.width,v=R===void 0?120:R,b=e.height,M=b===void 0?64:b,Z=e.rotate,F=Z===void 0?-22:Z,H=e.image,W=e.content,S=e.offsetLeft,G=e.offsetTop,k=e.fontStyle,Q=k===void 0?"normal":k,V=e.fontWeight,U=V===void 0?"normal":V,fe=e.fontColor,qe=fe===void 0?"rgba(0,0,0,.15)":fe,nt=e.fontSize,it=nt===void 0?16:nt,ot=e.fontFamily,lt=ot===void 0?"sans-serif":ot,Gt=e.prefixCls,Vt=(0,s.useContext)(Y.ZP.ConfigContext),Xt=Vt.getPrefixCls,st=Xt("pro-layout-watermark",Gt),Yt=ye()("".concat(st,"-wrapper"),r),Jt=ye()(st,d),Qt=(0,s.useState)(""),ct=(0,O.Z)(Qt,2),dt=ct[0],ut=ct[1];return(0,s.useEffect)(function(){var be=document.createElement("canvas"),_=be.getContext("2d"),oe=wt(_),qt="".concat((C+v)*oe,"px"),_t="".concat((c+M)*oe,"px"),ea=S||C/2,ta=G||c/2;if(be.setAttribute("width",qt),be.setAttribute("height",_t),_){_.translate(ea*oe,ta*oe),_.rotate(Math.PI/180*Number(F));var aa=v*oe,ft=M*oe;if(H){var Ee=new Image;Ee.crossOrigin="anonymous",Ee.referrerPolicy="no-referrer",Ee.src=H,Ee.onload=function(){_.drawImage(Ee,0,0,aa,ft),ut(be.toDataURL())}}else if(W){var ra=Number(it)*oe;_.font="".concat(Q," normal ").concat(U," ").concat(ra,"px/").concat(ft,"px ").concat(lt),_.fillStyle=qe,Array.isArray(W)?W==null||W.forEach(function(na,ia){return _.fillText(na,0,ia*50)}):_.fillText(W,0,0),ut(be.toDataURL())}}else console.error("\u5F53\u524D\u73AF\u5883\u4E0D\u652F\u6301Canvas")},[C,c,S,G,F,Q,U,v,M,lt,qe,H,W,it]),(0,y.jsxs)("div",{style:(0,f.Z)({position:"relative"},t),className:Yt,children:[a,(0,y.jsx)("div",{className:Jt,style:(0,f.Z)((0,f.Z)({zIndex:m,position:"absolute",left:0,top:0,width:"100%",height:"100%",backgroundSize:"".concat(C+v,"px"),pointerEvents:"none",backgroundRepeat:"repeat"},dt?{backgroundImage:"url('".concat(dt,"')")}:null),o)})]})},Lt=Dt,ca=i(12395),It=["title","content","pageHeaderRender","header","prefixedClassName","extraContent","style","prefixCls","breadcrumbRender"],$t=["children","loading","className","style","footer","affixProps","ghost","fixedHeader","breadcrumbRender"];function Ft(n){return(0,Ne.Z)(n)==="object"?n:{spinning:n}}var Ht=function(e){var a=e.tabList,t=e.tabActiveKey,r=e.onTabChange,o=e.tabBarExtraContent,d=e.tabProps,u=e.prefixedClassName;return Array.isArray(a)||o?(0,y.jsx)(rt.Z,(0,f.Z)((0,f.Z)({className:"".concat(u,"-tabs"),activeKey:t,onChange:function(h){r&&r(h)},tabBarExtraContent:o},d),{},{children:a==null?void 0:a.map(function(m,h){return(0,s.createElement)(rt.Z.TabPane,(0,f.Z)((0,f.Z)({},m),{},{tab:m.tab,key:m.key||h}))})})):null},Wt=function(e,a,t){return!e&&!a?null:(0,y.jsx)("div",{className:"".concat(t,"-detail"),children:(0,y.jsx)("div",{className:"".concat(t,"-main"),children:(0,y.jsxs)("div",{className:"".concat(t,"-row"),children:[e&&(0,y.jsx)("div",{className:"".concat(t,"-content"),children:e}),a&&(0,y.jsx)("div",{className:"".concat(t,"-extraContent"),children:a})]})})})},da=function(e){var a=useContext(RouteContext);return _jsx("div",{style:{height:"100%",display:"flex",alignItems:"center"},children:_jsx(_Breadcrumb,_objectSpread(_objectSpread(_objectSpread({},a==null?void 0:a.breadcrumb),a==null?void 0:a.breadcrumbProps),e))})},Ut=function(e){var a,t=(0,s.useContext)($e.Z),r=e.title,o=e.content,d=e.pageHeaderRender,u=e.header,m=e.prefixedClassName,h=e.extraContent,C=e.style,P=e.prefixCls,c=e.breadcrumbRender,R=(0,Qe.Z)(e,It),v=(0,s.useMemo)(function(){if(!!c)return c},[c]);if(d===!1)return null;if(d)return(0,y.jsxs)(y.Fragment,{children:[" ",d((0,f.Z)((0,f.Z)({},e),t))]});var b=r;!r&&r!==!1&&(b=t.title);var M=(0,f.Z)((0,f.Z)((0,f.Z)({},t),{},{title:b},R),{},{footer:Ht((0,f.Z)((0,f.Z)({},R),{},{breadcrumbRender:c,prefixedClassName:m}))},u),Z=M.breadcrumb,F=(!Z||!(Z==null?void 0:Z.itemRender)&&!(Z==null||(a=Z.routes)===null||a===void 0?void 0:a.length))&&!c;return["title","subTitle","extra","tags","footer","avatar","backIcon"].every(function(H){return!M[H]})&&F&&!o&&!h?null:(0,y.jsx)("div",{className:"".concat(m,"-warp"),children:(0,y.jsx)(Rt,(0,f.Z)((0,f.Z)({},M),{},{breadcrumb:c===!1?void 0:(0,f.Z)((0,f.Z)({},M.breadcrumb),t.breadcrumbProps),breadcrumbRender:v,prefixCls:P,children:(u==null?void 0:u.children)||Wt(o,h,m)}))})},kt=function(e){var a,t,r=e.children,o=e.loading,d=o===void 0?!1:o,u=e.className,m=e.style,h=e.footer,C=e.affixProps,P=e.ghost,c=e.fixedHeader,R=e.breadcrumbRender,v=(0,Qe.Z)(e,$t),b=(0,s.useContext)($e.Z),M=(0,s.useContext)(Y.ZP.ConfigContext),Z=M.getPrefixCls,F=e.prefixCls||Z("pro"),H="".concat(F,"-page-container"),W=ye()(H,u,(a={},(0,X.Z)(a,"".concat(F,"-page-container-ghost"),P),(0,X.Z)(a,"".concat(F,"-page-container-with-footer"),h),a)),S=(0,s.useMemo)(function(){return r?(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)("div",{className:"".concat(H,"-children-content"),children:r}),b.hasFooterToolbar&&(0,y.jsx)("div",{style:{height:48,marginTop:24}})]}):null},[r,H,b.hasFooterToolbar]),G=(0,s.useMemo)(function(){var U;return R==!1?!1:R||(v==null||(U=v.header)===null||U===void 0?void 0:U.breadcrumbRender)},[R,v==null||(t=v.header)===null||t===void 0?void 0:t.breadcrumbRender]),k=(0,y.jsx)(Ut,(0,f.Z)((0,f.Z)({},v),{},{breadcrumbRender:G,ghost:P,prefixCls:void 0,prefixedClassName:H})),Q=(0,s.useMemo)(function(){if(s.isValidElement(d))return d;if(typeof d=="boolean"&&!d)return null;var U=Ft(d);return U.spinning?(0,y.jsx)(jt.Z,(0,f.Z)({},U)):null},[d]),V=(0,s.useMemo)(function(){var U=Q||S;if(e.waterMarkProps||b.waterMarkProps){var fe=(0,f.Z)((0,f.Z)({},b.waterMarkProps),e.waterMarkProps);return(0,y.jsx)(Lt,(0,f.Z)((0,f.Z)({},fe),{},{children:U}))}return U},[e.waterMarkProps,b.waterMarkProps,Q,S]);return(0,y.jsxs)("div",{style:m,className:W,children:[c&&k?(0,y.jsx)(Ke,(0,f.Z)((0,f.Z)({offsetTop:b.hasHeader&&b.fixedHeader?b.headerHeight:0},C),{},{children:k})):k,V&&(0,y.jsx)(At,{children:V}),h&&(0,y.jsx)(zt,{prefixCls:F,children:h})]})},Kt=kt},56264:function(){},53645:function(){},12395:function(){},70883:function(){},81262:function(){},70347:function(){},59903:function(){},18067:function(){},58024:function(Ze,ie,i){"use strict";var z=i(38663),w=i.n(z),L=i(70347),X=i.n(L),I=i(71748),g=i(18106)},90860:function(Ze,ie,i){"use strict";i.d(ie,{Z:function(){return at}});var z=i(96156),w=i(22122),L=i(90484),X=i(36228),I=i.n(X),g=i(67294),ee=i(53124),ve=i(10366),Ne=function(l){var x,B,O=l.prefixCls,f=l.className,j=l.style,N=l.size,E=l.shape,p=I()((x={},(0,z.Z)(x,"".concat(O,"-lg"),N==="large"),(0,z.Z)(x,"".concat(O,"-sm"),N==="small"),x)),D=I()((B={},(0,z.Z)(B,"".concat(O,"-circle"),E==="circle"),(0,z.Z)(B,"".concat(O,"-square"),E==="square"),(0,z.Z)(B,"".concat(O,"-round"),E==="round"),B)),T=g.useMemo(function(){return typeof N=="number"?{width:N,height:N,lineHeight:"".concat(N,"px")}:{}},[N]);return g.createElement("span",{className:I()(O,p,D,f),style:(0,w.Z)((0,w.Z)({},T),j)})},le=Ne,me=function(l){var x=l.prefixCls,B=l.className,O=l.active,f=l.shape,j=f===void 0?"circle":f,N=l.size,E=N===void 0?"default":N,p=g.useContext(ee.E_),D=p.getPrefixCls,T=D("skeleton",x),$=(0,ve.Z)(l,["prefixCls","className"]),J=I()(T,"".concat(T,"-element"),(0,z.Z)({},"".concat(T,"-active"),O),B);return g.createElement("div",{className:J},g.createElement(le,(0,w.Z)({prefixCls:"".concat(T,"-avatar"),shape:j,size:E},$)))},he=me,Fe=function(l){var x,B=l.prefixCls,O=l.className,f=l.active,j=l.block,N=j===void 0?!1:j,E=l.size,p=E===void 0?"default":E,D=g.useContext(ee.E_),T=D.getPrefixCls,$=T("skeleton",B),J=(0,ve.Z)(l,["prefixCls"]),xe=I()($,"".concat($,"-element"),(x={},(0,z.Z)(x,"".concat($,"-active"),f),(0,z.Z)(x,"".concat($,"-block"),N),x),O);return g.createElement("div",{className:xe},g.createElement(le,(0,w.Z)({prefixCls:"".concat($,"-button"),size:p},J)))},s=Fe,q=i(28991),pe={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M888 792H200V168c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v688c0 4.4 3.6 8 8 8h752c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM288 604a64 64 0 10128 0 64 64 0 10-128 0zm118-224a48 48 0 1096 0 48 48 0 10-96 0zm158 228a96 96 0 10192 0 96 96 0 10-192 0zm148-314a56 56 0 10112 0 56 56 0 10-112 0z"}}]},name:"dot-chart",theme:"outlined"},Re=pe,He=i(27029),ge=function(l,x){return g.createElement(He.Z,(0,q.Z)((0,q.Z)({},l),{},{ref:x,icon:Re}))};ge.displayName="DotChartOutlined";var Oe=g.forwardRef(ge),We=function(l){var x=l.prefixCls,B=l.className,O=l.style,f=l.active,j=l.children,N=g.useContext(ee.E_),E=N.getPrefixCls,p=E("skeleton",x),D=I()(p,"".concat(p,"-element"),(0,z.Z)({},"".concat(p,"-active"),f),B),T=j!=null?j:g.createElement(Oe,null);return g.createElement("div",{className:D},g.createElement("div",{className:I()("".concat(p,"-image"),B),style:O},T))},se=We,Be="M365.714286 329.142857q0 45.714286-32.036571 77.677714t-77.677714 32.036571-77.677714-32.036571-32.036571-77.677714 32.036571-77.677714 77.677714-32.036571 77.677714 32.036571 32.036571 77.677714zM950.857143 548.571429l0 256-804.571429 0 0-109.714286 182.857143-182.857143 91.428571 91.428571 292.571429-292.571429zM1005.714286 146.285714l-914.285714 0q-7.460571 0-12.873143 5.412571t-5.412571 12.873143l0 694.857143q0 7.460571 5.412571 12.873143t12.873143 5.412571l914.285714 0q7.460571 0 12.873143-5.412571t5.412571-12.873143l0-694.857143q0-7.460571-5.412571-12.873143t-12.873143-5.412571zM1097.142857 164.571429l0 694.857143q0 37.741714-26.843429 64.585143t-64.585143 26.843429l-914.285714 0q-37.741714 0-64.585143-26.843429t-26.843429-64.585143l0-694.857143q0-37.741714 26.843429-64.585143t64.585143-26.843429l914.285714 0q37.741714 0 64.585143 26.843429t26.843429 64.585143z",Te=function(l){var x=l.prefixCls,B=l.className,O=l.style,f=l.active,j=g.useContext(ee.E_),N=j.getPrefixCls,E=N("skeleton",x),p=I()(E,"".concat(E,"-element"),(0,z.Z)({},"".concat(E,"-active"),f),B);return g.createElement("div",{className:p},g.createElement("div",{className:I()("".concat(E,"-image"),B),style:O},g.createElement("svg",{viewBox:"0 0 1098 1024",xmlns:"http://www.w3.org/2000/svg",className:"".concat(E,"-image-svg")},g.createElement("path",{d:Be,className:"".concat(E,"-image-path")}))))},Se=Te,te=function(l){var x,B=l.prefixCls,O=l.className,f=l.active,j=l.block,N=l.size,E=N===void 0?"default":N,p=g.useContext(ee.E_),D=p.getPrefixCls,T=D("skeleton",B),$=(0,ve.Z)(l,["prefixCls"]),J=I()(T,"".concat(T,"-element"),(x={},(0,z.Z)(x,"".concat(T,"-active"),f),(0,z.Z)(x,"".concat(T,"-block"),j),x),O);return g.createElement("div",{className:J},g.createElement(le,(0,w.Z)({prefixCls:"".concat(T,"-input"),size:E},$)))},_e=te,ze=i(85061),Me=function(l){var x=function(p){var D=l.width,T=l.rows,$=T===void 0?2:T;if(Array.isArray(D))return D[p];if($-1===p)return D},B=l.prefixCls,O=l.className,f=l.style,j=l.rows,N=(0,ze.Z)(Array(j)).map(function(E,p){return g.createElement("li",{key:p,style:{width:x(p)}})});return g.createElement("ul",{className:I()(B,O),style:f},N)},Ae=Me,Ue=function(l){var x=l.prefixCls,B=l.className,O=l.width,f=l.style;return g.createElement("h3",{className:I()(x,B),style:(0,w.Z)({width:O},f)})},ae=Ue;function re(A){return A&&(0,L.Z)(A)==="object"?A:{}}function ke(A,l){return A&&!l?{size:"large",shape:"square"}:{size:"large",shape:"circle"}}function Ke(A,l){return!A&&l?{width:"38%"}:A&&l?{width:"50%"}:{}}function et(A,l){var x={};return(!A||!l)&&(x.width="61%"),!A&&l?x.rows=3:x.rows=2,x}var Y=function(l){var x=l.prefixCls,B=l.loading,O=l.className,f=l.style,j=l.children,N=l.avatar,E=N===void 0?!1:N,p=l.title,D=p===void 0?!0:p,T=l.paragraph,$=T===void 0?!0:T,J=l.active,xe=l.round,je=g.useContext(ee.E_),Ge=je.getPrefixCls,Ve=je.direction,K=Ge("skeleton",x);if(B||!("loading"in l)){var ne,ce=!!E,de=!!D,ue=!!$,Ce;if(ce){var we=(0,w.Z)((0,w.Z)({prefixCls:"".concat(K,"-avatar")},ke(de,ue)),re(E));Ce=g.createElement("div",{className:"".concat(K,"-header")},g.createElement(le,(0,w.Z)({},we)))}var Pe;if(de||ue){var De;if(de){var Xe=(0,w.Z)((0,w.Z)({prefixCls:"".concat(K,"-title")},Ke(ce,ue)),re(D));De=g.createElement(ae,(0,w.Z)({},Xe))}var Le;if(ue){var Ye=(0,w.Z)((0,w.Z)({prefixCls:"".concat(K,"-paragraph")},et(ce,de)),re($));Le=g.createElement(Ae,(0,w.Z)({},Ye))}Pe=g.createElement("div",{className:"".concat(K,"-content")},De,Le)}var Ie=I()(K,(ne={},(0,z.Z)(ne,"".concat(K,"-with-avatar"),ce),(0,z.Z)(ne,"".concat(K,"-active"),J),(0,z.Z)(ne,"".concat(K,"-rtl"),Ve==="rtl"),(0,z.Z)(ne,"".concat(K,"-round"),xe),ne),O);return g.createElement("div",{className:Ie,style:f},Ce,Pe)}return typeof j!="undefined"?j:null};Y.Button=s,Y.Avatar=he,Y.Input=_e,Y.Image=Se,Y.Node=se;var tt=Y,at=tt},71748:function(Ze,ie,i){"use strict";var z=i(38663),w=i.n(z),L=i(18067),X=i.n(L)}}]);
