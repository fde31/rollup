const path = require('path');

module.exports = {
	description:
		'throws when a module that is loaded before an emitted chunk is only linked to the module graph via a tree-shaken dynamic import',
	options: {
		plugins: {
			name: 'test-plugin',
			buildStart() {
				this.emitFile({
					type: 'chunk',
					id: 'dep1.js',
					implicitlyLoadedAfterOneOf: ['dependant']
				});
				this.emitFile({
					type: 'chunk',
					id: 'dep2.js',
					implicitlyLoadedAfterOneOf: ['dependant']
				});
			}
		}
	},
	error: {
		code: 'MISSING_IMPLICIT_DEPENDANT',
		message:
			'Module "dependant.js" that should be implicitly loaded before "dep1.js" and "dep2.js" is not included in the module graph. Either it was not imported by an included module or only via a tree-shaken dynamic import, or no imported bindings were used and it had otherwise no side-effects.',
		watchFiles: [
			path.resolve(__dirname, 'dep1.js'),
			path.resolve(__dirname, 'dep2.js'),
			path.resolve(__dirname, 'main.js'),
			path.resolve(__dirname, 'dependant.js')
		]
	}
};
