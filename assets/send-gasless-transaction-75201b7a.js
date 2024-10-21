import{_ as a,co as d}from"./index-517f9f85.js";async function p({account:n,transaction:t,serializableTransaction:e,gasless:r}){if(e.value&&e.value>0n)throw new Error("Gasless transactions cannot have a value");let o;if(r.provider==="biconomy"){const{relayBiconomyTransaction:i}=await a(()=>import("./biconomy-8cb49d35.js"),["assets/biconomy-8cb49d35.js","assets/index-517f9f85.js","assets/index-caf7d0ca.css"]);o=await i({account:n,transaction:t,serializableTransaction:e,gasless:r})}if(r.provider==="openzeppelin"){const{relayOpenZeppelinTransaction:i}=await a(()=>import("./openzeppelin-3a06e3f0.js"),["assets/openzeppelin-3a06e3f0.js","assets/index-517f9f85.js","assets/index-caf7d0ca.css"]);o=await i({account:n,transaction:t,serializableTransaction:e,gasless:r})}if(r.provider==="engine"){const{relayEngineTransaction:i}=await a(()=>import("./engine-c73d5a65.js"),["assets/engine-c73d5a65.js","assets/index-517f9f85.js","assets/index-caf7d0ca.css"]);o=await i({account:n,transaction:t,serializableTransaction:e,gasless:r})}if(!o)throw new Error("Unsupported gasless provider");return d({address:n.address,transactionHash:o.transactionHash,chainId:t.chain.id}),o}export{p as sendGaslessTransaction};