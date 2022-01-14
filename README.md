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
    [Language.ENGLISH]: 'English translation',
    [Language.SPANISH]: 'Spanish translation',
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
    [Language.ENGLISH]: "Hello World",
    [Language.SPANISH]: "Hola Mundo",
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

## Routing

To add new page follow the pattern established in `router/routes.ts` and add new element to the routes object. Look at the comments on the `Route` interface declaration.

## State

There is a global state defined in `state/GlobalState.ts` which can be accessed at any point in the application and get the state written in the class.

## Deployment

Currently the repository is set to be push-mirrored in GitHub (https://github.com/mutafow/esparta_gitlab_mirror). The reason for doing so is that GitHub provides free and quick integration with Vercel. Vercel is a platform for frontend frameworks and static sites. It automatically sets up pipelines and environments, so that you can set it up in with just a few clicks. The front-end is currently hosted at https://esparta-webpro.vercel.app/ but will be probably taken down after WEBPRO is done, as I like to keep my lists of hosted sites clean and manageable. If deployment is needed in the future, it should be taken care from the ground up, but the same method can be followed.

## Requirements
Requirement  | Progress
------------- | -------------
The system must have login screen, which accepts email and password. Only authorized and registered users should be able to login.  | Done
Every INVENTORY MGR must be able to approve and decline claim requests made by SOLDIERS  | Done
Every SOLDIER must be able to request item | Done
Every INVENTORY MGR must be able to assign and unassign items to soldiers | Done
The system must allow users to switch between English and Spanish languages | Done
The system must be accessible and optimized for mobile and desktop | Done
The user interface of the application should follow the color scheme of black, white, and yellow | Done
Every INVENTORY MGR should be able to see an item’s information | Done
Every INVENTORY MGR should be able to filter items on categories | Done
Every INVENTORY MGR should be able to scan applicable items based on their QR code | Done (Not tested)
Every SOLDIER should be able to claim an item | Done
Every SOLDIER should be able to see what they have claimed | Done
Every SOLDIER should be able to see an overview of their requests and their statuses | Done
The system should assign each user to a ROLE (permissions) | Done (Assinged durring registration)
The user with specific ROLE should only see what the ROLE has access to. | Done
Every INVENTORY MGR should be able to see a graph overview of the stock over time | Ignored
Every INVENTORY MGR should be able to create new types of stock (bulk amount) | Done
Every INVENTORY MGR could be able to transfer items between depots | Ignored
Every INVENTORY MGR could be able to assign arbitrary key/value pairs to items | Ignored
Every INVENTORY MGR could be able to make bulk changes to items | Ignored
