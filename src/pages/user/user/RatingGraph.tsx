import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import dayjs from "dayjs";

import style from "./RatingGraph.module.less";
import { useLocalizer } from "@/utils/hooks";
import { getRatingColor } from "@/utils/rating";

interface RatingGraphProps {
  ratingHistory: ApiTypes.RatingChangeDto[];
}

const RatingGraph: React.FC<RatingGraphProps> = props => {
  const _ = useLocalizer("user");

  // Prepare data for chart - always start with initial 1500 rating like Codeforces
  const initialData = {
    index: -1,
    contestTitle: "Initial",
    rating: 1500,
    ratingChange: 0,
    rank: null,
    participantCount: null,
    time: "",
    contestId: null
  };

  const ratingChangesData =
    props.ratingHistory && props.ratingHistory.length > 0
      ? props.ratingHistory.map((change, index) => ({
          index,
          contestTitle: change.contestTitle,
          rating: change.newRating,
          ratingChange: change.ratingChange,
          rank: change.rank,
          participantCount: change.participantCount,
          time: dayjs(change.time).format("YYYY-MM-DD"),
          contestId: change.contestId
        }))
      : [];

  // Always include initial 1500 rating point at the start
  const chartData = [initialData, ...ratingChangesData];

  // Calculate rating range for Y-axis
  const ratings = chartData.map(d => d.rating);
  const minRating = Math.min(...ratings);
  const maxRating = Math.max(...ratings);
  const ratingRange = maxRating - minRating;
  const yAxisMin = Math.max(0, Math.floor((minRating - ratingRange * 0.1) / 100) * 100);
  const yAxisMax = Math.ceil((maxRating + ratingRange * 0.1) / 100) * 100;

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;

      // For initial rating point, show simplified tooltip
      if (data.index === -1) {
        return (
          <div className={style.tooltip}>
            <div className={style.tooltipContest}>Initial Rating</div>
            <div className={style.tooltipRating}>
              <span style={{ color: getRatingColor(data.rating) }}>{_(".rating_graph.rating")}: {data.rating}</span>
            </div>
          </div>
        );
      }

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

  const currentRating = chartData[chartData.length - 1]?.rating || 1500;

  return (
    <div className={style.ratingGraph}>
      <div className={style.header}>
        <span className={style.title}>{_(".rating_graph.title")}</span>
        <span className={style.currentRating} style={{ color: getRatingColor(currentRating) }}>
          {_(".rating_graph.current_rating")}: {currentRating}
        </span>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="index"
            tick={false}
            stroke="#ddd"
            strokeWidth={1}
          />
          <YAxis
            domain={[yAxisMin, yAxisMax]}
            stroke="#ddd"
            strokeWidth={1}
            tick={{ fontSize: 11, fill: "#888" }}
          />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine y={1200} stroke="#03a89e" strokeDasharray="2 2" strokeOpacity={0.25} />
          <ReferenceLine y={1400} stroke="#0000ff" strokeDasharray="2 2" strokeOpacity={0.25} />
          <ReferenceLine y={1600} stroke="#a0a" strokeDasharray="2 2" strokeOpacity={0.25} />
          <ReferenceLine y={1900} stroke="#ff8c00" strokeDasharray="2 2" strokeOpacity={0.25} />
          <ReferenceLine y={2100} stroke="#ff7777" strokeDasharray="2 2" strokeOpacity={0.25} />
          <ReferenceLine y={2300} stroke="#ff3333" strokeDasharray="2 2" strokeOpacity={0.25} />
          <ReferenceLine y={2400} stroke="#ff0000" strokeDasharray="2 2" strokeOpacity={0.25} />
          <Line
            type="monotone"
            dataKey="rating"
            stroke="#2185d0"
            strokeWidth={2.5}
            dot={{ fill: "#2185d0", r: 3.5, strokeWidth: 0 }}
            activeDot={{ r: 5.5, fill: "#1678c2" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RatingGraph;
