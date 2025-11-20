import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import dayjs from "dayjs";

import style from "./RatingGraph.module.less";
import { useLocalizer } from "@/utils/hooks";

interface RatingGraphProps {
  ratingHistory: ApiTypes.RatingChangeDto[];
}

const RatingGraph: React.FC<RatingGraphProps> = props => {
  const _ = useLocalizer("user");

  if (!props.ratingHistory || props.ratingHistory.length === 0) {
    return (
      <div className={style.noData}>
        {_(".rating_graph.no_data")}
      </div>
    );
  }

  // Prepare data for chart
  const chartData = props.ratingHistory.map((change, index) => ({
    index,
    contestTitle: change.contestTitle,
    rating: change.newRating,
    ratingChange: change.ratingChange,
    rank: change.rank,
    participantCount: change.participantCount,
    time: dayjs(change.time).format("YYYY-MM-DD"),
    contestId: change.contestId
  }));

  // Calculate rating range for Y-axis
  const ratings = chartData.map(d => d.rating);
  const minRating = Math.min(...ratings);
  const maxRating = Math.max(...ratings);
  const ratingRange = maxRating - minRating;
  const yAxisMin = Math.max(0, Math.floor((minRating - ratingRange * 0.1) / 100) * 100);
  const yAxisMax = Math.ceil((maxRating + ratingRange * 0.1) / 100) * 100;

  // Rating color function (similar to Codeforces)
  const getRatingColor = (rating: number): string => {
    if (rating >= 2400) return "#ff0000"; // red (legendary grandmaster)
    if (rating >= 2300) return "#ff3333"; // red (international grandmaster)
    if (rating >= 2100) return "#ff7777"; // red (grandmaster)
    if (rating >= 1900) return "#ff8c00"; // orange (master)
    if (rating >= 1600) return "#a0a"; // violet (candidate master)
    if (rating >= 1400) return "#0000ff"; // blue (expert)
    if (rating >= 1200) return "#03a89e"; // cyan (specialist)
    return "#808080"; // gray (newbie/pupil)
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className={style.tooltip}>
          <div className={style.tooltipContest}>{data.contestTitle}</div>
          <div className={style.tooltipTime}>{data.time}</div>
          <div className={style.tooltipRating}>
            <span style={{ color: getRatingColor(data.rating) }}>{_(".rating_graph.rating")}: {data.rating}</span>
            <span className={data.ratingChange >= 0 ? style.ratingUp : style.ratingDown}>
              {data.ratingChange >= 0 ? "+" : ""}{data.ratingChange}
            </span>
          </div>
          <div className={style.tooltipRank}>
            {_(".rating_graph.rank")}: {data.rank} / {data.participantCount}
          </div>
        </div>
      );
    }
    return null;
  };

  const currentRating = chartData[chartData.length - 1]?.rating || 0;

  return (
    <div className={style.ratingGraph}>
      <div className={style.header}>
        <span className={style.title}>{_(".rating_graph.title")}</span>
        <span className={style.currentRating} style={{ color: getRatingColor(currentRating) }}>
          {_(".rating_graph.current_rating")}: {currentRating}
        </span>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis
            dataKey="index"
            tick={false}
            stroke="#999"
          />
          <YAxis
            domain={[yAxisMin, yAxisMax]}
            stroke="#999"
            tick={{ fontSize: 12 }}
          />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine y={1200} stroke="#03a89e" strokeDasharray="3 3" strokeOpacity={0.3} />
          <ReferenceLine y={1400} stroke="#0000ff" strokeDasharray="3 3" strokeOpacity={0.3} />
          <ReferenceLine y={1600} stroke="#a0a" strokeDasharray="3 3" strokeOpacity={0.3} />
          <ReferenceLine y={1900} stroke="#ff8c00" strokeDasharray="3 3" strokeOpacity={0.3} />
          <ReferenceLine y={2100} stroke="#ff7777" strokeDasharray="3 3" strokeOpacity={0.3} />
          <ReferenceLine y={2300} stroke="#ff3333" strokeDasharray="3 3" strokeOpacity={0.3} />
          <ReferenceLine y={2400} stroke="#ff0000" strokeDasharray="3 3" strokeOpacity={0.3} />
          <Line
            type="monotone"
            dataKey="rating"
            stroke="#4a90e2"
            strokeWidth={2}
            dot={{ fill: "#4a90e2", r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RatingGraph;
