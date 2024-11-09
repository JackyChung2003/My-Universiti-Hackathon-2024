import{cK as e,cL as o,cM as a,o as c}from"./index-3f8e0c26.js";const i=`Ethereum Signed Message:
`;function u(t,n){const r=(()=>typeof t=="string"?e(t):t.raw instanceof Uint8Array?t.raw:o(t.raw))(),s=e(`${i}${r.length}`);return a(c([s,r]),n)}export{u as hashMessage};
