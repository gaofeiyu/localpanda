// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
	build: {
		env: require('./test.env'),
		index: path.resolve(__dirname, '../dist/index.html'),
		assetsRoot: path.resolve(__dirname, '../dist'),
		assetsSubDirectory: 'static',
		assetsPublicPath: 'https://www.localpanda.com/',
		assetsPublicPath: 'https://d2q486kjf9cwwu.cloudfront.net/',
		//  assetsPublicPath: '../',
		//productionSourceMap: false, //压缩zip
		// Gzip off by default as many popular static hosts such as
		// Surge or Netlify already gzip all static assets for you.
		// Before setting to `true`, make sure to:
		// npm install --save-dev compression-webpack-plugin
		productionGzip: false,
		productionGzipExtensions: ['js', 'css']
	},
	pre: {
		env: require('./prod.env'),
		index: path.resolve(__dirname, '../dist/index.html'),
		assetsRoot: path.resolve(__dirname, '../dist'),
		assetsSubDirectory: 'static',
		assetsPublicPath: '',
		//  assetsPublicPath: '../',
		productionSourceMap: true, //压缩zip
		productionGzip: true,
		productionGzipExtensions: ['js', 'css']
	},
	prd: {
		env: require('./prod.env'),
		index: path.resolve(__dirname, '../dist/index.html'),
		assetsRoot: path.resolve(__dirname, '../dist'),
		assetsSubDirectory: 'static',
		assetsPublicPath: '',
		//  assetsPublicPath: '../',
		productionSourceMap: true, //压缩zip
		productionGzip: true,
		productionGzipExtensions: ['js', 'css']
	},
	dev: {
		env: require('./dev.env'), 
		port: 8091,
		assetsSubDirectory: 'static',
		assetsPublicPath: '/',
		proxyTable: {
			'/nns-h5-app': {
				target: 'http://192.168.88.179:8080',
				changeOrigin: true,
				pathRewrite: {
					'^/nns-h5-app': '/nns-h5-app'
				}
			}
		},
		// CSS Sourcemaps off by default because relative paths are "buggy"
		// with this option, according to the CSS-Loader README
		// (https://github.com/webpack/css-loader#sourcemaps)
		// In our experience, they generally work as expected,
		// just be aware of this issue when enabling this option.
		cssSourceMap: false //
	}
}