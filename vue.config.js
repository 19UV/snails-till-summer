const { defineConfig } = require("@vue/cli-service");

const in_production = process.env.NODE_ENV === "production";

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: in_production ? "/snails-till-summer/" : "/",
  productionSourceMap: false,
});
