import js from '@eslint/js';
import globals from 'globals';

export default [
    { ignores: ['dist/**', 'node_modules/**'] },
    js.configs.recommended,
    {
        files: ['**/*.js'],
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'module',
            globals: { ...globals.node },
        },
        rules: {
            // Upstream code has one pre-existing unused variable; keep it a warning
            // so the baseline stays green and CI failures in the lab are intentional.
            'no-unused-vars': 'warn',
        },
    },
];
