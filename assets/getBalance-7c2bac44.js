import{r,aR as n}from"./index-83adb651.js";import{getCurrencyMetadata as c}from"./getCurrencyMetadata-47c69f75.js";import"./decimals-12a08ca4.js";const s="0x70a08231",o=[{type:"address",name:"_address"}],d=[{type:"uint256"}];async function m(a){return r({contract:a.contract,method:[s,o,d],params:[a.address]})}async function y(a){const[t,e]=await Promise.all([m(a),c(a)]);return{...e,value:t,displayValue:n(t,e.decimals)}}export{y as getBalance};