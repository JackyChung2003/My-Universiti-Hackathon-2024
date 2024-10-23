"use client";
import {
  ConnectWalletSocialOptions,
  LoadingScreen,
  reservedScreens,
  useInAppWalletLocale,
  useScreenContext
} from "./chunk-INVSPOMQ.js";
import {
  WalletEntryButton,
  useSetSelectionData
} from "./chunk-EFNMRHPK.js";
import "./chunk-DZAUBBS5.js";
import "./chunk-ZWZYNOWR.js";
import "./chunk-C67AATRF.js";
import "./chunk-SCPJC5TL.js";
import "./chunk-G5QGQIQ7.js";
import "./chunk-6Z45A7LQ.js";
import "./chunk-ILZATN6A.js";
import "./chunk-PWFRCBEK.js";
import "./chunk-BZXRHH4X.js";
import "./chunk-QIUEWTOP.js";
import "./chunk-7CZJ6W42.js";
import "./chunk-MQ5SEJS7.js";
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
import "./chunk-2MTJELC7.js";
import {
  __toESM
} from "./chunk-SEVZ5PBP.js";

// node_modules/thirdweb/dist/esm/react/web/wallets/in-app/InAppWalletSelectionUI.js
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
function InAppWalletSelectionUI(props) {
  const { screen } = useScreenContext();
  const setData = useSetSelectionData();
  const locale = useInAppWalletLocale(props.connectLocale.id);
  if (props.size === "wide" || screen !== reservedScreens.main && props.size === "compact") {
    return (0, import_jsx_runtime.jsx)(WalletEntryButton, { walletId: props.wallet.id, selectWallet: () => {
      setData({});
      props.select();
    }, client: props.client, connectLocale: props.connectLocale, recommendedWallets: props.recommendedWallets, isActive: screen === props.wallet, badge: void 0 });
  }
  if (!locale) {
    return (0, import_jsx_runtime.jsx)(LoadingScreen, { height: "195px" });
  }
  return (0, import_jsx_runtime.jsx)(ConnectWalletSocialOptions, { disabled: props.disabled, locale, wallet: props.wallet, done: props.done, select: props.select, goBack: props.goBack, chain: props.chain, client: props.client, size: props.size });
}
var InAppWalletSelectionUI_default = InAppWalletSelectionUI;
export {
  InAppWalletSelectionUI_default as default
};
//# sourceMappingURL=InAppWalletSelectionUI-2A7RSYFG.js.map
