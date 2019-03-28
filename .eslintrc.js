module.exports = {
	env: {
		browser: true,
		es6: true
	},
	extends: ["eslint:recommended"],
	parser: "babel-eslint",
	parserOptions: {
		ecmaFeatures: {
			jsx: true
		},
		ecmaVersion: 10,
		sourceType: "module",
		extends: "standard",
		parser: "babel-eslint"
	},
	rules: {
		"no-console": "off",
		curly: "off",
		indent: ["error", "space"],
		"linebreak-style": ["error", process.platform === "win32" ? "windows" : "unix"],
		quotes: ["error", "double"],
		semi: ["error", "never"]
	}
}
