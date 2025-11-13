# LawWork Brand Components

This directory contains brand-consistent components for the LawWork application.

## Brand Colors

The LawWork brand uses a two-color system defined in `globals.css`:

- **Law** (Blue): `hsl(var(--brand-law-blue))` → `210 85% 45%`
- **Work** (Orange/Coral): `hsl(var(--brand-work-orange))` → `12 85% 65%`

## Components

### `<BrandName />`

Displays the LawWork brand name with consistent color styling.

**Usage:**

```tsx
import { BrandName } from '@/components/brand';

// Default usage
<BrandName />

// With custom className
<BrandName className="text-2xl" />

// With custom text (for variations)
<BrandName lawText="Custom" workText="Brand" />
```

**Props:**

- `className?: string` - Additional CSS classes to apply
- `lawText?: string` - Custom text for the first part (default: "Law")
- `workText?: string` - Custom text for the second part (default: "Work")

## CSS Utilities

The following utility classes are available globally:

- `.brand-law` - Applies blue color to text
- `.brand-work` - Applies orange/coral color to text
- `.brand-name` - Base styling for brand name (font-weight: bold)

## Implementation Notes

**ALWAYS use the `<BrandName />` component** when displaying the LawWork brand name. This ensures:

1. **Color Consistency** - Law is always blue, Work is always orange
2. **Global Updates** - Changes to brand colors update everywhere automatically
3. **Maintainability** - Single source of truth for brand styling
4. **Accessibility** - Proper semantic HTML structure

## Examples Across the Application

### Header (Always Visible)
```tsx
<Link href="/">
  <BrandName className="text-xl" />
</Link>
```

### Page Titles
```tsx
<h1>Why Choose <BrandName className="text-3xl" />?</h1>
```

### Footer
```tsx
<p>© 2025 <BrandName className="text-sm" />. All rights reserved.</p>
```

## Future Extensions

To add more brand components:

1. Create new component in this directory
2. Export from `index.ts`
3. Follow the same color system using CSS variables
4. Document in this README
