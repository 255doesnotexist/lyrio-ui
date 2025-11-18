import React, { useState, useEffect } from "react";
import { Header, Segment, Form, TextArea, Button, Checkbox, Message, Table, Icon } from "semantic-ui-react";
import { observer } from "mobx-react";

import style from "./BatchImportPage.module.less";

import { appState } from "@/appState";
import { useLocalizer, useNavigationChecked } from "@/utils/hooks";
import { defineRoute, RouteError } from "@/AppRouter";
import api from "@/api";
import toast from "@/utils/toast";
import { makeToBeLocalizedText } from "@/locales";

interface BatchImportResult {
  success: boolean;
  username: string;
  email: string;
  error?: string;
}

let BatchImportPage: React.FC = () => {
  const _ = useLocalizer("user_batch_import");
  const navigation = useNavigationChecked();

  useEffect(() => {
    appState.enterNewPage(_(`.title`), null, false);
  }, [appState.locale]);

  const [csvContent, setCsvContent] = useState("");
  const [requirePasswordChange, setRequirePasswordChange] = useState(true);
  const [pending, setPending] = useState(false);
  const [results, setResults] = useState<BatchImportResult[]>([]);
  const [showResults, setShowResults] = useState(false);

  async function onSubmit() {
    if (!csvContent.trim()) {
      toast.error(_(".error.empty_csv"));
      return;
    }

    setPending(true);
    const { requestError, response } = await api.user.batchImportUsers({
      csvContent,
      requirePasswordChange
    });
    setPending(false);

    if (requestError) {
      toast.error(requestError(_));
    } else if (response.error) {
      toast.error(_(`user_edit.errors.${response.error}`));
    } else {
      const importResults: BatchImportResult[] = response.results.map(result => ({
        success: result.success,
        username: result.username,
        email: result.email,
        error: result.error
      }));
      setResults(importResults);
      setShowResults(true);

      const successCount = importResults.filter(r => r.success).length;
      const failCount = importResults.filter(r => !r.success).length;

      if (failCount === 0) {
        toast.success(_(".success_all", { count: successCount.toString() }));
      } else {
        toast.warning(_(".success_partial", {
          success: successCount.toString(),
          fail: failCount.toString()
        }));
      }
    }
  }

  const successCount = results.filter(r => r.success).length;
  const failCount = results.filter(r => !r.success).length;

  return (
    <div className={style.container}>
      <Segment>
        <Header as="h1">{_(`.title`)}</Header>
        <Message info>
          <Message.Header>{_(".info.title")}</Message.Header>
          <Message.List>
            <Message.Item>{_(".info.format")}</Message.Item>
            <Message.Item>{_(".info.example")}</Message.Item>
            <Message.Item>{_(".info.password_note")}</Message.Item>
          </Message.List>
        </Message>

        <Form>
          <Form.Field>
            <label>{_(".csv_content")}</label>
            <TextArea
              placeholder={_(".csv_placeholder")}
              value={csvContent}
              onChange={(e, { value }) => setCsvContent(value as string)}
              rows={15}
              style={{ fontFamily: "monospace" }}
            />
          </Form.Field>

          <Form.Field>
            <Checkbox
              label={_(".require_password_change")}
              checked={requirePasswordChange}
              onChange={(e, { checked }) => setRequirePasswordChange(checked)}
            />
            <div className={style.fieldNote}>{_(".require_password_change_note")}</div>
          </Form.Field>

          <Button.Group>
            <Button
              primary
              loading={pending}
              disabled={!csvContent.trim()}
              onClick={onSubmit}
              icon
              labelPosition="left"
            >
              <Icon name="upload" />
              {_(".submit")}
            </Button>
            <Button onClick={() => navigation.goBack()}>
              {_(".cancel")}
            </Button>
          </Button.Group>
        </Form>

        {showResults && (
          <Segment className={style.results}>
            <Header as="h3">
              {_(".results.title")}
              <Header.Subheader>
                {_(".results.summary", {
                  total: results.length.toString(),
                  success: successCount.toString(),
                  fail: failCount.toString()
                })}
              </Header.Subheader>
            </Header>

            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell width={1}>{_(".results.status")}</Table.HeaderCell>
                  <Table.HeaderCell width={4}>{_(".results.username")}</Table.HeaderCell>
                  <Table.HeaderCell width={5}>{_(".results.email")}</Table.HeaderCell>
                  <Table.HeaderCell width={6}>{_(".results.message")}</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {results.map((result, index) => (
                  <Table.Row key={index} negative={!result.success} positive={result.success}>
                    <Table.Cell textAlign="center">
                      {result.success ? (
                        <Icon name="check circle" color="green" size="large" />
                      ) : (
                        <Icon name="times circle" color="red" size="large" />
                      )}
                    </Table.Cell>
                    <Table.Cell>{result.username}</Table.Cell>
                    <Table.Cell>{result.email}</Table.Cell>
                    <Table.Cell>
                      {result.success
                        ? _(".results.success_message")
                        : _(`user_edit.errors.${result.error}`) || result.error}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </Segment>
        )}
      </Segment>
    </div>
  );
};

BatchImportPage = observer(BatchImportPage);

export default defineRoute(async request => {
  // Check if user is admin
  if (!appState.currentUser?.isAdmin) {
    throw new RouteError(makeToBeLocalizedText("user_batch_import.errors.PERMISSION_DENIED"));
  }

  return <BatchImportPage />;
});
