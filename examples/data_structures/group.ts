
import { GroupBuilder, GroupBuilderZodlessAccumelating } from "../../../src/data_structures/group";
import z from "zod";

// Example for GroupBuilder with Zod validation
console.log("--- GroupBuilder with Zod validation ---");

const stateSchema = z.object({
  dockerImage: z.string(),
  port: z.number(),
  containerName: z.string().optional(),
});

const dockerGroup = new GroupBuilder([], stateSchema)
  .addFunc((state) => {
    console.log("Setting docker image to 'my-image:latest'");
    state.dockerImage = "my-image:latest";
  })
  .addFunc((state) => {
    console.log("Setting port to 8080");
    state.port = 8080;
  })
  .addFunc((state) => {
    if (!state.containerName) {
      console.log("Setting container name to a default value 'my-container'");
      state.containerName = "my-container";
    }
  })
  .build();

const initialState = {
  dockerImage: "",
  port: 0,
};

console.log("Initial state:", initialState);
dockerGroup(initialState);
console.log("Final state:", initialState);

const initialStateWithContainer = {
    dockerImage: "",
    port: 0,
    containerName: "my-predefined-container"
};

console.log("\nInitial state with container name:", initialStateWithContainer);
dockerGroup(initialStateWithContainer);
console.log("Final state with container name:", initialStateWithContainer);


// Example for GroupBuilderZodlessAccumelating
console.log("\n--- GroupBuilderZodlessAccumelating ---");

const zodlessGroup = new GroupBuilderZodlessAccumelating([], {
  serviceName: 'default-service',
  version: '1.0.0',
})
  .addFunc((state) => {
    console.log(`Original service name: ${state.serviceName}`);
    state.serviceName = 'payment-service';
    console.log(`Updated service name: ${state.serviceName}`);
    return { lastUpdatedBy: 'developer1' };
  })
  .addFunc((state) => {
    console.log(`Current version: ${state.version}`);
    state.version = '1.0.1';
    console.log(`Updated version: ${state.version}`);
    console.log(`State in this function: ${JSON.stringify(state)}`);
    // Note: The return value of the previous function is not directly accessible here, 
    // the state is accumulated across the functions.
  })
  .build();

const initialZodlessState = {
    serviceName: 'initial-service',
    version: '0.9.0',
};

console.log("Initial zodless state:", initialZodlessState);
zodlessGroup(initialZodlessState);
console.log("Final zodless state:", initialZodlessState);
