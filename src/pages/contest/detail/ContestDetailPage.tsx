import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { Grid, Header, Segment, Button, Icon, Progress, Tab, Table, Loader } from "semantic-ui-react";
import { Link } from "react-navi";

import { appState } from "@/appState";
import { useLocalizer, useNavigationChecked, useLoginOrRegisterNavigation } from "@/utils/hooks";
import formatDateTime from "@/utils/formatDateTime";
import api from "@/api";
import toast from "@/utils/toast";
import MarkdownContent from "@/markdown/MarkdownContent";
import { defineRoute, RouteError } from "@/AppRouter";
import style from "./ContestDetailPage.module.less";

interface ContestDetailPageProps {
  contest: ApiTypes.GetContestDetailResponseDto;
}

let ContestDetailPage: React.FC<ContestDetailPageProps> = props => {
  const { contest } = props;
  const _ = useLocalizer("contest");
  const navigation = useNavigationChecked();
  const navigateToLogin = useLoginOrRegisterNavigation("login");
  const [now, setNow] = useState(new Date());
  const [isRegistered, setIsRegistered] = useState(contest.isRegistered);
  const [registrationPending, setRegistrationPending] = useState(false);

  useEffect(() => {
    if (contest) {
      appState.enterNewPage(contest.title, null);
    }

    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, [contest]);

  const getContestProgress = (): number => {
    const start = new Date(contest.startTime).getTime();
    const end = new Date(contest.endTime).getTime();
    const current = now.getTime();

    if (current < start) return 0;
    if (current > end) return 100;

    return Math.floor(((current - start) / (end - start)) * 100);
  };

  const getContestStatus = (): string => {
    const start = new Date(contest.startTime);
    const end = new Date(contest.endTime);

    if (now < start) {
      return _(".status.not_started");
    } else if (now >= start && now <= end) {
      return _(".status.running");
    } else {
      return _(".status.ended");
    }
  };

  const getTimeRemaining = (): string => {
    const start = new Date(contest.startTime);
    const end = new Date(contest.endTime);

    let targetTime: Date;
    let prefix: string;

    if (now < start) {
      targetTime = start;
      prefix = _(".time_to_start");
    } else if (now >= start && now <= end) {
      targetTime = end;
      prefix = _(".time_to_end");
    } else {
      return _(".contest_ended");
    }

    const diff = targetTime.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return `${prefix}: ${hours}h ${minutes}m ${seconds}s`;
  };

  const handleRegister = async () => {
    if (!appState.currentUser) {
      navigateToLogin();
      return;
    }

    setRegistrationPending(true);
    const { requestError, response } = await api.contest.registerContest({
      contestId: contest.id
    });

    if (requestError) {
      toast.error(requestError(_));
    } else if (response.error) {
      toast.error(_(`.register_error.${response.error}`));
    } else {
      setIsRegistered(true);
      toast.success(_(".register_success"));
    }
    setRegistrationPending(false);
  };

  const handleUnregister = async () => {
    setRegistrationPending(true);
    const { requestError, response } = await api.contest.unregisterContest({
      contestId: contest.id
    });

    if (requestError) {
      toast.error(requestError(_));
    } else if (response.error) {
      toast.error(_(`.unregister_error.${response.error}`));
    } else {
      setIsRegistered(false);
      toast.success(_(".unregister_success"));
    }
    setRegistrationPending(false);
  };

  const canUnregister = () => {
    const start = new Date(contest.startTime);
    return now < start;
  };

  const panes = [
    {
      menuItem: _(".tab.problems"),
      render: () => (
        <Tab.Pane>
          <Table basic="very" unstackable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell width={2}>{_(".problem_index")}</Table.HeaderCell>
                <Table.HeaderCell width={10}>{_(".problem_title")}</Table.HeaderCell>
                <Table.HeaderCell width={4}>{_(".problem_stats")}</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {contest.problems.map(problem => (
                <Table.Row key={problem.contestProblemId}>
                  <Table.Cell>
                    <strong>{String.fromCharCode(65 + problem.orderIndex)}</strong>
                  </Table.Cell>
                  <Table.Cell>
                    <Link href={`/c/${contest.id}/p/${problem.problemId}`} className={style.problemLink}>
                      {problem.problemTitle}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    {/* TODO: Add problem statistics */}
                    -
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Tab.Pane>
      )
    },
    {
      menuItem: _(".tab.ranklist"),
      render: () => (
        <Tab.Pane>
          <Button
            primary
            as={Link}
            href={`/c/${contest.id}/ranklist`}
            fluid
          >
            <Icon name="list ol" />
            {_(".view_ranklist")}
          </Button>
        </Tab.Pane>
      )
    },
    {
      menuItem: _(".tab.submissions"),
      render: () => (
        <Tab.Pane>
          <Button
            primary
            as={Link}
            href={`/s?contestId=${contest.id}`}
            fluid
          >
            <Icon name="hourglass" />
            {_(".view_submissions")}
          </Button>
        </Tab.Pane>
      )
    }
  ];

  if (contest.announcement) {
    panes.push({
      menuItem: _(".tab.announcement"),
      render: () => (
        <Tab.Pane>
          <MarkdownContent content={contest.announcement} />
        </Tab.Pane>
      )
    });
  }

  if (contest.editorial && now >= new Date(contest.endTime)) {
    panes.push({
      menuItem: _(".tab.editorial"),
      render: () => (
        <Tab.Pane>
          <MarkdownContent content={contest.editorial} />
        </Tab.Pane>
      )
    });
  }

  return (
    <>
      <Grid>
        <Grid.Column width={11}>
          <Header as="h1">
            <Icon name="trophy" />
            <Header.Content>
              {contest.title}
              <Header.Subheader>{contest.description}</Header.Subheader>
            </Header.Content>
          </Header>

          <Segment className={style.progressSegment}>
            <div className={style.timeInfo}>
              <span className={style.status}>{getContestStatus()}</span>
              <span className={style.remaining}>{getTimeRemaining()}</span>
            </div>
            <Progress percent={getContestProgress()} indicating className={style.progress} />
            <div className={style.timeRange}>
              <span>{formatDateTime(contest.startTime)[1]}</span>
              <span>{formatDateTime(contest.endTime)[1]}</span>
            </div>
          </Segment>

          <Tab panes={panes} />
        </Grid.Column>

        <Grid.Column width={5}>
          <Segment>
            <Header as="h3">{_(".basic_info")}</Header>
            <div className={style.info}>
              <div className={style.infoItem}>
                <span className={style.infoLabel}>{_(".owner")}:</span>
                <Link href={`/u/${contest.ownerUsername}`}>{contest.ownerUsername}</Link>
              </div>
              <div className={style.infoItem}>
                <span className={style.infoLabel}>{_(".type")}:</span>
                <span>{contest.type}</span>
              </div>
              <div className={style.infoItem}>
                <span className={style.infoLabel}>{_(".problem_count")}:</span>
                <span>{contest.problems.length}</span>
              </div>
              <div className={style.infoItem}>
                <span className={style.infoLabel}>{_(".start_time")}:</span>
                <span>{formatDateTime(contest.startTime)[1]}</span>
              </div>
              <div className={style.infoItem}>
                <span className={style.infoLabel}>{_(".end_time")}:</span>
                <span>{formatDateTime(contest.endTime)[1]}</span>
              </div>
            </div>

            {appState.currentUser && !contest.hasPermissionToManage && (
              isRegistered ? (
                <Button
                  color="red"
                  fluid
                  onClick={handleUnregister}
                  disabled={registrationPending || !canUnregister()}
                  loading={registrationPending}
                  className={style.registrationButton}
                >
                  <Icon name="sign-out" />
                  {_(".unregister")}
                </Button>
              ) : (
                <Button
                  primary
                  fluid
                  onClick={handleRegister}
                  disabled={registrationPending}
                  loading={registrationPending}
                  className={style.registrationButton}
                >
                  <Icon name="sign-in" />
                  {_(".register")}
                </Button>
              )
            )}

            {!appState.currentUser && (
              <Button
                primary
                fluid
                onClick={navigateToLogin}
                className={style.registrationButton}
              >
                <Icon name="sign-in" />
                {_(".login_to_register")}
              </Button>
            )}

            {contest.hasPermissionToManage && (
              <Button
                primary
                fluid
                as={Link}
                href={`/c/${contest.id}/edit`}
                className={style.manageButton}
              >
                <Icon name="edit" />
                {_(".edit_contest")}
              </Button>
            )}
          </Segment>
        </Grid.Column>
      </Grid>
    </>
  );
};

ContestDetailPage = observer(ContestDetailPage);

export default defineRoute(async request => {
  const contestId = parseInt(request.params.id);
  const { requestError, response } = await api.contest.getContestDetail({
    contestId
  });

  if (requestError || !response || response.error) {
    throw new RouteError("Contest not found", { showBack: true });
  }

  return <ContestDetailPage contest={response} />;
});
