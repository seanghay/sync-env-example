import fse from "fs-extra";
import path from "node:path";
import MagicString from "magic-string";
import process from "node:process";
import { createHash } from "node:crypto";

export function readHash(filePath = path.join(process.cwd(), ".env.example")) {
  if (!fse.pathExistsSync(filePath)) {
    return null;
  }
  const content = fse.readFileSync(filePath, "utf8");
  const result = /# sync-env-example:(.+)/.exec(content);
  const hash = result[1];
  if (typeof hash === "string") return hash.trim();
  return null;
}

export function shasum(buffer) {
  return createHash("md5").update(buffer).digest("hex");
}

export function readEnvBuffer(envPath = path.join(process.cwd(), ".env")) {
  if (!fse.pathExistsSync(envPath)) return null;
  return fse.readFileSync(envPath);
}

export function writeEnvFile(
  content,
  hash,
  envPath = path.join(process.cwd(), ".env.example")
) {
  if (content == null) return;
  content = `# sync-env-example:${hash}\n` + content;
  fse.writeFileSync(envPath, content);
}

/**
 * Parse and remove value from keys. It preserves everything.
 *
 * @param {string} input
 * @param {(value: string) => string} replacer
 */
export function redact(input, replacer = () => "") {
  if (!input) return input;
  const str = new MagicString(input);
  const regex = /^(\w+\=)(.+)/gm;
  let result = null;
  while ((result = regex.exec(input))) {
    const key = result[1];
    const valueString = result[2];
    const index = result.index;
    const valueIndexStart = index + key.length;
    const valueIndexEnd = valueIndexStart + valueString.length;
    str.overwrite(valueIndexStart, valueIndexEnd, replacer(valueString));
  }
  return str.toString();
}
