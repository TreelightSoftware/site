# Treelight Software Landing Page

This is the landing page for Treelight Software, a software development firm located in Southern NH.

## Building

Everything you need to build or contribute should be handled through NPM scripts. After cloning and `cd`ing into the directory, run

`npm install`

This will install `gulp` and its dependencies. We use SASS for our CSS. If you change a `.scss.` file, run

`npm run sass`

to compile all of the SASS files and create a new minified bundle in `/css`.

All of our JS files are in `/jsLib`. If you change the JS, run

`npm run js`

to compile all of the JS files and minify them into a new bundle in `/js`.

## Deploying

To build a new distribution, run

`npm run build`

This will create a new build of the site in `/dist`. We use [Netlify](https://www.netlify.com/) for our deploys and hosting. It will take the `dist` folder of the `master` branch and automatically deploy and host it.

*We use Git Flow, so make sure you branch off of `develop`, open a PR against `develop`, and then after merging we will handle merging it into `master`.*