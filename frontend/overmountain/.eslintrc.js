module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'airbnb',
    'airbnb-typescript',
    'prettier',
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json'],
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'no-var': 'warn', // var 금지
    'react/jsx-boolean-value': 'warn', // 연희: 캐러셀 (개열받음.)
    'no-multiple-empty-lines': 'warn', // 여러 줄 공백 금지
    'no-nested-ternary': 'warn', // 중첩 삼항 연산자 금지
    'dot-notation': 'warn', // 가능하다면 dot notation 사용
    'no-unused-vars': 'off', // 사용하지 않는 변수 금지
    'no-param-reassign': 'off', // 매개변수 재선언 금지
    'no-promise-executor-return': 'warn', // Promise 생성자 내 반환값 사용불가
    'no-console': 'off', // 연희: 나는 콘솔을 쓰고싶어
    'prefer-const': 'off',
    'prefer-arrow-callback': 'off',
    'object-shorthand': 'off',
    'one-var': 'off',
    'consistent-return': 'off',
    'react/destructuring-assignment': 'warn', // state, prop 등에 구조분해 할당 적용
    'react/jsx-pascal-case': 'warn', // 컴포넌트 이름은 PascalCase로
    'react/no-direct-mutation-state': 'warn', // state 직접 수정 금지
    'react/jsx-no-useless-fragment': 'warn', // 불필요한 fragment 금지
    'react/no-unused-state': 'warn', // 사용되지 않는 state
    'react/jsx-key': 'warn', // 반복문으로 생성하는 요소에 key 강제
    'react/self-closing-comp': 'warn', // 셀프 클로징 태그 가능하면 적용
    'react/jsx-curly-brace-presence': 'warn', // jsx 내 불필요한 중괄호 금지
    'jsx-a11y/label-has-associated-control': 'off', // submit form 과 label 연결: 연결해도 오류나서 끔
    'react/jsx-filename-extension': ['warn', { extensions: ['.tsx'] }],
    '@typescript-eslint/no-use-before-define': 'warn',
    '@typescript-eslint/no-unused-vars': ['warn'],
    'import/prefer-default-export': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
        json: 'warn',
      },
    ],
  },
};
