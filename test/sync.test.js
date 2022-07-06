import { describe, it, expect } from "vitest";
import { redact } from "../";

describe("env sync", () => {
  it("should redact env values", () => {
    expect(redact("KEY=VALUE\nKEY1=VALUE")).toEqual("KEY=\nKEY1=");
    expect(redact("#comment\nKEY=VALUE\n#Comment")).toEqual(
      "#comment\nKEY=\n#Comment"
    );
  });

  it("should replace value with a replacer", () => {
    expect(redact("KEY=VALUE", () => "empty")).toEqual("KEY=empty");
    expect(redact("KEY=VALUE", (v) => `<${v}>`)).toEqual("KEY=<VALUE>");
  });

  it('should not process anything if no key-value found', () => {
    expect(redact("# Just comment")).toEqual("# Just comment");
    expect(redact("Random value")).toEqual("Random value");
    expect(redact("# KEY=VALUE")).toEqual("# KEY=VALUE");
  })
});
