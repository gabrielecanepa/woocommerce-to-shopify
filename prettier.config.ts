import { type Config } from 'prettier'

export default {
  arrowParens: 'avoid',
  overrides: [
    {
      files: ['*.css'],
      options: {
        singleQuote: false,
      },
    },
    {
      files: ['*.json'],
      options: {
        printWidth: 100,
        singleQuote: false,
        trailingComma: 'none',
      },
    },
    {
      files: ['*.yml', '*.yaml'],
      options: {
        printWidth: 100,
        singleQuote: false,
      },
    },
    {
      files: ['.github/workflows/*.yml'],
      options: {
        printWidth: 100,
        singleQuote: true,
      },
    },
    {
      files: ['.vscode/*.json'],
      options: {
        printWidth: 200,
      },
    },
  ],
  plugins: [],
  printWidth: 140,
  quoteProps: 'as-needed',
  semi: false,
  singleQuote: true,
  trailingComma: 'all',
} satisfies Config
