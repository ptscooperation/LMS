const path = require('path')
const HTMLwebplugin = require('html-webpack-plugin')

const rules = [
  {
    test: /\.js$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
    },
  },
  {
    test: /\.css$/,
    exclude: /node_modules/,
    use: ['style-loader', 'css-loader'],
  },
  {
    test: /\.html$/,
    loader: 'html-loader',
  },
  {
    test: /\.(jpe?g|png|gif|svg)$/i,
    use: [
      {
        loader: 'file-loader',
        options: {
          query: {
            name: 'assets/img/[name].[ext]',
          },
        },
      },
      {
        loader: 'image-webpack-loader',
        options: {
          query: {
            mozjpeg: {
              quality: 65,
              progressive: true,
            },
            gifsicle: {
              optimizationLevel: 7,
              interlaced: true,
            },
            optipng: {
              optimizationLevel: 7,
              interlaced: false,
            },
          },
        },
      },
    ],
  },
]
module.exports = {
  entry: path.join(__dirname, 'src', 'index.js'),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js',
    publicPath: '/',
  },
  module: { rules },
  plugins: [
    new HTMLwebplugin({
      template: path.join(__dirname, 'public', 'index.html'),
      filename: 'index.html',
      hash: true,
      inject: true,
    }),
  ],
  stats: {
    children: false,
  },
}
