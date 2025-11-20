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
