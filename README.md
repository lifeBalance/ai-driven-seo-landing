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
