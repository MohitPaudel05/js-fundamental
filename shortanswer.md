
# JavaScript Fundamentals - Assignment 1.1

## Part C: Event Loop Ordering Lab

### Predicted Output

```text
1 sync start
2 sync inside async fn (before first await)
2b sync end
4 microtask: promise.then
5 microtask: queueMicrotask
5b microtask: after await
3 nextTick
6 macrotask: setTimeout 0
7 macrotask: setImmediate
```

### Actual Output

```text
1 sync start
2 sync inside async fn (before first await)
2b sync end
4 microtask: promise.then
5 microtask: queueMicrotask
5b microtask: after await
3 nextTick
6 macrotask: setTimeout 0
7 macrotask: setImmediate
```

Note: The order of setTimeout and setImmediate can vary.

### Starvation Output

```text
microtasks done
timer never fires while microtasks recurse
```

### Explanation

Microtasks are processed before timer callbacks. Continuous microtask execution delays the timer. This is called Microtask Starvation.

## Short Answers

### 1. CommonJS vs ES Modules

- CommonJS uses require() and module.exports, whereas ES Modules use import and export.
- CommonJS loads modules at runtime, whereas ES Modules support static analysis and tree-shaking.

### 2. Why doesn't await block the thread?

Await pauses the execution of the current async function until a Promise settles. It does not block the JavaScript thread, allowing other tasks to execute.

### 3. Why do microtasks run before setTimeout(0)?

JavaScript processes the microtask queue after the current job finishes and before moving to the next event-loop task, such as a timer callback.



# Assignment 1.2: Short Answers

### 1. CSR vs SSR vs SSG (One use case each)

- **CSR (Client-Side Rendering)**: 
  The server delivers a bare HTML shell (`<div id="root"></div>`) and the browser downloads and runs JavaScript to render the UI.
  - *Use Case*: **Authenticated SaaS Dashboards / Admin Portals** (e.g., Jira, analytics tools) where content is behind a login and SEO is not required.

- **SSR (Server-Side Rendering)**: 
  The server renders full HTML on each incoming request and sends it to the browser, where React hydrates it to attach event handlers.
  - *Use Case*: **Dynamic E-Commerce / Social Feeds** (e.g., product pages or Twitter timelines) where data changes constantly and must be indexed by search engine crawlers.

- **SSG (Static Site Generation)**: 
  HTML pages are pre-rendered at build time and served statically via CDNs.
  - *Use Case*: **Documentation / Blogs** (e.g., React or Vite documentation) where content rarely changes between deployments and demands instant loading with minimal server overhead.

---

### 2. What Hydration Is

**Hydration** is the process where client-side JavaScript attaches event listeners (e.g., `onClick`, `onChange`) and initializes component state on top of pre-existing server-rendered HTML, transforming static markup into an interactive React application without re-creating DOM nodes from scratch.

A **hydration mismatch** occurs when the HTML generated on the server differs from the initial client render (for example, rendering `Date.now()`, using browser-only APIs like `window.innerWidth`, or timezone differences). React then has to discard or patch the mismatched DOM nodes.

---

### 3. When Context is the Wrong Tool

1. **High-Frequency State Updates**: React Context triggers re-renders on all consuming components whenever the context value reference updates. For rapidly changing state (e.g., mouse positions, real-time stock tickers, or complex animations), dedicated atomic state libraries (such as Zustand) are better suited.
2. **Server State Caching**: Context does not provide built-in request caching, deduplication, retry logic, or stale-while-revalidate capabilities. Dedicated data fetching tools (like TanStack Query / React Query) should be used instead.
3. **Complex Local Subtrees**: Pushing local component state into global Context leads to unnecessary coupling and prop-drilling in reverse.

---




# Assignment 1.3: Short Answers

### 1. When to choose CSS Grid vs. Flexbox

- **Flexbox (1-Dimensional)**:
  - **Concept**: Distributes space along a single axis at a time (row or column).
  - **Rule of Thumb**: Choose Flexbox when **content size dictates the layout**.
  - **Best For**: Navigation bars, toolbars, centering an item, button groups, and fluid inline item alignment with `gap` and `flex-wrap`.

- **CSS Grid (2-Dimensional)**:
  - **Concept**: Aligns items simultaneously along both rows and columns.
  - **Rule of Thumb**: Choose Grid when the **layout grid dictates the content size**.
  - **Best For**: Full-page dashboards, multi-column card directories, photo galleries, and responsive auto-filling columns (e.g. `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` or `repeat(auto-fill, minmax(16rem, 1fr))`).

- **Composition**: They complement each other. In this lab, the overall layout uses Flexbox for the navbar and hero header, while the users list and feature showcase use CSS Grid.

---

### 2. Utility-First CSS (Tailwind): Two Pros and Two Cons

#### Pros:
1. **No Dead CSS & Minimal Bundle Size**: Tailwind scans source files at build time and only generates the exact CSS classes actually used in markup. Production stylesheets remain tiny regardless of project scale.
2. **Design Consistency & Speed**: Eliminates bikeshedding over CSS class names (BEM). Spacing, typography, and color scales remain strictly standardized across the entire team.

#### Cons:
1. **Cluttered Markup**: Long lists of utility class names in JSX can make markup noisy and harder to scan without extracting reusable component primitives.
2. **Learning Curve & Vocabulary**: Developers must memorize framework-specific class names (e.g., `focus-visible:outline-offset-2`, `leading-tight`) rather than writing standard CSS properties directly.

---

### 3. Why Design Tokens Beat Hard-Coded Colors

1. **Single Source of Truth**: When brand colors change or need fine-tuning, changing `--primary` once updates all buttons, focus rings, links, and badges instantly across the entire application.
2. **Seamless Dark Mode & Theming**: By referencing semantic tokens (`bg-surface`, `text-fg`, `border-line`) rather than hardcoded hex values (`#ffffff`, `#000000`), switching `data-theme="dark"` automatically recolors the entire interface with zero JavaScript style recalculation or duplicated stylesheets.
3. **Improved Accessibility & Contrast Guarantees**: Semantic tokens like `--primary` paired with `--primary-contrast` guarantee that text-to-background contrast ratios (WCAG AA &ge; 4.5:1) remain consistent across both themes.



---

### 4. Bonus (+2 Marks): Accessible Focus Styles & Lighthouse Audit

- **Focus-Visible Styling**: All interactive elements (`Button`, `NavLink`, text inputs) implement high-visibility keyboard focus rings using `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary`. This provides clear visual cues for keyboard navigation (Tab/Shift+Tab) without displaying distracting outlines during mouse clicks.
- **Valid Semantic Hierarchy**: Interactive controls avoid illegal nesting (e.g., using `Button as={Link}` instead of placing `<button>` inside `<Link>` / `<a>`), which eliminates accessibility tree validation errors.
- **Accessible Form Controls**: The persistent search input on `/users` and the email field on `/login` feature explicit `aria-label` and `<label>` bindings.
- **Color Contrast Ratios**: Light mode body text (`#0f172a` on `#ffffff`, 15.8:1) and dark mode text (`#e2e8f0` on `#131c2e`, 12.3:1) easily exceed WCAG AA (4.5:1) and AAA (7.0:1) requirements.
- **Lighthouse Verification**: Evaluated under Chrome DevTools Lighthouse audit for Accessibility, achieving a score of **100/100** (&ge; 95 required).


---

# Assignment 1.4: Short Answers

### 1. Server State vs. Client State

| Property | Server State | Client (UI) State |
| :--- | :--- | :--- |
| **Ownership** | Resides on remote servers. The browser only holds an asynchronous cached snapshot. | Created and owned entirely inside the browser memory. |
| **Persistence** | Persists across user sessions on the backend. | Transient; disappears on refresh unless explicitly saved in local storage. |
| **Challenges** | Asynchronous fetching, background synchronization, cache staleness, request deduplication, network retries. | Sharing state across components, avoiding unnecessary re-renders. |
| **Ideal Tool** | **TanStack Query**, SWR, RTK Query. | **Zustand**, React Context, `useState`. |
| **Examples** | User records, product catalog, orders. | Modal open/closed, active tab index, current view mode (`grid` vs `list`). |

### 2. One Reason to Choose Redux Toolkit Over Zustand

Redux Toolkit provides strict architectural conventions, centralized action dispatching, and robust middleware support (e.g., deterministic time-travel debugging, listener middleware, complex audit logging). For large enterprise teams, this strict structure prevents inconsistent state mutation patterns across distributed codebases.

### 3. What `staleTime` Does

`staleTime` specifies how long cached data remains "fresh" before becoming "stale". Within `staleTime`, component mounts and window refocuses do not trigger network refetches, eliminating redundant requests during fast page navigations.

### 4. Why `invalidateQueries` is Preferred

`invalidateQueries` refetches authoritative data directly from the backend rather than assuming or manually predicting server side-effects (e.g., auto-generated IDs, database triggers, timestamps). This ensures client cache never falls out of sync with the true source of truth.

### 5. Bonus (+2 Marks): Optimistic Update Notes

Implemented `useToggleFavorite` in `src/hooks/useUsers.js` with `onMutate` (cancels active queries, snapshots cache, applies optimistic toggle), `onError` (rolls back cache to previous snapshot on failure), and `onSettled` (invalidates queries).
