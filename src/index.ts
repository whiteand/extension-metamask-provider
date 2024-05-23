import { MetaMaskInpageProvider } from "@metamask/providers";
import PortStream from "extension-port-stream";
import { detect } from "detect-browser";

const browser = detect();

const EXTENSION_IDS = {
  CHROME: "nkbihfbeogaeaoehlefnkodbefgpgknn",
  FIREFOX: "webextension@metamask.io",
};

function getMetaMaskId() {
  switch (browser && browser.name) {
    case "chrome":
      return EXTENSION_IDS.CHROME;
    case "firefox":
      return EXTENSION_IDS.FIREFOX;
    default:
      return EXTENSION_IDS.CHROME;
  }
}

function getDefaultConfig(): IProviderParams {
  return {
    metamaskExtensionId: getMetaMaskId(),
  };
}

/**
 * A type of settings necessary to establish connection
 */
export interface IProviderParams {
  /**
   * An extension id of metamask
   *
   * Default for Chrome: "nkbihfbeogaeaoehlefnkodbefgpgknn"
   * Default for Firefox: "webextension@metamask.io"
   */
  metamaskExtensionId?: string;
}

function pipe<A, B, C, D, E, F>(
  a2b: (a?: A) => B,
  b2c: (b: B) => C,
  c2d: (c: C) => D,
  d2e: (d: D) => E,
  e2f: (d: E) => F
): (a?: A) => F {
  return (x) => e2f(d2e(c2d(b2c(a2b(x)))));
}

/**
 * @example
 * ```ts
 * import createMetaMaskProvider from '@whiteand/extension-metamask-provider'
 *
 * const provider = createMetaMaskProvider()
 *
 * provider.request({
 *   // ...
 * })
 * ```
 */
const createMetaMaskProvider: (
  a?: IProviderParams | undefined
) => MetaMaskInpageProvider = pipe(
  (config) => config || getDefaultConfig(),
  (config) => config.metamaskExtensionId || getMetaMaskId(),
  (currentMetaMaskId) => chrome.runtime.connect(currentMetaMaskId),
  (metamaskPort) => new PortStream(metamaskPort),
  (portStream) => new MetaMaskInpageProvider(portStream)
);

export default createMetaMaskProvider;
