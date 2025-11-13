import React from 'react';

interface BrandNameProps {
  className?: string;
  lawText?: string;
  workText?: string;
}

/**
 * BrandName Component
 *
 * Displays the LawWork brand name with consistent styling:
 * - "Law" in blue (hsl(var(--brand-law-blue)))
 * - "Work" in orange/coral (hsl(var(--brand-work-orange)))
 *
 * Usage:
 * <BrandName />
 * <BrandName className="text-2xl" />
 * <BrandName lawText="Custom" workText="Brand" />
 */
export function BrandName({
  className = "",
  lawText = "Law",
  workText = "Work"
}: BrandNameProps) {
  return (
    <span className={`brand-name font-bold ${className}`}>
      <span className="brand-law">{lawText}</span>
      <span className="brand-work">{workText}</span>
    </span>
  );
}
