(self.webpackChunkant_design_pro=self.webpackChunkant_design_pro||[]).push([[156],{85008:function(L,d,S){"use strict";S.d(d,{Z:function(){return D}});var b=S(28991),m=S(67294),c={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M864 248H728l-32.4-90.8a32.07 32.07 0 00-30.2-21.2H358.6c-13.5 0-25.6 8.5-30.1 21.2L296 248H160c-44.2 0-80 35.8-80 80v456c0 44.2 35.8 80 80 80h704c44.2 0 80-35.8 80-80V328c0-44.2-35.8-80-80-80zm8 536c0 4.4-3.6 8-8 8H160c-4.4 0-8-3.6-8-8V328c0-4.4 3.6-8 8-8h186.7l17.1-47.8 22.9-64.2h250.5l22.9 64.2 17.1 47.8H864c4.4 0 8 3.6 8 8v456zM512 384c-88.4 0-160 71.6-160 160s71.6 160 160 160 160-71.6 160-160-71.6-160-160-160zm0 256c-53 0-96-43-96-96s43-96 96-96 96 43 96 96-43 96-96 96z"}}]},name:"camera",theme:"outlined"},A=c,y=S(27029),h=function(N,I){return m.createElement(y.Z,(0,b.Z)((0,b.Z)({},N),{},{ref:I,icon:A}))};h.displayName="CameraOutlined";var D=m.forwardRef(h)},86010:function(L,d,S){"use strict";S.r(d),S.d(d,{clsx:function(){return m}});function b(c){var A,y,h="";if(typeof c=="string"||typeof c=="number")h+=c;else if(typeof c=="object")if(Array.isArray(c))for(A=0;A<c.length;A++)c[A]&&(y=b(c[A]))&&(h&&(h+=" "),h+=y);else for(A in c)c[A]&&(h&&(h+=" "),h+=A);return h}function m(){for(var c,A,y=0,h="";y<arguments.length;)(c=arguments[y++])&&(A=b(c))&&(h&&(h+=" "),h+=A);return h}d.default=m},75668:function(L,d,S){"use strict";function b(t){return b=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(a){return typeof a}:function(a){return a&&typeof Symbol=="function"&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},b(t)}Object.defineProperty(d,"__esModule",{value:!0}),Object.defineProperty(d,"DraggableCore",{enumerable:!0,get:function(){return N.default}}),d.default=void 0;var m=E(S(67294)),c=v(S(45697)),A=v(S(73935)),y=v(S(86010)),h=S(81825),D=S(2849),W=S(9280),N=v(S(80783)),I=v(S(55904)),z=["axis","bounds","children","defaultPosition","defaultClassName","defaultClassNameDragging","defaultClassNameDragged","position","positionOffset","scale"];function v(t){return t&&t.__esModule?t:{default:t}}function _(t){if(typeof WeakMap!="function")return null;var a=new WeakMap,u=new WeakMap;return(_=function(f){return f?u:a})(t)}function E(t,a){if(!a&&t&&t.__esModule)return t;if(t===null||b(t)!=="object"&&typeof t!="function")return{default:t};var u=_(a);if(u&&u.has(t))return u.get(t);var l={},f=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var g in t)if(g!=="default"&&Object.prototype.hasOwnProperty.call(t,g)){var O=f?Object.getOwnPropertyDescriptor(t,g):null;O&&(O.get||O.set)?Object.defineProperty(l,g,O):l[g]=t[g]}return l.default=t,u&&u.set(t,l),l}function w(){return w=Object.assign||function(t){for(var a=1;a<arguments.length;a++){var u=arguments[a];for(var l in u)Object.prototype.hasOwnProperty.call(u,l)&&(t[l]=u[l])}return t},w.apply(this,arguments)}function j(t,a){if(t==null)return{};var u=Y(t,a),l,f;if(Object.getOwnPropertySymbols){var g=Object.getOwnPropertySymbols(t);for(f=0;f<g.length;f++)l=g[f],!(a.indexOf(l)>=0)&&(!Object.prototype.propertyIsEnumerable.call(t,l)||(u[l]=t[l]))}return u}function Y(t,a){if(t==null)return{};var u={},l=Object.keys(t),f,g;for(g=0;g<l.length;g++)f=l[g],!(a.indexOf(f)>=0)&&(u[f]=t[f]);return u}function V(t,a){var u=Object.keys(t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(t);a&&(l=l.filter(function(f){return Object.getOwnPropertyDescriptor(t,f).enumerable})),u.push.apply(u,l)}return u}function X(t){for(var a=1;a<arguments.length;a++){var u=arguments[a]!=null?arguments[a]:{};a%2?V(Object(u),!0).forEach(function(l){T(t,l,u[l])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(u)):V(Object(u)).forEach(function(l){Object.defineProperty(t,l,Object.getOwnPropertyDescriptor(u,l))})}return t}function G(t,a){return x(t)||Q(t,a)||F(t,a)||B()}function B(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function F(t,a){if(!!t){if(typeof t=="string")return Z(t,a);var u=Object.prototype.toString.call(t).slice(8,-1);if(u==="Object"&&t.constructor&&(u=t.constructor.name),u==="Map"||u==="Set")return Array.from(t);if(u==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(u))return Z(t,a)}}function Z(t,a){(a==null||a>t.length)&&(a=t.length);for(var u=0,l=new Array(a);u<a;u++)l[u]=t[u];return l}function Q(t,a){var u=t==null?null:typeof Symbol!="undefined"&&t[Symbol.iterator]||t["@@iterator"];if(u!=null){var l=[],f=!0,g=!1,O,R;try{for(u=u.call(t);!(f=(O=u.next()).done)&&(l.push(O.value),!(a&&l.length===a));f=!0);}catch(M){g=!0,R=M}finally{try{!f&&u.return!=null&&u.return()}finally{if(g)throw R}}return l}}function x(t){if(Array.isArray(t))return t}function J(t,a){if(!(t instanceof a))throw new TypeError("Cannot call a class as a function")}function k(t,a){for(var u=0;u<a.length;u++){var l=a[u];l.enumerable=l.enumerable||!1,l.configurable=!0,"value"in l&&(l.writable=!0),Object.defineProperty(t,l.key,l)}}function e(t,a,u){return a&&k(t.prototype,a),u&&k(t,u),Object.defineProperty(t,"prototype",{writable:!1}),t}function r(t,a){if(typeof a!="function"&&a!==null)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(a&&a.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),a&&s(t,a)}function s(t,a){return s=Object.setPrototypeOf||function(l,f){return l.__proto__=f,l},s(t,a)}function P(t){var a=p();return function(){var l=o(t),f;if(a){var g=o(this).constructor;f=Reflect.construct(l,arguments,g)}else f=l.apply(this,arguments);return n(this,f)}}function n(t,a){if(a&&(b(a)==="object"||typeof a=="function"))return a;if(a!==void 0)throw new TypeError("Derived constructors may only return object or undefined");return i(t)}function i(t){if(t===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function p(){if(typeof Reflect=="undefined"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(t){return!1}}function o(t){return o=Object.setPrototypeOf?Object.getPrototypeOf:function(u){return u.__proto__||Object.getPrototypeOf(u)},o(t)}function T(t,a,u){return a in t?Object.defineProperty(t,a,{value:u,enumerable:!0,configurable:!0,writable:!0}):t[a]=u,t}var C=function(t){r(u,t);var a=P(u);function u(l){var f;return J(this,u),f=a.call(this,l),T(i(f),"onDragStart",function(g,O){(0,I.default)("Draggable: onDragStart: %j",O);var R=f.props.onStart(g,(0,D.createDraggableData)(i(f),O));if(R===!1)return!1;f.setState({dragging:!0,dragged:!0})}),T(i(f),"onDrag",function(g,O){if(!f.state.dragging)return!1;(0,I.default)("Draggable: onDrag: %j",O);var R=(0,D.createDraggableData)(i(f),O),M={x:R.x,y:R.y};if(f.props.bounds){var H=M.x,$=M.y;M.x+=f.state.slackX,M.y+=f.state.slackY;var U=(0,D.getBoundPosition)(i(f),M.x,M.y),K=G(U,2),q=K[0],ee=K[1];M.x=q,M.y=ee,M.slackX=f.state.slackX+(H-M.x),M.slackY=f.state.slackY+($-M.y),R.x=M.x,R.y=M.y,R.deltaX=M.x-f.state.x,R.deltaY=M.y-f.state.y}var te=f.props.onDrag(g,R);if(te===!1)return!1;f.setState(M)}),T(i(f),"onDragStop",function(g,O){if(!f.state.dragging)return!1;var R=f.props.onStop(g,(0,D.createDraggableData)(i(f),O));if(R===!1)return!1;(0,I.default)("Draggable: onDragStop: %j",O);var M={dragging:!1,slackX:0,slackY:0},H=Boolean(f.props.position);if(H){var $=f.props.position,U=$.x,K=$.y;M.x=U,M.y=K}f.setState(M)}),f.state={dragging:!1,dragged:!1,x:l.position?l.position.x:l.defaultPosition.x,y:l.position?l.position.y:l.defaultPosition.y,prevPropsPosition:X({},l.position),slackX:0,slackY:0,isElementSVG:!1},l.position&&!(l.onDrag||l.onStop)&&console.warn("A `position` was applied to this <Draggable>, without drag handlers. This will make this component effectively undraggable. Please attach `onDrag` or `onStop` handlers so you can adjust the `position` of this element."),f}return e(u,[{key:"componentDidMount",value:function(){typeof window.SVGElement!="undefined"&&this.findDOMNode()instanceof window.SVGElement&&this.setState({isElementSVG:!0})}},{key:"componentWillUnmount",value:function(){this.setState({dragging:!1})}},{key:"findDOMNode",value:function(){var f,g,O;return(f=(g=this.props)===null||g===void 0||(O=g.nodeRef)===null||O===void 0?void 0:O.current)!==null&&f!==void 0?f:A.default.findDOMNode(this)}},{key:"render",value:function(){var f,g=this.props,O=g.axis,R=g.bounds,M=g.children,H=g.defaultPosition,$=g.defaultClassName,U=g.defaultClassNameDragging,K=g.defaultClassNameDragged,q=g.position,ee=g.positionOffset,te=g.scale,ue=j(g,z),re={},ne=null,le=Boolean(q),ae=!le||this.state.dragging,oe=q||H,ie={x:(0,D.canDragX)(this)&&ae?this.state.x:oe.x,y:(0,D.canDragY)(this)&&ae?this.state.y:oe.y};this.state.isElementSVG?ne=(0,h.createSVGTransform)(ie,ee):re=(0,h.createCSSTransform)(ie,ee);var fe=(0,y.default)(M.props.className||"",$,(f={},T(f,U,this.state.dragging),T(f,K,this.state.dragged),f));return m.createElement(N.default,w({},ue,{onStart:this.onDragStart,onDrag:this.onDrag,onStop:this.onDragStop}),m.cloneElement(m.Children.only(M),{className:fe,style:X(X({},M.props.style),re),transform:ne}))}}],[{key:"getDerivedStateFromProps",value:function(f,g){var O=f.position,R=g.prevPropsPosition;return O&&(!R||O.x!==R.x||O.y!==R.y)?((0,I.default)("Draggable: getDerivedStateFromProps %j",{position:O,prevPropsPosition:R}),{x:O.x,y:O.y,prevPropsPosition:X({},O)}):null}}]),u}(m.Component);d.default=C,T(C,"displayName","Draggable"),T(C,"propTypes",X(X({},N.default.propTypes),{},{axis:c.default.oneOf(["both","x","y","none"]),bounds:c.default.oneOfType([c.default.shape({left:c.default.number,right:c.default.number,top:c.default.number,bottom:c.default.number}),c.default.string,c.default.oneOf([!1])]),defaultClassName:c.default.string,defaultClassNameDragging:c.default.string,defaultClassNameDragged:c.default.string,defaultPosition:c.default.shape({x:c.default.number,y:c.default.number}),positionOffset:c.default.shape({x:c.default.oneOfType([c.default.number,c.default.string]),y:c.default.oneOfType([c.default.number,c.default.string])}),position:c.default.shape({x:c.default.number,y:c.default.number}),className:W.dontSetMe,style:W.dontSetMe,transform:W.dontSetMe})),T(C,"defaultProps",X(X({},N.default.defaultProps),{},{axis:"both",bounds:!1,defaultClassName:"react-draggable",defaultClassNameDragging:"react-draggable-dragging",defaultClassNameDragged:"react-draggable-dragged",defaultPosition:{x:0,y:0},scale:1}))},80783:function(L,d,S){"use strict";function b(n){return b=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(i){return typeof i}:function(i){return i&&typeof Symbol=="function"&&i.constructor===Symbol&&i!==Symbol.prototype?"symbol":typeof i},b(n)}Object.defineProperty(d,"__esModule",{value:!0}),d.default=void 0;var m=z(S(67294)),c=N(S(45697)),A=N(S(73935)),y=S(81825),h=S(2849),D=S(9280),W=N(S(55904));function N(n){return n&&n.__esModule?n:{default:n}}function I(n){if(typeof WeakMap!="function")return null;var i=new WeakMap,p=new WeakMap;return(I=function(T){return T?p:i})(n)}function z(n,i){if(!i&&n&&n.__esModule)return n;if(n===null||b(n)!=="object"&&typeof n!="function")return{default:n};var p=I(i);if(p&&p.has(n))return p.get(n);var o={},T=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var C in n)if(C!=="default"&&Object.prototype.hasOwnProperty.call(n,C)){var t=T?Object.getOwnPropertyDescriptor(n,C):null;t&&(t.get||t.set)?Object.defineProperty(o,C,t):o[C]=n[C]}return o.default=n,p&&p.set(n,o),o}function v(n,i){return Y(n)||j(n,i)||E(n,i)||_()}function _(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function E(n,i){if(!!n){if(typeof n=="string")return w(n,i);var p=Object.prototype.toString.call(n).slice(8,-1);if(p==="Object"&&n.constructor&&(p=n.constructor.name),p==="Map"||p==="Set")return Array.from(n);if(p==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(p))return w(n,i)}}function w(n,i){(i==null||i>n.length)&&(i=n.length);for(var p=0,o=new Array(i);p<i;p++)o[p]=n[p];return o}function j(n,i){var p=n==null?null:typeof Symbol!="undefined"&&n[Symbol.iterator]||n["@@iterator"];if(p!=null){var o=[],T=!0,C=!1,t,a;try{for(p=p.call(n);!(T=(t=p.next()).done)&&(o.push(t.value),!(i&&o.length===i));T=!0);}catch(u){C=!0,a=u}finally{try{!T&&p.return!=null&&p.return()}finally{if(C)throw a}}return o}}function Y(n){if(Array.isArray(n))return n}function V(n,i){if(!(n instanceof i))throw new TypeError("Cannot call a class as a function")}function X(n,i){for(var p=0;p<i.length;p++){var o=i[p];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(n,o.key,o)}}function G(n,i,p){return i&&X(n.prototype,i),p&&X(n,p),Object.defineProperty(n,"prototype",{writable:!1}),n}function B(n,i){if(typeof i!="function"&&i!==null)throw new TypeError("Super expression must either be null or a function");n.prototype=Object.create(i&&i.prototype,{constructor:{value:n,writable:!0,configurable:!0}}),Object.defineProperty(n,"prototype",{writable:!1}),i&&F(n,i)}function F(n,i){return F=Object.setPrototypeOf||function(o,T){return o.__proto__=T,o},F(n,i)}function Z(n){var i=J();return function(){var o=k(n),T;if(i){var C=k(this).constructor;T=Reflect.construct(o,arguments,C)}else T=o.apply(this,arguments);return Q(this,T)}}function Q(n,i){if(i&&(b(i)==="object"||typeof i=="function"))return i;if(i!==void 0)throw new TypeError("Derived constructors may only return object or undefined");return x(n)}function x(n){if(n===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return n}function J(){if(typeof Reflect=="undefined"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(n){return!1}}function k(n){return k=Object.setPrototypeOf?Object.getPrototypeOf:function(p){return p.__proto__||Object.getPrototypeOf(p)},k(n)}function e(n,i,p){return i in n?Object.defineProperty(n,i,{value:p,enumerable:!0,configurable:!0,writable:!0}):n[i]=p,n}var r={touch:{start:"touchstart",move:"touchmove",stop:"touchend"},mouse:{start:"mousedown",move:"mousemove",stop:"mouseup"}},s=r.mouse,P=function(n){B(p,n);var i=Z(p);function p(){var o;V(this,p);for(var T=arguments.length,C=new Array(T),t=0;t<T;t++)C[t]=arguments[t];return o=i.call.apply(i,[this].concat(C)),e(x(o),"state",{dragging:!1,lastX:NaN,lastY:NaN,touchIdentifier:null}),e(x(o),"mounted",!1),e(x(o),"handleDragStart",function(a){if(o.props.onMouseDown(a),!o.props.allowAnyClick&&typeof a.button=="number"&&a.button!==0)return!1;var u=o.findDOMNode();if(!u||!u.ownerDocument||!u.ownerDocument.body)throw new Error("<DraggableCore> not mounted on DragStart!");var l=u.ownerDocument;if(!(o.props.disabled||!(a.target instanceof l.defaultView.Node)||o.props.handle&&!(0,y.matchesSelectorAndParentsTo)(a.target,o.props.handle,u)||o.props.cancel&&(0,y.matchesSelectorAndParentsTo)(a.target,o.props.cancel,u))){a.type==="touchstart"&&a.preventDefault();var f=(0,y.getTouchIdentifier)(a);o.setState({touchIdentifier:f});var g=(0,h.getControlPosition)(a,f,x(o));if(g!=null){var O=g.x,R=g.y,M=(0,h.createCoreData)(x(o),O,R);(0,W.default)("DraggableCore: handleDragStart: %j",M),(0,W.default)("calling",o.props.onStart);var H=o.props.onStart(a,M);H===!1||o.mounted===!1||(o.props.enableUserSelectHack&&(0,y.addUserSelectStyles)(l),o.setState({dragging:!0,lastX:O,lastY:R}),(0,y.addEvent)(l,s.move,o.handleDrag),(0,y.addEvent)(l,s.stop,o.handleDragStop))}}}),e(x(o),"handleDrag",function(a){var u=(0,h.getControlPosition)(a,o.state.touchIdentifier,x(o));if(u!=null){var l=u.x,f=u.y;if(Array.isArray(o.props.grid)){var g=l-o.state.lastX,O=f-o.state.lastY,R=(0,h.snapToGrid)(o.props.grid,g,O),M=v(R,2);if(g=M[0],O=M[1],!g&&!O)return;l=o.state.lastX+g,f=o.state.lastY+O}var H=(0,h.createCoreData)(x(o),l,f);(0,W.default)("DraggableCore: handleDrag: %j",H);var $=o.props.onDrag(a,H);if($===!1||o.mounted===!1){try{o.handleDragStop(new MouseEvent("mouseup"))}catch(K){var U=document.createEvent("MouseEvents");U.initMouseEvent("mouseup",!0,!0,window,0,0,0,0,0,!1,!1,!1,!1,0,null),o.handleDragStop(U)}return}o.setState({lastX:l,lastY:f})}}),e(x(o),"handleDragStop",function(a){if(!!o.state.dragging){var u=(0,h.getControlPosition)(a,o.state.touchIdentifier,x(o));if(u!=null){var l=u.x,f=u.y;if(Array.isArray(o.props.grid)){var g=l-o.state.lastX||0,O=f-o.state.lastY||0,R=(0,h.snapToGrid)(o.props.grid,g,O),M=v(R,2);g=M[0],O=M[1],l=o.state.lastX+g,f=o.state.lastY+O}var H=(0,h.createCoreData)(x(o),l,f),$=o.props.onStop(a,H);if($===!1||o.mounted===!1)return!1;var U=o.findDOMNode();U&&o.props.enableUserSelectHack&&(0,y.removeUserSelectStyles)(U.ownerDocument),(0,W.default)("DraggableCore: handleDragStop: %j",H),o.setState({dragging:!1,lastX:NaN,lastY:NaN}),U&&((0,W.default)("DraggableCore: Removing handlers"),(0,y.removeEvent)(U.ownerDocument,s.move,o.handleDrag),(0,y.removeEvent)(U.ownerDocument,s.stop,o.handleDragStop))}}}),e(x(o),"onMouseDown",function(a){return s=r.mouse,o.handleDragStart(a)}),e(x(o),"onMouseUp",function(a){return s=r.mouse,o.handleDragStop(a)}),e(x(o),"onTouchStart",function(a){return s=r.touch,o.handleDragStart(a)}),e(x(o),"onTouchEnd",function(a){return s=r.touch,o.handleDragStop(a)}),o}return G(p,[{key:"componentDidMount",value:function(){this.mounted=!0;var T=this.findDOMNode();T&&(0,y.addEvent)(T,r.touch.start,this.onTouchStart,{passive:!1})}},{key:"componentWillUnmount",value:function(){this.mounted=!1;var T=this.findDOMNode();if(T){var C=T.ownerDocument;(0,y.removeEvent)(C,r.mouse.move,this.handleDrag),(0,y.removeEvent)(C,r.touch.move,this.handleDrag),(0,y.removeEvent)(C,r.mouse.stop,this.handleDragStop),(0,y.removeEvent)(C,r.touch.stop,this.handleDragStop),(0,y.removeEvent)(T,r.touch.start,this.onTouchStart,{passive:!1}),this.props.enableUserSelectHack&&(0,y.removeUserSelectStyles)(C)}}},{key:"findDOMNode",value:function(){var T,C,t;return(T=this.props)!==null&&T!==void 0&&T.nodeRef?(C=this.props)===null||C===void 0||(t=C.nodeRef)===null||t===void 0?void 0:t.current:A.default.findDOMNode(this)}},{key:"render",value:function(){return m.cloneElement(m.Children.only(this.props.children),{onMouseDown:this.onMouseDown,onMouseUp:this.onMouseUp,onTouchEnd:this.onTouchEnd})}}]),p}(m.Component);d.default=P,e(P,"displayName","DraggableCore"),e(P,"propTypes",{allowAnyClick:c.default.bool,disabled:c.default.bool,enableUserSelectHack:c.default.bool,offsetParent:function(i,p){if(i[p]&&i[p].nodeType!==1)throw new Error("Draggable's offsetParent must be a DOM Node.")},grid:c.default.arrayOf(c.default.number),handle:c.default.string,cancel:c.default.string,nodeRef:c.default.object,onStart:c.default.func,onDrag:c.default.func,onStop:c.default.func,onMouseDown:c.default.func,scale:c.default.number,className:D.dontSetMe,style:D.dontSetMe,transform:D.dontSetMe}),e(P,"defaultProps",{allowAnyClick:!1,disabled:!1,enableUserSelectHack:!0,onStart:function(){},onDrag:function(){},onStop:function(){},onMouseDown:function(){},scale:1})},61193:function(L,d,S){"use strict";var b=S(75668),m=b.default,c=b.DraggableCore;L.exports=m,L.exports.default=m,L.exports.DraggableCore=c},81825:function(L,d,S){"use strict";function b(e){return b=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(r){return typeof r}:function(r){return r&&typeof Symbol=="function"&&r.constructor===Symbol&&r!==Symbol.prototype?"symbol":typeof r},b(e)}Object.defineProperty(d,"__esModule",{value:!0}),d.addClassName=J,d.addEvent=v,d.addUserSelectStyles=Q,d.createCSSTransform=X,d.createSVGTransform=G,d.getTouch=F,d.getTouchIdentifier=Z,d.getTranslation=B,d.innerHeight=j,d.innerWidth=Y,d.matchesSelector=I,d.matchesSelectorAndParentsTo=z,d.offsetXYFromParent=V,d.outerHeight=E,d.outerWidth=w,d.removeClassName=k,d.removeEvent=_,d.removeUserSelectStyles=x;var m=S(9280),c=y(S(38650));function A(e){if(typeof WeakMap!="function")return null;var r=new WeakMap,s=new WeakMap;return(A=function(n){return n?s:r})(e)}function y(e,r){if(!r&&e&&e.__esModule)return e;if(e===null||b(e)!=="object"&&typeof e!="function")return{default:e};var s=A(r);if(s&&s.has(e))return s.get(e);var P={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var i in e)if(i!=="default"&&Object.prototype.hasOwnProperty.call(e,i)){var p=n?Object.getOwnPropertyDescriptor(e,i):null;p&&(p.get||p.set)?Object.defineProperty(P,i,p):P[i]=e[i]}return P.default=e,s&&s.set(e,P),P}function h(e,r){var s=Object.keys(e);if(Object.getOwnPropertySymbols){var P=Object.getOwnPropertySymbols(e);r&&(P=P.filter(function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable})),s.push.apply(s,P)}return s}function D(e){for(var r=1;r<arguments.length;r++){var s=arguments[r]!=null?arguments[r]:{};r%2?h(Object(s),!0).forEach(function(P){W(e,P,s[P])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(s)):h(Object(s)).forEach(function(P){Object.defineProperty(e,P,Object.getOwnPropertyDescriptor(s,P))})}return e}function W(e,r,s){return r in e?Object.defineProperty(e,r,{value:s,enumerable:!0,configurable:!0,writable:!0}):e[r]=s,e}var N="";function I(e,r){return N||(N=(0,m.findInArray)(["matches","webkitMatchesSelector","mozMatchesSelector","msMatchesSelector","oMatchesSelector"],function(s){return(0,m.isFunction)(e[s])})),(0,m.isFunction)(e[N])?e[N](r):!1}function z(e,r,s){var P=e;do{if(I(P,r))return!0;if(P===s)return!1;P=P.parentNode}while(P);return!1}function v(e,r,s,P){if(!!e){var n=D({capture:!0},P);e.addEventListener?e.addEventListener(r,s,n):e.attachEvent?e.attachEvent("on"+r,s):e["on"+r]=s}}function _(e,r,s,P){if(!!e){var n=D({capture:!0},P);e.removeEventListener?e.removeEventListener(r,s,n):e.detachEvent?e.detachEvent("on"+r,s):e["on"+r]=null}}function E(e){var r=e.clientHeight,s=e.ownerDocument.defaultView.getComputedStyle(e);return r+=(0,m.int)(s.borderTopWidth),r+=(0,m.int)(s.borderBottomWidth),r}function w(e){var r=e.clientWidth,s=e.ownerDocument.defaultView.getComputedStyle(e);return r+=(0,m.int)(s.borderLeftWidth),r+=(0,m.int)(s.borderRightWidth),r}function j(e){var r=e.clientHeight,s=e.ownerDocument.defaultView.getComputedStyle(e);return r-=(0,m.int)(s.paddingTop),r-=(0,m.int)(s.paddingBottom),r}function Y(e){var r=e.clientWidth,s=e.ownerDocument.defaultView.getComputedStyle(e);return r-=(0,m.int)(s.paddingLeft),r-=(0,m.int)(s.paddingRight),r}function V(e,r,s){var P=r===r.ownerDocument.body,n=P?{left:0,top:0}:r.getBoundingClientRect(),i=(e.clientX+r.scrollLeft-n.left)/s,p=(e.clientY+r.scrollTop-n.top)/s;return{x:i,y:p}}function X(e,r){var s=B(e,r,"px");return W({},(0,c.browserPrefixToKey)("transform",c.default),s)}function G(e,r){var s=B(e,r,"");return s}function B(e,r,s){var P=e.x,n=e.y,i="translate(".concat(P).concat(s,",").concat(n).concat(s,")");if(r){var p="".concat(typeof r.x=="string"?r.x:r.x+s),o="".concat(typeof r.y=="string"?r.y:r.y+s);i="translate(".concat(p,", ").concat(o,")")+i}return i}function F(e,r){return e.targetTouches&&(0,m.findInArray)(e.targetTouches,function(s){return r===s.identifier})||e.changedTouches&&(0,m.findInArray)(e.changedTouches,function(s){return r===s.identifier})}function Z(e){if(e.targetTouches&&e.targetTouches[0])return e.targetTouches[0].identifier;if(e.changedTouches&&e.changedTouches[0])return e.changedTouches[0].identifier}function Q(e){if(!!e){var r=e.getElementById("react-draggable-style-el");r||(r=e.createElement("style"),r.type="text/css",r.id="react-draggable-style-el",r.innerHTML=`.react-draggable-transparent-selection *::-moz-selection {all: inherit;}
`,r.innerHTML+=`.react-draggable-transparent-selection *::selection {all: inherit;}
`,e.getElementsByTagName("head")[0].appendChild(r)),e.body&&J(e.body,"react-draggable-transparent-selection")}}function x(e){if(!!e)try{if(e.body&&k(e.body,"react-draggable-transparent-selection"),e.selection)e.selection.empty();else{var r=(e.defaultView||window).getSelection();r&&r.type!=="Caret"&&r.removeAllRanges()}}catch(s){}}function J(e,r){e.classList?e.classList.add(r):e.className.match(new RegExp("(?:^|\\s)".concat(r,"(?!\\S)")))||(e.className+=" ".concat(r))}function k(e,r){e.classList?e.classList.remove(r):e.className=e.className.replace(new RegExp("(?:^|\\s)".concat(r,"(?!\\S)"),"g"),"")}},38650:function(L,d){"use strict";Object.defineProperty(d,"__esModule",{value:!0}),d.browserPrefixToKey=m,d.browserPrefixToStyle=c,d.default=void 0,d.getPrefix=b;var S=["Moz","Webkit","O","ms"];function b(){var h,D,W=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"transform";if(typeof window=="undefined")return"";var N=(h=window.document)===null||h===void 0||(D=h.documentElement)===null||D===void 0?void 0:D.style;if(!N||W in N)return"";for(var I=0;I<S.length;I++)if(m(W,S[I])in N)return S[I];return""}function m(h,D){return D?"".concat(D).concat(A(h)):h}function c(h,D){return D?"-".concat(D.toLowerCase(),"-").concat(h):h}function A(h){for(var D="",W=!0,N=0;N<h.length;N++)W?(D+=h[N].toUpperCase(),W=!1):h[N]==="-"?W=!0:D+=h[N];return D}var y=b();d.default=y},55904:function(L,d){"use strict";Object.defineProperty(d,"__esModule",{value:!0}),d.default=S;function S(){var b}},2849:function(L,d,S){"use strict";Object.defineProperty(d,"__esModule",{value:!0}),d.canDragX=y,d.canDragY=h,d.createCoreData=W,d.createDraggableData=N,d.getBoundPosition=c,d.getControlPosition=D,d.snapToGrid=A;var b=S(9280),m=S(81825);function c(v,_,E){if(!v.props.bounds)return[_,E];var w=v.props.bounds;w=typeof w=="string"?w:I(w);var j=z(v);if(typeof w=="string"){var Y=j.ownerDocument,V=Y.defaultView,X;if(w==="parent"?X=j.parentNode:X=Y.querySelector(w),!(X instanceof V.HTMLElement))throw new Error('Bounds selector "'+w+'" could not find an element.');var G=X,B=V.getComputedStyle(j),F=V.getComputedStyle(G);w={left:-j.offsetLeft+(0,b.int)(F.paddingLeft)+(0,b.int)(B.marginLeft),top:-j.offsetTop+(0,b.int)(F.paddingTop)+(0,b.int)(B.marginTop),right:(0,m.innerWidth)(G)-(0,m.outerWidth)(j)-j.offsetLeft+(0,b.int)(F.paddingRight)-(0,b.int)(B.marginRight),bottom:(0,m.innerHeight)(G)-(0,m.outerHeight)(j)-j.offsetTop+(0,b.int)(F.paddingBottom)-(0,b.int)(B.marginBottom)}}return(0,b.isNum)(w.right)&&(_=Math.min(_,w.right)),(0,b.isNum)(w.bottom)&&(E=Math.min(E,w.bottom)),(0,b.isNum)(w.left)&&(_=Math.max(_,w.left)),(0,b.isNum)(w.top)&&(E=Math.max(E,w.top)),[_,E]}function A(v,_,E){var w=Math.round(_/v[0])*v[0],j=Math.round(E/v[1])*v[1];return[w,j]}function y(v){return v.props.axis==="both"||v.props.axis==="x"}function h(v){return v.props.axis==="both"||v.props.axis==="y"}function D(v,_,E){var w=typeof _=="number"?(0,m.getTouch)(v,_):null;if(typeof _=="number"&&!w)return null;var j=z(E),Y=E.props.offsetParent||j.offsetParent||j.ownerDocument.body;return(0,m.offsetXYFromParent)(w||v,Y,E.props.scale)}function W(v,_,E){var w=v.state,j=!(0,b.isNum)(w.lastX),Y=z(v);return j?{node:Y,deltaX:0,deltaY:0,lastX:_,lastY:E,x:_,y:E}:{node:Y,deltaX:_-w.lastX,deltaY:E-w.lastY,lastX:w.lastX,lastY:w.lastY,x:_,y:E}}function N(v,_){var E=v.props.scale;return{node:_.node,x:v.state.x+_.deltaX/E,y:v.state.y+_.deltaY/E,deltaX:_.deltaX/E,deltaY:_.deltaY/E,lastX:v.state.x,lastY:v.state.y}}function I(v){return{left:v.left,top:v.top,right:v.right,bottom:v.bottom}}function z(v){var _=v.findDOMNode();if(!_)throw new Error("<DraggableCore>: Unmounted during event!");return _}},9280:function(L,d){"use strict";Object.defineProperty(d,"__esModule",{value:!0}),d.dontSetMe=A,d.findInArray=S,d.int=c,d.isFunction=b,d.isNum=m;function S(y,h){for(var D=0,W=y.length;D<W;D++)if(h.apply(h,[y[D],D,y]))return y[D]}function b(y){return typeof y=="function"||Object.prototype.toString.call(y)==="[object Function]"}function m(y){return typeof y=="number"&&!isNaN(y)}function c(y){return parseInt(y,10)}function A(y,h,D){if(y[h])return new Error("Invalid prop ".concat(h," passed to ").concat(D," - do not set this, set it on the child."))}}}]);