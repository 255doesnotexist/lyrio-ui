import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { Table, Pagination, Header, Segment, Icon, Button } from "semantic-ui-react";
import { Link } from "react-navi";

import { appState } from "@/appState";
import { useLocalizer, useNavigationChecked } from "@/utils/hooks";
import formatDateTime from "@/utils/formatDateTime";
import { defineRoute } from "@/AppRouter";
import api from "@/api";
import style from "./ContestListPage.module.less";

interface ContestListPageProps {
  contests: ApiTypes.ContestMetaDto[];
  count: number;
  currentPage: number;
}

let ContestListPage: React.FC<ContestListPageProps> = props => {
  const { contests, count, currentPage } = props;
  const _ = useLocalizer("contest");
  const navigation = useNavigationChecked();

  const perPage = 20;

  useEffect(() => {
    appState.enterNewPage(_(".contest_list"), "c");
  }, [appState.locale]);

  const getContestStatus = (startTime: Date, endTime: Date): string => {
    const now = new Date();
    const start = new Date(startTime);
    const end = new Date(endTime);

    if (now < start) {
      return _(".status.not_started");
    } else if (now >= start && now <= end) {
      return _(".status.running");
    } else {
      return _(".status.ended");
    }
  };

  const getContestStatusColor = (startTime: Date, endTime: Date): string => {
    const now = new Date();
    const start = new Date(startTime);
    const end = new Date(endTime);

    if (now < start) {
      return "blue";
    } else if (now >= start && now <= end) {
      return "green";
    } else {
      return "grey";
    }
  };

  const onPageChange = (page: number) => {
    navigation.navigate(`/c?page=${page}`);
  };

  const totalPages = Math.ceil(count / perPage);

  return (
    <>
      <div className={style.header}>
        <Header as="h1">
          <Icon name="trophy" />
          <Header.Content>{_(".contest_list")}</Header.Content>
        </Header>
        {appState.currentUser && appState.currentUser.isAdmin && (
          <Button primary as={Link} href="/c/new">
            <Icon name="plus" />
            {_(".create_contest")}
          </Button>
        )}
      </div>

      <Segment className={style.segment}>
        <Table basic="very" unstackable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell width={6}>{_(".contest_name")}</Table.HeaderCell>
              <Table.HeaderCell width={2}>{_(".status_label")}</Table.HeaderCell>
              <Table.HeaderCell width={3}>{_(".start_time")}</Table.HeaderCell>
              <Table.HeaderCell width={3}>{_(".end_time")}</Table.HeaderCell>
              <Table.HeaderCell width={2}>{_(".type")}</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {contests.map(contest => (
              <Table.Row key={contest.id}>
                <Table.Cell>
                  <Link href={`/c/${contest.id}`} className={style.contestLink}>
                    {contest.title}
                  </Link>
                  {contest.description && (
                    <div className={style.description}>{contest.description}</div>
                  )}
                </Table.Cell>
                <Table.Cell>
                  <span className={style[getContestStatusColor(contest.startTime, contest.endTime)]}>
                    {getContestStatus(contest.startTime, contest.endTime)}
                  </span>
                </Table.Cell>
                <Table.Cell>{formatDateTime(contest.startTime)[1]}</Table.Cell>
                <Table.Cell>{formatDateTime(contest.endTime)[1]}</Table.Cell>
                <Table.Cell>{contest.type}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>

        {totalPages > 1 && (
          <div className={style.pagination}>
            <Pagination
              activePage={currentPage}
              totalPages={totalPages}
              onPageChange={(e, { activePage }) => onPageChange(activePage as number)}
            />
          </div>
        )}

        {contests.length === 0 && (
          <div className={style.noContest}>{_(".no_contest")}</div>
        )}
      </Segment>
    </>
  );
};

ContestListPage = observer(ContestListPage);

export default defineRoute(async request => {
  const currentPage = parseInt((request.query.page as string) || "1");
  const perPage = 20;
  const skipCount = (currentPage - 1) * perPage;

  const { requestError, response } = await api.contest.getContestList({
    skipCount,
    takeCount: perPage
  });

  if (requestError || !response) {
    return <ContestListPage contests={[]} count={0} currentPage={currentPage} />;
  }

  return <ContestListPage contests={response.contests} count={response.count} currentPage={currentPage} />;
});
