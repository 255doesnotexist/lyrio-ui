import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceArea } from "recharts";
import dayjs from "dayjs";

import style from "./RatingGraph.module.less";
import { useLocalizer, Link } from "@/utils/hooks";
import { getRatingColor, getRatingTierI18nKey, RATING_TIERS } from "@/utils/rating";

interface RatingGraphProps {
  ratingHistory: ApiTypes.RatingChangeDto[];
}

interface ChartDataPoint {
  index: number;
  contestTitle: string;
  rating: number;
  ratingChange: number;
  rank: number | null;
  participantCount: number | null;
  time: string;
  contestId: number | null;
}

const RatingGraph: React.FC<RatingGraphProps> = props => {
  const _ = useLocalizer("user");
  const [hoveredPoint, setHoveredPoint] = useState<{
    data: ChartDataPoint;
    x: number;
    y: number;
  } | null>(null);

  // Prepare data for chart - always start with initial 1500 rating like Codeforces
  const initialData: ChartDataPoint = {
    index: -1,
    contestTitle: "Initial",
    rating: 1500,
    ratingChange: 0,
    rank: null,
    participantCount: null,
    time: "",
    contestId: null
  };

  const ratingChangesData: ChartDataPoint[] =
    props.ratingHistory && props.ratingHistory.length > 0
      ? props.ratingHistory.map(
          (change, index): ChartDataPoint => ({
            index,
            contestTitle: change.contestTitle,
            rating: change.newRating,
            ratingChange: change.ratingChange,
            rank: change.rank,
            participantCount: change.participantCount,
            time: dayjs(change.time).format("YYYY-MM-DD"),
            contestId: change.contestId
          })
        )
      : [];

  // Always include initial 1500 rating point at the start
  const chartData: ChartDataPoint[] = [initialData, ...ratingChangesData];

  // Calculate rating range for Y-axis
  const ratings = chartData.map(d => d.rating);
  const minRating = Math.min(...ratings);
  const maxRating = Math.max(...ratings);
  const ratingRange = maxRating - minRating;
  const yAxisMin = Math.max(0, Math.floor((minRating - ratingRange * 0.1) / 100) * 100);
  const yAxisMax = Math.ceil((maxRating + ratingRange * 0.1) / 100) * 100;

  // Determine which tier backgrounds to show based on Y-axis range
  const visibleTiers = RATING_TIERS.filter(tier => tier.min < yAxisMax && tier.max > yAxisMin);

  // Generate Y-axis ticks aligned with tier boundaries (Codeforces style)
  const tierBoundaries = [1200, 1400, 1600, 1900, 2100, 2300, 2400, 2600, 3000];
  const yAxisTicks = tierBoundaries.filter(tick => tick >= yAxisMin && tick <= yAxisMax);

  // Add min and max if they're not already included
  if (yAxisTicks.length === 0 || yAxisTicks[0] > yAxisMin + 100) {
    yAxisTicks.unshift(yAxisMin);
  }
  if (yAxisTicks[yAxisTicks.length - 1] < yAxisMax - 100) {
    yAxisTicks.push(yAxisMax);
  }

  // Custom dot component that handles hover
  const CustomDot = (props: { cx: number; cy: number; payload: ChartDataPoint }) => {
    const { cx, cy, payload } = props;
    const isHovered = hoveredPoint?.data.index === payload.index;

    return (
      <circle
        cx={cx}
        cy={cy}
        r={isHovered ? 4.5 : 3}
        fill="white"
        stroke="#FFCC00"
        strokeWidth={isHovered ? 2.5 : 2}
        onMouseEnter={() => setHoveredPoint({ data: payload, x: cx, y: cy })}
        style={{ cursor: "pointer" }}
      />
    );
  };

  const renderTooltip = () => {
    if (!hoveredPoint) return null;

    const { data, x, y } = hoveredPoint;

    // Position tooltip to the right of the dot, offset by 15px
    const tooltipStyle = {
      left: `${x + 15}px`,
      top: `${y - 10}px`
    };

    // For initial rating point, show simplified tooltip
    if (data.index === -1) {
      const tierKey = getRatingTierI18nKey(data.rating);
      return (
        <div className={style.tooltipWrapper} style={tooltipStyle} onMouseEnter={e => e.stopPropagation()}>
          <div className={style.tooltip}>
            <div className={style.tooltipContest}>{_(".rating_graph.initial_rating")}</div>
            <div className={style.tooltipRating}>
              <span style={{ color: getRatingColor(data.rating), fontWeight: "bolder" }}>{data.rating}</span>
            </div>
            <div className={style.tooltipTier} style={{ color: getRatingColor(data.rating) }}>
              {_(".rating_tier." + tierKey)}
            </div>
          </div>
        </div>
      );
    }

    const tierKey = getRatingTierI18nKey(data.rating);

    return (
      <div className={style.tooltipWrapper} style={tooltipStyle} onMouseEnter={e => e.stopPropagation()}>
        <div className={style.tooltip}>
          <Link href={`/c/${data.contestId}`} className={style.tooltipContest}>
            {data.contestTitle}
          </Link>
          <div className={style.tooltipTime}>{data.time}</div>
          <div className={style.tooltipRating}>
            <span style={{ color: getRatingColor(data.rating), fontWeight: "bolder" }}>{data.rating}</span>
            <span className={data.ratingChange >= 0 ? style.ratingUp : style.ratingDown}>
              ({data.ratingChange >= 0 ? "+" : ""}
              {data.ratingChange})
            </span>
          </div>
          <div className={style.tooltipTier} style={{ color: getRatingColor(data.rating) }}>
            {_(".rating_tier." + tierKey)}
          </div>
          <div className={style.tooltipRank}>
            {_(".rating_graph.rank")}: {data.rank} / {data.participantCount}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={style.ratingGraph} onMouseLeave={() => setHoveredPoint(null)}>
      {renderTooltip()}
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
          {/* Background tier colors - Codeforces style */}
          {visibleTiers.map((tier, index) => (
            <ReferenceArea
              key={index}
              y1={tier.min}
              y2={tier.max}
              fill={tier.color}
              fillOpacity={0.15}
              ifOverflow="hidden"
            />
          ))}
          <CartesianGrid strokeDasharray="3 3" stroke="#e8e8e8" strokeOpacity={0.5} />
          <XAxis dataKey="index" tick={false} stroke="#ccc" strokeWidth={1} />
          <YAxis
            domain={[yAxisMin, yAxisMax]}
            ticks={yAxisTicks}
            stroke="#ccc"
            strokeWidth={1}
            tick={{ fontSize: 11, fill: "#767676" }}
            width={40}
          />
          {/* Gold line with white-filled dots - Codeforces style */}
          <Line type="monotone" dataKey="rating" stroke="#FFCC00" strokeWidth={2} dot={<CustomDot />} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RatingGraph;
