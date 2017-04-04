var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

var NODE_ENV = process.env.NODE_ENV || 'development';
var BUILD_DIR = path.resolve(__dirname, 'src/client/public');
var APP_DIR = path.resolve(__dirname, 'src/client/app');

var postcssLoader = {
	loader: 'postcss-loader',
	options: {
		plugins: () => [require('autoprefixer')]
	}
};

var lessLoader = {
	loader: 'less-loader',
	options: {
		paths: [
			path.resolve(__dirname, 'node_modules'),
			path.resolve(APP_DIR, 'less')
		]
	}
};

var babelLoader = {
	loader: 'babel-loader',
	options: {
		presets: ['react', 'es2015'],
		plugins: ['transform-runtime'],
		cacheDirectory: true
	}
};

var fileLoader = {
	loader: 'file-loader',
	options: {
		name: 'assets/[name].[hash:8].[ext]',
	}
};

var config = {
	entry: APP_DIR + '/index.jsx',
	output: {
		path: BUILD_DIR,
		publicPath: '/',
		filename: 'js/main.[hash:8].js'
	},
	module: {
		rules: [{
			test: /\.jsx?$/,
			exclude: /(node_modules|app\/less)/,
			use: [
				babelLoader
			]
		}, {
			test: /\.(eot|woff|woff2|ttf|svg|png|jpg).*?$/,
			exclude: /app\/less/,
			use: [
				fileLoader
			]
		}, {
			test: /\.css$/,
			use: [
				'style-loader',
				'css-loader',
				postcssLoader
			]
		}, {
			test: /\.less$/,
			use: [
				'style-loader',
				'css-loader',
				postcssLoader,
				lessLoader
			]
		}],

		//Avoid parsing pre-build scripts
		noParse: [/react-with-addons/, /socket.io/, /marked/]
	},
	devtool: 'source-map',
	plugins: [
		new HtmlWebpackPlugin({
			template: 'src/client/index.tpl',
			filename: 'index.html'
		})
	],
	resolve: {
		modules: [
			'node_modules',
			path.resolve(APP_DIR, 'components'),
			path.resolve(APP_DIR, 'utils')
		],
		extensions: ['.js', '.jsx'],

		//Using pre-build libs to make build process faster
		alias: {
			'react': 'react/dist/react-with-addons.min.js',
			'react-dom': 'react-dom/dist/react-dom.min.js',
			'react-router-dom': 'react-router-dom/umd/react-router-dom.min.js',
			'socket.io-client': 'socket.io-client/dist/socket.io.min.js',
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
