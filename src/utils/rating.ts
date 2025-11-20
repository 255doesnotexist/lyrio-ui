/**
 * Codeforces-style rating tier definitions
 * Used for background colors in rating graphs and tier calculations
 */
export interface RatingTier {
  min: number;
  max: number;
  color: string;
  textColor: string;
  i18nKey: string;
}

export const RATING_TIERS: RatingTier[] = [
  { min: 0, max: 1199, color: "#cccccc", textColor: "#808080", i18nKey: "newbie" },
  { min: 1200, max: 1399, color: "#77dd77", textColor: "#03a89e", i18nKey: "pupil" },
  { min: 1400, max: 1599, color: "#77ddbb", textColor: "#03a89e", i18nKey: "specialist" },
  { min: 1600, max: 1899, color: "#aaaaff", textColor: "#0000ff", i18nKey: "expert" },
  { min: 1900, max: 2099, color: "#ff88ff", textColor: "#a0a", i18nKey: "candidate_master" },
  { min: 2100, max: 2299, color: "#ffcc88", textColor: "#ff8c00", i18nKey: "master" },
  { min: 2300, max: 2399, color: "#ffbb55", textColor: "#ff8c00", i18nKey: "international_master" },
  { min: 2400, max: 2999, color: "#ff7777", textColor: "#ff0000", i18nKey: "grandmaster" },
  { min: 3000, max: 5000, color: "#aa0000", textColor: "#ff0000", i18nKey: "legendary_grandmaster" }
];

/**
 * Get the rating tier for a given rating value
 */
export function getRatingTierInfo(rating: number | undefined | null): RatingTier | null {
  if (rating === undefined || rating === null) {
    return null;
  }

  for (const tier of RATING_TIERS) {
    if (rating >= tier.min && rating <= tier.max) {
      return tier;
    }
  }

  // If rating is above all tiers, return the highest tier
  return RATING_TIERS[RATING_TIERS.length - 1];
}

/**
 * Get the color for a rating value (Codeforces-style)
 */
export function getRatingColor(rating: number | undefined | null): string {
  if (rating === undefined || rating === null) {
    return "#808080"; // gray (unrated/default)
  }

  const tier = getRatingTierInfo(rating);
  return tier ? tier.textColor : "#808080";
}

/**
 * Get the tier i18n key for a rating value
 * Usage: _(".rating_tier." + getRatingTierI18nKey(rating))
 */
export function getRatingTierI18nKey(rating: number | undefined | null): string {
  if (rating === undefined || rating === null) {
    return "unrated";
  }

  const tier = getRatingTierInfo(rating);
  return tier ? tier.i18nKey : "newbie";
}

/**
 * Check if a rating qualifies as Legendary Grandmaster (>= 3000)
 */
export function isLegendaryGrandmaster(rating: number | undefined | null): boolean {
  return rating !== undefined && rating !== null && rating >= 3000;
}

/**
 * Get username parts for rendering (for Legendary Grandmaster special styling)
 * Returns { firstChar, restChars, isLegendary, color }
 */
export function getUsernameParts(username: string, rating: number | undefined | null) {
  const isLegendary = isLegendaryGrandmaster(rating);
  const color = getRatingColor(rating);

  if (isLegendary) {
    return {
      firstChar: username.charAt(0),
      restChars: username.slice(1),
      isLegendary: true,
      color
    };
  }

  return {
    firstChar: "",
    restChars: username,
    isLegendary: false,
    color
  };
}
