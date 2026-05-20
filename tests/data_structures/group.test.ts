
import { GroupBuilder, GroupBuilderZodlessAccumelating } from "../../src/data_structures/group";
import z from "zod";
import { expect, test } from "vitest";

test("GroupBuilder with Zod validation should correctly modify the state", () => {
  const stateSchema = z.object({
    dockerImage: z.string(),
    port: z.number(),
    containerName: z.string().optional(),
  });

  const dockerGroup = new GroupBuilder([], stateSchema)
    .addFunc((state) => {
      state.dockerImage = "my-image:latest";
    })
    .addFunc((state) => {
      state.port = 8080;
    })
    .addFunc((state) => {
      if (!state.containerName) {
        state.containerName = "my-container";
      }
    })
    .build();

  const initialState = {
    dockerImage: "",
    port: 0,
  };

  dockerGroup(initialState);

  expect(initialState).toEqual({
    dockerImage: "my-image:latest",
    port: 8080,
    containerName: "my-container",
  });

  const initialStateWithContainer = {
    dockerImage: "",
    port: 0,
    containerName: "my-predefined-container"
  };

  dockerGroup(initialStateWithContainer);

  expect(initialStateWithContainer).toEqual({
    dockerImage: "my-image:latest",
    port: 8080,
    containerName: "my-predefined-container",
  });
});

test("GroupBuilderZodlessAccumelating should correctly modify the state", () => {
    const zodlessGroup = new GroupBuilderZodlessAccumelating([], {
        serviceName: 'default-service',
        version: '1.0.0',
    })
    .addFunc((state) => {
        state.serviceName = 'payment-service';
        return { lastUpdatedBy: 'developer1' };
    })
    .addFunc((state) => {
        state.version = '1.0.1';
    })
    .build();

    const initialZodlessState = {
        serviceName: 'initial-service',
        version: '0.9.0',
    };

    zodlessGroup(initialZodlessState);

    expect(initialZodlessState).toEqual({
        serviceName: 'payment-service',
        version: '1.0.1',
    });
});
