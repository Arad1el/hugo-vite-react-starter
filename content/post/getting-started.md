+++
date = '2025-06-24T19:43:42+01:00'
draft = false
title = 'Getting Started'
menus = 'main'
+++
## Preface
This template is built upon [this medium article by Dawid Prośba](https://medium.com/gumgum-tech/faster-development-experience-with-vite-hugo-and-preact-c08cbcfce5fb)

I had trouble following the article (there was a reliance on images that no longer exist), and couldn't get the completed project from GitHub to work (without effort) so I created my own, going from scratch.

## Steps
### Create a Hugo site
As per the [Hugo documentation](https://gohugo.io/getting-started/quick-start/) create a new Hugo site.

My theme of choice is [Stack](https://stack.jimmycai.com/), but I had to make some [changes](https://github.com/Arad1el/hugo-theme-stack) to enable it to work with this starter.
```
hugo new site hugo-vite-react-starter
cd hugo-vite-react-starter
git init
git submodule add https://github.com/Arad1el/hugo-theme-stack.git themes/stack
echo "theme = 'stack'" >> hugo.toml
```
Note that the echo command doesn't quite work like that on Windows, so you may need to edit the toml file directly (it's literally just adding ```theme = 'stack'``` on a new line)

After that you can run ```hugo server``` to check that the site is working.

### Add the Dev Dependencies
There are a few dependencies to make all of this work:
- React & React Dom (for working with React)
- Vite, Vite React Plugin, Vite React Preset (for compiling the React code)
- Node Types (to prevent issues when interpreting configuration files)
- Vite Hugo Plugin (for linking everything together)
- Onchange (for compiling the Hugo site when you make a change)
- Sass (for compiling scss files and because the React files complain without it)
- Typescript (personal preference)
- Yarn Run All (to allow functions to be run concurrently)

So run
```
yarn add -D @types/node @vitejs/plugin-react onchange react react-dom @types/react @types/react-dom sass typescript vite vite-hugo-plugin vite-preset-react yarn-run-all
```

> #### Yarn & Vite
> I personally much prefer using Yarn to NPM because NPM doesn't do test for version compatibility. However, whilst creating this starter template, Vite 7.0.0 was released, and for some reason Yarn wouldn't automatically install a previous version. I upgraded my Node installation to install the latest Vite. If you can't do that, then you may need to specify a version for Vite, such as ```yarn add -D vite@6.3.5```

### Package.json
Having added Node software into a Hugo project (rather than the other way around) you will have a package.json file, but it will be too minimal to be useful. You'll need to flesh it out to be something like the below (but ensure that the scripts section is as written)
```
{
  "name": "hugo-vite-react-starter",
  "version": "1.0.0",
  "description": "A starter template for using Vite, Hugo & React together",
  "type": "module",
  "scripts": {
    "dev": "npm run build:hugo && run-p dev:**",
    "dev:vite": "vite --host",
    "dev:hugo-watch": "onchange 'content/**/*.md' '**/*.toml' 'layouts/**/*' -- npm run build:hugo",
    "build": "yarn build:hugo && yarn build:vite",
    "build:hugo": "hugo -d public",
    "build:vite": "vite build"
  },
  "author": "Joe Dowland",
  "license": "MIT",
  "devDependencies": {
    "@types/node": "^24.0.4",
    "@types/react": "^19.1.8",
    "@types/react-dom": "^19.1.6",
    "@vitejs/plugin-react": "^4.6.0",
    "onchange": "^7.1.0",
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "sass": "^1.89.2",
    "typescript": "^5.8.3",
    "vite": "^7.0.0",
    "vite-hugo-plugin": "^5.1.0",
    "vite-preset-react": "^2.3.0",
    "yarn-run-all": "^3.1.1"
  }
}
```
> ### Onchange on Windows
> As per the [documentation for onchange](https://www.npmjs.com/package/onchange) (at the time of writing), to work on Windows you *may* have to change the single quotes to be double quotes:
> 
> ```"dev:hugo-watch": "onchange \"content/**/*.md\" \"**/*.toml\" \"layouts/**/*\" -- npm run build:hugo",```

### Typescript Config
Add tsconfig.base.json to the root:
```
{
  "compilerOptions": {
    "baseUrl": ".",
    "jsx": "react-jsx",
    "moduleResolution": "Node",
    "target": "es2016",
    "module": "ESNext",
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true,
    "noImplicitAny": true,
    "paths": {
      "js/*": [
        "/*"
      ]
    },
  }
}
```

### Vite Configuration
Add vite.config.ts to the root:
```
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import hugoPlugin from 'vite-hugo-plugin';

// Root directory of our application
const appDir = __dirname;

// The directory where hugo builds it's files.
const hugoOutDir = resolve(appDir, 'public');

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(), // Specify preact plugin, we will need that later
        hugoPlugin({hugoOutDir, appDir}) // Hugo plugin that configures vite to work with hugo
    ],
    server: {
        port: 3000
    }
});
```

### Add React files
For the initial setup of React:
- In the assets folder, create a folder called "js"
- In assets folder, create a file called tsconfig.json with the following content
```
{
    "extends": "../tsconfig.base.json",
    "compilerOptions": {
        "noImplicitAny": true,
        "baseUrl": ".",
        "paths": {
            "js/*": [
                "js/*"
            ]
        },
    }
}
```

This will mean that anything in that js folder gets compiled using TypeScript and React
Hugo will automatically add a jsconfig.json file, so you can put in JavaScript files rather than TypeScript if you want

Obviously, the next step is to add your actual React code to the js folder.
I won't guide you through that - you make what you want, with whatever structure you want.
In this starter I've got two different apps, because I don't want to create a Single Page App (SPA), and instead want to integrate individual separate apps into different pages.

### Adding React to Pages
You need to add the script and target app root to the markdown pages you want them on:
```
<script type="module" src="/assets/js/app.tsx"></script>
<div id="root"></div>
```

There are multiple approaches to this - one is to create a layout specifically for the page (as in the medium post, but with the caveat that the layout html needs to be called "single.html" rather than "list.html")

I didn't like this, as it was difficult to make it work with my chosen theme without doing a lot of code duplication.

Instead, I wanted to add them into the content wrapper of the theme, but that required altering the ```hugo.toml``` file in the root to disable removing HTML:
```
[markup.goldmark.renderer]
  unsafe = true # Allow HTML in md files
```

For some of you this may be an issue, so you will need to go another route. As for myself, I'm not going to add anything unsafe to my own site, so I don't view it as a risk. Your mileage may vary.

### Run the thing
Finally, for development, run ```yarn dev```
To build it, run ```yarn build```