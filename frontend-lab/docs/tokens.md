# Design Tokens Documentation

This design system uses CSS custom properties defined in `src/index.css` and exposed to Tailwind CSS v4 using `@theme inline`. The theme is controlled dynamically by the `data-theme` attribute managed via `ThemeContext`.

---

## Token Reference Table

| Token Variable | Tailwind Utility | Light Value | Dark Value | Semantic Usage |
| :--- | :--- | :--- | :--- | :--- |
| `--bg` | `bg-bg` | `#f8fafc` (slate-50) | `#0b1220` (slate-950) | Main page canvas background |
| `--surface` | `bg-surface` | `#ffffff` (white) | `#131c2e` (slate-900) | Elevated cards, navigation bar, modals |
| `--text` | `text-fg` | `#0f172a` (slate-900) | `#e2e8f0` (slate-200) | Primary body and heading text |
| `--muted` | `text-muted` | `#64748b` (slate-500) | `#94a3b8` (slate-400) | Subtitles, helper text, inactive navigation links |
| `--primary` | `bg-primary`, `text-primary`, `outline-primary` | `#0ea5e9` (sky-500) | `#38bdf8` (sky-400) | Primary brand buttons, links, active highlights, focus rings |
| `--primary-contrast`| `text-primary-contrast` | `#ffffff` (white) | `#06202e` (dark navy) | Text overlaid on top of `--primary` surfaces |
| `--border` | `border-line` | `#e2e8f0` (slate-200) | `#243049` (slate-800) | Card boundaries, dividers, input borders |
| `--radius` | `rounded-card` | `0.75rem` (12px) | `0.75rem` (12px) | Standard border radius for cards, inputs, and buttons |
| `--font-sans` | `font-sans` | `"Inter", system-ui, sans-serif` | `"Inter", system-ui, sans-serif` | Base typographic font family |

---

## Architecture Flow

1. **Tokens (CSS Variables)**: Defined under `:root` and `[data-theme="dark"]`.
2. **Tailwind v4 Integration**: `@theme inline` maps custom CSS variables into utility classes like `bg-surface` and `text-muted`.
3. **UI Primitives**: `Button` and `Card` wrap these utility classes so components maintain uniform styling without hardcoded hex codes.
4. **Theme Synchronization**: Changing `document.documentElement.dataset.theme = 'dark'` immediately re-evaluates all CSS variables without reloading or re-rendering React trees.
