import {
  ne,
  p,
  se,
  y
} from "./chunk-Z5J6IGHP.js";
import "./chunk-SEVZ5PBP.js";

// node_modules/@walletconnect/modal/dist/index.js
var d = class {
  constructor(e) {
    this.openModal = se.open, this.closeModal = se.close, this.subscribeModal = se.subscribe, this.setTheme = ne.setThemeConfig, ne.setThemeConfig(e), y.setConfig(e), this.initUi();
  }
  async initUi() {
    if (typeof window < "u") {
      await import("./dist-AVYE7QRV.js");
      const e = document.createElement("wcm-modal");
      document.body.insertAdjacentElement("beforeend", e), p.setIsUiLoaded(true);
    }
  }
};
export {
  d as WalletConnectModal
};
//# sourceMappingURL=dist-U2NMX6BN.js.map
