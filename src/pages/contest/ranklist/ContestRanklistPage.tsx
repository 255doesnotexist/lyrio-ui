import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { Header, Segment, Table, Icon } from "semantic-ui-react";
import { Link } from "react-navi";

import { appState } from "@/appState";
import { useLocalizer } from "@/utils/hooks";
import api from "@/api";
import { defineRoute, RouteError } from "@/AppRouter";
import style from "./ContestRanklistPage.module.less";

interface ContestRanklistPageProps {
  ranklist: ApiTypes.GetContestRanklistResponseDto;
}

let ContestRanklistPage: React.FC<ContestRanklistPageProps> = props => {
  const { ranklist } = props;
  const _ = useLocalizer("contest");

  useEffect(() => {
    if (ranklist) {
      appState.enterNewPage(_(".ranklist_title", { title: ranklist.contestTitle }), null);
    }
  }, [ranklist]);

  const renderOIRanklist = () => {
    return (
      <Table celled unstackable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={1}>{_(".rank")}</Table.HeaderCell>
            <Table.HeaderCell width={3}>{_(".username")}</Table.HeaderCell>
            <Table.HeaderCell width={2}>{_(".total_score")}</Table.HeaderCell>
            {ranklist.problemIds.map((problemId, index) => (
              <Table.HeaderCell key={problemId} width={2}>
                {String.fromCharCode(65 + index)}
              </Table.HeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {ranklist.ranklist.map(item => (
            <Table.Row key={item.userId}>
              <Table.Cell className={style.rankCell}>{item.rank}</Table.Cell>
              <Table.Cell>
                <Link href={`/u/${item.username}`} className={style.usernameLink}>
                  {item.username}
                </Link>
              </Table.Cell>
              <Table.Cell className={style.scoreCell}>
                <strong>{item.totalScore}</strong>
              </Table.Cell>
              {item.problemStatuses.map(status => (
                <Table.Cell key={status.problemId} className={style.problemCell}>
                  {status.score !== undefined && status.score !== null ? (
                    <span className={status.score === 100 ? style.fullScore : style.score}>
                      {status.score}
                      {status.score === 100 && <Icon name="check" style={{ marginLeft: '4px' }} />}
                    </span>
                  ) : (
                    <span className={style.noScore}>-</span>
                  )}
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  };

  const renderACMRanklist = () => {
    return (
      <Table celled unstackable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={1}>{_(".rank")}</Table.HeaderCell>
            <Table.HeaderCell width={3}>{_(".username")}</Table.HeaderCell>
            <Table.HeaderCell width={1}>{_(".solved")}</Table.HeaderCell>
            <Table.HeaderCell width={2}>{_(".penalty")}</Table.HeaderCell>
            {ranklist.problemIds.map((problemId, index) => (
              <Table.HeaderCell key={problemId} width={2}>
                {String.fromCharCode(65 + index)}
              </Table.HeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {ranklist.ranklist.map(item => (
            <Table.Row key={item.userId}>
              <Table.Cell className={style.rankCell}>{item.rank}</Table.Cell>
              <Table.Cell>
                <Link href={`/u/${item.username}`} className={style.usernameLink}>
                  {item.username}
                </Link>
              </Table.Cell>
              <Table.Cell className={style.solvedCell}>
                <strong>{item.solvedCount}</strong>
              </Table.Cell>
              <Table.Cell className={style.penaltyCell}>{item.totalPenalty}</Table.Cell>
              {item.problemStatuses.map(status => (
                <Table.Cell key={status.problemId} className={style.problemCell}>
                  {status.accepted ? (
                    <div className={style.accepted}>
                      <Icon name="check" />
                      <div className={style.solveInfo}>
                        {status.wrongAttempts > 0 && (
                          <span className={style.wrongAttempts}>(-{status.wrongAttempts})</span>
                        )}
                        <span className={style.solveTime}>{status.solveTime}m</span>
                      </div>
                    </div>
                  ) : status.wrongAttempts > 0 ? (
                    <div className={style.wrong}>
                      <Icon name="times" />
                      <span className={style.wrongCount}>(-{status.wrongAttempts})</span>
                    </div>
                  ) : (
                    <span className={style.noAttempt}>-</span>
                  )}
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  };

  return (
    <>
      <Header as="h1">
        <Icon name="list ol" />
        <Header.Content>
          {_(".ranklist_title", { title: ranklist.contestTitle })}
          <Header.Subheader>
            {_(".contest_type")}: {ranklist.contestType}
          </Header.Subheader>
        </Header.Content>
      </Header>

      <Segment className={style.segment}>
        {ranklist.ranklist.length === 0 ? (
          <div className={style.noData}>{_(".no_ranklist_data")}</div>
        ) : ranklist.contestType === "ACM" ? (
          renderACMRanklist()
        ) : (
          renderOIRanklist()
        )}
      </Segment>
    </>
  );
};

ContestRanklistPage = observer(ContestRanklistPage);

export default defineRoute(async request => {
  const contestId = parseInt(request.params.id);
  const { requestError, response } = await api.contest.getContestRanklist({
    contestId
  });

  if (requestError || !response || response.error) {
    throw new RouteError("Ranklist not found", { showBack: true });
  }

  return <ContestRanklistPage ranklist={response} />;
});
