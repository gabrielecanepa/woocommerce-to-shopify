import eslint from '@eslint/js'
import stylisticPlugin from '@stylistic/eslint-plugin'
import stylisticTsPlugin from '@stylistic/eslint-plugin-ts'
import { type ESLint } from 'eslint'
import gitignoreConfig from 'eslint-config-flat-gitignore'
// @ts-expect-error - Missing type definitions
import importPlugin from 'eslint-plugin-import'
import perfectionistPlugin from 'eslint-plugin-perfectionist'
import preferArrowFunctionsPlugin from 'eslint-plugin-prefer-arrow-functions'
import prettierPlugin from 'eslint-plugin-prettier'
// @ts-expect-error - Missing type definitions
import sortArrayValuesPlugin from 'eslint-plugin-sort-array-values'
// @ts-expect-error - Missing type definitions
import sortDestructureKeysPlugin from 'eslint-plugin-sort-destructure-keys'
import unusedImportsPlugin from 'eslint-plugin-unused-imports'
import { config as typescriptConfig, configs as typescriptConfigs } from 'typescript-eslint'

enum RuleSeverity {
  Off = 0,
  Warn = 1,
  Error = 2,
}

export default typescriptConfig(
  {
    ignores: ['**/*.?(c|m)js'],
  },
  gitignoreConfig(),
  eslint.configs.recommended,
  typescriptConfigs.stylistic,
  typescriptConfigs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: '.',
      },
    },
    plugins: {
      '@stylistic': stylisticPlugin,
      '@stylistic/ts': stylisticTsPlugin,
      import: importPlugin as ESLint.Plugin,
      perfectionist: perfectionistPlugin,
      'prefer-arrow-functions': preferArrowFunctionsPlugin,
      prettier: prettierPlugin,
      'sort-array-values': sortArrayValuesPlugin as ESLint.Plugin,
      'sort-destructure-keys': sortDestructureKeysPlugin as ESLint.Plugin,
      'unused-imports': unusedImportsPlugin,
    },
    rules: {
      '@stylistic/array-bracket-newline': [RuleSeverity.Error, 'consistent'],
      '@stylistic/array-bracket-spacing': [RuleSeverity.Error, 'never'],
      '@stylistic/array-element-newline': [RuleSeverity.Error, 'consistent'],
      '@stylistic/eol-last': RuleSeverity.Error,
      '@stylistic/max-len': RuleSeverity.Off,
      '@stylistic/no-extra-semi': RuleSeverity.Off,
      '@stylistic/no-multi-spaces': RuleSeverity.Error,
      '@stylistic/no-multiple-empty-lines': [
        RuleSeverity.Error,
        {
          max: 1,
        },
      ],
      '@stylistic/no-trailing-spaces': RuleSeverity.Error,
      '@stylistic/object-curly-spacing': [RuleSeverity.Error, 'always'],
      '@stylistic/quotes': [
        RuleSeverity.Error,
        'single',
        {
          avoidEscape: true,
        },
      ],
      '@stylistic/template-curly-spacing': [RuleSeverity.Error, 'never'],
      '@stylistic/ts/member-delimiter-style': [
        RuleSeverity.Error,
        {
          multiline: {
            delimiter: 'none',
            requireLast: false,
          },
        },
      ],
      '@typescript-eslint/consistent-type-imports': [
        RuleSeverity.Error,
        {
          disallowTypeAnnotations: false,
          fixStyle: 'inline-type-imports',
          prefer: 'type-imports',
        },
      ],
      '@typescript-eslint/no-empty-object-type': [
        RuleSeverity.Error,
        {
          allowInterfaces: 'always',
        },
      ],
      '@typescript-eslint/no-explicit-any': RuleSeverity.Off,
      '@typescript-eslint/no-misused-promises': [
        RuleSeverity.Error,
        {
          checksVoidReturn: {
            attributes: false,
          },
        },
      ],
      '@typescript-eslint/no-unnecessary-template-expression': RuleSeverity.Error,
      '@typescript-eslint/no-unsafe-argument': RuleSeverity.Off,
      '@typescript-eslint/no-unused-vars': [
        RuleSeverity.Error,
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          ignoreRestSiblings: true,
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/prefer-for-of': RuleSeverity.Error,
      '@typescript-eslint/prefer-string-starts-ends-with': RuleSeverity.Error,
      '@typescript-eslint/restrict-template-expressions': [
        RuleSeverity.Error,
        {
          allowNumber: true,
        },
      ],
      '@typescript-eslint/unbound-method': RuleSeverity.Off,
      'comma-dangle': [RuleSeverity.Error, 'always-multiline'],
      eqeqeq: [RuleSeverity.Error, 'always'],
      'func-style': [RuleSeverity.Error, 'expression'],
      'import/first': RuleSeverity.Error,
      'import/newline-after-import': [
        RuleSeverity.Error,
        {
          considerComments: true,
          exactCount: true,
        },
      ],
      'import/no-absolute-path': RuleSeverity.Off,
      'import/no-amd': RuleSeverity.Error,
      'import/no-commonjs': RuleSeverity.Error,
      'import/no-deprecated': RuleSeverity.Error,

      'import/no-duplicates': [
        RuleSeverity.Error,
        {
          'prefer-inline': true,
        },
      ],
      'import/no-empty-named-blocks': RuleSeverity.Error,
      'import/no-mutable-exports': RuleSeverity.Error,
      'import/no-self-import': RuleSeverity.Error,
      'import/no-useless-path-segments': [
        RuleSeverity.Error,
        {
          noUselessIndex: true,
        },
      ],
      'max-lines': [
        RuleSeverity.Error,
        {
          max: 200,
          skipBlankLines: true,
          skipComments: true,
        },
      ],
      'no-console': [RuleSeverity.Warn, { allow: ['error', 'warn'] }],
      'no-duplicate-imports': [RuleSeverity.Error, { includeExports: true }],
      'no-restricted-imports': [
        RuleSeverity.Error,
        {
          patterns: [
            {
              group: ['../**/*'],
              message: 'Relative parent imports are not allowed, use path aliases instead.',
            },
          ],
        },
      ],
      'no-template-curly-in-string': RuleSeverity.Error,
      'no-unused-vars': RuleSeverity.Off,
      'no-useless-concat': RuleSeverity.Error,
      'no-var': RuleSeverity.Error,
      'object-shorthand': [RuleSeverity.Error, 'always'],
      'padding-line-between-statements': [
        RuleSeverity.Error,
        { blankLine: 'always', next: '*', prev: 'break' },
        { blankLine: 'always', next: '*', prev: 'continue' },
        { blankLine: 'always', next: '*', prev: 'return' },
      ],
      'perfectionist/sort-exports': RuleSeverity.Error,
      'perfectionist/sort-imports': [
        RuleSeverity.Error,
        {
          groups: [['side-effect', 'side-effect-style'], 'builtin', 'external', 'internal', ['parent', 'index', 'sibling']],
          ignoreCase: false,
        },
      ],
      'perfectionist/sort-interfaces': RuleSeverity.Error,
      'perfectionist/sort-named-imports': [
        RuleSeverity.Error,
        {
          groupKind: 'values-first',
          ignoreCase: false,
          type: 'alphabetical',
        },
      ],
      'perfectionist/sort-objects': RuleSeverity.Error,
      'prefer-arrow-callback': [
        RuleSeverity.Error,
        {
          allowNamedFunctions: true,
        },
      ],
      'prefer-arrow-functions/prefer-arrow-functions': RuleSeverity.Error,
      'prefer-const': [
        RuleSeverity.Error,
        {
          destructuring: 'any',
          ignoreReadBeforeAssign: false,
        },
      ],
      'prefer-template': RuleSeverity.Error,
      'prettier/prettier': [RuleSeverity.Error, {}, { usePrettierRc: true }],
      'sort-array-values/sort-array-values': RuleSeverity.Error,
      'sort-destructure-keys/sort-destructure-keys': RuleSeverity.Error,
      'sort-vars': [
        RuleSeverity.Error,
        {
          ignoreCase: false,
        },
      ],
      'unused-imports/no-unused-imports': RuleSeverity.Error,
    },
    settings: {
      'import/resolver': {
        typescript: true,
      },
    },
  },
  {
    files: ['**/*.d.ts', '**/types.ts'],
    rules: {
      'max-lines': RuleSeverity.Off,
    },
  },
  {
    files: ['*.config.ts'],
    rules: {
      '@typescript-eslint/no-unsafe-return': RuleSeverity.Off,
      'import/newline-after-import': RuleSeverity.Off,
      'import/no-anonymous-default-export': RuleSeverity.Off,
      'max-lines': RuleSeverity.Off,
      'no-restricted-imports': RuleSeverity.Off,
      'sort-array-values/sort-array-values': RuleSeverity.Off,
    },
  },
)
