import{a5 as n}from"./index-3f8e0c26.js";async function s(l){const e=await(await fetch(`${n("inAppWallet")}/api/2024-05-05/ecosystem-wallet`,{headers:{"x-ecosystem-id":l}})).json();if(!e||e.code==="UNAUTHORIZED")throw new Error(e.message||`Could not find ecosystem wallet with id ${l}, please check your ecosystem wallet configuration.`);return{id:l,name:e.name,image_id:e.imageUrl,homepage:e.homepage,rdns:null,app:{browser:null,ios:null,android:null,mac:null,windows:null,linux:null,opera:null,chrome:null,firefox:null,safari:null,edge:null},mobile:{native:null,universal:null},desktop:{native:null,universal:null}}}export{s as getEcosystemWalletInfo};