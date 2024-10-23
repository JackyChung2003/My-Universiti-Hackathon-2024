import {
  ConnectingScreen
} from "./chunk-DTX5DBX6.js";
import "./chunk-DZAUBBS5.js";
import "./chunk-C67AATRF.js";
import "./chunk-SCPJC5TL.js";
import "./chunk-G5QGQIQ7.js";
import "./chunk-PWFRCBEK.js";
import "./chunk-BZXRHH4X.js";
import "./chunk-QIUEWTOP.js";
import "./chunk-VIBS7Y3M.js";
import "./chunk-GDIXMSW3.js";
import "./chunk-ZNEQLT5Q.js";
import "./chunk-7VZHRFCE.js";
import "./chunk-UY2SRO54.js";
import "./chunk-QSRHVW23.js";
import "./chunk-YNNWR6WB.js";
import "./chunk-ADB2NQOP.js";
import "./chunk-UWOTGWKX.js";
import "./chunk-QWJX262R.js";
import "./chunk-V4W7FLQ7.js";
import "./chunk-DIMUSPZQ.js";
import "./chunk-5WKP5JEZ.js";
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
import "./chunk-H4ERSLF5.js";
import "./chunk-CJ7GOBZO.js";
import "./chunk-XN7MCJ4Y.js";
import "./chunk-P7ZDTV2E.js";
import "./chunk-SNQ54XRM.js";
import {
  require_jsx_runtime
} from "./chunk-U3QNWT4A.js";
import {
  require_react
} from "./chunk-2MTJELC7.js";
import {
  __toESM
} from "./chunk-SEVZ5PBP.js";

// node_modules/thirdweb/dist/esm/react/web/wallets/shared/CoinbaseSDKConnection.js
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var import_react = __toESM(require_react(), 1);
function CoinbaseSDKWalletConnectUI(props) {
  const { onBack, done, wallet, walletInfo, onGetStarted, locale } = props;
  const [errorConnecting, setErrorConnecting] = (0, import_react.useState)(false);
  const connect = (0, import_react.useCallback)(() => {
    setErrorConnecting(false);
    wallet.connect({
      client: props.client,
      chain: props.chain
    }).then(() => {
      done();
    }).catch((e) => {
      console.error(e);
      setErrorConnecting(true);
    });
  }, [props.client, wallet, props.chain, done]);
  const scanStarted = (0, import_react.useRef)(false);
  (0, import_react.useEffect)(() => {
    if (scanStarted.current) {
      return;
    }
    scanStarted.current = true;
    connect();
  }, [connect]);
  return (0, import_jsx_runtime.jsx)(ConnectingScreen, { locale: {
    getStartedLink: locale.getStartedLink,
    instruction: locale.connectionScreen.instruction,
    tryAgain: locale.connectionScreen.retry,
    inProgress: locale.connectionScreen.inProgress,
    failed: locale.connectionScreen.failed
  }, onBack, walletName: walletInfo.name, walletId: wallet.id, errorConnecting, onRetry: connect, onGetStarted, client: props.client, size: props.size });
}
var CoinbaseSDKConnection_default = CoinbaseSDKWalletConnectUI;
export {
  CoinbaseSDKConnection_default as default
};
//# sourceMappingURL=CoinbaseSDKConnection-TLVMG4KU.js.map
