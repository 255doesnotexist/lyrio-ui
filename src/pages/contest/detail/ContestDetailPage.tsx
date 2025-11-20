import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { Grid, Header, Segment, Button, Icon, Progress, Tab, Table, Loader, Dropdown } from "semantic-ui-react";
import { Link } from "react-navi";

import { appState } from "@/appState";
import { useLocalizer, useNavigationChecked, useLoginOrRegisterNavigation, useScreenWidthWithin } from "@/utils/hooks";
import formatDateTime from "@/utils/formatDateTime";
import api from "@/api";
import toast from "@/utils/toast";
import MarkdownContent from "@/markdown/MarkdownContent";
import { defineRoute, RouteError } from "@/AppRouter";
import style from "./ContestDetailPage.module.less";
import { getRatingColor } from "@/utils/rating";
import {
  SubmissionItem,
  SubmissionItemMobile,
  SubmissionHeader,
  SubmissionHeaderMobile
} from "@/pages/submission/componments/SubmissionItem";

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
  const [ranklist, setRanklist] = useState<ApiTypes.GetContestRanklistResponseDto | null>(null);
  const [ranklistLoading, setRanklistLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [submissions, setSubmissions] = useState<ApiTypes.SubmissionMetaDto[] | null>(null);
  const [submissionsLoading, setSubmissionsLoading] = useState(false);
  const [calculatingRating, setCalculatingRating] = useState(false);
  const isMobile = useScreenWidthWithin(0, 768);

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

  const fetchRanklist = async () => {
    setRanklistLoading(true);
    const { requestError, response } = await api.contest.getContestRanklist({
      contestId: contest.id
    });
    setRanklistLoading(false);

    if (!requestError && response && !response.error) {
      setRanklist(response);
    }
  };

  const fetchSubmissions = async () => {
    setSubmissionsLoading(true);
    const { requestError, response } = await api.submission.querySubmission({
      contestId: contest.id,
      locale: appState.locale,
      takeCount: 50
    });
    setSubmissionsLoading(false);

    if (!requestError && response && !response.error) {
      setSubmissions(response.submissions);
    }
  };

  const handleCalculateRating = async (recalculate: boolean) => {
    setCalculatingRating(true);
    const { requestError, response } = await api.contest.calculateContestRating({
      contestId: contest.id,
      recalculate
    });
    setCalculatingRating(false);

    if (requestError) {
      toast.error(requestError(_));
    } else if (response.error) {
      toast.error(_(`.calculate_rating_error.${response.error}`));
    } else {
      toast.success(_(".calculate_rating_success"));
      // Refresh ranklist if it's already loaded
      if (ranklist) {
        fetchRanklist();
      }
    }
  };

  const canCalculateRating = () => {
    const end = new Date(contest.endTime);
    return now >= end;
  };

  useEffect(() => {
    // Load ranklist when ranklist tab is active (index 1)
    if (activeTab === 1 && !ranklist) {
      fetchRanklist();
    }

    // Load submissions when submissions tab is active (index 2)
    if (activeTab === 2 && !submissions) {
      fetchSubmissions();
    }

    // Set up auto-refresh every 30 seconds when ranklist tab is active
    if (activeTab === 1) {
      const interval = setInterval(() => {
        fetchRanklist();
      }, 30000);

      return () => clearInterval(interval);
    }

    // Set up auto-refresh every 10 seconds when submissions tab is active
    if (activeTab === 2) {
      const interval = setInterval(() => {
        fetchSubmissions();
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [activeTab, contest.id]);

  const renderOIRanklist = (ranklistData: ApiTypes.GetContestRanklistResponseDto) => {
    const isIOI = ranklistData.contestType === "IOI";

    return (
      <Table celled unstackable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell style={{ width: '60px' }}>{_(".rank")}</Table.HeaderCell>
            <Table.HeaderCell style={{ width: '100px' }}>{_(".username")}</Table.HeaderCell>
            <Table.HeaderCell style={{ width: '80px' }}>{_(".total_score")}</Table.HeaderCell>
            {ranklistData.problemIds.map((problemId, index) => (
              <Table.HeaderCell key={problemId} textAlign="center">
                {String.fromCharCode(65 + index)}
              </Table.HeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {ranklistData.ranklist.map(item => (
            <Table.Row key={item.userId}>
              <Table.Cell textAlign="center">{item.rank}</Table.Cell>
              <Table.Cell>
                <Link href={`/u/${item.username}`} style={{ color: getRatingColor(item.rating), fontWeight: 500 }}>
                  {item.username}
                </Link>
              </Table.Cell>
              <Table.Cell textAlign="center">
                <strong>{item.totalScore}</strong>
              </Table.Cell>
              {item.problemStatuses.map(status => (
                <Table.Cell key={status.problemId} textAlign="center">
                  {status.score !== undefined && status.score !== null ? (
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <span style={{ color: status.score === 100 ? "#21ba45" : "#666", fontSize: "1.1em", fontWeight: 500 }}>
                        {status.score}
                      </span>
                      {isIOI && status.firstAcceptTime !== undefined && status.firstAcceptTime !== null && (
                        <span style={{ fontSize: "0.75em", color: "#aaa", marginTop: '2px', fontWeight: 400 }}>
                          {status.firstAcceptTime}m
                        </span>
                      )}
                      {status.score === 100 && <Icon name="check" style={{ marginTop: '2px', fontSize: '0.9em' }} />}
                    </div>
                  ) : (
                    <span style={{ color: "#ddd" }}>-</span>
                  )}
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  };

  const renderACMRanklist = (ranklistData: ApiTypes.GetContestRanklistResponseDto) => {
    return (
      <Table celled unstackable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell style={{ width: '60px' }}>{_(".rank")}</Table.HeaderCell>
            <Table.HeaderCell style={{ width: '100px' }}>{_(".username")}</Table.HeaderCell>
            <Table.HeaderCell style={{ width: '80px' }}>{_(".solved")}</Table.HeaderCell>
            <Table.HeaderCell style={{ width: '80px' }}>{_(".penalty")}</Table.HeaderCell>
            {ranklistData.problemIds.map((problemId, index) => (
              <Table.HeaderCell key={problemId} textAlign="center">
                {String.fromCharCode(65 + index)}
              </Table.HeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {ranklistData.ranklist.map(item => (
            <Table.Row key={item.userId}>
              <Table.Cell textAlign="center">{item.rank}</Table.Cell>
              <Table.Cell>
                <Link href={`/u/${item.username}`} style={{ color: getRatingColor(item.rating), fontWeight: 500 }}>
                  {item.username}
                </Link>
              </Table.Cell>
              <Table.Cell textAlign="center">
                <strong>{item.solvedCount}</strong>
              </Table.Cell>
              <Table.Cell textAlign="center">{item.totalPenalty}</Table.Cell>
              {item.problemStatuses.map(status => (
                <Table.Cell key={status.problemId} textAlign="center">
                  {status.accepted ? (
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <span style={{ color: "#21ba45", fontSize: "1.1em", fontWeight: 500 }}>+</span>
                      <span style={{ fontSize: "0.8em", color: "#888", marginTop: '2px', fontWeight: 400 }}>
                        {status.wrongAttempts > 0 && `(-${status.wrongAttempts}) `}
                        {status.solveTime}m
                      </span>
                    </div>
                  ) : status.wrongAttempts > 0 ? (
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <span style={{ color: "#db2828", fontSize: "1.1em", fontWeight: 500 }}>-</span>
                      <span style={{ fontSize: "0.8em", color: "#888", marginTop: '2px', fontWeight: 400 }}>
                        (-{status.wrongAttempts})
                        {status.lastSubmitTime !== undefined && status.lastSubmitTime !== null && ` ${status.lastSubmitTime}m`}
                      </span>
                    </div>
                  ) : (
                    <span style={{ color: "#ddd" }}>-</span>
                  )}
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
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
          {ranklistLoading && !ranklist ? (
            <Loader active inline="centered" />
          ) : ranklist ? (
            <>
              <div style={{ marginBottom: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: "#888", fontSize: "0.85em", fontWeight: 400 }}>
                  {_(".auto_refresh_30s")}
                </span>
                <div>
                  <Button
                    icon
                    labelPosition="left"
                    size="small"
                    basic
                    as={Link}
                    href={`/c/${contest.id}/ranklist`}
                    style={{ marginRight: "0.5rem", fontWeight: 400 }}
                  >
                    <Icon name="external" />
                    {_(".view_full_ranklist")}
                  </Button>
                  <Button
                    icon
                    labelPosition="left"
                    size="small"
                    basic
                    onClick={fetchRanklist}
                    loading={ranklistLoading}
                    disabled={ranklistLoading}
                    style={{ fontWeight: 400 }}
                  >
                    <Icon name="refresh" />
                    {_(".refresh")}
                  </Button>
                </div>
              </div>
              {ranklist.ranklist.length === 0 ? (
                <div style={{ textAlign: "center", padding: "3rem 2rem", color: "#aaa", fontSize: "0.95em" }}>
                  {_(".no_ranklist_data")}
                </div>
              ) : ranklist.contestType === "ACM" ? (
                renderACMRanklist(ranklist)
              ) : (
                renderOIRanklist(ranklist)
              )}
            </>
          ) : null}
        </Tab.Pane>
      )
    },
    {
      menuItem: _(".tab.submissions"),
      render: () => (
        <Tab.Pane>
          {submissionsLoading && !submissions ? (
            <Loader active inline="centered" />
          ) : submissions ? (
            <>
              {submissions.length === 0 ? (
                <div style={{ textAlign: "center", padding: "3rem 2rem", color: "#aaa", fontSize: "0.95em" }}>
                  {_(".no_submissions")}
                </div>
              ) : (
                <Table basic="very" textAlign="center" unstackable>
                  <Table.Header>
                    {isMobile ? <SubmissionHeaderMobile /> : <SubmissionHeader page="submissions" config={{ hideContest: true, hideSubmitter: true }} />}
                  </Table.Header>
                  <Table.Body>
                    {submissions.map(submission =>
                      isMobile ? (
                        <SubmissionItemMobile key={submission.id} submission={submission} />
                      ) : (
                        <SubmissionItem key={submission.id} submission={submission} page="submissions" config={{ hideContest: true, hideSubmitter: true }} />
                      )
                    )}
                  </Table.Body>
                </Table>
              )}
            </>
          ) : null}
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
            <Progress percent={getContestProgress()} className={style.progress} />
            <div className={style.timeRange}>
              <span>{formatDateTime(contest.startTime)[1]}</span>
              <span>{formatDateTime(contest.endTime)[1]}</span>
            </div>
          </Segment>

          <Tab
            panes={panes}
            activeIndex={activeTab}
            onTabChange={(e, data) => setActiveTab(data.activeIndex as number)}
          />
        </Grid.Column>

        <Grid.Column width={5}>
          <Segment>
            <Header as="h3">{_(".basic_info")}</Header>
            <div className={style.info}>
              <div className={style.infoItem}>
                <span className={style.infoLabel}>{_(".owner")}:</span>
                <Link href={`/u/${contest.ownerUsername}`} style={{ color: getRatingColor(contest.ownerRating), fontWeight: 500 }}>
                  {contest.ownerUsername}
                </Link>
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
              <>
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

                {appState.currentUser?.isAdmin && (
                  <Dropdown
                    fluid
                    className={style.calculateRatingButton}
                    disabled={!canCalculateRating() || calculatingRating}
                    loading={calculatingRating}
                    trigger={
                      <Button
                        fluid
                        disabled={!canCalculateRating() || calculatingRating}
                        loading={calculatingRating}
                      >
                        <Icon name="calculator" />
                        {_(".calculate_rating")}
                      </Button>
                    }
                  >
                    <Dropdown.Menu>
                      <Dropdown.Item
                        text={_(".calculate_rating_normal")}
                        icon="play"
                        onClick={() => handleCalculateRating(false)}
                      />
                      <Dropdown.Item
                        text={_(".calculate_rating_recalculate")}
                        icon="redo"
                        onClick={() => handleCalculateRating(true)}
                      />
                    </Dropdown.Menu>
                  </Dropdown>
                )}
              </>
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
