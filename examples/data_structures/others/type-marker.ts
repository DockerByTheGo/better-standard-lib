import { TypeMarker, createTypeMarked } from "../../../index";

console.log("--- TypeMarker ---");

const marker = new TypeMarker("service");
console.log("Marker type:", marker.getType());

const { task } = createTypeMarked("task");
const taskMarker = new task();
console.log("Generated marker type:", taskMarker.getType());
