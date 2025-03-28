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
  return (<h1 className="bg-blue-500 text-white text-3xl font-bold underline">Hello world!</h1>)
}

export default App
```

And we should be seeing a `<h1>` bold and underlined, over a blue background; not much but it's honest work.