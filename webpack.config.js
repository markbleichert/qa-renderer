/* eslint-disable */

const path = require('path');
const glob = require('glob');
const exec = require('child_process').exec;

function parsePath(sourcePath) {
  return [...[__dirname], ...sourcePath.split('/')];
}

let {
  NODE_ENV = 'development',
  OUTPUT_LIB = 'qa',
  ENTRY_KEY = 'qa-renderer.min',
  ENTRY_PATH = 'src/index.js',
  OUTPUT_PATH = '.tmp/dist',
  SERVER_PATH = 'demo-app',
  SERVER_PORT = 8082,
  MODE
} = process.env;

const plugins = [];

if (ENTRY_PATH.indexOf('*.') > -1) {
  ENTRY_PATH = glob.sync(ENTRY_PATH, {
    cwd: __dirname,
    root: __dirname,
    absolute: true
  });
} else {
  ENTRY_PATH = path.resolve(...parsePath(ENTRY_PATH))
}

const entry = {
  [ENTRY_KEY]: ENTRY_PATH
};

module.exports = {
  entry,
  mode: NODE_ENV,
  output: {
    path: path.resolve(__dirname, OUTPUT_PATH),
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[id].js',
    library: OUTPUT_LIB,
    libraryTarget: 'window'
  },
  plugins,
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, SERVER_PATH),
    port: SERVER_PORT,
    publicPath: '/',
    watchContentBase: true,
    watchOptions: {
      poll: 1000
    },
    hot: true,
    open: true
  }
};
