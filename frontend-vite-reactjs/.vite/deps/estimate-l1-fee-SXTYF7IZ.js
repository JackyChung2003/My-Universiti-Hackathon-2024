import {
  toSerializableTransaction
} from "./chunk-JOTM2E7T.js";
import "./chunk-HT4EHALU.js";
import "./chunk-QC3K2OKT.js";
import "./chunk-LMT6OD3N.js";
import "./chunk-H6EKSCJG.js";
import "./chunk-ZNEQLT5Q.js";
import {
  getContract
} from "./chunk-7VZHRFCE.js";
import "./chunk-UY2SRO54.js";
import {
  readContract
} from "./chunk-YNNWR6WB.js";
import "./chunk-ADB2NQOP.js";
import "./chunk-UWOTGWKX.js";
import "./chunk-QWJX262R.js";
import "./chunk-V4W7FLQ7.js";
import "./chunk-DIMUSPZQ.js";
import {
  serializeTransaction
} from "./chunk-5WKP5JEZ.js";
import "./chunk-R65PP5GT.js";
import "./chunk-JZJYIG2P.js";
import "./chunk-NJUWOGZE.js";
import "./chunk-7IMMTQIW.js";
import "./chunk-KHEWVYBH.js";
import "./chunk-AINJJ2SM.js";
import "./chunk-KWDKOS5H.js";
import "./chunk-OFS4JK5L.js";
import "./chunk-Q34TOGFK.js";
import "./chunk-P4VU4REC.js";
import "./chunk-TMEMN4EL.js";
import "./chunk-CJ7GOBZO.js";
import "./chunk-XN7MCJ4Y.js";
import "./chunk-P7ZDTV2E.js";
import "./chunk-SNQ54XRM.js";
import "./chunk-SEVZ5PBP.js";

// node_modules/thirdweb/dist/esm/gas/estimate-l1-fee.js
var OPStackGasPriceOracleAddress = "0x420000000000000000000000000000000000000F";
async function estimateL1Fee(options) {
  const { transaction, gasPriceOracleAddress } = options;
  const oracleContract = getContract({
    client: transaction.client,
    address: gasPriceOracleAddress || OPStackGasPriceOracleAddress,
    chain: transaction.chain
  });
  const { gasPrice, ...serializableTx } = await toSerializableTransaction({
    transaction
  });
  const serialized = serializeTransaction({
    ...serializableTx,
    type: "eip1559"
  });
  return readContract({
    contract: oracleContract,
    method: "function getL1Fee(bytes memory _data) view returns (uint256)",
    params: [serialized]
  });
}
export {
  estimateL1Fee
};
//# sourceMappingURL=estimate-l1-fee-SXTYF7IZ.js.map
