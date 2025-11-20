import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { Form, Header, Segment, Button, Icon, Dropdown, TextArea, Message } from "semantic-ui-react";

import { appState } from "@/appState";
import { useLocalizer, useNavigationChecked } from "@/utils/hooks";
import api from "@/api";
import toast from "@/utils/toast";
import style from "./ContestManagePage.module.less";

export interface ContestManagePageProps {
  isEdit: boolean;
  contest?: {
    id: number;
    title: string;
    description: string;
    startTime: Date;
    endTime: Date;
    type: string;
    isPublic: boolean;
    announcement: string;
    editorial: string;
    problems: ApiTypes.ContestProblemMetaDto[];
  };
}

// Format date to local datetime-local input format (YYYY-MM-DDTHH:mm)
function formatLocalDateTime(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

let ContestManagePage: React.FC<ContestManagePageProps> = props => {
  const _ = useLocalizer("contest");
  const navigation = useNavigationChecked();

  const [title, setTitle] = useState(props.contest?.title || "");
  const [description, setDescription] = useState(props.contest?.description || "");
  const [startTime, setStartTime] = useState(
    props.contest?.startTime ? formatLocalDateTime(new Date(props.contest.startTime)) : ""
  );
  const [endTime, setEndTime] = useState(
    props.contest?.endTime ? formatLocalDateTime(new Date(props.contest.endTime)) : ""
  );
  const [contestType, setContestType] = useState(props.contest?.type || "OI");
  const [isPublic, setIsPublic] = useState(props.contest?.isPublic ?? true);
  const [announcement, setAnnouncement] = useState(props.contest?.announcement || "");
  const [editorial, setEditorial] = useState(props.contest?.editorial || "");
  const [problemIds, setProblemIds] = useState(
    props.contest?.problems.map(p => p.problemId.toString()).join(",") || ""
  );
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    appState.enterNewPage(props.isEdit ? _(".edit_contest") : _(".create_contest"), null);
  }, [props.isEdit]);

  const contestTypeOptions = [
    { key: "OI", text: "OI", value: "OI" },
    { key: "IOI", text: "IOI", value: "IOI" },
    { key: "ACM", text: "ACM", value: "ACM" }
  ];

  const handleSubmit = async () => {
    if (!title || !startTime || !endTime) {
      toast.error(_(".error.required_fields"));
      return;
    }

    const problemIdArray = problemIds
      .split(",")
      .map(id => parseInt(id.trim()))
      .filter(id => !isNaN(id));

    if (problemIdArray.length === 0) {
      toast.error(_(".error.no_problems"));
      return;
    }

    setSubmitting(true);

    try {
      if (props.isEdit) {
        const { requestError, response } = await api.contest.updateContest({
          contestId: props.contest.id,
          title,
          description,
          startTime,
          endTime,
          type: contestType as any,
          isPublic,
          announcement,
          editorial,
          problemIds: problemIdArray
        });

        if (requestError) {
          toast.error(requestError(_));
        } else if (response.error) {
          toast.error(_(`error.${response.error}`));
        } else {
          toast.success(_(".success.updated"));
          navigation.navigate(`/c/${props.contest.id}`);
        }
      } else {
        const { requestError, response } = await api.contest.createContest({
          title,
          description,
          startTime,
          endTime,
          type: contestType as any,
          isPublic,
          announcement,
          editorial,
          problemIds: problemIdArray
        });

        if (requestError) {
          toast.error(requestError(_));
        } else if (response.error) {
          toast.error(_(`error.${response.error}`));
        } else {
          toast.success(_(".success.created"));
          navigation.navigate(`/c/${response.contestId}`);
        }
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Header as="h1">
        <Icon name={props.isEdit ? "edit" : "plus"} />
        <Header.Content>{props.isEdit ? _(".edit_contest") : _(".create_contest")}</Header.Content>
      </Header>

      <Segment className={style.segment}>
        <Form>
          <Form.Field required>
            <label>{_(".form.title")}</label>
            <Form.Input
              placeholder={_(".form.title_placeholder")}
              value={title}
              onChange={(e, { value }) => setTitle(value)}
              maxLength={120}
            />
          </Form.Field>

          <Form.Field>
            <label>{_(".form.description")}</label>
            <TextArea
              placeholder={_(".form.description_placeholder")}
              value={description}
              onChange={(e, { value }) => setDescription(value as string)}
              rows={3}
            />
          </Form.Field>

          <Form.Group widths="equal">
            <Form.Field required>
              <label>{_(".form.start_time")}</label>
              <Form.Input type="datetime-local" value={startTime} onChange={(e, { value }) => setStartTime(value)} />
            </Form.Field>

            <Form.Field required>
              <label>{_(".form.end_time")}</label>
              <Form.Input type="datetime-local" value={endTime} onChange={(e, { value }) => setEndTime(value)} />
            </Form.Field>
          </Form.Group>

          <Form.Group widths="equal">
            <Form.Field required>
              <label>{_(".form.type")}</label>
              <Dropdown
                selection
                options={contestTypeOptions}
                value={contestType}
                onChange={(e, { value }) => setContestType(value as string)}
              />
            </Form.Field>

            <Form.Field>
              <label>{_(".form.visibility")}</label>
              <Form.Checkbox
                toggle
                label={isPublic ? _(".form.public") : _(".form.private")}
                checked={isPublic}
                onChange={(e, { checked }) => setIsPublic(checked)}
              />
            </Form.Field>
          </Form.Group>

          <Form.Field required>
            <label>{_(".form.problem_ids")}</label>
            <Form.Input
              placeholder={_(".form.problem_ids_placeholder")}
              value={problemIds}
              onChange={(e, { value }) => setProblemIds(value)}
            />
            <Message info size="tiny">
              {_(".form.problem_ids_hint")}
            </Message>
          </Form.Field>

          <Form.Field>
            <label>{_(".form.announcement")}</label>
            <TextArea
              placeholder={_(".form.announcement_placeholder")}
              value={announcement}
              onChange={(e, { value }) => setAnnouncement(value as string)}
              rows={5}
            />
          </Form.Field>

          <Form.Field>
            <label>{_(".form.editorial")}</label>
            <TextArea
              placeholder={_(".form.editorial_placeholder")}
              value={editorial}
              onChange={(e, { value }) => setEditorial(value as string)}
              rows={5}
            />
          </Form.Field>

          <Button primary onClick={handleSubmit} loading={submitting}>
            <Icon name="check" />
            {props.isEdit ? _(".button.update") : _(".button.create")}
          </Button>
          <Button onClick={() => navigation.goBack()}>
            <Icon name="cancel" />
            {_(".button.cancel")}
          </Button>
        </Form>
      </Segment>
    </>
  );
};

ContestManagePage = observer(ContestManagePage);
export default ContestManagePage;
