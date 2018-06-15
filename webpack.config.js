// webpack v4
const fs = require('fs')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ResourceHintWebpackPlugin = require('./webpack/resource-hints-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const OfflinePlugin = require('offline-plugin')
// const Critters = require('critters-webpack-plugin')
const HtmlCriticalPlugin = require('html-critical-webpack-plugin')
// const WriteWebmanifest = require('./webpack/write-webmanifest')

/** Path */
const path = require('path')
const resolve = dir => path.join(__dirname, dir)
const pkg = require('./package.json')
const version = pkg.version

/** Environment */
const argv = require('yargs').argv
const PRODUCTION = argv.env === 'production'
const stage = !!argv.stage

/** Project config */
const config = {
  sourcePath: resolve('src'),
  distPath: resolve('dist'),
  assetsPath: resolve('dist/assets'),
  // Change puplic path for gh-pages stage as --stage cli arg
  publicPath: PRODUCTION ? (stage ? 'assets/' : '/assets/') : '/',
  PUBLIC: stage ? '/kotosani/' : '/', // stage public output dir
  watchContent: [
    resolve('src/images'),
    resolve('src/pages'),
    resolve('src/pages/inc'),
    resolve('static'), // Content not from webpack is served from
  ],
  banner: `@release: [name] v${version} [chunkhash]; @latest: ${new Date()}`,
}

/**
 * HTML pages multiple
 */
const pages = {
  index: 'КотоСани. Первое в Сочи антикафе с котиками',
}

function getChunks(type) {
  const chunks = {
    index: ['manifest', 'vendor', 'app'],
    default: ['manifest', 'vendor', 'app'],
  }
  return chunks[type] || chunks['default']
}

const entryHtmlPlugins = Object.keys(pages).map(page => {
  return new HtmlWebpackPlugin({
    chunks: getChunks(page),
    prefetch: false,
    preload: ['**/*.*'],
    preload: ['**/*.js'], // correct for critical css
    template: './pages/index.tmpl',
    title: pages[page],
    partial: page,
    inject: true,
    filename: `${config.distPath}/${page}.html`,
    // necessary to consistently work with multiple chunks
    chunksSortMode: 'dependency',
    banner: `<!-- @release: v${version}; @latest: ${new Date().toLocaleString()} -->`,
    // https://github.com/kangax/html-minifier#options-quick-reference
    minify: {
      removeComments: PRODUCTION,
      collapseWhitespace: PRODUCTION,
      // removeAttributeQuotes: PRODUCTION,
      removeScriptTypeAttributes: PRODUCTION,
      removeStyleLinkTypeAttributes: PRODUCTION,
      minifyCSS: PRODUCTION,
      minifyJS: PRODUCTION,
    },
  })
})

/**
 * CSS
 */
// to edit target browsers: use "browserlist" field in package.json
// https://github.com/ai/browserslist#queries
// https://github.com/postcss/postcss-loader
const postcssConfig = {
  plugins: [require('autoprefixer')].concat(
    PRODUCTION ? [require('css-mqpacker')({ sort: true })] : []
  ),
  sourceMap: true,
  extract: true,
}

const styleLoaders = [
  {
    loader: 'css-loader',
    options: {
      url: true, // false for disable inline embed images
      minimize: PRODUCTION, // CSSNano by default
      sourceMap: true,
    },
  },
  { loader: 'postcss-loader', options: postcssConfig },
  { loader: 'sass-loader', options: { sourceMap: true } },
]

/**
 * JS
 */
// https://babeljs.io/docs/plugins/preset-env/#how-it-works-support-all-plugins-in-babel-that-are-considered-latest
const babelConfig = {
  babelrc: false,
  presets: [
    [
      'env',
      {
        modules: false,
        targets: {
          browsers: pkg.browserslist,
        },
      },
    ],
  ],
  plugins: ['transform-object-rest-spread'], // , "transform-runtime"
  comments: false,

  env: {
    test: {
      presets: ['env'],
      plugins: ['istanbul'],
    },
  },
}

/**
 * Webpack config
 */

/** Stats */
const webpackStats = {
  stats: {
    assets: true,
    assetsSort: 'name',
    children: false,
    chunks: false,
    hash: false,
    modules: false,
    publicPath: false,
    timings: true,
    version: false,
    warnings: true,
  },
}

/** Config */
const webpackConfig = {
  // mode: process.env.NODE_ENV,
  mode: argv.env,
  context: config.sourcePath,
  entry: {
    app: ['styles/app.scss', 'app.js'],
  },
  output: {
    path: PRODUCTION ? config.assetsPath : config.distPath,
    filename: PRODUCTION ? 'js/[name].[hash:7].js' : '[name].js',
    publicPath: config.publicPath,
  },
  resolve: {
    modules: ['node_modules', config.sourcePath],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@': config.sourcePath,
    },
  },
  externals: {
    jquery: 'jQuery',
  },

  devServer: {
    // bonjour: true,
    // host: '0.0.0.0', // resolved as localhost:8080, 0.0.0.0:8080, [your-local-ip]:8080
    // host: 'kotosani.dev',
    // port: 8443,
    // https: {
    //   key: fs.readFileSync('./cert/ssl.key'),
    //   cert: fs.readFileSync('./cert/ssl.crt'),
    // },
    contentBase: config.watchContent,
    watchContentBase: true,
    historyApiFallback: true,
    compress: true, // Enable gzip compression
    clientLogLevel: 'none',
    headers: { 'Access-Control-Allow-Origin': '*' },
    ...webpackStats,
  },

  // cheap-module-eval-source-map is faster for development
  devtool: PRODUCTION ? '#source-map' : '#cheap-module-source-map',

  performance: PRODUCTION && {
    maxAssetSize: 800000,
    maxEntrypointSize: 400000,
    hints: 'warning',
  },

  ...webpackStats,

  /**
   * Modules
   */
  module: {
    rules: [
      /** site.manifest pwa */
      {
        test: /webmanifest$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              // outputPath: '../',
              outputPath: PRODUCTION ? '../' : './',
              publicPath: config.PUBLIC,
            },
          },
          {
            loader: resolve('webpack/manifest-loader'),
            options: { public: config.PUBLIC },
          },
        ],
      },

      /** html */
      // https://github.com/webpack-contrib/html-loader
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
          options: {
            attrs: [':src', ':data-src', ':srcset'],
            interpolate: true,
            minimize: false, // min postprocess htmlWebpackPlugin
          },
        },
      },

      /** javascript */
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: babelConfig,
        },
      },

      /** images */
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        include: /images/,

        oneOf: [
          // https://github.com/herrstucki/responsive-loader
          // @uses sharp
          // srcset by sizes
          {
            resourceQuery: /sizes/, // foo.css?sizes
            use: [
              // 'cache-loader',
              {
                // loader: 'responsive-loader',
                loader: resolve('webpack/responsive-loader'),
                options: {
                  sizes: [320, 480, 640, 800, 960],
                  name: 'images/[name]-w_[width].[hash:7].[ext]',
                  placeholder: true,
                  placeholderSize: 200,
                  placeholderQuality: 20,
                  // format: ['jpeg', 'webp'],
                  webp: true,
                  // Use sharp if you have lots of images to transform:
                  // adapter: require('responsive-loader/sharp')
                },
              },
            ],
          },

          // Works like the file loader,
          // but can return a data URL if the file is smaller than a limit
          // https://webpack.js.org/loaders/url-loader/
          {
            // inline resource as data:image
            resourceQuery: /inline/, // foo.jpg?inline
            use: [
              // 'cache-loader',
              {
                loader: 'url-loader',
                options: {
                  limit: 20480, // link or data:image
                  name: 'images/[name].[hash:7].[ext]',
                },
              },
            ],
          },

          // embed svg as <svg />
          // https://webpack.js.org/loaders/svg-inline-loader/#query-options
          {
            resourceQuery: /embed/, // foo.svg?embed
            use: [
              // 'cache-loader',
              {
                loader: 'svg-inline-loader',
                options: {
                  removeSVGTagAttrs: false,
                },
              },
            ],
          },

          {
            // without resourceQuery
            use: [
              // 'cache-loader',
              {
                loader: 'url-loader',
                options: {
                  limit: 2048, // link or data:image
                  name: 'images/[name].[hash:7].[ext]',
                },
              },
            ],
          },
        ],
      },

      /** stylesheets */
      // https://webpack.js.org/plugins/mini-css-extract-plugin/#advanced-configuration-example
      {
        test: /\.s?[ac]ss|css$/,
        use: [
          PRODUCTION ? MiniCssExtractPlugin.loader : 'style-loader',
          ...styleLoaders,
        ],
      },
    ],
  },

  /**
   * Optimization
   */
  optimization: {
    minimizer: [
      // https://github.com/mishoo/UglifyJS2/tree/harmony#output-options
      new UglifyJsPlugin({
        uglifyOptions: {
          output: {
            beautify: false,
            comments: false,
          },
          compress: {
            drop_console: true,
            warnings: false,
          },
        },
        cache: true,
        sourceMap: true,
        parallel: true,
      }),
    ],
    // https://survivejs.com/webpack/optimizing/separating-manifest/#extracting-a-manifest
    runtimeChunk: {
      name: 'manifest',
    },
    // https://webpack.js.org/plugins/split-chunks-plugin/
    splitChunks: {
      cacheGroups: {
        // Create a vendors chunk, which includes all code from node_modules in the whole application.
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
        // Create a commons chunk, which includes all code shared between entry points.
        // commons: {
        //   name: 'vendor',
        //   chunks: 'initial',
        //   minChunks: 2,
        // },
        // Extracting all CSS in a single file
        // https://webpack.js.org/plugins/mini-css-extract-plugin/#extracting-all-css-in-a-single-file
        // styles: {
        //   name: 'styles',
        //   test: /\.scss$/,
        //   chunks: 'all',
        //   enforce: true
        // }
      },
    },
  },

  /**
   * Plugins dev
   */
  plugins: [
    new webpack.DefinePlugin({
      // VERSION: JSON.stringify(`v${pkg.version}`),
      PRODUCTION: JSON.stringify(PRODUCTION),
      PUBLIC: JSON.stringify(config.PUBLIC),
    }),

    // HMR shows correct file names in console on update
    new webpack.NamedModulesPlugin(),

    // HtmlWebpackPlugin pages
    ...entryHtmlPlugins,
    new ResourceHintWebpackPlugin(),

    /** Critical css */
    // new Critters({
    //   // Outputs: <link rel="preload" onload="this.rel='stylesheet'">
    //   preload: 'swap',
    //   // Don't inline critical font-face rules, but preload the font URLs:
    //   preloadFonts: true,
    // }),

    /**
     * PWA Offline plugin (ServiceWorker, AppCache) for webpack
     * https://github.com/NekR/offline-plugin/blob/master/docs/options.md
     */
    new OfflinePlugin({
      // No need to cache .htaccess. See http://mxs.is/googmp,
      // this is applied before any match in `caches` section
      // excludes: ['.htaccess', 'docs*.js', '**/*.map'],
      ServiceWorker: {
        output: PRODUCTION ? '../service-worker.js' : 'service-worker.js',
        // output: 'service-worker.js',
        cacheName: pkg.name,
      },
      AppCache: false,
      // AppCache: {
      //   events: true,
      // },
      minify: true,
    }),
  ],
}

/**
 * Pluging prod
 */
if (PRODUCTION) {
  webpackConfig.plugins.push(
    new CopyWebpackPlugin([{ from: resolve('static'), to: config.distPath }], {
      ignore: ['.DS_Store'], // '.htaccess',
    }),

    new MiniCssExtractPlugin({
      // [contenthash:7]
      filename: PRODUCTION ? 'css/[name].[hash:7].css' : '[name].css',
      allChunks: true,
    }),

    /** HTML Critical Webpack Plugin */
    new HtmlCriticalPlugin({
      base: config.distPath,
      src: 'index.html',
      dest: 'index.html',
      inline: true,
      // dest: 'assets/css/critical.css',
      // minify: true,
      // extract: true,
      width: 1200,
      height: 800,
      penthouse: {
        blockJSRequests: false,
      },
    }),

    // keep module.id stable when vendor modules does not change
    new webpack.HashedModuleIdsPlugin(),

    new webpack.BannerPlugin(config.banner)

    // new ManifestPlugin({
    //   fileName: 'assets.json',
    //   writeToFileEmit: false,
    // })
  )
}

// module.exports = webpackConfig
module.exports = env => webpackConfig