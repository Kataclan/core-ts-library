import merge from 'webpack-merge';

import basic from './webpack.config.babel';

module.exports = merge(basic, {
  mode: 'development',
});
