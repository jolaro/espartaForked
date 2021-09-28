# Used libraries

- [Create React App](https://github.com/facebook/create-react-app). (bundling, transpiler...)
- [MUI](https://mui.com/) (UI Framework)
- [React i18n](https://react.i18next.com/) (Translations)
- [React hook form](https://react-hook-form.com/get-started) (Easily validate forms)
- [React Query](https://react-query.tanstack.com/) (Working with the API - creating queries and mutations)
- [React Hookstate](https://hookstate.js.org/docs/getting-started) (Managing state)

## Available Scripts

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Guides

### Structure

- components go to
  - `components/atoms` - if they do one thing only and include base html tags only
  - `components/molecules` - if they do more than one thing or consist of more than 1 atom
  - `components/organisms` - if they consist of more than 1 molecule and/or atom
  - `pages` if they are the landing page of an URI

### How to use translation

- open translations/translation.ts file
- add your translation following the pattern:

```typescript
{
  uniqueKey: {
    en: 'English translation',
    es: 'Spanish translation',
  }
}
```

- where you want to use it, include the translate function using: (where useTranslate is imported from `hooks/useTranslate.ts`)

```typescript
const t = useTranslate();
```

- to use the translated string use (uniqueKey represents the uniqueKey given in the steps above)

```typescript
t("uniqueKey");
```

example:

```typescript
// translations.ts
export const translations = {
  helloWorld: {
    en: "Hello World",
    es: "Hola Mundo",
  },
};

// App.tsx
const App: React.FC = () => {
  const t = useTranslate();

  return (
    <div className="App">
      <h1>{t("helloWorld")}</h1>
    </div>
  );
};
```
