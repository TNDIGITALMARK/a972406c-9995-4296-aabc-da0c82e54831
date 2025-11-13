"use client";

interface AvatarPlaceholderProps {
  name: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function AvatarPlaceholder({
  name,
  size = "md",
  className = "",
}: AvatarPlaceholderProps) {
  const getInitials = (name: string) => {
    const parts = name.split(" ");
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const sizeClasses = {
    sm: "w-10 h-10 text-sm",
    md: "w-12 h-12 text-base",
    lg: "w-16 h-16 text-lg",
  };

  // Generate a consistent color based on the name
  const getColorFromName = (name: string) => {
    const colors = [
      "bg-blue-500",
      "bg-green-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-indigo-500",
      "bg-yellow-500",
      "bg-red-500",
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <div
      className={`
        ${sizeClasses[size]}
        ${getColorFromName(name)}
        rounded-full flex items-center justify-center text-white font-semibold
        border-2 border-gray-200
        ${className}
      `}
    >
      {getInitials(name)}
    </div>
  );
}
