/** @format */

const fabric = require('@umijs/fabric');

module.exports = {
	...fabric.prettier,
	tabWidth: 4,
	printWidth: 150,
	arrowParens: 'avoid',
	bracketSpacing: true,
};
