import{ai as n,cG as c}from"./index-3f8e0c26.js";async function u(t,o){const e=await t({method:"eth_getTransactionCount",params:[o.address,o.blockNumber?n(o.blockNumber):o.blockTag||"pending"]});return c(e)}export{u as eth_getTransactionCount};