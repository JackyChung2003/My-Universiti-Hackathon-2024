import{r as a,cs as t,cu as s}from"./index-83adb651.js";import{d as m}from"./decimals-12a08ca4.js";const o="0x06fdde03",d=[],i=[{type:"string"}];async function y(c){return a({contract:c.contract,method:[o,d,i],params:[]})}async function u(c){return t(()=>y(c),{cacheKey:`${c.contract.chain.id}:${c.contract.address}:name`,cacheTime:Number.POSITIVE_INFINITY})}const T="0x95d89b41",h=[],N=[{type:"string"}];async function l(c){return a({contract:c.contract,method:[T,h,N],params:[]})}async function I(c){return t(()=>l(c),{cacheKey:`${c.contract.chain.id}:${c.contract.address}:symbol`,cacheTime:Number.POSITIVE_INFINITY})}async function f(c){if(s(c.contract.address))return{name:"Ether",symbol:"ETH",decimals:18,...c.contract.chain.nativeCurrency};try{const[r,e,n]=await Promise.all([u(c).catch(()=>""),I(c),m(c)]);return{name:r,symbol:e,decimals:n}}catch{throw new Error("Invalid currency token")}}export{f as getCurrencyMetadata};
