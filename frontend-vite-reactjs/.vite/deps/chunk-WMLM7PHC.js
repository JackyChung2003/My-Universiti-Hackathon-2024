import {
  encodeEventTopics,
  parseEventLogs
} from "./chunk-5WKP5JEZ.js";
import {
  parseAbiItem,
  toSignatureHash
} from "./chunk-Q34TOGFK.js";

// node_modules/thirdweb/dist/esm/event/actions/parse-logs.js
function parseEventLogs2(options) {
  const { logs, events, strict } = options;
  return parseEventLogs({
    logs,
    abi: events.map((e) => e.abiEvent),
    strict
  });
}

// node_modules/thirdweb/dist/esm/event/utils.js
function isAbiEvent(item) {
  return !!(item && typeof item === "object" && "type" in item && item.type === "event");
}

// node_modules/thirdweb/dist/esm/event/prepare-event.js
function prepareEvent(options) {
  const { signature } = options;
  let resolvedSignature;
  if (isAbiEvent(signature)) {
    resolvedSignature = signature;
  } else {
    resolvedSignature = parseAbiItem(signature);
  }
  return {
    abiEvent: resolvedSignature,
    hash: toSignatureHash(resolvedSignature),
    // @ts-expect-error - TODO: investiagte why this complains, it works fine however
    topics: encodeEventTopics({
      abi: [resolvedSignature],
      args: options.filters
    })
  };
}

export {
  parseEventLogs2 as parseEventLogs,
  isAbiEvent,
  prepareEvent
};
//# sourceMappingURL=chunk-WMLM7PHC.js.map
