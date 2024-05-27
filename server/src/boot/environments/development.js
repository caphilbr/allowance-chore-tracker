import getNodeEnv from "../../config/getNodeEnv.js"

if (getNodeEnv() === "development") {
  const { default: dotenv } = await import("dotenv")
  await dotenv.config()
}
