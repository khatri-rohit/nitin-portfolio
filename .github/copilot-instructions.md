# Nitin Portfolio - Copilot Instructions

## Project Overview

A single-page portfolio website for a VFX/Graphic Designer built with Next.js 15 (App Router), React 19, and heavy animation libraries (GSAP, Motion/Framer Motion). The site features a preloader, smooth scrolling via Lenis, and rich scroll-triggered animations.

## Architecture

### Component Structure

- **Entry Point**: `src/app/page.tsx` → `HomeClient` (client component orchestrator)
- **Section Components**: `HeroSection`, `About`, `CreativeFields`, `Exprience`, `Contact`
- **Utility Components**: `PreLoader`, `Navbar`, `TextReveal`, `MagneticEffect`
- **Data Files**: `timelineData.ts`, `creativeFieldData.ts` - keep data separate from components

### Key Patterns

```
src/Components/[SectionName]/
  ├── SectionName.tsx    # Main component
  └── relatedData.ts     # Data/config (if needed)
```

## Animation Stack

### Libraries & Usage

| Library                  | Purpose                               | Example File                      |
| ------------------------ | ------------------------------------- | --------------------------------- |
| `motion/react`           | Component animations, AnimatePresence | `HomeClient.tsx`, `PreLoader.tsx` |
| `gsap` + `ScrollTrigger` | Scroll-based reveals, SplitText       | `TextReveal.tsx`, `About.tsx`     |
| `lenis`                  | Smooth scroll behavior                | `HomeClient.tsx`                  |

### Animation Conventions

- Use `'use client'` directive for all animated components
- GSAP for text reveals with `SplitText` plugin (see `TextReveal.tsx`)
- Motion for enter/exit transitions with `AnimatePresence`
- Mobile detection disables complex effects (magnifying glass, hover states)

```tsx
// Standard mobile check pattern used throughout
const checkIsMobile = () => {
  const isMobileUA =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      userAgent
    );
  const isTouchDevice =
    "ontouchstart" in window || navigator.maxTouchPoints > 0;
  const isSmallScreen = window.innerWidth <= 1024;
  return isMobileUA || isTouchDevice || isSmallScreen;
};
```

## Styling

### Tailwind 4 + Custom Fonts

- Tailwind imported via `@import "tailwindcss"` in `globals.css`
- Custom fonts: `dahlia`, `dahlia-bold`, `SpaceGrotesk` variants
- Use utility classes: `.font-dahlia`, `.font-SpaceGrotesk`, `.font-SpaceGrotesk-light`
- CSS variables: `--background: #0F0E0E`, `--foreground: #ededed`

### Responsive Design

- Mobile-first breakpoints: `sm:`, `lg:`, `xl:`, `2xl:`
- Navbar hidden on mobile (`!isMobile && <Navbar />`)
- Section padding scales: `p-4 sm:p-6 lg:p-10`

## Contact Form Flow

The contact section uses a multi-step form with typed state machine:

```tsx
type Step =
  | "name"
  | "statement1"
  | "through"
  | "statement3"
  | "service"
  | "statement2"
  | "email"
  | "completion"
  | "complete";
```

State is lifted to `HomeClient` and passed down to coordinate focus between `CreativeFields` and `Contact` sections.

## Development Commands

```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build (ignores TS/ESLint errors - see next.config.ts)
npm run lint     # ESLint check
```

## File Naming & Conventions

- Components: PascalCase (`HeroSection.tsx`)
- Utilities/hooks: camelCase (`useMousePosition.ts`, `scrollbarManager.ts`)
- Data files: camelCase (`timelineData.ts`, `creativeFieldData.ts`)
- **Note**: "Experience" is spelled as `Exprience` throughout (existing typo, maintain consistency)

## Assets

- `/public/fonts/` - Custom font files (.woff, .ttf)
- `/public/img/` - Static images, organized by section (`Brand/`, `exprience/`)
- `/public/videos/` - Background and showcase videos (.webm, .mp4)

## Key Dependencies

- `@gsap/react` - React hooks for GSAP (`useGSAP`)
- `@mui/material` + `@mui/icons-material` - Navbar icons, Box component
- `@iconify/react` - Social media icons in About section
- `@vercel/analytics` - Analytics integration (already configured in layout)

## Common Ref Patterns

Sections use forwarded refs for scroll navigation:

```tsx
interface Props {
  sectionRef: React.RefObject<HTMLElement | null>;
}
```

Navbar receives all section refs for intersection-based active state tracking.
