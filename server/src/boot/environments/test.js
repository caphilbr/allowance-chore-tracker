import getNodeEnv from "../../config/getNodeEnv.js"

if (getNodeEnv() === "test") {
  const { default: dotenv } = await import("dotenv")
  await dotenv.config()
}
