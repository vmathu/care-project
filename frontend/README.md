# CaRe Website

Technology used:

- [ESLint](https://eslint.org/) (Code style guides - [React Hooks](https://reactjs.org/docs/hooks-rules.html), [Absolute imports resolver](https://www.npmjs.com/package/eslint-import-resolver-typescript)).
- [TypeScript](https://www.typescriptlang.org/).
- [React-Query](https://react-query.tanstack.com/) (API calls hooks).
- [Axios](https://axios-http.com/) (HTTP Client).
- [Material UI](https://mui.com/) (Styling)
- [React Router (V6)](https://reactrouter.com/) (Client-side routing).
- [Redux-Toolkit](https://redux-toolkit.js.org/) (State Management).
- [Storybook](https://storybook.js.org/) (Design System).
- [Vitest](https://vitest.dev/) (Unit tests framework)
- [React testing library](https://testing-library.com/docs/react-testing-library/intro/) (DOM testing).

## Installation

### Prerequisites

- Make sure to have `yarn` installed.
- Nếu chưa cài đặt yarn, chạy lệnh `npm install -g yarn`.

### Steps

1. Clone repo.

2. Install required packages

   - Run `yarn --frozen-lockfile`. Lưu ý kèm theo flag để tránh việc cập nhật các package trong file `yarn.lock`.

   - Khi cài package, chạy `yarn add <package-name>`.

3. Run localhost:

   - Run `yarn dev`.

   - Navigate to `localhost:5173`.

## Folder Structure

```shell
src
├── libs
│     ├── hooks                                 # Custom hooks
│     │    ├── use<HooksName>.ts
│     │    └── index.ts                         # Main file declaration for neat imports
│     ├── redux
│     │    ├── hooks.ts                         # Typed React Redux hooks (useSelector, useDispatch)
│     │    ├── store.ts
│     │    ├── reducer.ts                       # Exports combined reducer
│     │    └── index.ts                         # Main file declaration for neat imports
│     ├── ui
│     │    ├── components
│     │    │     ├── <ComponentName>.tsx          # Component declaration
│     │    │     └── index.ts                   # Main file declaration for neat imports
│     │    ├── color.ts                         # Global colors
│     │    ├── theme.ts                         # Styling MUI components
│     │    └── index.ts                         # Main file declaration for neat imports
│     └── utils                                 # Utility functions
│          ├── <functionName>.ts
│          └── index.ts                         # Main file declaration for neat imports
├── pages                                       # App pages
│     └── <PageName>
│         ├── components
│         │     ├── <ComponentName>.tsx         # Component declaration
│         │     └── index.ts                    # Main file declaration for neat imports
│         └── index.tsx                         # Screen declaration
└── assets
```

## Available Scripts

- `yarn dev`: Run dev server
- `yarn lint`: Run ESLint on the entire project
- `yarn prettier . --write`: Format everthing
- `yarn prettier --write app/`: Format a certain directory
- `npx prettier . --check`: Only check files.
