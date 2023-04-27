import merge from 'webpack-merge';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

import basic from './webpack.config.babel';

module.exports = merge(basic, {
  mode: 'production',
  plugins: [new CleanWebpackPlugin()],
});
