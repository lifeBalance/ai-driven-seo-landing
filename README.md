# AI-driven SEO

This is just the landing page for a potential but fictitious AI-driven Saas.

## Tailwind CSS

This time I went _fuck it!_, let's do it in **version 4**, like the cool kids. [Installing](https://tailwindcss.com/docs/installation/using-vite) it, it's actually easier:

```
npm install tailwindcss @tailwindcss/vite
```

### Vite Plugin

Since I'm using Vite, let's **import** the `@tailwindcss/vite` plugin, and add it to the `vite.config.ts` file:

```ts
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite' // <== Here!

export default defineConfig({
  plugins: [
    tailwindcss(), // <== And here!
  ],
})
```

### CSS file

Then in my `index.css` file, I just had to add **one line**:

```css
@import 'tailwindcss';
```

### Add to `index.html`

Then, the **docs** recommend to add a link to the **compiled CSS** to the `<head>` of my `index.html` file:

```html
<link href="/src/styles.css" rel="stylesheet" />
```

> [!TIP]
> I didn't have the need for this, most probably because the **entry point** of the app (`main.tsx`) imports the `index.css` file (where I import tailwind).

To test it out, add this to your `App.tsx`:

```tsx
function App() {
  return (
    <h1 className="bg-blue-500 text-white text-3xl font-bold underline">
      Hello world!
    </h1>
  )
}

export default App
```

And we should be seeing a `<h1>` bold and underlined, over a blue background; not much but it's honest work.

### Adapting Theme to Tailwind v4

In **version 4** there's no `tailwind.config.ts`, which the course author provided:

```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/sections/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '20px',
        lg: '80px',
      },
      screens: {
        sm: '375px',
        md: '768px',
        lg: '1200px',
      },
    },
    screens: {
      sm: '375px',
      md: '768px',
      lg: '1200px',
    },
    extend: {},
  },
  plugins: [],
}
export default config
```

So I had to add **theme customizations** in `index.css`:

```css
@theme {
  --breakpoint-sm: 23.4375rem;
  --breakpoint-md: 48rem;
  --breakpoint-lg: 75rem;

  --container-sm: 23.4375rem;
  --container-md: 48rem;
  --container-lg: 75rem;
}

@layer components {
  .container {
    @apply mx-auto px-4;
  }
}
```

> [!IMPORTANT]
> Otherwise, the `container` class wasn't centered, and it lacked horizontal padding.

## Annoying VS Code Warning

If you're getting an annoin, just open the **command palette** (`Ctrl + Shift + P`) and search for **Open Workspace Settings (JSON)**; it will automatically create a `.vscode` folder inside your project (if there wasn't on)containing a `settings.json` file. We should add:

```json
"files.associations": {
    "*.css": "tailwindcss"
},
```

That way we're telling VS Code to associate `.css` files with the Tailwind package.

## SVG Support

Wouldn't be cool if we could import [svg](https://en.wikipedia.org/wiki/SVG) graphics as if they were React components? There's a cool project named [svgr](https://react-svgr.com/) that allows us to do exactly that! And guess what, there's also a plugin originally named [vite-plugin-svgr](https://www.npmjs.com/package/vite-plugin-svgr) that makes the integration with Vite smooth; let's install it:

```
npm i -D vite-plugin-svgr
```

And add it to our `vite.config.ts`; once we do that, we can import our SVG graphics as:

```tsx
import Logo from './logo.svg?react'
```

> [!NOTE]
> Since we're using TypeScript, we should add a [triple slash directive](https://www.typescriptlang.org/docs/handbook/triple-slash-directives.html) that declares a **dependency on a package**. Add the following to `vite-env.d.ts`:
>
> ```
> /// <reference types="vite-plugin-svgr/client" />
> ```

## About the Tailwind `shadow` Syntax

The syntax that we're using (for example in the `<Hero />`) to create [custom value shadows](https://tailwindcss.com/docs/box-shadow#using-a-custom-value) looks a bit weird (ugly imho):

```
shadow-[-20px_-20px_50px_rgb(255,255,255,.5),-20px_-20px_80px_rgb(255,255,255,.1),0_0_50px_rgb(140,69,255)]
```

That string is quite hard to parse visually (the Tailwind VSCode plugin helps in case of mistakes), but it translates to this CSS:

```css
.foo {
  box-shadow: -20px -20px 50px rgb(255, 255, 255, 0.5), -20px -20px 80px rgb(255, 255, 255, 0.1),
    0 0 50px rgb(140, 69, 255);
}
```

In the code above we're applyin 3 shadows. The [box-shadow](https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow) CSS syntax admits several variations; the one above expresses:

```
<x length> | <y length> | <blur length> | <color>
```

## Lottie Files

[Lottie](https://lottiefiles.com/) is a relatively new (2015) format for [vector graphics](https://en.wikipedia.org/wiki/Vector_graphics) based in JSON, and intended as a lighter alternative to animated GIF and PNG files.

> [!NOTE]
> Lottie is [open source](https://lottie.github.io/)

In order to make use of files in this format, we need a [dotLottie runtime](https://lottiefiles.com/runtimes). Each platform (Android, IOS, React, Vue, etc) needs a runtime. There are a lot of libraries that do that in React, but it seems the official one is [dotlottie-react](https://www.npmjs.com/package/@lottiefiles/dotlottie-react), so let's install it:

```
npm i @lottiefiles/dotlottie-react
```

Using it it's very simple:

```js
import React from 'react'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'

const App = () => {
  return <DotLottieReact src="path/to/animation.lottie" loop autoplay />
}
```

And this is a real example from my code, of how to animate a lottie file **on hover**:

```tsx
const Tab = ({ tab }: { tab: (typeof tabs)[number] }) => {
  const [dotLottie, setDotLottie] = useState<DotLottie | null>(null)

  const dotLottieRefCallback: (
    dotLottie: DotLottie | null,
  ) => void = dotLottie => {
    setDotLottie(dotLottie)
  }

  function play() {
    if (dotLottie) {
      dotLottie.play()
    }
  }

  return (
    <div
      onMouseEnter={play}
      className="border border-white/15 flex p-2.5 rounded-xl gap-2.5 items-center lg:flex-1"
    >
      <div className="h-12 w-12 border border-white/15 rounded-lg inline-flex items-center justify-center">
        <DotLottieReact
          dotLottieRefCallback={dotLottieRefCallback}
          src={tab.icon}
          autoplay
          className="w-5 h-5"
        />
      </div>

      <div>{tab.title}</div>

      {tab.isNew && (
        <div className="text-xs rounded-full px-2 py-0.5 bg-[#8c44ff] text-black font-semibold">
          new
        </div>
      )}
    </div>
  )
}
```

## Deploying to GitHub Pages

1. In my `package.json` file, set the `homepage` property to:

```json
"homepage": "https://<username>.github.io/<repo-name>"
```

2. Configure `vite.config.js`: Since GitHub Pages serves **static files** from a subdirectory (`/<repo-name>/`), we need to set the `base` option:

```js
base: '/light-saas/',
```

> [!IMPORTANT]
> Commit in `main`, and **push**.

3. Now we have to create the `gh-pages` branch, **build** our app (outputs to `/dist`); since this folder is usually in `.gitignore`, we must **force** its addition. Finally **commit** and push only `/dist` to the `gh-pages` branch:

```
git checkout -b gh-pages   # Create gh-pages branch
npm run build              # Build the app (outputs to /dist)
git add dist -f            # Force-add the build output
git commit -m "Deploy to GitHub Pages"
git subtree push --prefix dist origin gh-pages  # Push only /dist to gh-pages
```

4. In `GitHub > Repo Settings > Pages`, we have to select deploy from branch `gh-pages`. Since the `dist` folder is the only thing we have in this branch, selecting `/` (root) as the folder works fine.

### About `git subtree`

`subtree` is a Git command that allows you to work with a subdirectory of your repository as if it were its own repository. It is useful for deploying or sharing only a part of your project (e.g., the `dist` folder) without including the rest of the repository.

> [!NOTE]
> In some Linux distros this command is not included. In Fedora for example, I had to install with:
>
> ```
> sudo dnf install git-subtree
> ```

The `--prefix dist` option takes the contents of the `dist` folder; that's why in `GitHub > Repo Settings > Pages` we select `/` (root).

> [!NOTE]
> In case you don't remember, `origin` is the name of the [remote], an `gh-pages` is the name of the branch we want to push.

### Final set up

Before running the script for the first time, you need to manually create the `gh-pages` branch:

```sh
git checkout -b gh-pages
git push origin gh-pages
```

> [!IMPORTANT]
> Creating the `gh-pages` branch and pushing it to the remote is essential.

The we can add this to the `scripts` section of our `package.json` file:

```json
"deploy": "npm run build && git add dist -f && git commit -m \"Deploy to GH Pages\" && git subtree push --prefix dist origin gh-pages"
```

If we wanted to, we could even add:

```json
"setup-gh-pages": "git checkout -b gh-pages && git push origin gh-pages",
```