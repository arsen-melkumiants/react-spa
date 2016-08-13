var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

var NODE_ENV = process.env.NODE_ENV || 'development';
var BUILD_DIR = path.resolve(__dirname, 'src/client/public');
var APP_DIR = path.resolve(__dirname, 'src/client/app');

var config = {
	entry: APP_DIR + '/index.jsx',
	output: {
		path: BUILD_DIR,
		publicPath: '/',
		filename: 'js/main.[hash:8].js'
	},
	module: {
		loaders: [{
			test: /\.jsx?$/,
			loader: 'babel',
			exclude: [/\/node_modules\//, /\\app\/less\\/],
			query: {
				presets: ['react', 'es2015'],
				plugins: ['transform-runtime'],
				cacheDirectory: true
			}
		}, {
			test: /\.(eot|woff|woff2|ttf|svg|png|jpg).*?$/,
			loader: 'file?name=fonts/[name].[hash:8].[ext]',
			exclude: /\\app\/less\\/
		}, {
			test: /\.css$/,
			loader: 'style!css?minimize!postcss'
		}, {
			test: /\.less$/,
			loader: 'style!css?minimize!postcss!less'
		}],

		//Avoid parsing pre-build scripts
		noParse: [/react-with-addons/, /socket.io/, /marked/]
	},
	postcss: [ autoprefixer({ browsers: ['> 5%', 'ie >= 10'] }) ],
	devtool: 'source-map',
	plugins: [new HtmlWebpackPlugin({
		template: 'src/client/index.tpl',
		filename: 'index.html'
	})],
	resolve: {
		modulesDirectories: ['node_modules', 'app/components', 'app/less', 'app/utils'],
		extensions: ['', '.js', '.jsx'],

		//Using pre-build libs to make build process faster
		alias: {
			'react': 'react/dist/react-with-addons.min.js',
			'react-dom': 'react-dom/dist/react-dom.min.js',
			'react-router': 'react-router/umd/ReactRouter.min.js',
			'socket.io-client': 'socket.io-client/socket.io.js',
			'marked': 'marked/marked.min.js'
		}
	},
};

if (NODE_ENV === 'production') {
	config.plugins.push(new webpack.optimize.UglifyJsPlugin({
		compress: {
			warnings: false
		},
		output: {
			comments: false
		}
	}));
	config.devtool = false;
}

module.exports = config;