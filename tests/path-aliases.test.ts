import { describe, expect, it } from "vitest";
import { map } from "@src/functions/map";
import { aliasFixture } from "@test/helpers/aliasFixture";

describe("path aliases", () => {
  it("resolves @src and @test in better-standard-lib", () => {
    expect(map(2, v => v * 3)).toBe(6);
    expect(aliasFixture).toBe("better-standard-lib-alias-ok");
  });
});
