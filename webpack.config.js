const path = require('path')

const config = {
  context: path.resolve(__dirname, 'src'),
  entry: './index.js',
  output: {
    filename: 'vue-axios.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules)/,
      loader: 'babel-loader',
      options: {
        presets: ['env']
      }
    }]
  }
}

module.exports = config