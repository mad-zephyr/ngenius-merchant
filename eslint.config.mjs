import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import tsParser from '@typescript-eslint/parser'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'

import prettierPlugin from 'eslint-plugin-prettier'
import importPlugin from 'eslint-plugin-import'
import sortPlugin from 'eslint-plugin-simple-import-sort'
import boundariesPlugin from 'eslint-plugin-boundaries'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({ baseDirectory: __dirname })

const config = [
  /* базовые рекомендации */
  js.configs.recommended,
  ...compat.extends(
    'next/core-web-vitals',
    'next/typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended'
  ),

  /* ---------- global settings ---------- */
  {
    settings: {
      react: { version: '19.1.0' },

      /* === слои (eslint-plugin-boundaries) === */
      'boundaries/elements': [
        { type: 'app', pattern: 'src/app/**', mode: 'file' },
        { type: 'pages', pattern: 'src/pages/**', mode: 'file' },
        { type: 'widgets', pattern: 'src/widgets/**', mode: 'file' },
        { type: 'features', pattern: 'src/features/**', mode: 'file' },
        { type: 'entities', pattern: 'src/entities/**', mode: 'file' },
        { type: 'shared', pattern: 'src/shared/**', mode: 'file' },
        {
          type: 'root',
          pattern: ['src/*.{ts,tsx}', 'src/*.tsx', 'src/*.ts'],
          mode: 'file',
        },
      ],

      /* alias-резолвер для eslint-plugin-import */
      'import/resolver': { typescript: { alwaysTryTypes: true } },
    },
  },

  /* ---------- per-file overrides ---------- */
  {
    files: ['**/*.{ts,tsx}'],

    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: [],
        tsconfigRootDir: __dirname,
        sourceType: 'module',
        ecmaVersion: 2022,
        ecmaFeatures: { jsx: true },
      },
      globals: { figma: 'readonly', __html__: 'readonly' },
    },

    plugins: {
      '@typescript-eslint': tsPlugin,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      import: importPlugin,
      'simple-import-sort': sortPlugin,
      boundaries: boundariesPlugin,
      prettier: prettierPlugin,
    },

    rules: {
      /* prettier & импорт-порядок */
      'prettier/prettier': ['error', { endOfLine: 'auto' }],
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',

      /* react / ts quality-of-life */
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',

      /* 1. запрещаем относительные родительские пути */
      'no-restricted-imports': ['error', { patterns: ['../*/**'] }],

      /* 2. разрешаем internal-импорты только по public API */
      'import/no-internal-modules': [
        'error',
        {
          allow: [
            'react-dom/client',
            'vite',
            '@/**',
            '@/**/model/**',
            '@/**/ui/**',
            '@/**/config/**',
            '@mui/joy/styles',
            '@mui/joy/styles/*',
            '@/**/pages/**',
            '@hookform/resolvers/zod',
            'next/**',
            'next-auth/**',
          ],
        },
      ],

      '@typescript-eslint/no-empty-interface': [
        'error',
        {
          allowSingleExtends: true,
        },
      ],
      // '@typescript-eslint/no-empty-object-type': [
      //     'error',
      //     {
      //         allowInterfaces: true,
      //     },
      // ],

      /* 3. правила слоёв (FSD) */
      'boundaries/element-types': [
        'error',
        {
          default: 'disallow',
          rules: [
            {
              from: 'root',
              allow: ['app', 'pages', 'widgets', 'features', 'entities', 'shared'],
            },
            {
              from: 'app',
              allow: ['app', 'pages', 'widgets', 'features', 'entities', 'shared'],
            },
            {
              from: 'pages',
              allow: ['widgets', 'features', 'entities', 'shared'],
            },
            {
              from: 'widgets',
              allow: ['widgets', 'features', 'entities', 'shared'],
            },
            {
              from: 'features',
              allow: ['features', 'entities', 'shared'],
            },
            { from: 'entities', allow: ['entities', 'shared'] },
            { from: 'shared', allow: ['shared'] },
          ],
        },
      ],

      'boundaries/no-unknown-files': 'off',
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0, maxBOF: 0 }],
    },
  },
]

export default config
