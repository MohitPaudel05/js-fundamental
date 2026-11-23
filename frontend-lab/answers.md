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


