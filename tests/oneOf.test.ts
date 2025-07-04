import { describe, expect, it, vi } from "vitest";

import { OneOf } from "../src/data_structures/oneOf";

// Test the OneOf implementation
describe("oneOf", () => {
  type TestType = {
      success: { message: string };
      error: { code: number; message: string };
  };

  it("should create a new instance with initial value", () => {
      const instance = new OneOf.Instance<TestType>({
          success: { message: "Hello" },
      });
      expect(instance.value).toEqual({ type: "success", d: { message: "Hello" } });
  });

  it("should run the correct handler", async () => {
      const instance = new OneOf.Instance<TestType>({
          type: "error",
          d: { code: 404, message: "Not found" },
      });

      const errorHandler = vi.fn();

      instance.if({
          v: "error",
          handler: async (v: OneOf.One<"error", TestType>) => {
              errorHandler(v.d.message);
          },
      });

      await instance.run();
      expect(errorHandler).toHaveBeenCalledWith("Not found");
  });

  it("should prevent duplicate handlers", () => {
      const instance = new OneOf.Instance<TestType, "success">({
          type: "success",
          d: { message: "Hello" },
      });
      instance.if({
          v: "success",
          handler: async (v: OneOf.One<"success", TestType>) => {
              // Do something
          },
      });

      expect(() => {
          instance.if({
              v: "success",
              handler: async (v: OneOf.One<"success", TestType>) => {
                  // Do something
              },
          });
      }).toThrow("Handler for success is already defined");
  });

  it("should define multiple handlers", async () => {
      const instance = new OneOf.Instance<TestType, "success">({
          type: "success",
          d: { message: "Hello" },
      });
      const successHandler = vi.fn();
      const errorHandler = vi.fn();

      const handlers = {
          success: async (v: OneOf.One<"success", TestType>) => {
              successHandler(v.d.message);
          },
          error: async (v: OneOf.One<"error", TestType>) => {
              errorHandler(v.d.message);
          },
      };

      const newInstance = await instance.def(handlers);
      await newInstance.run();
      expect(successHandler).toHaveBeenCalledWith("Hello");
      expect(errorHandler).not.toHaveBeenCalled();
  });
});
