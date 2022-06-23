/** @format */

module.exports = {
	extends: [require.resolve('@umijs/fabric/dist/eslint')],
	rules: {
		// 大括号样式
		'brace-style': [1],
		// 代码块间距
		'block-spacing': 1,
		// 箭头函数空格
		'arrow-spacing': 1,
		// 禁止连续空格
		'no-multi-spaces': 1,
		// 强制关键词空格
		'keyword-spacing': 1,
		// 算术运算符空格
		'space-infix-ops': 1,
		// 禁止尾随的空格
		'no-trailing-spaces': 2,
		// 提示使用单引号
		quotes: [1, 'single'],
		// 可优化的三元表达式
		'no-unneeded-ternary': 1,
		// Switch语句冒号间距
		'switch-colon-spacing': 1,
		// 逗号放在当前行的末尾
		'comma-style': [1, 'last'],
		// 允许最大的空行默认2
		'no-multiple-empty-lines': 1,
		// 要求点与属性位于同行
		'dot-location': [1, 'property'],
		// 超过每行最大行长度换行
		'max-len': [1, { code: 150 }],
		// 箭头函数单个参数的括号
		'arrow-parens': [1, 'as-needed'],
		// 函数括号前必须带有空格
		'space-before-function-paren': 1,
		// 禁止对象的属性前带空格
		'no-whitespace-before-property': 2,
		// 运算符需在表达式的前面
		'operator-linebreak': [2, 'before'],
		// 对象键值冒号后面需带空格
		'key-spacing': [1, { afterColon: true }],
		// 每行允许的最大执行语句数
		'max-statements-per-line': [1, { max: 2 }],
		// 参数的逗号后面用空格分隔
		'comma-spacing': [1, { before: false, after: true }],
		// 数组或数组对象前后的空格
		'array-bracket-spacing': [1, 'never', { objectsInArrays: false }],
		// 强制类或方法的括号内的参数带空格间距
		'computed-property-spacing': [1, 'never', { enforceForClassMembers: true }],
		// 启用短路运算及三元运算符，更利于代码书写
		'@typescript-eslint/no-unused-expressions': [2, { allowShortCircuit: true, allowTernary: true }],
	},
	globals: {
		page: true,
		REACT_APP_ENV: true,
		ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
	},
};
