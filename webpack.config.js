const path = require('path')

const config = {
  context: path.resolve(__dirname, 'src'),
  entry: './index.js',
  output: {
    filename: 'vue-axios.min.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules)/,
      loader: 'babel-loader',
      options: {
        presets: ['env', 'stage-2']
      }
    }]
  }
}

module.exports = config