const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
	mode: 'development',
	entry: [
		'./resources/assets/scripts/app.js'
	],
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname,'public','dist')
	},
	devtool: 'inline-source-map',
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				options: { presets: ['env'] }
			}
		]
	},
	plugins: [
		new VueLoaderPlugin()
	],
	resolve: {
		alias: {
			'@': path.resolve(__dirname,'resources/assets/scripts'),
			// vue: path.resolve(__dirname,'resources/assets/scripts')
		}
	}
}