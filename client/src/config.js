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
  titleFontUrl: "https://fontmeme.com/permalink/240513/74a5a9893db5669681de078dc67f3215.png", //CALL ME MAYBE
  dashboardTitleUrl: "https://fontmeme.com/permalink/240513/30ae31db8534d183f2f7896145bd0775.png"
};

export default config;
