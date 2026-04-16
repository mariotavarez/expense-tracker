# Design System Inspired by Vercel

> Source: [VoltAgent/awesome-design-md](https://github.com/VoltAgent/awesome-design-md/tree/main/design-md/vercel)
> Generated with: `npx getdesign@latest add vercel`

## Philosophy
Developer infrastructure made invisible. White canvas. Every element earns its pixel. Minimalism as engineering principle.

## Colors

| Token | Value | Use |
|---|---|---|
| `--color-bg` | `#ffffff` | Page background |
| `--color-text` | `#171717` | Primary text (Vercel Black) |
| `--color-secondary` | `#4d4d4d` | Secondary text |
| `--color-muted` | `#666666` | Tertiary text |
| `--color-surface` | `#fafafa` | Subtle surface tint |
| `--color-border` | `#ebebeb` | Solid borders |
| `--ship-red` | `#ff5b4f` | Expenses, danger |
| `--develop-blue` | `#0a72ef` | Income, info |
| `--link-blue` | `#0072f5` | Links |

## Shadow-as-border (Vercel's signature)
Replace CSS `border` with: `box-shadow: 0px 0px 0px 1px rgba(0,0,0,0.08)`

## Typography
- Family: `Geist` or `Inter, -apple-system, sans-serif`
- Display 48px: weight 700, letter-spacing -2.4px
- Heading 32px: weight 600, letter-spacing -1.6px
- Body 16px: weight 400, letter-spacing -0.2px

## Buttons
- Primary: bg `#171717`, white text, radius 6px
- Ghost: white bg, shadow-as-border, `#171717` text
