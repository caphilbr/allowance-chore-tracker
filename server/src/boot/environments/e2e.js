import getNodeEnv from "../../config/getNodeEnv.js";

if (getNodeEnv() === "e2e") {
  const { default: dotenv } = await import("dotenv");
  await dotenv.config();
}
