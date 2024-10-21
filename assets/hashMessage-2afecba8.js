import{cH as e,cI as o,cJ as a,o as c}from"./index-e14c9def.js";const i=`Ethereum Signed Message:
`;function u(t,n){const r=(()=>typeof t=="string"?e(t):t.raw instanceof Uint8Array?t.raw:o(t.raw))(),s=e(`${i}${r.length}`);return a(c([s,r]),n)}export{u as hashMessage};
