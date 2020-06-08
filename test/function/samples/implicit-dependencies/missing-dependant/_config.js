const path = require('path');

module.exports = {
	description: 'throws when a module that is loaded before an emitted chunk is external',
	options: {
		plugins: {
			name: 'test-plugin',
			resolveId(id) {
				if (id === 'external') {
					return false;
				}
			},
			buildStart() {
				this.emitFile({
					type: 'chunk',
					id: 'dep.js',
					implicitlyLoadedAfterOneOf: ['external']
				});
			}
		}
	},
	error: {
		code: 'MISSING_IMPLICIT_DEPENDANT',
		message:
			'Module "external" that should be implicitly loaded before "dep.js" cannot be external.',
		watchFiles: [path.resolve(__dirname, 'dep.js'), path.resolve(__dirname, 'main.js')]
	}
};
