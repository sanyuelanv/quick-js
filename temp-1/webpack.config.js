var path = require( 'path' )
var webpack = require( 'webpack' )
var node_module_dir = path.resolve( __dirname, 'node_module' )

module.exports = {
  entry: path.resolve( __dirname, 'src/index.js' ),
  output: {
    path: path.resolve( __dirname, '' ),
    chunkFilename: '[name].[chunkhash:5].chunk.js',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.join( __dirname, "build" ),
    compress: true,
    port: 8080,
    host: "localhost",
  },
  plugins: [
    new webpack.DefinePlugin( {
      __DEV__: JSON.stringify( JSON.parse( process.env.NODE_ENV || 'true' ) )
    } ),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
  module: {
    rules: [ {
        test: /\.(js)$/,
        use: [ "babel-loader" ],
        include: [ path.resolve( __dirname, 'src' ) ],
        exclude: [ node_module_dir ],
      },
      {
        test: /\.css$/,
        use: [ "style-loader", 'css-loader',"postcss-loader"],
        include: [ path.resolve( __dirname, 'src' ) ],
        exclude: [ node_module_dir ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader'],
        include: [ path.resolve( __dirname, 'src' ) ],
        exclude: [ node_module_dir ],
      }
    ]
  },
}
