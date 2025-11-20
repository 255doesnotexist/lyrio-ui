/**
 * Get the color for a rating value (Codeforces-style)
 */
export function getRatingColor(rating: number | undefined | null): string {
  if (rating === undefined || rating === null) {
    return "#808080"; // gray (unrated/default)
  }

  if (rating >= 2400) return "#ff0000"; // red (legendary grandmaster)
  if (rating >= 2300) return "#ff3333"; // red (international grandmaster)
  if (rating >= 2100) return "#ff7777"; // red (grandmaster)
  if (rating >= 1900) return "#ff8c00"; // orange (master)
  if (rating >= 1600) return "#a0a"; // violet (candidate master)
  if (rating >= 1400) return "#0000ff"; // blue (expert)
  if (rating >= 1200) return "#03a89e"; // cyan (specialist)
  return "#808080"; // gray (newbie/pupil)
}

/**
 * Get the tier name for a rating value
 */
export function getRatingTier(rating: number | undefined | null): string {
  if (rating === undefined || rating === null) {
    return "Unrated";
  }

  if (rating >= 2400) return "Legendary Grandmaster";
  if (rating >= 2300) return "International Grandmaster";
  if (rating >= 2100) return "Grandmaster";
  if (rating >= 1900) return "Master";
  if (rating >= 1600) return "Candidate Master";
  if (rating >= 1400) return "Expert";
  if (rating >= 1200) return "Specialist";
  if (rating >= 800) return "Pupil";
  return "Newbie";
}
