import { useEffect, useState } from 'react';
import { Card } from '../components/ui/Card.jsx';
import { Button } from '../components/ui/Button.jsx';
import { Link } from 'react-router-dom';

export default function Home() {
  const [width, setWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex flex-col gap-8">
      {/* Hero section: using flex (stacked on mobile, side-by-side on md:) */}
      <section className="flex flex-col md:flex-row items-center justify-between gap-6 rounded-card border border-line bg-surface p-6 md:p-10 shadow-sm">
        <div className="flex flex-col gap-4">
          <span className="text-sm font-semibold text-primary">Assignment 1.3 &bull; Styling Systems</span>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-fg">
            Responsive Frontend Lab
          </h1>
          <p className="text-muted text-base md:text-lg max-w-xl">
            Built with Tailwind CSS v4, custom CSS-variable design tokens (light and dark mode), and reusable primitives.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Button as={Link} to="/users" variant="primary">
              Browse Users Directory
            </Button>
            <span className="text-xs font-mono text-muted border border-line rounded px-2.5 py-1.5 bg-bg">
              Viewport: {width}px
            </span>
          </div>
        </div>
      </section>

      {/* 3-feature grid using grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] */}
      <section className="grid grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] gap-4">
        <Card className="flex flex-col gap-2">
          <h3 className="font-semibold text-lg text-fg">Tailwind v4 Engine</h3>
          <p className="text-sm text-muted">
            Configured with <code>@tailwindcss/vite</code> plugin with native CSS-first configuration and zero unnecessary runtime overhead.
          </p>
        </Card>
        <Card className="flex flex-col gap-2">
          <h3 className="font-semibold text-lg text-fg">Design Tokens</h3>
          <p className="text-sm text-muted">
            Tokens defined in CSS variables and mapped via <code>@theme inline</code> for automatic dark-mode recoloring.
          </p>
        </Card>
        <Card className="flex flex-col gap-2">
          <h3 className="font-semibold text-lg text-fg">Flexbox &amp; Grid</h3>
          <p className="text-sm text-muted">
            Composes 1-dimensional Flexbox for headers and actions with 2-dimensional responsive CSS Grids for card listings.
          </p>
        </Card>
      </section>
    </div>
  );
}
