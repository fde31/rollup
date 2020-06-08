const path = require('path');

module.exports = {
	description: 'throws when a module cannot be loaded',
	options: {
		plugins: [
			{
				name: 'test',
				resolveId(id) {
					if (id === 'broken') {
						return id;
					}
				},
				load(id) {
					if (id === 'broken') {
						throw new Error("It's broken!");
					}
				}
			}
		]
	},
	error: {
		code: 'PLUGIN_ERROR',
		hook: 'load',
		message: `Could not load broken (imported by main.js): It's broken!`,
		plugin: 'test',
		watchFiles: [path.resolve(__dirname, 'main.js'), 'broken']
	}
};
