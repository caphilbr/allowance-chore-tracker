
const config = {
  nodeEnv: process.env["NODE_ENV"] || "development",
  validation: {
    email: {
      regexp: {
        emailRegex: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      },
    },
    code: {
      regexp: {
        codeRegex: /^\d{4}$/,
      }
    }
  },
  homeBackgroundUrl: "https://allowance-chore-tracker.s3.amazonaws.com/landing-background",
  titleFontUrl: "https://allowance-chore-tracker.s3.amazonaws.com/chore-title",
  dashboardTitleUrl: "https://allowance-chore-tracker.s3.amazonaws.com/dashboard-title"
}

export default config;
