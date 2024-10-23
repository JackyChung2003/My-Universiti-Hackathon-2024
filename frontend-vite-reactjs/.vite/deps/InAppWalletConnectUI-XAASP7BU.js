"use client";
import {
  GuestLogin,
  OTPLoginUI,
  PassKeyLogin,
  PoweredByThirdweb,
  SocialLogin,
  TOS,
  WalletAuth
} from "./chunk-DBZEH6OH.js";
import {
  ConnectWalletSocialOptions,
  LoadingScreen,
  useInAppWalletLocale,
  useScreenContext
} from "./chunk-INVSPOMQ.js";
import "./chunk-U4UBDLYH.js";
import {
  useSelectionData,
  useSetSelectionData
} from "./chunk-EFNMRHPK.js";
import "./chunk-DTX5DBX6.js";
import {
  Container,
  Img,
  ModalHeader,
  ModalTitle,
  Spacer,
  iconSize
} from "./chunk-DZAUBBS5.js";
import "./chunk-ZWZYNOWR.js";
import "./chunk-C67AATRF.js";
import "./chunk-IHVSJSUJ.js";
import "./chunk-SCPJC5TL.js";
import "./chunk-T6NEEJUP.js";
import "./chunk-YESUX4E2.js";
import "./chunk-G5QGQIQ7.js";
import "./chunk-6Z45A7LQ.js";
import "./chunk-ILZATN6A.js";
import "./chunk-PWFRCBEK.js";
import "./chunk-ITZRRJZM.js";
import "./chunk-BTE2Y3SL.js";
import "./chunk-T7YOVOJY.js";
import "./chunk-G26WKBGM.js";
import "./chunk-IJRT7NGM.js";
import "./chunk-BZXRHH4X.js";
import "./chunk-QIUEWTOP.js";
import "./chunk-2RRVHQYX.js";
import "./chunk-UDWYDBVK.js";
import "./chunk-657SCGLL.js";
import "./chunk-7CZJ6W42.js";
import "./chunk-MQ5SEJS7.js";
import "./chunk-AZKQR3DT.js";
import "./chunk-7SEXUYZ7.js";
import "./chunk-VIBS7Y3M.js";
import "./chunk-GDIXMSW3.js";
import "./chunk-ZNEQLT5Q.js";
import "./chunk-7VZHRFCE.js";
import "./chunk-NPXNISXJ.js";
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

// node_modules/thirdweb/dist/esm/react/web/wallets/in-app/InAppWalletConnectUI.js
var import_jsx_runtime2 = __toESM(require_jsx_runtime(), 1);

// node_modules/thirdweb/dist/esm/react/web/wallets/in-app/InAppWalletFormUI.js
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var import_react = __toESM(require_react(), 1);
function InAppWalletFormUIScreen(props) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k;
  const isCompact = props.size === "compact";
  const { initialScreen, screen } = useScreenContext();
  const [isApproved, setIsApproved] = (0, import_react.useState)(false);
  const isInitialScreen = screen === props.wallet && initialScreen === props.wallet;
  const onBack = isInitialScreen && !props.isLinking ? void 0 : props.goBack;
  return (0, import_jsx_runtime.jsxs)(Container, { fullHeight: true, flex: "column", p: "lg", animate: "fadein", style: {
    minHeight: "250px"
  }, children: [isCompact && (isInitialScreen ? (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [(0, import_jsx_runtime.jsx)(ModalHeader, { onBack, leftAligned: !props.isLinking, title: (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [!((_a = props.meta) == null ? void 0 : _a.titleIconUrl) ? null : (0, import_jsx_runtime.jsx)(Img, { src: (_b = props.meta) == null ? void 0 : _b.titleIconUrl, width: iconSize.md, height: iconSize.md, client: props.client }), (0, import_jsx_runtime.jsx)(ModalTitle, { children: ((_c = props.meta) == null ? void 0 : _c.title) ?? props.inAppWalletLocale.emailLoginScreen.title })] }) }), (0, import_jsx_runtime.jsx)(Spacer, { y: "lg" })] }) : (0, import_jsx_runtime.jsx)(ModalHeader, { onBack, title: props.inAppWalletLocale.signIn })), (0, import_jsx_runtime.jsx)(Container, { expand: true, flex: "column", center: "y", p: isCompact ? void 0 : "lg", children: (0, import_jsx_runtime.jsx)(ConnectWalletSocialOptions, { ...props, locale: props.inAppWalletLocale, disabled: ((_d = props.meta) == null ? void 0 : _d.requireApproval) && !isApproved }) }), isCompact && (((_e = props.meta) == null ? void 0 : _e.showThirdwebBranding) !== false || ((_f = props.meta) == null ? void 0 : _f.termsOfServiceUrl) || ((_g = props.meta) == null ? void 0 : _g.privacyPolicyUrl)) && (0, import_jsx_runtime.jsx)(Spacer, { y: "xl" }), (0, import_jsx_runtime.jsxs)(Container, { flex: "column", gap: "lg", children: [(0, import_jsx_runtime.jsx)(TOS, { termsOfServiceUrl: (_h = props.meta) == null ? void 0 : _h.termsOfServiceUrl, privacyPolicyUrl: (_i = props.meta) == null ? void 0 : _i.privacyPolicyUrl, locale: props.connectLocale.agreement, requireApproval: (_j = props.meta) == null ? void 0 : _j.requireApproval, onApprove: () => {
    setIsApproved(!isApproved);
  }, isApproved }), ((_k = props.meta) == null ? void 0 : _k.showThirdwebBranding) !== false && (0, import_jsx_runtime.jsx)(PoweredByThirdweb, {})] })] });
}

// node_modules/thirdweb/dist/esm/react/web/wallets/in-app/InAppWalletConnectUI.js
function InAppWalletConnectUI(props) {
  const data = useSelectionData();
  const setSelectionData = useSetSelectionData();
  const state = data;
  const localeId = props.connectLocale.id;
  const locale = useInAppWalletLocale(localeId);
  const { initialScreen } = useScreenContext();
  if (!locale) {
    return (0, import_jsx_runtime2.jsx)(LoadingScreen, {});
  }
  const goBackToMain = () => {
    var _a;
    if (initialScreen === props.wallet) {
      setSelectionData({});
    } else {
      (_a = props.goBack) == null ? void 0 : _a.call(props);
      setSelectionData({});
    }
  };
  const done = () => {
    props.done();
    setSelectionData({});
  };
  const otpUserInfo = (state == null ? void 0 : state.emailLogin) ? { email: state.emailLogin } : (state == null ? void 0 : state.phoneLogin) ? { phone: state.phoneLogin } : void 0;
  if (otpUserInfo) {
    return (0, import_jsx_runtime2.jsx)(OTPLoginUI, { userInfo: otpUserInfo, locale, done, goBack: goBackToMain, wallet: props.wallet, chain: props.chain, client: props.client, size: props.size, isLinking: props.isLinking });
  }
  if (state == null ? void 0 : state.passkeyLogin) {
    return (0, import_jsx_runtime2.jsx)(PassKeyLogin, { locale: props.connectLocale, wallet: props.wallet, done, onBack: goBackToMain, chain: props.chain, client: props.client, size: props.size, isLinking: props.isLinking });
  }
  if (state == null ? void 0 : state.walletLogin) {
    return (0, import_jsx_runtime2.jsx)(WalletAuth, { meta: props.meta, inAppLocale: locale, walletConnect: props.walletConnect, wallet: props.wallet, client: props.client, size: props.size, done, onBack: goBackToMain || (() => setSelectionData({})), locale: props.connectLocale });
  }
  if (state == null ? void 0 : state.socialLogin) {
    return (0, import_jsx_runtime2.jsx)(SocialLogin, { socialAuth: state.socialLogin.type, locale, done, goBack: goBackToMain, wallet: props.wallet, state, chain: props.chain, client: props.client, size: props.size, connectLocale: props.connectLocale, isLinking: props.isLinking });
  }
  if (state == null ? void 0 : state.guestLogin) {
    return (0, import_jsx_runtime2.jsx)(GuestLogin, { locale, done, goBack: goBackToMain, wallet: props.wallet, state, client: props.client, size: props.size, connectLocale: props.connectLocale });
  }
  return (0, import_jsx_runtime2.jsx)(InAppWalletFormUIScreen, { select: () => {
  }, connectLocale: props.connectLocale, inAppWalletLocale: locale, done, goBack: props.goBack, wallet: props.wallet, client: props.client, meta: props.meta, size: props.size, chain: props.chain, isLinking: props.isLinking });
}
var InAppWalletConnectUI_default = InAppWalletConnectUI;
export {
  InAppWalletConnectUI_default as default
};
//# sourceMappingURL=InAppWalletConnectUI-XAASP7BU.js.map
