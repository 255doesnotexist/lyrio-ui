import React from "react";
import { getUsernameParts } from "./rating";

/**
 * Render username with Legendary Grandmaster styling (first char black, rest red)
 * For rating >= 3000, first character is black, rest is red
 * For other ratings, all characters are colored according to rating tier
 */
export function renderUsername(username: string, rating: number | undefined | null): React.ReactElement {
  const parts = getUsernameParts(username, rating);

  if (parts.isLegendary) {
    return (
      <>
        <span style={{ color: "#000000", fontWeight: 500 }}>{parts.firstChar}</span>
        <span style={{ color: parts.color, fontWeight: 500 }}>{parts.restChars}</span>
      </>
    );
  }

  return <span style={{ color: parts.color, fontWeight: 500 }}>{parts.restChars}</span>;
}
