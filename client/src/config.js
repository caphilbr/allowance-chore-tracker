const config = {
  nodeEnv: process.env["NODE_ENV"] || "development",
  validation: {
    email: {
      regexp: {
        emailRegex: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      },
    },
  },
  homeBackgroundUrl: "https://www.theagencyre.com/blog/wp-content/uploads/2017/07/Cleaning-Chores-scaled.jpg",
  titleFontUrl: "https://fontmeme.com/permalink/240513/2514a3a1bcc14351de0bf4e2b78fc7cb.png"
};

export default config;
