const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const html_title = process.env.HTML_TITLE;
const isProd = process.env.NODE_ENV.indexOf('local') === -1;
const cdn = process.env.CDN || '';

function resolve(dir) {
  return path.join(__dirname, dir);
}

let config = {
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: cdn || process.env.ASSET_PATH || '',
  },
  module: {
    rules: [
      {
        test: /\.(scss)$/,
        include: [
          path.resolve(__dirname, './src/styles/')
        ],
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
      },
      {
        test: /\.(css|scss)$/,
        exclude: [
          path.resolve(__dirname, './src/styles/')

        ],
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      // {
      //   test: /\.less$/,
      //   exclude: [
      //     path.resolve(__dirname, './src/styles/')
      //   ],
      //   use: ['style-loader', 'css-loader', 'postcss-loader', {
      //     loader: 'less-loader',
      //     options: {
      //       lessOptions: {
      //         javascriptEnabled: true
      //       }
      //     }
      //   }],
      // },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
      {
        test: /\.js$/,
        include: [/(src|demo)/],
        use: ['babel-loader'],
      },
      {
        test: /\.tsx?$/,
        include: [/(src|demo)/],
        use: [{ loader: 'babel-loader' }, { loader: 'ts-loader' }]
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      ASSET_PATH: JSON.stringify(process.env.ASSET_PATH),
    }),

    new AntdDayjsWebpackPlugin(),
    // new BundleAnalyzerPlugin()
    new MiniCssExtractPlugin({
      filename: '[name].css'
    })
  ],
  resolve: {
    modules: ['node_modules', path.join(__dirname, './node_modules')],
    extensions: ['.js', '.tsx', '.ts'],
    // alias: {
    //   '@': resolve('src'),
    // },
  },
};

if (isProd) {
  config = {
    ...config,
    mode: 'production',
    entry: {
      index: path.resolve(__dirname, './src/index.ts'),
      utils: path.resolve(__dirname, './src/utils/index.ts'),
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: '[name].js',
      publicPath: cdn || process.env.ASSET_PATH || '',
    },
    externals: {
      react: {
        commonjs: 'react',
        commonjs2: 'react',
        amd: 'react',
      },
      'react-dom': {
        commonjs: 'react-dom',
        commonjs2: 'react-dom',
        amd: 'react-dom',
      },
      antd: {
        commonjs: 'antd',
        commonjs2: 'antd',
        amd: 'antd',
      }
    }
  };
} else {
  // config.target = web 可以解决web里面HMR不工作的情况
  // config.target = 'web';

  config = {
    ...config,
    entry: {
      index: path.resolve(__dirname, './demo/demoEntry.tsx')
    },
    mode: 'development',
    devtool: 'inline-source-map',
    plugins: [
      ...config.plugins,
      new HtmlWebpackPlugin({
        // favicon: './src/assets/' + assets_dir + '/favicon.ico',
        template: './index.html',
        hash: true,
        inject: true,
        title: `${html_title}`
      }),
      new webpack.HotModuleReplacementPlugin()
    ],
    target: 'web',
    devServer: {
      historyApiFallback: true,
      // contentBase: path.resolve(__dirname, './dist'),
      open: true,
      compress: true,
      port: 8102,
      host: '0.0.0.0',
    }
  };
}

module.exports = config;
