import{cG as t,bz as h}from"./index-3f8e0c26.js";async function c(e){var n;const{wallet:a,params:i}=e;return((n=a.getChain())==null?void 0:n.id)===t(i[0].chainId)||await a.switchChain(h(t(i[0].chainId))),"0x1"}export{c as handleSwitchChain};