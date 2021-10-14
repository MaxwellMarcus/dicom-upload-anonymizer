/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
module.exports = function override(config, env) {
  config.module.rules.push({
    test: /\.worker\.js$/,
    use: { loader: 'worker-loader' },
  })
  return config
}
