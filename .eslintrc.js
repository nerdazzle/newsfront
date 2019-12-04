//
// ESLint configuration docs: https://eslint.org/docs/user-guide/configuring
//
module.exports = {
  root: true,
  //
  // To specify environments using a comment inside of your JavaScript file, use the following format:
  // /* eslint-env node, jest */
  //
  env: {
    browser: true, // browser global variables.
    node: true, // Node.js global variables and Node.js scoping.
    // es6: true, // enable all ECMAScript 6 features except for modules (this automatically sets the ecmaVersion parser option to 6).
    es2020: true, // adds all ECMAScript 2020 globals and automatically sets the ecmaVersion parser option to 11.
    worker: true, // web workers global variables.
    serviceworker: true // Service Worker global variables.
    // amd: true, // defines require() and define() as global variables as per the amd spec.
    // commonjs: true, // CommonJS global variables and CommonJS scoping (use this for browser-only code that uses Browserify/WebPack).
    // jest: true, // Jest global variables.
  },
  /*
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 11,
    sourceType: 'module',
    ecmaFeatures: {
      legacyDecorators: true,
      jsx: true
    }
  },
  plugins: ['prettier'],
  extends: [
      '@nuxtjs',
      'prettier',
      'prettier/vue',
      // TODO: Re-enable after issue is fixed (last checked 12/4/2019) https://github.com/amilajack/eslint-plugin-compat/issues/223
      // 'plugin:compat/recommended',
      'plugin:prettier/recommended',
      'plugin:nuxt/recommended'
  ],
  // add your custom rules here
  rules: {
    'prettier/prettier': ['error'],
    endOfLine: 0,
    "vue/component-name-in-template-casing": ["error", "PascalCase"],
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off"
  },
  overrides: [],
  */

  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    "ecmaFeatures": {
      legacyDecorators: true,
      "jsx": true
    }
  },
  plugins: [
    'prettier',
    'eslint-plugin-compat',
    "@typescript-eslint",
    "ava"
  ],
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: [
   "plugin:ava/recommended",

   "plugin:compat/recommended",
   "eslint:recommended",
   // not all eslint core rules are compatible with TypeScript, so you need to add both
   // eslint:recommended and plugin:@typescript-eslint/eslint-recommended (which will
   // adjust the one from eslint appropriately for TypeScript) to your config
   // https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin#supported-rules
   "plugin:@typescript-eslint/eslint-recommended",
   // TODO: Is the one below redundant if we use the one above?
   "plugin:@typescript-eslint/recommended",

   // eslint-config-prettier is a config that disables rules that conflict with Prettier.
   // Add it to your devDependencies, then extend from it within your .eslintrc configuration. Make sure to put it last in the extends array, so it gets the chance to override other configs.
   // https://prettier.io/docs/en/integrating-with-linters.html
   'prettier',
   'prettier/vue',

   // vue
   'plugin:vue/recommended',

   // nuxt
   '@nuxtjs/eslint-config-typescript',
   'plugin:nuxt/recommended'

  ],
  // add your custom rules here
  rules: {
    // 'prettier/prettier': ['error'],
    endOfLine: 0,
    "vue/component-name-in-template-casing": ["error", "PascalCase"],
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",



    "import/no-unresolved": 0,
    "import/no-unassigned-import": 0,
    "semi": ["error", "never"],
    //semi: 'off',
    "space-before-function-paren": [
      "error",
      {
        "anonymous": "never",
        "named": "never",
        "asyncArrow": "never"
      }
    ],
    // "space-before-function-paren": [
    //   "error",
    //   {
    //     "anonymous": "always",
    //     "named": "always",
    //     "asyncArrow": "always"
    //   }
    // ],

    'comma-dangle': 0,

    '@typescript-eslint/indent': 0,
    '@typescript-eslint/camelcase': 0,
    '@typescript-eslint/semi': 0,
    '@typescript-eslint/member-delimiter-style': [
      'error',
      {
        multiline: { delimiter: 'none', requireLast: false },
        singleline: { delimiter: 'comma', requireLast: false }
      }
    ],
    '@typescript-eslint/no-empty-interface': ["warn"],
    '@typescript-eslint/no-use-before-define': 1,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/class-name-casing': 1,
    // // note you must disable the base rule as it can report incorrect errors
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: false
      }
    ],
    '@typescript-eslint/explicit-function-return-type': 0,
    // https://palantir.github.io/tslint/rules/no-var-requires/
    '@typescript-eslint/no-var-requires': 0,
    'handle-callback-err': 1,
    'prefer-promise-reject-errors': 0,
    'import/no-duplicates': 1,
    'vue/return-in-computed-property': 1,
    'vue/no-use-v-if-with-v-for': 0,
    'vue/no-unused-components': 1,
    'vue/no-v-html': 0,
    'vue/no-template-shadow': 2,
    'vue/multiline-html-element-content-newline': 1,
    /* max attributes-per-line and order-in-components
     ** we should use this later, when eslint-plugin-vue will support auto fixing this
     */
    'vue/max-attributes-per-line': 'off',
    'vue/order-in-components': 0,
    'vue/attributes-order': 0,
    // less restricted v-for -> v-if rules
    'vue/no-confusing-v-for-v-if': 0,
    // allow paren-less arrow functions
    'arrow-parens': 0,
    'prefer-arrow-callback': 1,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-restricted-imports': [2, { paths: ['lodash-es'] }],

    // 'ava/no-ignored-test-files': ["error", {"files": ["lib/**/*.test.js", "utils/**/*.test.js"]}]'

  },
    // TODO: Check if this is fixed.  If so, delete it.  Fix: https://github.com/eslint/typescript-eslint-parser/pull/540
  // overrides: [
  //   {
  //     // TODO: (checked 11/13/2019) check if this is closed
  //     // This is an issue with interfaces so we need to wait until it fixed.
  //     // https://github.com/eslint/typescript-eslint-parser/issues/416
  //     // https://github.com/typescript-eslint/typescript-eslint/issues/342
  //     files: ['**/*.ts'],
  //     rules: {
  //       'no-undef': 'off'
  //     }
  //   }
  //],
  settings: {
    /*
      Polyfills for eslint-plugin-compat
      https://github.com/amilajack/eslint-plugin-compat#adding-polyfills
      https://github.com/amilajack/eslint-plugin-compat/wiki/Adding-polyfills-(v2)

      Adding polyfills:
      1. Search the feature on caniuse.com.
      2. Get the link to the feature (click on the # icon)
      3. Add the id to the feature in the url polyfills in your .eslintrc. For example, the url for the caniuse webassembly page is http://caniuse.com/#feat=wasm. The id for this feature is wasm.

      Used in conjunction with the polyfilling strategy for proper linting
    */
    polyfills: [
      // // Example of marking entire API and all methods and properties as polyfilled
      'Promise',
      // // Example of marking specific method of an API as polyfilled
      'WebAssembly.compile',
      // // Example of API with no property (i.e. a function)
      'fetch',
      // // Example of instance method, must add `.prototype.`
      'Array.prototype.push'
    ]
  },
  globals: {
    $nuxt: true,
    page: true,
    browser: true,
    context: true,
    jestPuppeteer: true
  }
}
