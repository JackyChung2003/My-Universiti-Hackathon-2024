import{a2 as k,a3 as U,z as d,a4 as L,a5 as h,a6 as O,C as W,Y as E,a7 as b,a1 as I,a8 as $,Z as C,x as g,_ as j,a9 as m,aa as v,ab as B,ac as M,ad as P,ae as z,af as R}from"./index-83adb651.js";import{signLoginPayload as Q}from"./sign-login-payload-b3e2334a.js";import{e as D}from"./eth_sendRawTransaction-5ae15b91.js";async function G(r){var n;const e=new k({storage:r.storage,clientId:r.client.clientId,ecosystemId:(n=r.ecosystem)==null?void 0:n.id});let t=await e.getGuestSessionId();t||(t=U(32),e.saveGuestSessionId(t));const a=d(r.client,r.ecosystem);return await(async()=>{const i=L({authOption:"guest",client:r.client,ecosystem:r.ecosystem}),s=await a(`${i}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({sessionId:t})});if(!s.ok)throw new Error("Failed to generate guest account");return await s.json()})()}async function J({client:r,ecosystem:e,tokenToLink:t,storage:a}){const o=d(r,e),n=h("inAppWallet"),i=await a.getAuthCookie();if(!i)throw new Error("Failed to link account, no user logged in");const s={Authorization:`Bearer iaw-auth-token:${i}`,"Content-Type":"application/json"},l=await o(`${n}/api/2024-05-05/account/connect`,{method:"POST",headers:s,body:JSON.stringify({accountAuthTokenToConnect:t})});if(!l.ok){const u=await l.json();throw new Error(u.message||"Failed to link account.")}const{linkedAccounts:c}=await l.json();return c??[]}async function q({client:r,ecosystem:e,storage:t}){const a=d(r,e),o=h("inAppWallet"),n=await t.getAuthCookie();if(!n)throw new Error("Failed to get linked accounts, no user logged in");const i={Authorization:`Bearer iaw-auth-token:${n}`,"Content-Type":"application/json"},s=await a(`${o}/api/2024-05-05/accounts`,{method:"GET",headers:i});if(!s.ok){const c=await s.json();throw new Error(c.message||"Failed to get linked accounts.")}const{linkedAccounts:l}=await s.json();return l??[]}function N(){return`${h("inAppWallet")}/api/2024-05-05/login/passkey/callback`}function F(r,e){return`${h("inAppWallet")}/api/2024-05-05/login/passkey?type=${r}${e?`&username=${e}`:""}`}async function V(r){var u,w,p;if(!r.passkeyClient.isAvailable())throw new Error("Passkeys are not available on this device");const e=d(r.client,r.ecosystem),t=r.username??x(r.ecosystem),o=await(await e(F("sign-up",t))).json();if(!o.challenge)throw new Error("No challenge received");const n=o.challenge,i=await r.passkeyClient.register({name:t,challenge:n,rp:r.rp}),s={};(u=r.ecosystem)!=null&&u.partnerId&&(s["x-ecosystem-partner-id"]=r.ecosystem.partnerId),(w=r.ecosystem)!=null&&w.id&&(s["x-ecosystem-id"]=r.ecosystem.id);const c=await(await e(N(),{method:"POST",headers:{"Content-Type":"application/json",...s},body:JSON.stringify({type:"sign-up",authenticatorData:i.authenticatorData,credentialId:i.credentialId,serverVerificationId:o.serverVerificationId,clientData:i.clientData,username:t,credential:{publicKey:i.credential.publicKey,algorithm:i.credential.algorithm},origin:i.origin,rpId:r.rp.id})})).json();if(!c||!c.storedToken)throw new Error(`Error verifying passkey: ${c.message??"unknown error"}`);return await((p=r.storage)==null?void 0:p.savePasskeyCredentialId(i.credentialId)),c}async function H(r){var u,w,p,y;if(!r.passkeyClient.isAvailable())throw new Error("Passkeys are not available on this device");const e=d(r.client,r.ecosystem),a=await(await e(F("sign-in"))).json();if(!a.challenge)throw new Error("No challenge received");const o=a.challenge,n=await((u=r.storage)==null?void 0:u.getPasskeyCredentialId())??void 0,i=await r.passkeyClient.authenticate({credentialId:n,challenge:o,rp:r.rp}),s={};(w=r.ecosystem)!=null&&w.partnerId&&(s["x-ecosystem-partner-id"]=r.ecosystem.partnerId),(p=r.ecosystem)!=null&&p.id&&(s["x-ecosystem-id"]=r.ecosystem.id);const c=await(await e(N(),{method:"POST",headers:{"Content-Type":"application/json",...s},body:JSON.stringify({type:"sign-in",authenticatorData:i.authenticatorData,credentialId:i.credentialId,serverVerificationId:a.serverVerificationId,clientData:i.clientData,signature:i.signature,origin:i.origin,rpId:r.rp.id})})).json();if(!c||!c.storedToken)throw new Error(`Error verifying passkey: ${c.message??"unknown error"}`);return await((y=r.storage)==null?void 0:y.savePasskeyCredentialId(i.credentialId)),c}function x(r){return`${(r==null?void 0:r.id)??"wallet"}-${new Date().toISOString()}`}async function K(r){const{wallet:e,chain:t}=r,a=await e.connect({client:r.client}),o=d(r.client,r.ecosystem),n=await(async()=>{const l=O({authOption:"wallet",client:r.client,ecosystem:r.ecosystem}),c=await o(`${l}&address=${a.address}&chainId=${t.id}`);if(!c.ok)throw new Error("Failed to generate SIWE login payload");return await c.json()})(),{signature:i}=await Q({payload:n,account:a});return await(async()=>{const l=L({authOption:"wallet",client:r.client,ecosystem:r.ecosystem}),c=await o(`${l}&signature=${i}&payload=${encodeURIComponent(n)}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({signature:i,payload:n})});if(!c.ok)throw new Error("Failed to verify SIWE signature");return await c.json()})()}async function S({authToken:r,client:e,ecosystem:t}){const o=await d(e,t)(`${h("inAppWallet")}/api/2024-05-05/accounts`,{method:"GET",headers:{"Content-Type":"application/json","x-thirdweb-client-id":e.clientId,Authorization:`Bearer embedded-wallet-token:${r}`}});if(!o.ok){if(console.log("response",o.status),o.status===401)return;const n=await o.json();throw console.log("result",n),new Error(`Failed to get user status: ${n.error}`)}return await o.json()}async function Y({client:r,ecosystem:e,payload:{message:t,isRaw:a},storage:o}){const n=d(r,e),i=await o.getAuthCookie(),s=await n(`${h("inAppWallet")}/api/v1/enclave-wallet/sign-message`,{method:"POST",headers:{"Content-Type":"application/json","x-thirdweb-client-id":r.clientId,Authorization:`Bearer embedded-wallet-token:${i}`},body:W({messagePayload:{message:t,isRaw:a}})});if(!s.ok)throw new Error("Failed to sign message");return await s.json()}async function Z({client:r,ecosystem:e,payload:t,storage:a}){console.log("payload",t);const o=d(r,e),n=await a.getAuthCookie(),i=await o(`${h("inAppWallet")}/api/v1/enclave-wallet/sign-transaction`,{method:"POST",headers:{"Content-Type":"application/json","x-thirdweb-client-id":r.clientId,Authorization:`Bearer embedded-wallet-token:${n}`},body:W({transactionPayload:t})});if(!i.ok)throw new Error("Failed to sign transaction");return(await i.json()).signature}async function X({client:r,ecosystem:e,payload:t,storage:a}){const o=d(r,e),n=await a.getAuthCookie(),i=await o(`${h("inAppWallet")}/api/v1/enclave-wallet/sign-typed-data`,{method:"POST",headers:{"Content-Type":"application/json","x-thirdweb-client-id":r.clientId,Authorization:`Bearer embedded-wallet-token:${n}`},body:W({...t})});if(!i.ok)throw new Error("Failed to sign typed data");return await i.json()}class ee{constructor({client:e,ecosystem:t,address:a,storage:o}){Object.defineProperty(this,"client",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"ecosystem",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"address",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"localStorage",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),this.client=e,this.ecosystem=t,this.address=a,this.localStorage=o}async postWalletSetUp(e){await this.localStorage.saveAuthCookie(e.storedToken.cookieString)}async getUserWalletStatus(){var n,i;const e=await this.localStorage.getAuthCookie();if(!e)return{status:"Logged Out"};const t=await S({authToken:e,client:this.client,ecosystem:this.ecosystem});if(!t)return{status:"Logged Out"};const a=t.wallets[0],o={email:(n=t.linkedAccounts.find(s=>s.details.email!==void 0))==null?void 0:n.details.email,phoneNumber:(i=t.linkedAccounts.find(s=>s.details.phone!==void 0))==null?void 0:i.details.phone,userWalletId:t.id||"",recoveryShareManagement:"ENCLAVE"};return a?{status:"Logged In, Wallet Initialized",walletAddress:a.address,authDetails:o,account:await this.getAccount()}:{status:"Logged In, Wallet Uninitialized",authDetails:o}}async getAccount(){const e=this.client,t=this.ecosystem,a=this.localStorage,o=async n=>{const i=b({client:e,chain:I(n.chainId)}),s={to:n.to??void 0,data:n.data?g(n.data):void 0,value:n.value?g(n.value):void 0,gas:n.gas?g(n.gas+n.gas/BigInt(10)):void 0,nonce:n.nonce?g(n.nonce):g(await j(()=>import("./eth_getTransactionCount-ae114d23.js"),["assets/eth_getTransactionCount-ae114d23.js","assets/index-83adb651.js","assets/index-caf7d0ca.css"]).then(({eth_getTransactionCount:l})=>l(i,{address:this.address,blockTag:"pending"}))),chainId:g(n.chainId)};return n.maxFeePerGas?(s.maxFeePerGas=g(n.maxFeePerGas),s.maxPriorityFeePerGas=n.maxPriorityFeePerGas?g(n.maxPriorityFeePerGas):void 0,s.type=2):(s.gasPrice=n.gasPrice?g(n.gasPrice):void 0,s.type=0),Z({client:e,ecosystem:t,storage:a,payload:s})};return{address:E(this.address),async signTransaction(n){if(!n.chainId)throw new Error("chainId required in tx to sign");return o({chainId:n.chainId,...n})},async sendTransaction(n){const i=b({client:e,chain:I(n.chainId)}),s=await o(n);return{transactionHash:await D(i,s)}},async signMessage({message:n}){const i=(()=>typeof n=="string"?{message:n,isRaw:!1}:{message:typeof n.raw=="string"?n.raw:$(n.raw),isRaw:!0})(),{signature:s}=await Y({client:e,ecosystem:t,payload:i,storage:a});return s},async signTypedData(n){const i=C(n),{signature:s}=await X({client:e,ecosystem:t,payload:i,storage:a});return s}}}}const te={height:"100%",width:"100%",border:"none",backgroundColor:"transparent",colorScheme:"light",position:"fixed",top:"0px",right:"0px",zIndex:"2147483646",display:"none",pointerEvents:"all"},f=new Map;class ae{constructor({link:e,baseUrl:t,iframeId:a,container:o=document.body,onIframeInitialize:n}){Object.defineProperty(this,"iframe",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"POLLING_INTERVAL_SECONDS",{enumerable:!0,configurable:!0,writable:!0,value:1.4}),Object.defineProperty(this,"iframeBaseUrl",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),this.iframeBaseUrl=t;let i=document.getElementById(a);const s=new URL(e);if(!i||i.src!==s.href){i=document.createElement("iframe");const l={...te};Object.assign(i.style,l),i.setAttribute("id",a),i.setAttribute("fetchpriority","high"),o.appendChild(i),i.src=s.href;const c=u=>{if(u.data.eventType==="ewsIframeLoaded"){if(window.removeEventListener("message",c),!i){console.warn("thirdweb iFrame not found");return}this.onIframeLoadHandler(i,n)()}};window.addEventListener("message",c)}this.iframe=i}async onIframeLoadedInitVariables(){return{}}onIframeLoadHandler(e,t){return async()=>{var i;const a=new MessageChannel,o=new Promise((s,l)=>{a.port1.onmessage=c=>{const{data:u}=c;a.port1.close(),u.success||l(new Error(u.error)),f.set(e.src,!0),t&&t(),s(!0)}}),n="initIframe";(i=e==null?void 0:e.contentWindow)==null||i.postMessage({eventType:n,data:await this.onIframeLoadedInitVariables()},this.iframeBaseUrl,[a.port2]),await o}}async call({procedureName:e,params:t,showIframe:a=!1}){var i;for(;!f.get(this.iframe.src);)await m(this.POLLING_INTERVAL_SECONDS*1e3);a&&(this.iframe.style.display="block",await m(.005*1e3));const o=new MessageChannel,n=new Promise((s,l)=>{o.port1.onmessage=async c=>{const{data:u}=c;o.port1.close(),a&&(await m(.1*1e3),this.iframe.style.display="none"),u.success?s(u.data):l(new Error(u.error))}});return(i=this.iframe.contentWindow)==null||i.postMessage({eventType:e,data:t},this.iframeBaseUrl,[o.port2]),n}destroy(){f.delete(this.iframe.src)}}class ie extends ae{constructor({clientId:e,baseUrl:t,ecosystem:a}){super({iframeId:re+((a==null?void 0:a.id)||""),link:ne({clientId:e,path:B,ecosystem:a,baseUrl:t}).href,baseUrl:t,container:document.body}),Object.defineProperty(this,"clientId",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"ecosystem",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),this.clientId=e,this.ecosystem=a}async onIframeLoadedInitVariables(){var t,a,o;const e=new k({storage:v,clientId:this.clientId,ecosystemId:(t=this.ecosystem)==null?void 0:t.id});return{authCookie:await e.getAuthCookie(),deviceShareStored:await e.getDeviceShare(),walletUserId:await e.getWalletUserId(),clientId:this.clientId,partnerId:(a=this.ecosystem)==null?void 0:a.partnerId,ecosystemId:(o=this.ecosystem)==null?void 0:o.id}}}function ne({clientId:r,baseUrl:e,path:t,ecosystem:a,queryParams:o}){var i;const n=new URL(`${t}`,e);if(o)for(const s of Object.keys(o))n.searchParams.set(s,((i=o[s])==null?void 0:i.toString())||"");return n.searchParams.set("clientId",r),(a==null?void 0:a.partnerId)!==void 0&&n.searchParams.set("partnerId",a.partnerId),(a==null?void 0:a.id)!==void 0&&n.searchParams.set("ecosystemId",a.id),n}const re="thirdweb-in-app-wallet-iframe";async function se({authToken:r,client:e,ecosystem:t}){const o=await d(e,t)(`${h("inAppWallet")}/api/v1/enclave-wallet/generate`,{method:"POST",headers:{"Content-Type":"application/json","x-thirdweb-client-id":e.clientId,Authorization:`Bearer embedded-wallet-token:${r}`}});if(!o.ok)throw new Error("Failed to generate wallet");const{wallet:n}=await o.json();return n}class oe{constructor({baseUrl:e,querier:t,preLogin:a,postLogin:o,client:n,ecosystem:i}){Object.defineProperty(this,"LoginQuerier",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"preLogin",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"postLogin",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"client",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"baseUrl",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"ecosystem",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),this.baseUrl=e,this.LoginQuerier=t,this.preLogin=a,this.postLogin=o,this.client=n,this.ecosystem=i}async sendEmailLoginOtp({email:e}){return await this.LoginQuerier.call({procedureName:"sendThirdwebEmailLoginOtp",params:{email:e}})}async sendSmsLoginOtp({phoneNumber:e}){return await this.LoginQuerier.call({procedureName:"sendThirdwebSmsLoginOtp",params:{phoneNumber:e}})}}class ce extends oe{async authenticateWithModal(){return this.LoginQuerier.call({procedureName:"loginWithThirdwebModal",params:void 0,showIframe:!0})}async loginWithModal(){await this.preLogin();const e=await this.authenticateWithModal();return this.postLogin(e)}async authenticateWithIframe({email:e}){return this.LoginQuerier.call({procedureName:"loginWithThirdwebModal",params:{email:e},showIframe:!0})}async loginWithIframe({email:e}){await this.preLogin();const t=await this.authenticateWithIframe({email:e});return this.postLogin(t)}async authenticateWithCustomJwt({encryptionKey:e,jwt:t}){if(!e||e.length===0)throw new Error("Encryption key is required for custom jwt auth");return this.LoginQuerier.call({procedureName:"loginWithCustomJwt",params:{encryptionKey:e,jwt:t}})}async loginWithCustomJwt({encryptionKey:e,jwt:t}){if(!e||e.length===0)throw new Error("Encryption key is required for custom jwt auth");await this.preLogin();const a=await this.authenticateWithCustomJwt({encryptionKey:e,jwt:t});return this.postLogin(a)}async authenticateWithCustomAuthEndpoint({encryptionKey:e,payload:t}){return this.LoginQuerier.call({procedureName:"loginWithCustomAuthEndpoint",params:{encryptionKey:e,payload:t}})}async loginWithCustomAuthEndpoint({encryptionKey:e,payload:t}){if(!e||e.length===0)throw new Error("Encryption key is required for custom auth");await this.preLogin();const a=await this.authenticateWithCustomAuthEndpoint({encryptionKey:e,payload:t});return this.postLogin(a)}async authenticateWithEmailOtp({email:e,otp:t,recoveryCode:a}){return this.LoginQuerier.call({procedureName:"verifyThirdwebEmailLoginOtp",params:{email:e,otp:t,recoveryCode:a}})}async loginWithEmailOtp({email:e,otp:t,recoveryCode:a}){const o=await this.authenticateWithEmailOtp({email:e,otp:t,recoveryCode:a});return this.postLogin(o)}async authenticateWithSmsOtp({phoneNumber:e,otp:t,recoveryCode:a}){return this.LoginQuerier.call({procedureName:"verifyThirdwebSmsLoginOtp",params:{phoneNumber:e,otp:t,recoveryCode:a}})}async loginWithSmsOtp({phoneNumber:e,otp:t,recoveryCode:a}){const o=await this.authenticateWithSmsOtp({phoneNumber:e,otp:t,recoveryCode:a});return this.postLogin(o)}}class le{constructor({client:e,querier:t,onAuthSuccess:a,ecosystem:o,baseUrl:n,localStorage:i}){Object.defineProperty(this,"client",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"ecosystem",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"AuthQuerier",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"localStorage",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"onAuthSuccess",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"BaseLogin",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),this.client=e,this.ecosystem=o,this.AuthQuerier=t,this.localStorage=i,this.onAuthSuccess=a,this.BaseLogin=new ce({postLogin:async s=>this.postLogin(s),preLogin:async()=>{await this.preLogin()},ecosystem:o,querier:t,client:e,baseUrl:n})}async preLogin(){await this.logout()}async postLogin({storedToken:e,walletDetails:t}){return e.shouldStoreCookieString&&await this.localStorage.saveAuthCookie(e.cookieString),await this.onAuthSuccess({storedToken:e,walletDetails:t})}async loginWithAuthToken(e,t){var n;await this.preLogin();const a=await S({authToken:e.storedToken.cookieString,client:this.client,ecosystem:this.ecosystem});if(!a)throw new Error("Cannot login, no user found for auth token");if(a.wallets.length>0&&((n=a.wallets[0])==null?void 0:n.type)==="enclave")return this.postLogin({storedToken:e.storedToken,walletDetails:{walletAddress:a.wallets[0].address}});if(a.wallets.length===0&&this.ecosystem){const i=await se({authToken:e.storedToken.cookieString,client:this.client,ecosystem:this.ecosystem});return this.postLogin({storedToken:e.storedToken,walletDetails:{walletAddress:i.address}})}const o=await this.AuthQuerier.call({procedureName:"loginWithStoredTokenDetails",params:{storedToken:e.storedToken,recoveryCode:t}});return this.postLogin(o)}async loginWithModal(){return this.BaseLogin.loginWithModal()}async authenticateWithModal(){return this.BaseLogin.authenticateWithModal()}async loginWithIframe(e){return this.BaseLogin.loginWithIframe(e)}async authenticateWithIframe(e){return this.BaseLogin.authenticateWithIframe(e)}async loginWithCustomJwt(e){return this.BaseLogin.loginWithCustomJwt(e)}async authenticateWithCustomJwt(e){return this.BaseLogin.authenticateWithCustomJwt(e)}async loginWithCustomAuthEndpoint(e){return this.BaseLogin.loginWithCustomAuthEndpoint(e)}async authenticateWithCustomAuthEndpoint(e){return this.BaseLogin.authenticateWithCustomAuthEndpoint(e)}async sendEmailLoginOtp({email:e}){return this.BaseLogin.sendEmailLoginOtp({email:e})}async sendSmsLoginOtp({phoneNumber:e}){return this.BaseLogin.sendSmsLoginOtp({phoneNumber:e})}async loginWithEmailOtp(e){return await this.preLogin(),this.BaseLogin.loginWithEmailOtp(e)}async authenticateWithEmailOtp(e){return this.BaseLogin.authenticateWithEmailOtp(e)}async loginWithSmsOtp(e){return await this.preLogin(),this.BaseLogin.loginWithSmsOtp(e)}async authenticateWithSmsOtp(e){return this.BaseLogin.authenticateWithSmsOtp(e)}async logout(){this.AuthQuerier&&await this.AuthQuerier.call({procedureName:"logout",params:void 0});const e=await this.localStorage.removeAuthCookie(),t=await this.localStorage.removeWalletUserId();return{success:e||t}}}const ue=async r=>{const{client:e,ecosystem:t}=r,a=O({client:e,ecosystem:t,authOption:r.strategy}),o={"Content-Type":"application/json","x-client-id":e.clientId};t!=null&&t.id&&(o["x-ecosystem-id"]=t.id),t!=null&&t.partnerId&&(o["x-ecosystem-partner-id"]=t.partnerId);const n=(()=>{switch(r.strategy){case"email":return{email:r.email};case"phone":return{phone:r.phoneNumber}}})(),i=await fetch(a,{method:"POST",headers:o,body:JSON.stringify(n)});if(!i.ok)throw new Error("Failed to send verification code");return await i.json()},A=async r=>{const{client:e,ecosystem:t}=r,a=L({authOption:r.strategy,client:r.client,ecosystem:r.ecosystem}),o={"Content-Type":"application/json","x-client-id":e.clientId};t!=null&&t.id&&(o["x-ecosystem-id"]=t.id),t!=null&&t.partnerId&&(o["x-ecosystem-partner-id"]=t.partnerId);const n=(()=>{switch(r.strategy){case"email":return{email:r.email,code:r.verificationCode};case"phone":return{phone:r.phoneNumber,code:r.verificationCode}}})(),i=await fetch(a,{method:"POST",headers:o,body:JSON.stringify(n)});if(!i.ok)throw new Error("Failed to verify verification code");return await i.json()};class de{constructor({client:e,ecosystem:t,querier:a,localStorage:o}){Object.defineProperty(this,"client",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"ecosystem",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"walletManagerQuerier",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"localStorage",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),this.client=e,this.ecosystem=t,this.walletManagerQuerier=a,this.localStorage=o}async postWalletSetUp(e){e.deviceShareStored&&await this.localStorage.saveDeviceShare(e.deviceShareStored,e.storedToken.authDetails.userWalletId)}async getUserWalletStatus(){const e=await this.walletManagerQuerier.call({procedureName:"getUserStatus",params:void 0});return e.status==="Logged In, Wallet Initialized"?{status:"Logged In, Wallet Initialized",...e.user,account:await this.getAccount()}:e.status==="Logged In, New Device"?{status:"Logged In, New Device",...e.user}:e.status==="Logged In, Wallet Uninitialized"?{status:"Logged In, Wallet Uninitialized",...e.user}:{status:e.status}}async getAccount(){var i;const e=this.walletManagerQuerier,t=this.client,a=(i=this.ecosystem)==null?void 0:i.partnerId,{address:o}=await e.call({procedureName:"getAddress",params:void 0}),n=async s=>{const l={to:s.to??void 0,data:s.data,value:s.value,gasLimit:s.gas,nonce:s.nonce,chainId:s.chainId};s.maxFeePerGas?(l.accessList=s.accessList,l.maxFeePerGas=s.maxFeePerGas,l.maxPriorityFeePerGas=s.maxPriorityFeePerGas,l.type=2):(l.gasPrice=s.gasPrice,l.type=0);const c=P().rpc,{signedTransaction:u}=await e.call({procedureName:"signTransaction",params:{transaction:l,chainId:s.chainId,partnerId:a,rpcEndpoint:`https://${s.chainId}.${c}`}});return u};return{address:E(o),async signTransaction(s){if(!s.chainId)throw new Error("chainId required in tx to sign");return n({...s,chainId:s.chainId})},async sendTransaction(s){const l=b({client:t,chain:I(s.chainId)}),c=await n(s);return{transactionHash:await D(l,c)}},async signMessage({message:s}){const l=(()=>typeof s=="string"?s:s.raw instanceof Uint8Array?s.raw:M(s.raw))(),{signedMessage:c}=await e.call({procedureName:"signMessage",params:{message:l,partnerId:a,chainId:1}});return c},async signTypedData(s){var T;const l=C(s);(T=l.types)!=null&&T.EIP712Domain&&(l.types.EIP712Domain=void 0);const c=l.domain,u=c==null?void 0:c.chainId,p={...c!=null&&c.verifyingContract?{verifyingContract:c==null?void 0:c.verifyingContract}:{},name:c==null?void 0:c.name,version:c==null?void 0:c.version};u&&(p.chainId=u);const y=P().rpc,{signedTypedData:_}=await e.call({procedureName:"signTypedDataV4",params:{domain:p,types:l.types,message:l.message,chainId:u||1,partnerId:a,rpcEndpoint:`https://${u}.${y}`}});return _}}}}class ye{isClientIdLegacyPaper(e){return e.indexOf("-")>0&&e.length===36}constructor({client:e,onAuthSuccess:t,ecosystem:a,passkeyDomain:o}){if(Object.defineProperty(this,"client",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"ecosystem",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"querier",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"localStorage",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"wallet",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"auth",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"passkeyDomain",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),this.isClientIdLegacyPaper(e.clientId))throw new Error("You are using a legacy clientId. Please use the clientId found on the thirdweb dashboard settings page");const n=h("inAppWallet");this.client=e,this.ecosystem=a,this.passkeyDomain=o,this.localStorage=new k({storage:v,clientId:e.clientId,ecosystemId:a==null?void 0:a.id}),this.querier=new ie({clientId:e.clientId,ecosystem:a,baseUrl:n}),this.auth=new le({client:e,querier:this.querier,baseUrl:n,localStorage:this.localStorage,ecosystem:a,onAuthSuccess:async i=>{if(t==null||t(i),this.ecosystem&&i.storedToken.authDetails.walletType==="sharded"&&!await this.querier.call({procedureName:"migrateFromShardToEnclave",params:{storedToken:i.storedToken}}))throw new Error("Failed to migrate from sharded to enclave wallet");if(await this.initializeWallet(i.storedToken.cookieString),!this.wallet)throw new Error("Failed to initialize wallet");const s="deviceShareStored"in i.walletDetails?i.walletDetails.deviceShareStored:void 0;return await this.wallet.postWalletSetUp({storedToken:i.storedToken,deviceShareStored:s}),i.storedToken.authDetails.walletType!=="enclave"&&await this.querier.call({procedureName:"initIframe",params:{partnerId:a==null?void 0:a.partnerId,ecosystemId:a==null?void 0:a.id,clientId:this.client.clientId,deviceShareStored:"deviceShareStored"in i.walletDetails?i.walletDetails.deviceShareStored:null,walletUserId:i.storedToken.authDetails.userWalletId,authCookie:i.storedToken.cookieString}}),{user:{status:"Logged In, Wallet Initialized",authDetails:i.storedToken.authDetails,account:await this.wallet.getAccount(),walletAddress:i.walletDetails.walletAddress}}}})}async initializeWallet(e){const t=await this.localStorage.getAuthCookie();if(!e&&t===null)throw new Error("No auth token provided and no stored auth token found to initialize the wallet");const a=await S({authToken:e||t,client:this.client,ecosystem:this.ecosystem});if(!a)throw new Error("Cannot initialize wallet, no user logged in");if(a.wallets.length===0)throw new Error("Cannot initialize wallet, this user does not have a wallet generated yet");if(a.wallets[0].type==="enclave"){this.wallet=new ee({client:this.client,ecosystem:this.ecosystem,address:a.wallets[0].address,storage:this.localStorage});return}this.wallet=new de({client:this.client,ecosystem:this.ecosystem,querier:this.querier,localStorage:this.localStorage})}async getUser(){if(!this.wallet){const e=await this.localStorage.getAuthCookie();if(!e)return{status:"Logged Out"};await this.initializeWallet(e)}if(!this.wallet)throw new Error("Wallet not initialized");return await this.wallet.getUserWalletStatus()}getAccount(){if(!this.wallet)throw new Error("Wallet not initialized");return this.wallet.getAccount()}async preAuthenticate(e){return ue({...e,client:this.client,ecosystem:this.ecosystem})}authenticateWithRedirect(e,t,a){z({authOption:e,client:this.client,ecosystem:this.ecosystem,redirectUrl:a,mode:t})}async loginWithAuthToken(e){return this.auth.loginWithAuthToken(e)}async authenticate(e){const t=e.strategy;switch(t){case"email":return A({...e,client:this.client,ecosystem:this.ecosystem});case"phone":return A({...e,client:this.client,ecosystem:this.ecosystem});case"jwt":return this.auth.authenticateWithCustomJwt({jwt:e.jwt,encryptionKey:e.encryptionKey});case"passkey":return this.passkeyAuth(e);case"auth_endpoint":return this.auth.authenticateWithCustomAuthEndpoint({payload:e.payload,encryptionKey:e.encryptionKey});case"iframe_email_verification":return this.auth.authenticateWithIframe({email:e.email});case"iframe":return this.auth.authenticateWithModal();case"apple":case"facebook":case"google":case"telegram":case"farcaster":case"line":case"x":case"coinbase":case"discord":return R({authOption:t,client:this.client,ecosystem:this.ecosystem,closeOpenedWindow:e.closeOpenedWindow,openedWindow:e.openedWindow});case"guest":return G({client:this.client,ecosystem:this.ecosystem,storage:v});case"wallet":return K({ecosystem:this.ecosystem,client:this.client,wallet:e.wallet,chain:e.chain})}}async connect(e){const t=e.strategy;switch(t){case"jwt":return this.auth.loginWithCustomJwt({jwt:e.jwt,encryptionKey:e.encryptionKey});case"auth_endpoint":return this.auth.loginWithCustomAuthEndpoint({payload:e.payload,encryptionKey:e.encryptionKey});case"iframe_email_verification":return this.auth.loginWithIframe({email:e.email});case"iframe":return this.auth.loginWithModal();case"passkey":{const a=await this.passkeyAuth(e);return this.loginWithAuthToken(a)}case"phone":case"email":case"wallet":case"apple":case"facebook":case"google":case"farcaster":case"telegram":case"line":case"x":case"guest":case"coinbase":case"discord":{const a=await this.authenticate(e);return await this.auth.loginWithAuthToken(a)}default:he(t)}}async logout(){return await this.auth.logout()}async passkeyAuth(e){const{PasskeyWebClient:t}=await j(()=>import("./index-83adb651.js").then(s=>s.db),["assets/index-83adb651.js","assets/index-caf7d0ca.css"]),{passkeyName:a,storeLastUsedPasskey:o=!0}=e,n=new t,i=this.localStorage;return e.type==="sign-up"?V({client:this.client,ecosystem:this.ecosystem,username:a,passkeyClient:n,storage:o?i:void 0,rp:{id:this.passkeyDomain??window.location.hostname,name:this.passkeyDomain??window.document.title}}):H({client:this.client,ecosystem:this.ecosystem,passkeyClient:n,storage:o?i:void 0,rp:{id:this.passkeyDomain??window.location.hostname,name:this.passkeyDomain??window.document.title}})}async linkProfile(e){const{storedToken:t}=await this.authenticate(e);return await J({client:e.client,tokenToLink:t.cookieString,storage:this.localStorage,ecosystem:e.ecosystem||this.ecosystem})}async getProfiles(){return q({client:this.client,ecosystem:this.ecosystem,storage:this.localStorage})}}function he(r,e){throw new Error(e??`Invalid param: ${r}`)}export{ye as InAppWebConnector};
