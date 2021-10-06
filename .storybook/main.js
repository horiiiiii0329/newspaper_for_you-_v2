module.exports = {
  stories: [
    "../components/**/*.stories.mdx",
    "../**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials"],

  webpackFinal: async (baseConfig) => {
    baseConfig.module.rules.push({
      test: /\.scss$/,
      use: [
        "style-loader",
        {
          loader: "css-loader",
          options: {
            importLoaders: 1,
            modules: {
              localIdentName: "[local]___[hash:base64:2]",
            },
          },
        },
        "sass-loader",
      ],
    });
    return { ...baseConfig };
  },
};
