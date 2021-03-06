const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const IS_PROD = process.env.NODE_ENV === 'production';
const BUILD_DIR = path.resolve(__dirname, 'dist');
const APP_DIR = path.resolve(__dirname, 'src/client/app');
const HASH_LENGTH = 8;

let postcssLoader = {
	loader: 'postcss-loader',
	options: {
		plugins: () => [autoprefixer]
	}
};

let lessLoader = {
	loader: 'less-loader',
	options: {
		paths: [
			path.resolve(__dirname, 'node_modules'),
			path.resolve(APP_DIR, 'less')
		]
	}
};

let config = {
	entry: {
		app: path.resolve(APP_DIR, 'index.jsx')
	},
	output: {
		path: BUILD_DIR,
		publicPath: '/',
		filename: !IS_PROD ? 'js/[name].js' : `js/[name].[chunkhash:${HASH_LENGTH}].js`
	},
	module: {
		rules: [{
			test: /\.jsx?$/,
			exclude: /(node_modules|app\/less)/,
			loader: 'babel-loader',
			options: {
				presets: ['react', 'es2015'],
				plugins: ['transform-runtime'],
				cacheDirectory: true
			}
		}, {
			test: /\.(eot|woff|woff2|ttf|svg|png|jpg).*?$/,
			exclude: /app\/less/,
			loader: 'file-loader',
			options: {
				name: !IS_PROD ? 'assets/[name].[ext]' : `assets/[name].[hash:${HASH_LENGTH}].[ext]`
			}
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
		}]

		// Avoid parsing pre-build scripts
		// noParse: []
	},
	devtool: IS_PROD ? false : 'source-map',
	plugins: [
		new HtmlWebpackPlugin({
			template: 'src/client/index.html',
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

		// Using pre-build libs to make build process faster
		alias: {
			'react': IS_PROD ? 'react/umd/react.production.min.js' : 'react/umd/react.development.js',
			'prop-types': 'prop-types/prop-types.min.js',
			'react-dom': 'react-dom/umd/react-dom.production.min.js',
			'react-router-dom': 'react-router-dom/umd/react-router-dom.min.js',
			'socket.io-client': 'socket.io-client/dist/socket.io.js'
		}
	}
};

if (IS_PROD) {
	config.plugins.push(new webpack.optimize.UglifyJsPlugin({
		compress: {
			warnings: false
		},
		output: {
			comments: false
		}
	}));
} else {
	config.module.rules.push({
		enforce: 'pre',
		test: /\.js.?$/,
		exclude: /node_modules/,
		loader: 'eslint-loader'
	});
}

module.exports = config;
