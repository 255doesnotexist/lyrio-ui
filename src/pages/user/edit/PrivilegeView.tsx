import React, { useState, useEffect } from "react";
import { Header, Checkbox, Button, Form, Modal, Input, Icon, Message } from "semantic-ui-react";
import { observer } from "mobx-react";

import style from "./UserEdit.module.less";

import api from "@/api";
import { appState } from "@/appState";
import toast from "@/utils/toast";
import { useAsyncCallbackPending, useConfirmNavigation, useLocalizer, useDialog, Link } from "@/utils/hooks";
import { RouteError } from "@/AppRouter";
import { makeToBeLocalizedText } from "@/locales";

export async function fetchData(username: string) {
  const { requestError, response } = await api.user.getUserMeta({ username, getPrivileges: true });
  if (requestError) throw new RouteError(requestError, { showRefresh: true, showBack: true });
  else if (response.error) throw new RouteError(makeToBeLocalizedText(`user_edit.errors.${response.error}`));

  return response;
}

enum Privilege {
  EditHomepage = "EditHomepage",
  ManageUser = "ManageUser",
  ManageUserGroup = "ManageUserGroup",
  ManageProblem = "ManageProblem",
  ManageContest = "ManageContest",
  ManageDiscussion = "ManageDiscussion",
  SkipRecaptcha = "SkipRecaptcha"
}

interface PrevilegeViewProps {
  meta?: ApiTypes.UserMetaDto;
  privileges?: ApiTypes.GetUserMetaResponseDto["privileges"];
}

const PrevilegeView: React.FC<PrevilegeViewProps> = props => {
  const _ = useLocalizer("user_edit.privilege");

  useEffect(() => {
    appState.enterNewPage(`${_(`.title`)} - ${props.meta.username}`, null, false);
  }, [appState.locale, props.meta]);

  const [, setModified] = useConfirmNavigation();

  const [pending, onSubmit] = useAsyncCallbackPending(async () => {
    const { requestError, response } = await api.user.setUserPrivileges({
      userId: props.meta.id,
      privileges: [...privileges],
      isHiddenFromHomeRanking
    });
    if (requestError) toast.error(requestError(_));
    else if (response.error) toast.error(_(`user_edit.errors.${response.error}`));
    else {
      setModified(false);
      toast.success(_(".success"));
    }
  });

  const [privileges, setPrivileges] = useState(new Set(props.privileges as Privilege[]));
  function togglePrivilege(privilege: Privilege, has: boolean) {
    const newPrivileges = new Set(privileges);
    if (has) newPrivileges.add(privilege);
    else newPrivileges.delete(privilege);
    setPrivileges(newPrivileges);
    setModified(true);
  }

  const [isHiddenFromHomeRanking, setIsHiddenFromHomeRanking] = useState(false);

  // Fetch current hidden status
  useEffect(() => {
    (async () => {
      const { response } = await api.user.getUserDetail({ userId: props.meta.id });
      if (response && !response.error) {
        setIsHiddenFromHomeRanking(response.meta?.isHiddenFromHomeRanking || false);
      }
    })();
  }, [props.meta.id]);

  // Reset password dialog
  const [resetPasswordPending, setResetPasswordPending] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [requirePasswordChange, setRequirePasswordChange] = useState(true);
  const [generatedPassword, setGeneratedPassword] = useState("");

  let closeResetPasswordDialog: () => void;

  const resetPasswordDialog = useDialog(
    {},
    <Modal.Header>{_(".reset_password.title")}</Modal.Header>,
    <Modal.Content>
      <Form>
        <Form.Field>
          <label>{_(".reset_password.new_password")}</label>
          <Input
            placeholder={_(".reset_password.leave_empty_for_random")}
            value={newPassword}
            onChange={(e, { value }) => setNewPassword(value)}
          />
        </Form.Field>
        <Form.Field>
          <Checkbox
            label={_(".reset_password.require_password_change")}
            checked={requirePasswordChange}
            onChange={(e, { checked }) => setRequirePasswordChange(checked)}
          />
        </Form.Field>
        {generatedPassword && (
          <Message positive>
            <Message.Header>{_(".reset_password.generated_password")}</Message.Header>
            <p>
              <code>{generatedPassword}</code>
            </p>
          </Message>
        )}
      </Form>
    </Modal.Content>,
    () => (
      <>
        <Button onClick={() => closeResetPasswordDialog()}>{_(".reset_password.cancel")}</Button>
        <Button
          primary
          loading={resetPasswordPending}
          onClick={async () => {
            setResetPasswordPending(true);
            const { requestError, response } = await api.user.resetUserPassword({
              userId: props.meta.id,
              newPassword: newPassword || undefined,
              requirePasswordChange
            });
            setResetPasswordPending(false);

            if (requestError) {
              toast.error(requestError(_));
            } else if (response.error) {
              toast.error(_(`user_edit.errors.${response.error}`));
            } else {
              if (response.generatedPassword) {
                setGeneratedPassword(response.generatedPassword);
                toast.success(_(".reset_password.success_with_generated"));
              } else {
                toast.success(_(".reset_password.success"));
                closeResetPasswordDialog();
                setNewPassword("");
                setGeneratedPassword("");
              }
            }
          }}
        >
          {_(".reset_password.confirm")}
        </Button>
      </>
    )
  );

  closeResetPasswordDialog = resetPasswordDialog.close;

  const isAdmin = appState.currentUser.isAdmin;

  return (
    <>
      {resetPasswordDialog.element}
      <Header className={style.sectionHeader} size="large" content={_(".header")} />

      {/* Privileges */}
      {Object.values(Privilege).map(privilege => (
        <div key={privilege} className={style.privilegeRow}>
          <Checkbox
            toggle
            readOnly={!isAdmin}
            label={_(`.privileges.${privilege}.name`)}
            checked={privileges.has(privilege)}
            onChange={(e, { checked }) => togglePrivilege(privilege, checked)}
          />
          <div className={style.notes}>{_(`.privileges.${privilege}.notes`)}</div>
        </div>
      ))}

      {/* Hidden from ranking */}
      <Header className={style.sectionHeader} size="medium" content={_(".display_settings")} style={{ marginTop: "2rem" }} />
      <div className={style.privilegeRow}>
        <Checkbox
          toggle
          readOnly={!isAdmin}
          label={_(".hidden_from_ranking.name")}
          checked={isHiddenFromHomeRanking}
          onChange={(e, { checked }) => {
            setIsHiddenFromHomeRanking(checked);
            setModified(true);
          }}
        />
        <div className={style.notes}>{_(".hidden_from_ranking.notes")}</div>
      </div>

      {/* Action buttons */}
      <Header className={style.sectionHeader} size="medium" content={_(".actions")} style={{ marginTop: "2rem" }} />
      <div style={{ marginBottom: "1rem" }}>
        <Button
          disabled={!isAdmin}
          color="orange"
          icon
          labelPosition="left"
          onClick={() => {
            setNewPassword("");
            setGeneratedPassword("");
            setRequirePasswordChange(true);
            resetPasswordDialog.open();
          }}
        >
          <Icon name="key" />
          {_(".reset_password.button")}
        </Button>
      </div>

      <div className={style.notes + " " + style.notesAdminOnly}>{_(".admin_only")}</div>
      <Button
        className={style.submit}
        loading={pending}
        disabled={!isAdmin}
        primary
        content={_(".submit")}
        onClick={onSubmit}
      />
    </>
  );
};

export const View = observer(PrevilegeView);
