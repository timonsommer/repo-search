# Repo Search

This application allows the user to view all repositories owned by a given GitHub username. Based on ReactJS, the front-end first fetches data for all qualifying repositories using GitHub's GraphQL API. The results can then be further refined through filtering by repository name and the used programming languages.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

## Future improvements

- Use server-side filtering and pagination for smaller response payloads and better performance (tradeoff: higher frequency of smaller requests/responses)
- Allow direct page navigation in pagination
- Use URL query parameters to store pagination and filter data for preserving state across page refreshes
