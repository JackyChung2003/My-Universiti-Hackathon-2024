import {
  getThirdwebBaseUrl
} from "./chunk-CJ7GOBZO.js";
import {
  getClientFetch
} from "./chunk-XN7MCJ4Y.js";

// node_modules/thirdweb/dist/esm/social/profiles.js
async function getSocialProfiles(args) {
  const { address, client } = args;
  const clientFetch = getClientFetch(client);
  const response = await clientFetch(`${getThirdwebBaseUrl("social")}/v1/profiles/${address}`);
  if (response.status !== 200) {
    try {
      const errorBody = await response.json();
      throw new Error(`Failed to fetch profile: ${errorBody.message}`);
    } catch {
      throw new Error(`Failed to fetch profile: ${response.status}
${await response.text()}`);
    }
  }
  return (await response.json()).data;
}

export {
  getSocialProfiles
};
//# sourceMappingURL=chunk-H4ERSLF5.js.map
