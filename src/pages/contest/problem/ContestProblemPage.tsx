import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { Segment, Header, Icon, Grid, Progress, Message, Button, Loader } from "semantic-ui-react";
import { Link } from "react-navi";
import { v4 as uuid } from "uuid";

import { appState } from "@/appState";
import { useLocalizer } from "@/utils/hooks";
import api from "@/api";
import { defineRoute, RouteError } from "@/AppRouter";
import { Locale } from "@/interfaces/Locale";
import { ProblemViewPage, fetchData, getProblemTypeView } from "../../problem/view/ProblemViewPage";
import style from "./ContestProblemPage.module.less";

interface ContestProblemPageProps {
  contest: ApiTypes.GetContestDetailResponseDto;
  problemIndex: string;
  problemTitle: string;
  problemViewProps: any;
}

let ContestProblemPage: React.FC<ContestProblemPageProps> = props => {
  const { contest, problemIndex, problemTitle, problemViewProps } = props;
  const _ = useLocalizer("contest");
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    appState.enterNewPage(`${contest.title} - ${problemIndex}. ${problemTitle}`, null);

    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, [contest.title, problemIndex, problemTitle]);

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

  const isContestRunning = () => {
    const start = new Date(contest.startTime);
    const end = new Date(contest.endTime);
    return now >= start && now <= end;
  };

  const isContestNotStarted = () => {
    const start = new Date(contest.startTime);
    return now < start;
  };

  const canAccessProblem = () => {
    // Admins and contest owners can always access
    if (contest.hasPermissionToManage) return true;
    // Must be registered to access during contest
    if (!contest.isRegistered && !appState.currentUser) return false;
    if (!contest.isRegistered) return false;
    return true;
  };

  return (
    <>
      <Segment className={style.contestInfo}>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>
              <Header as="h3">
                <Icon name="trophy" />
                <Header.Content>
                  <Link href={`/c/${contest.id}`}>{contest.title}</Link>
                  <Header.Subheader>
                    {problemIndex}. {problemTitle}
                  </Header.Subheader>
                </Header.Content>
              </Header>
            </Grid.Column>
            <Grid.Column width={6} textAlign="right">
              <div className={style.status}>
                <strong>{getContestStatus()}</strong>
              </div>
              <div className={style.time}>{getTimeRemaining()}</div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16}>
              <Progress percent={getContestProgress()} indicating size="small" className={style.progress} />
              <div className={style.contestActions}>
                <Button as={Link} href={`/c/${contest.id}`} size="small">
                  <Icon name="list" />
                  {_(".view_problem_list")}
                </Button>
                <Button as={Link} href={`/c/${contest.id}/ranklist`} size="small">
                  <Icon name="trophy" />
                  {_(".view_ranklist")}
                </Button>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>

      {!canAccessProblem() && (
        <Message error>
          <Message.Header>{_(".registration_required")}</Message.Header>
          <p>{_(".registration_required_hint")}</p>
          <Button primary as={Link} href={`/c/${contest.id}`}>
            <Icon name="arrow left" />
            {_(".go_to_contest")}
          </Button>
        </Message>
      )}

      {canAccessProblem() && isContestNotStarted() && (
        <Message warning>
          <Message.Header>{_(".contest_not_started")}</Message.Header>
          <p>{_(".contest_not_started_hint")}</p>
        </Message>
      )}

      {canAccessProblem() && !isContestRunning() && !isContestNotStarted() && (
        <Message info>
          <Message.Header>{_(".contest_ended")}</Message.Header>
          <p>{_(".contest_ended_hint")}</p>
        </Message>
      )}

      {canAccessProblem() && <ProblemViewPage {...problemViewProps} />}
    </>
  );
};

ContestProblemPage = observer(ContestProblemPage);

export default defineRoute(async request => {
  const contestId = parseInt(request.params.id);
  const problemId = parseInt(request.params.problemId);
  const requestedLocale: Locale = request.query["locale"] in Locale && (request.query["locale"] as Locale);

  const { requestError: contestError, response: contestResponse } = await api.contest.getContestDetail({
    contestId
  });

  if (contestError || !contestResponse || contestResponse.error) {
    throw new RouteError("Contest not found", { showBack: true });
  }

  const contestProblem = contestResponse.problems.find(p => p.problemId === problemId);
  if (!contestProblem) {
    throw new RouteError("Problem not found in this contest", { showBack: true });
  }

  const problemIndex = String.fromCharCode(65 + contestProblem.orderIndex);

  // Fetch problem data using the exported function, passing contestId for permission check
  const problem = await fetchData("id", problemId, requestedLocale || appState.contentLocale, contestId);
  const ProblemTypeView = await getProblemTypeView(problem.meta.type);

  // Prepare props for ProblemViewPage
  const problemViewProps = {
    key: uuid(),
    idType: "id" as const,
    requestedLocale,
    problem,
    ProblemTypeView,
    contestId: contestId
  };

  return (
    <ContestProblemPage
      contest={contestResponse}
      problemIndex={problemIndex}
      problemTitle={contestProblem.problemTitle}
      problemViewProps={problemViewProps}
    />
  );
});
