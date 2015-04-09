var gobble = require( 'gobble' );


module.exports = gobble([

	// static files
	gobble( 'src/root' ),
	gobble( 'node_modules/acorn/dist/acorn.js' ),

	// styles
	gobble( 'src/scss' )
		.transform( 'sass', { src: 'main.scss', dest: 'main.css' }),

	// javascript
	gobble( 'src/js' )
		.transform( 'ractive', { type: 'es6' })
		.transform( 'babel', {
			whitelist: [
				'es6.arrowFunctions',
				'es6.blockScoping',
				'es6.classes',
				'es6.constants',
				'es6.destructuring',
				'es6.parameters.default',
				'es6.parameters.rest',
				'es6.properties.shorthand',
				'es6.spread',
				'es6.templateLiterals'
			]
		})
		.transform( 'esperanto-bundle', {
			entry: 'app',
			type: 'cjs'
		})
		.transform( 'derequire' )
		.transform( 'browserify', {
			entries: [ './app' ],
			dest: 'app.js',
			debug: true,
			standalone: 'squirrel'
		})

]);
