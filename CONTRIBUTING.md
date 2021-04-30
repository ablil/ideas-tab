# Contribution guide

We love your input, we love to make contributing to this project as easy as it could be.

Here is a guide for you, if you feel I have forgotten something, please create an issue.

## 1. Technology stack

This project uses the following stack:
* React / Typescipt
* Tailwindcss
* Firebase (firestore, authentication, hosting)

### 1.1. React setup

To install necessary tools:
```
$ npm install -g yarn
$ npm install -g create-react-app
```

To run the project locally:
```
$ git clone https://github.com/ablil/ideas-tab
$ cd ideas-tab && yarn
$ yarn start
```

In order to run, a firebase `.env` is required, check the next section.

### 1.2. Firebase setup

Start by installing firebase tools:
```
yarn global add firebase-tools
```

Then create an `.env` file with contains your firebase project credentials.
You can use `.env.example` as a boilerplate.

## 2. UI / Design
We are using `tailwindcss` as css framework, here is the style that is being followed:

|                  | light mode | dark mode       |
|------------------|------------|-----------------|
| text color       | gray-900   | gray-50 / white |
| background color | gray-50    | gray-900        |
| primary color    | blue-400   | yellow-400      |

## 3. Development process

### 3.1 Commit guide

This repo uses the conventional commit guide:
1. `feat` : new features
2. `fix`: fix bug
3. `refactor`: a commit that is neither a *feat* or a *bug*
4. `build`: related to project build
5. `ci`: related to continuous integration such as github action
6. `docs`: documentation

### 3.2 Pull requests

1. Fork the repo and create your branch from `dev`
2. Describe your pull request, so other people can understand your code.