import nx from '@nx/eslint-plugin';

export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  {
    ignores: ['**/dist'],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?js$'],
          depConstraints: [
            {
              sourceTag: 'type:app',
              onlyDependOnLibsWithTags: [
                'type:api',
                'type:feature',
                'type:ui',
                'type:logic',
                'type:util'
              ]
            },
            {
              sourceTag: 'type:api',
              onlyDependOnLibsWithTags: [
                'type:ui',
                'type:logic',
                'type:util'
              ]
            },
            {
              sourceTag: 'type:feature',
              onlyDependOnLibsWithTags: [
                'type:ui',
                'type:logic',
                'type:util'
              ]
            },
            {
              sourceTag: 'type:ui',
              onlyDependOnLibsWithTags: [
                'type:logic',
                'type:util'
              ]
            },
            {
              sourceTag: 'type:logic',
              onlyDependOnLibsWithTags: [
                'type:util'
              ]
            },
            {
              sourceTag: 'domain:shell',
              onlyDependOnLibsWithTags: [
                'domain:boarding',
                'domain:booking',
                'domain:checkin',
                'domain:shared',
              ],
            },
            {
              sourceTag: 'domain:boarding',
              onlyDependOnLibsWithTags: [
                'domain:boarding',
                'domain:booking',
                'domain:shared',
              ],
            },
            {
              sourceTag: 'domain:booking',
              onlyDependOnLibsWithTags: [
                'domain:booking',
                'domain:shared',
              ],
            },
            {
              sourceTag: 'domain:checkin',
              onlyDependOnLibsWithTags: [
                'domain:checkin',
                'domain:shared',
              ],
            },
            {
              sourceTag: 'domain:shared',
              onlyDependOnLibsWithTags: [
                'domain:shared',
              ],
            },
          ],
        },
      ],
    },
  },
  {
    files: [
      '**/*.ts',
      '**/*.tsx',
      '**/*.cts',
      '**/*.mts',
      '**/*.js',
      '**/*.jsx',
      '**/*.cjs',
      '**/*.mjs',
    ],
    // Override or add rules here
    rules: {},
  },
];
