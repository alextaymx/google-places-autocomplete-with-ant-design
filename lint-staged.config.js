module.exports = {
  '*.{js,jsx,ts,tsx}': ['eslint --fix', 'eslint'],
  '**/*.ts?(x)': () => 'npm run typecheck',
  '*.{json,yaml}': ['prettier --write'],
};
