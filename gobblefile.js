var gobble = require( 'gobble' );


module.exports = gobble([

	// static files
	gobble( 'src/files' ),
	gobble( 'node_modules/acorn/dist/acorn.js' ),

	// styles
	gobble( 'src/scss' )
		.transform( 'sass', { src: 'main.scss', dest: 'main.css' }),

	// javascript
	gobble( 'src/app' )
		.transform( 'ractive', { type: 'es6' })
		.transform( 'rollup-babel', {
			entry: 'main.js',
			dest: 'main.js',
			format: 'cjs',
			external: [
				'ractive',
				'jshint',
				'codemirror',
				'codemirror/mode/javascript/javascript',
				'codemirror/keymap/sublime',
				'codemirror/addon/search/searchcursor'
			]
		})
		.transform( 'derequire' )
		.transform( 'browserify', {
			entries: [ './main' ],
			dest: 'app.js',
			debug: true,
			standalone: 'squirrel'
		})

]);
