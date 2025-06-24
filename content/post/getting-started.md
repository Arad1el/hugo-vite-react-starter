+++
date = '2025-06-24T19:43:42+01:00'
draft = false
title = 'Getting Started'
+++

https://gohugo.io/getting-started/quick-start/
```
hugo new site hugo-vite-react-starter
cd hugo-vite-react-starter
git init
git submodule add https://github.com/Arad1el/hugo-theme-stack.git themes/stack
echo "theme = 'stack'" >> hugo.toml
hugo server
```

Had to upgrade node - could have specified lower version of Vite

```
yarn add -D @types/node @vitejs/plugin-react onchange react react-dom sass typescript vite vite-hugo-plugin vite-preset-react yarn-run-all
```

Update package.json to be
```
{
  "name": "hugo-vite-react-starter",
  "version": "1.0.0",
  "description": "A starter template for using Vite, Hugo & React together",
  "type": "module",
  "scripts": {
    "dev": "npm run build:hugo && run-p dev:**",
    "dev:vite": "vite --host",
    "dev:hugo-watch": "onchange 'content/**/*.md' 'config.toml' 'layouts/**/*' -- npm run build:hugo",
    "build": "yarn build:hugo && yarn build:vite",
    "build:hugo": "hugo -d public",
    "build:vite": "vite build"
  },
  "author": "Joe Dowland",
  "license": "MIT",
  "devDependencies": {
    "@types/node": "^24.0.4",
    "@vitejs/plugin-react": "^4.6.0",
    "onchange": "^7.1.0",
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "sass": "^1.89.2",
    "typescript": "^5.8.3",
    "vite": "^7.0.0",
    "vite-hugo-plugin": "^5.1.0",
    "vite-preset-react": "^2.3.0"
  }
}
```

Add tsconfig.base.json to the root
```
{
  "compilerOptions": {
    "baseUrl": ".",
    "jsx": "preserve",
    "jsxFactory": "h",
    "jsxFragmentFactory": "Fragment",
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

Test:
```
yarn dev
```