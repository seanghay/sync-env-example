#!/usr/bin/env node
import {
  redact,
  readEnvBuffer,
  writeEnvFile,
  shasum,
  readHash,
} from "../index.js";

import path from "node:path";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

(function () {
  const { input, output } = yargs(hideBin(process.argv))
    .scriptName("sync-env-example")
    .usage("$0 --input .env --output .env.example")
    .help().argv;

  const inputPath = path.join(process.cwd(), input || ".env");
  const outputPath = path.join(process.cwd(), output || ".env.example");

  const envBuffer = readEnvBuffer(inputPath);
  if (!envBuffer) {
    return;
  }
  const hash = shasum(envBuffer);
  const currentHash = readHash(outputPath);
  if (currentHash) {
    if (hash === currentHash) {
      return;
    }
  }
  const env = envBuffer.toString();
  if (env == null) return;
  writeEnvFile(redact(env), hash, outputPath);
})();
