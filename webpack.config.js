module.exports = {
  context: __dirname + '/src',
  entry: './index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: 'src'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'jsx-loader',
      exclude: /node_modules/
    }, {
      test: /\.html$/,
      loader: 'raw',
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      loader: 'style!css',
      exclude: /node_modules/
    }, {
      test: /\.styl$/,
      loader: 'style!css!stylus',
      exclude: /node_modules/
    }]
  }
}
