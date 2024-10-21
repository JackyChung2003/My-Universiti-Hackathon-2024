import{cz as d,_ as n}from"./index-83adb651.js";function T(o,r){if(d(o.address)!==d(r))throw new Error(`Failed to validate account address (${o.address}), differs from ${r}`)}function m(o){const r=o.split(":"),p=Number.parseInt(r[1]??"0");if(r.length!==2||r[0]!=="eip155"||p===0||!p)throw new Error(`Invalid chainId ${o}, should have the format 'eip155:1'`);return p}async function u(o){const{wallet:r,walletConnectClient:p,thirdwebClient:w,event:{topic:h,id:l,params:{chainId:_,request:t}},handlers:a}=o,i=r.getAccount();if(!i)throw new Error("No account connected to provided wallet");let s;try{switch(t.method){case"personal_sign":{if(a!=null&&a.personal_sign)s=await a.personal_sign({account:i,params:t.params});else{const{handleSignRequest:e}=await n(()=>import("./sign-5a6ceabf.js"),["assets/sign-5a6ceabf.js","assets/index-83adb651.js","assets/index-caf7d0ca.css"]);s=await e({account:i,params:t.params})}break}case"eth_sign":{if(a!=null&&a.eth_sign)s=await a.eth_sign({account:i,params:t.params});else{const{handleSignRequest:e}=await n(()=>import("./sign-5a6ceabf.js"),["assets/sign-5a6ceabf.js","assets/index-83adb651.js","assets/index-caf7d0ca.css"]);s=await e({account:i,params:t.params})}break}case"eth_signTypedData":{if(a!=null&&a.eth_signTypedData)s=await a.eth_signTypedData({account:i,params:t.params});else{const{handleSignTypedDataRequest:e}=await n(()=>import("./sign-typed-data-8ee180e3.js"),["assets/sign-typed-data-8ee180e3.js","assets/index-83adb651.js","assets/index-caf7d0ca.css"]);s=await e({account:i,params:t.params})}break}case"eth_signTypedData_v4":{if(a!=null&&a.eth_signTypedData_v4)s=await a.eth_signTypedData_v4({account:i,params:t.params});else{const{handleSignTypedDataRequest:e}=await n(()=>import("./sign-typed-data-8ee180e3.js"),["assets/sign-typed-data-8ee180e3.js","assets/index-83adb651.js","assets/index-caf7d0ca.css"]);s=await e({account:i,params:t.params})}break}case"eth_signTransaction":{if(a!=null&&a.eth_signTransaction)s=await a.eth_signTransaction({account:i,params:t.params});else{const{handleSignTransactionRequest:e}=await n(()=>import("./sign-transaction-d1bc6885.js"),["assets/sign-transaction-d1bc6885.js","assets/index-83adb651.js","assets/index-caf7d0ca.css"]);s=await e({account:i,params:t.params})}break}case"eth_sendTransaction":{const e=m(_);if(a!=null&&a.eth_sendTransaction)s=await a.eth_sendTransaction({account:i,chainId:e,params:t.params});else{const{handleSendTransactionRequest:c}=await n(()=>import("./send-transaction-994b291f.js"),["assets/send-transaction-994b291f.js","assets/index-83adb651.js","assets/index-caf7d0ca.css"]);s=await c({account:i,chainId:e,thirdwebClient:w,params:t.params})}break}case"eth_sendRawTransaction":{const e=m(_);if(a!=null&&a.eth_sendRawTransaction)s=await a.eth_sendRawTransaction({account:i,chainId:e,params:t.params});else{const{handleSendRawTransactionRequest:c}=await n(()=>import("./send-raw-transaction-1614d7ec.js"),[]);s=await c({account:i,chainId:e,params:t.params})}break}case"wallet_addEthereumChain":{if(a!=null&&a.wallet_addEthereumChain)s=await a.wallet_addEthereumChain({wallet:r,params:t.params});else throw new Error("Unsupported request method: wallet_addEthereumChain");break}case"wallet_switchEthereumChain":{if(a!=null&&a.wallet_switchEthereumChain)s=await a.wallet_switchEthereumChain({wallet:r,params:t.params});else{const{handleSwitchChain:e}=await n(()=>import("./switch-chain-9deb2f27.js"),["assets/switch-chain-9deb2f27.js","assets/index-83adb651.js","assets/index-caf7d0ca.css"]);s=await e({wallet:r,params:t.params})}break}default:{const e=a==null?void 0:a[t.method];if(e)s=await e({account:i,chainId:m(_),params:t.params});else throw new Error(`Unsupported request method: ${t.method}`)}}}catch(e){s={code:typeof e=="object"&&e!==null&&"code"in e?e.code:500,message:typeof e=="object"&&e!==null&&"message"in e?e.message:"Unknown error"}}p.respond({topic:h,response:{id:l,jsonrpc:"2.0",result:s}})}const f=Object.freeze(Object.defineProperty({__proto__:null,fulfillRequest:u},Symbol.toStringTag,{value:"Module"}));export{f as s,T as v};
