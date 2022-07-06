#!/usr/bin/env node
import {
  redact,
  readEnvBuffer,
  writeEnvFile,
  shasum,
  readHash,
} from "../index.js";

(function () {
  const envBuffer = readEnvBuffer();
  const hash = shasum(envBuffer);
  const currentHash = readHash();
  if (currentHash) {
    if (hash === currentHash) {
      return;
    }
  }
  const env = envBuffer.toString();
  if (env == null) return;
  writeEnvFile(redact(env), hash);
})();
