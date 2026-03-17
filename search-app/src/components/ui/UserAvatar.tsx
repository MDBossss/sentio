import React from "react";

interface UserAvatarProps {
  imageUrl?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  className?: string;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({
  imageUrl,
  firstName,
  lastName,
  className = "",
}) => {
  const initial = (firstName?.[0] || "?").toUpperCase();
  const fullName = firstName || "User";

  if (imageUrl) {
    return (
      <img
        src={imageUrl}
        alt={`${fullName}'s avatar`}
        className={`h-12 w-12 rounded-full object-cover ${className}`}
      />
    );
  }

  return (
    <div
      className={`flex h-12 w-12 items-center justify-center rounded-full border-2 border-emerald-400 bg-white/5 text-sm font-semibold text-emerald-300 ${className}`}
    >
      {initial}
    </div>
  );
};
