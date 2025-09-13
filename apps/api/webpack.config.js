const { composePlugins, withNx } = require('@nx/webpack');

// Nx plugins for webpack.
module.exports = composePlugins(withNx(), (config) => {
  // Update the webpack config as needed here.
  // e.g. `config.plugins.push(new MyPlugin())`

  // Handle ES modules by treating them as externals
  config.externals = config.externals || [];
  if (Array.isArray(config.externals)) {
    config.externals.push('cmu-pronouncing-dictionary');
  } else {
    config.externals = [config.externals, 'cmu-pronouncing-dictionary'];
  }

  return config;
});
