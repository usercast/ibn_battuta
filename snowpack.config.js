const path = require("path");

module.exports = {
  plugins: [["@snowpack/plugin-webpack"]],
  alias: {
    request: path.resolve(__dirname, "./src/http/request")
  }
};
