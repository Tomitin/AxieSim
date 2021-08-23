Dependencies:
npm install react-i18next i18next --save
npm install --save typescript @types/node @types/react @types/react-dom @types/jest
npm install react-redux
npm install @types/react-redux
npm install --save styled-components
npm install @material-ui/core
npm install @material-ui/icons
npm install --save react-router
npm install --save react-router-dom
npm install eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-react --dev
npm install prettier eslint-config-prettier eslint-plugin-prettier --dev
npm install --save i18next-browser-languagedetector
npm install --save i18next-http-backend
npm install @fontsource/roboto
npm install redux-saga
npm install recharts
npm install axios
npm install --save node-uuid
npm install --save lodash

Since we use a large enough tree, the best solution is a memoized selector so the tree is not calculated everytime, just the part we need to select
npm install reselect

Scaffolding:
/src
----index.tsx: Entry point file that renders the React component tree
----/app
----....store.ts: store setup
----....rootReducer.ts: root reducer (optional)
----....App.tsx: root React component
----/common: hooks, generic components, utils, etc
----/features: contains all "feature folders"
----..../todos: a single feature folder
----....++++todosSlice.ts: Redux reducer logic and associated actions
----....++++Todos.tsx: a React component
