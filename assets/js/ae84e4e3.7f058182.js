"use strict";(self.webpackChunkice_website_v3=self.webpackChunkice_website_v3||[]).push([[3743],{4852:(e,t,n)=>{n.d(t,{Zo:()=>s,kt:()=>d});var a=n(9231);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function p(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},l=Object.keys(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var o=a.createContext({}),c=function(e){var t=a.useContext(o),n=t;return e&&(n="function"==typeof e?e(t):p(p({},t),e)),n},s=function(e){var t=c(e.components);return a.createElement(o.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,l=e.originalType,o=e.parentName,s=i(e,["components","mdxType","originalType","parentName"]),m=c(n),d=r,k=m["".concat(o,".").concat(d)]||m[d]||u[d]||l;return n?a.createElement(k,p(p({ref:t},s),{},{components:n})):a.createElement(k,p({ref:t},s))}));function d(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var l=n.length,p=new Array(l);p[0]=m;var i={};for(var o in t)hasOwnProperty.call(t,o)&&(i[o]=t[o]);i.originalType=e,i.mdxType="string"==typeof e?e:r,p[1]=i;for(var c=2;c<l;c++)p[c]=n[c];return a.createElement.apply(null,p)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},5469:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>o,contentTitle:()=>p,default:()=>u,frontMatter:()=>l,metadata:()=>i,toc:()=>c});var a=n(2203),r=(n(9231),n(4852));const l={title:"\u5feb\u901f\u5f00\u59cb",order:2},p=void 0,i={unversionedId:"guide/start",id:"guide/start",title:"\u5feb\u901f\u5f00\u59cb",description:"\u9700\u8981\u4fdd\u8bc1\u5df2\u5b89\u88c5 Node.js\uff0c\u5e76\u786e\u4fdd Node \u7248\u672c\u662f 14 \u6216\u4ee5\u4e0a\u3002\u8be6\u89c1 \u5f00\u53d1\u73af\u5883\u3002",source:"@site/docs/guide/start.md",sourceDirName:"guide",slug:"/guide/start",permalink:"/docs/guide/start",draft:!1,editUrl:"https://github.com/alibaba/ice/edit/master/website/docs/guide/start.md",tags:[],version:"current",frontMatter:{title:"\u5feb\u901f\u5f00\u59cb",order:2},sidebar:"docs",previous:{title:"\u5173\u4e8e",permalink:"/docs/guide/about"},next:{title:"\u5f00\u53d1\u73af\u5883",permalink:"/docs/guide/basic/development"}},o={},c=[{value:"\u521b\u5efa\u5e94\u7528",id:"\u521b\u5efa\u5e94\u7528",level:2},{value:"\u672c\u5730\u8c03\u8bd5",id:"\u672c\u5730\u8c03\u8bd5",level:2},{value:"\u90e8\u7f72\u53d1\u5e03",id:"\u90e8\u7f72\u53d1\u5e03",level:2},{value:"\u5c0f\u7a0b\u5e8f\u5e94\u7528",id:"\u5c0f\u7a0b\u5e8f\u5e94\u7528",level:2},{value:"\u5c0f\u7a0b\u5e8f\u8c03\u8bd5",id:"\u5c0f\u7a0b\u5e8f\u8c03\u8bd5",level:3},{value:"\u5c0f\u7a0b\u5e8f\u90e8\u7f72\u53d1\u5e03",id:"\u5c0f\u7a0b\u5e8f\u90e8\u7f72\u53d1\u5e03",level:3}],s={toc:c};function u(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,a.Z)({},s,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},"\u9700\u8981\u4fdd\u8bc1\u5df2\u5b89\u88c5 ",(0,r.kt)("a",{parentName:"p",href:"https://nodejs.org"},"Node.js"),"\uff0c\u5e76\u786e\u4fdd Node \u7248\u672c\u662f 14 \u6216\u4ee5\u4e0a\u3002\u8be6\u89c1 ",(0,r.kt)("a",{parentName:"p",href:"./basic/env"},"\u5f00\u53d1\u73af\u5883"),"\u3002")),(0,r.kt)("h2",{id:"\u521b\u5efa\u5e94\u7528"},"\u521b\u5efa\u5e94\u7528"),(0,r.kt)("p",null,"\u5728\u7ec8\u7aef\u6267\u884c\u4ee5\u4e0b\u547d\u4ee4\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"$ npm create ice ice-app\n")),(0,r.kt)("p",null,"\u7136\u540e\u6309\u7167\u63d0\u793a\u64cd\u4f5c\u5373\u53ef\uff01"),(0,r.kt)("p",null,"\u6216\u8005\u4f60\u901a\u8fc7\u9644\u52a0\u7684\u547d\u4ee4\u884c\u9009\u9879\u6307\u5b9a\u4f7f\u7528\u7684\u6a21\u677f\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"$ npm create ice ice-app --template @ice/lite-scaffold\n")),(0,r.kt)("p",null,"\u770b\u5230\u5982\u4e0b\u4fe1\u606f\u8bf4\u660e\u9879\u76ee\u521b\u5efa\u6210\u529f\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"\u2714 download npm tarball successfully.\ninfo clean package.json...\nInitialize project successfully.\nStarts the development server.\n\n    cd ice-app\n    npm install\n    npm start\n")),(0,r.kt)("h2",{id:"\u672c\u5730\u8c03\u8bd5"},"\u672c\u5730\u8c03\u8bd5"),(0,r.kt)("p",null,"\u9996\u5148\u9700\u8981\u5b89\u88c5\u9879\u76ee\u4f9d\u8d56\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"# \u8fdb\u5165\u9879\u76ee\u76ee\u5f55\n$ cd ice-app\n# \u5b89\u88c5\u4f9d\u8d56\n$ npm install\n")),(0,r.kt)("p",null,"\u5b89\u88c5\u4f9d\u8d56\u5b8c\u6210\u4ee5\u540e\uff0c\u6267\u884c\u4ee5\u4e0b\u547d\u4ee4\u4ee5\u542f\u52a8\u8c03\u8bd5\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"# \u542f\u52a8\u8c03\u8bd5\n$ npm start\n")),(0,r.kt)("p",null,"\u6b64\u65f6\u4f1a\u81ea\u52a8\u6253\u5f00\u6d4f\u89c8\u5668\u7a97\u53e3\u5e76\u8bbf\u95ee ",(0,r.kt)("a",{parentName:"p",href:"http://localhost:3000"},"http://localhost:3000"),"\uff0c\u8fd9\u65f6\u4f1a\u770b\u5230\u9ed8\u8ba4\u9875\u9762\u3002"),(0,r.kt)("p",null,(0,r.kt)("img",{parentName:"p",src:"https://img.alicdn.com/imgextra/i4/O1CN01OLXNy91dVsqNSM8x3_!!6000000003742-2-tps-654-792.png",alt:"img"})),(0,r.kt)("h2",{id:"\u90e8\u7f72\u53d1\u5e03"},"\u90e8\u7f72\u53d1\u5e03"),(0,r.kt)("p",null,"\u6267\u884c\u4ee5\u4e0b\u547d\u4ee4\u4ee5\u6784\u5efa\u751f\u4ea7\u73af\u5883\u4ea7\u7269\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"# \u6784\u5efa\n$ npm build\n")),(0,r.kt)("p",null,"\u4ea7\u7269\u9ed8\u8ba4\u751f\u6210\u5230 ",(0,r.kt)("inlineCode",{parentName:"p"},"build")," \u76ee\u5f55\u4e0b\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-markdown"},"./build\n\u251c\u2500\u2500 css\n|  \u2514\u2500\u2500 index.css\n\u251c\u2500\u2500 index.html\n\u2514\u2500\u2500 js\n   \u251c\u2500\u2500 framework.js\n   \u251c\u2500\u2500 index.js\n   \u2514\u2500\u2500 main.js\n")),(0,r.kt)("p",null,"\u8fd9\u65f6\u4f60\u53ef\u4ee5\u628a ",(0,r.kt)("inlineCode",{parentName:"p"},"build")," \u76ee\u5f55\u90e8\u7f72\u5230\u670d\u52a1\u5668\u4e0a\u3002"),(0,r.kt)("h2",{id:"\u5c0f\u7a0b\u5e8f\u5e94\u7528"},"\u5c0f\u7a0b\u5e8f\u5e94\u7528"),(0,r.kt)("p",null,"\u901a\u8fc7\u5c0f\u7a0b\u5e8f\u4e13\u7528\u7684\u6a21\u677f\u521b\u5efa\u9879\u76ee\u5e76\u5b89\u88c5\u4f9d\u8d56\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"$ npm create ice ice-app --template @ice/miniapp-scaffold\n$ cd ice-app\n$ npm install\n")),(0,r.kt)("p",null,"\u53ef\u4ee5\u770b\u5230\u9879\u76ee\u7684 ",(0,r.kt)("inlineCode",{parentName:"p"},"package.json")," \u4e2d\u5df2\u7ecf\u914d\u7f6e\u597d\u547d\u4ee4\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-json",metastring:"title=package.json",title:"package.json"},'  "scripts": {\n    "start": "ice start",\n    "start:wechat": "ice start --platform wechat-miniprogram",\n    "start:ali": "ice start --platform ali-miniapp",\n    "build": "ice build",\n    "build:wechat": "ice build --platform wechat-miniprogram",\n    "build:ali": "ice start --platform ali-miniapp"\n  }\n')),(0,r.kt)("h3",{id:"\u5c0f\u7a0b\u5e8f\u8c03\u8bd5"},"\u5c0f\u7a0b\u5e8f\u8c03\u8bd5"),(0,r.kt)("p",null,"\u5f53\u9700\u8981\u5f00\u53d1\u8c03\u8bd5\u5c0f\u7a0b\u5e8f\u65f6\uff0c\u6267\u884c\u5bf9\u5e94\u7684\u547d\u4ee4\u5373\u53ef\u3002\u4f8b\u5982\uff0c\u9700\u8981\u5f00\u53d1\u8c03\u8bd5\u5fae\u4fe1\u5c0f\u7a0b\u5e8f\u65f6\uff0c\u6267\u884c"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"$ npm run start:wechat\n")),(0,r.kt)("p",null,"\u7f16\u8bd1\u5b8c\u6210\u540e\uff0c\u547d\u4ee4\u884c\u4f1a\u7ed9\u51fa\u76f8\u5e94\u63d0\u793a\uff0c\u63d0\u9192\u5f00\u53d1\u8005\u4f7f\u7528\u5bf9\u5e94\u7684\u5c0f\u7a0b\u5e8f\u5f00\u53d1\u8005\u5de5\u5177\u6253\u5f00\u7f16\u8bd1\u4ea7\u7269\u76ee\u5f55\u8fdb\u884c\u8c03\u8bd5\u9884\u89c8\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"Use wechat-miniprogram developer tools to open the following folder:\n~/miniapp-project/build\n")),(0,r.kt)("p",null,"\u7f16\u8bd1\u5b8c\u6210\u540e\uff0c\u547d\u4ee4\u884c\u4f1a\u7ed9\u51fa\u76f8\u5e94\u63d0\u793a\uff0c\u63d0\u9192\u5f00\u53d1\u8005\u4f7f\u7528\u5bf9\u5e94\u7684\u5c0f\u7a0b\u5e8f\u5f00\u53d1\u8005\u5de5\u5177\u6253\u5f00\u7f16\u8bd1\u4ea7\u7269\u76ee\u5f55\u8fdb\u884c\u8c03\u8bd5\u9884\u89c8\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"Use wechat-miniprogram developer tools to open the following folder:\n~/miniapp-project/build\n")),(0,r.kt)("h3",{id:"\u5c0f\u7a0b\u5e8f\u90e8\u7f72\u53d1\u5e03"},"\u5c0f\u7a0b\u5e8f\u90e8\u7f72\u53d1\u5e03"),(0,r.kt)("p",null,"\u4ecd\u4ee5\u5fae\u4fe1\u5c0f\u7a0b\u5e8f\u4e3a\u4f8b\uff0c\u6267\u884c\u4ee5\u4e0b\u547d\u4ee4\u4ee5\u6784\u5efa\u5fae\u4fe1\u5c0f\u7a0b\u5e8f\u751f\u4ea7\u73af\u5883\u4ea7\u7269\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"$ npm run build:wechat\n")),(0,r.kt)("p",null,"\u4ea7\u7269\u540c\u6837\u9ed8\u8ba4\u751f\u6210\u5230 ",(0,r.kt)("inlineCode",{parentName:"p"},"build")," \u76ee\u5f55\u4e0b\u3002\u8fd9\u65f6\u4f60\u53ef\u4ee5\u4f7f\u7528\u5bf9\u5e94\u7684\u5c0f\u7a0b\u5e8f\u5f00\u53d1\u8005\u5de5\u5177\u6253\u5f00 ",(0,r.kt)("inlineCode",{parentName:"p"},"build")," \u76ee\u5f55\u5e76\u5c06\u5176\u4e0a\u4f20\u53d1\u5e03\u3002"))}u.isMDXComponent=!0}}]);