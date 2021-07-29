"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[672],{3905:function(e,t,n){n.d(t,{Zo:function(){return l},kt:function(){return m}});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=r.createContext({}),u=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},l=function(e){var t=u(e.components);return r.createElement(s.Provider,{value:t},e.children)},f={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},p=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,i=e.originalType,s=e.parentName,l=c(e,["components","mdxType","originalType","parentName"]),p=u(n),m=o,d=p["".concat(s,".").concat(m)]||p[m]||f[m]||i;return n?r.createElement(d,a(a({ref:t},l),{},{components:n})):r.createElement(d,a({ref:t},l))}));function m(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=n.length,a=new Array(i);a[0]=p;var c={};for(var s in t)hasOwnProperty.call(t,s)&&(c[s]=t[s]);c.originalType=e,c.mdxType="string"==typeof e?e:o,a[1]=c;for(var u=2;u<i;u++)a[u]=n[u];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}p.displayName="MDXCreateElement"},9026:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return c},contentTitle:function(){return s},metadata:function(){return u},toc:function(){return l},default:function(){return p}});var r=n(2122),o=n(9756),i=(n(7294),n(3905)),a=["components"],c={},s="Features",u={unversionedId:"features",id:"features",isDocsHomePage:!1,title:"Features",description:"Here are some of the functionalities supported by the project as of July 2021:",source:"@site/docs/features.mdx",sourceDirName:".",slug:"/features",permalink:"/celo-push-notification-service/docs/features",editUrl:"https://github.com/facebook/docusaurus/edit/master/website/docs/features.mdx",version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Encrypted Notifications",permalink:"/celo-push-notification-service/docs/encrypted-notifications"},next:{title:"Future Work",permalink:"/celo-push-notification-service/docs/future-work"}},l=[],f={toc:l};function p(e){var t=e.components,n=(0,o.Z)(e,a);return(0,i.kt)("wrapper",(0,r.Z)({},f,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"features"},"Features"),(0,i.kt)("p",null,"Here are some of the functionalities supported by the project as of July 2021:"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},"Spam protection: Without the explicit permission by a user, nobody can send them notifications."),(0,i.kt)("li",{parentName:"ol"},"End to end encryption: notifications can be encrypted using RSA asymmetric key encryption."),(0,i.kt)("li",{parentName:"ol"},"Push Access Delegation: An admin of a channel can allow or take away the access to sending notfications from channels they own. This makes notifications triggerable from within contracts itself."),(0,i.kt)("li",{parentName:"ol"},"Support for multimedia notifications: Images and other assets can be embedded in the notification, depending on support by the receiver's operating system."),(0,i.kt)("li",{parentName:"ol"},"Channel Broadcasts: To save gas in case of a large number of notifications, the contract can broadcast notifications to the whole channel in one go."),(0,i.kt)("li",{parentName:"ol"},"IPFS integration: To reduce cost of storage, only the hashes of assets are stored on chain. This reduces the cost of running the contract.")))}p.isMDXComponent=!0}}]);