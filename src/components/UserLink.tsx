import React from "react";

import { UserMeta } from "@/interfaces/UserMeta";
import { Link } from "@/utils/hooks";
import { getRatingColor } from "@/utils/rating";

interface UserLinkProps {
  user: UserMeta;
  className?: string;
  style?: React.CSSProperties;
}

const UserLink: React.FC<UserLinkProps> = props => {
  const escapedUsername = encodeURIComponent(props.user.username);
  const ratingColor = getRatingColor(props.user.rating);
  const isLegendary = props.user.rating && props.user.rating >= 3000;

  // Legendary Grandmaster: first character black, rest red
  if (isLegendary && !props.children) {
    const username = props.user.username;
    const firstChar = username.charAt(0);
    const restChars = username.slice(1);

    return (
      <Link
        href={`/u/${escapedUsername}`}
        className={props.className}
        style={{
          fontWeight: 500,
          ...props.style
        }}
      >
        <span style={{ color: "#000000" }}>{firstChar}</span>
        <span style={{ color: ratingColor }}>{restChars}</span>
      </Link>
    );
  }

  return (
    <Link
      href={`/u/${escapedUsername}`}
      className={props.className}
      style={{
        color: ratingColor,
        fontWeight: 500,
        ...props.style
      }}
    >
      {props.children || props.user.username}
    </Link>
  );
};

export default UserLink;
