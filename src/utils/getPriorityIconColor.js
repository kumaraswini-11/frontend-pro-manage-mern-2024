export default function getPriorityIconColor(priorityName) {
  return priorityName.toLowerCase() === "high"
    ? "#ff2473"
    : priorityName.toLowerCase() === "moderate"
    ? "#18b0ff"
    : "#63c05b";
}
