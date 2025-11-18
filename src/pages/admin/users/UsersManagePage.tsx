import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import { Table, Button, Icon, Label, Popup, Segment, Input, Message, Modal, Form, TextArea } from "semantic-ui-react";
import { Link } from "react-navi";

import api from "@/api";
import { appState } from "@/appState";
import { useLocalizer } from "@/utils/hooks";
import toast from "@/utils/toast";
import AdminPanelPage from "../AdminPanelPage";
import { defineRoute, RouteError } from "@/AppRouter";

interface UserListItemProps {
  user: ApiTypes.UserMetaDto;
  onToggleAdmin: (userId: number, isAdmin: boolean) => Promise<void>;
  onBanUser: (userId: number, isBanned: boolean, banReason?: string) => Promise<void>;
}

const UserListItem: React.FC<UserListItemProps> = ({ user, onToggleAdmin, onBanUser }) => {
  const _ = useLocalizer("admin_panel");
  const [loading, setLoading] = useState(false);
  const [showBanModal, setShowBanModal] = useState(false);
  const [banReason, setBanReason] = useState("");

  const handleToggleAdmin = async () => {
    setLoading(true);
    try {
      await onToggleAdmin(user.id, !user.isAdmin);
    } finally {
      setLoading(false);
    }
  };

  const handleBanClick = () => {
    if (user.isBanned) {
      // Unban directly
      handleBan(false);
    } else {
      // Show modal to input ban reason
      setBanReason("");
      setShowBanModal(true);
    }
  };

  const handleBan = async (isBanned: boolean, reason?: string) => {
    setLoading(true);
    try {
      await onBanUser(user.id, isBanned, reason);
      setShowBanModal(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Table.Row negative={user.isBanned}>
        <Table.Cell>{user.id}</Table.Cell>
        <Table.Cell>
          <strong>{user.username}</strong>
          {user.id === 1 && (
            <Label color="red" size="tiny" style={{ marginLeft: 8 }}>
              <Icon name="star" />
              {_(".owner")}
            </Label>
          )}
          {user.isAdmin && user.id !== 1 && (
            <Label color="blue" size="tiny" style={{ marginLeft: 8 }}>
              <Icon name="shield" />
              {_(".admin")}
            </Label>
          )}
          {user.isBanned && (
            <Label color="black" size="tiny" style={{ marginLeft: 8 }}>
              <Icon name="lock" />
              {_(".banned")}
            </Label>
          )}
        </Table.Cell>
        <Table.Cell>{user.email}</Table.Cell>
        <Table.Cell>{user.acceptedProblemCount}</Table.Cell>
        <Table.Cell>{user.submissionCount}</Table.Cell>
        <Table.Cell>
          {user.id === 1 ? (
            <Popup
              trigger={<span>{_(".cannot_modify_owner")}</span>}
              content={_(".owner_description")}
            />
          ) : (
            <>
              <Button
                size="tiny"
                color={user.isAdmin ? "red" : "green"}
                loading={loading}
                onClick={handleToggleAdmin}
                disabled={user.isBanned}
              >
                <Icon name={user.isAdmin ? "ban" : "check"} />
                {user.isAdmin ? _(".revoke_admin") : _(".grant_admin")}
              </Button>
              {user.isAdmin ? (
                <Popup
                  trigger={
                    <span style={{ marginLeft: 8 }}>
                      <Button size="tiny" disabled>
                        <Icon name="lock" />
                        {_(".cannot_ban_admin")}
                      </Button>
                    </span>
                  }
                  content={_(".cannot_ban_admin_description")}
                />
              ) : (
                <Button
                  size="tiny"
                  color={user.isBanned ? "olive" : "orange"}
                  loading={loading}
                  onClick={handleBanClick}
                  style={{ marginLeft: 8 }}
                >
                  <Icon name={user.isBanned ? "unlock" : "lock"} />
                  {user.isBanned ? _(".unban_user") : _(".ban_user")}
                </Button>
              )}
            </>
          )}
        </Table.Cell>
      </Table.Row>
      <Modal open={showBanModal} onClose={() => setShowBanModal(false)} size="small">
        <Modal.Header>{_(".ban_user_title")}</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field>
              <label>{_(".ban_reason_label")}</label>
              <TextArea
                placeholder={_(".ban_reason_placeholder")}
                value={banReason}
                onChange={(e, { value }) => setBanReason(value as string)}
                rows={4}
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => setShowBanModal(false)}>{_(".cancel")}</Button>
          <Button color="orange" loading={loading} onClick={() => handleBan(true, banReason)}>
            <Icon name="lock" />
            {_(".confirm_ban")}
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

let UsersManagePage: React.FC = () => {
  const _ = useLocalizer("admin_panel");
  const [users, setUsers] = useState<ApiTypes.UserMetaDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const loadUsers = async () => {
    setLoading(true);
    try {
      const { requestError, response } = await api.user.getUserList({
        skipCount: 0,
        takeCount: 100,
        sortBy: "acceptedProblemCount"
      });

      if (requestError) {
        toast.error(requestError(_));
      } else if (response.error) {
        toast.error(_(`user_list.error.${response.error}`));
      } else {
        setUsers(response.userMetas);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleToggleAdmin = async (userId: number, isAdmin: boolean) => {
    const { requestError, response } = await api.user.setUserAdmin({
      userId,
      isAdmin
    });

    if (requestError) {
      toast.error(requestError(_));
    } else if (response.error) {
      toast.error(_(`user_admin.error.${response.error}`));
    } else {
      toast.success(isAdmin ? _(".admin_granted") : _(".admin_revoked"));
      await loadUsers();
    }
  };

  const handleBanUser = async (userId: number, isBanned: boolean, banReason?: string) => {
    const { requestError, response } = await api.user.banUser({
      userId,
      isBanned,
      banReason
    });

    if (requestError) {
      toast.error(requestError(_));
    } else if (response.error) {
      toast.error(_(`user_ban.error.${response.error}`));
    } else {
      toast.success(isBanned ? _(".user_banned") : _(".user_unbanned"));
      await loadUsers();
    }
  };

  const filteredUsers = users.filter(
    user =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminPanelPage activeMenu="users">
      <Segment loading={loading}>
        <div style={{ marginBottom: 16, display: "flex", gap: "1rem" }}>
          <Input
            icon="search"
            placeholder={_(".search_users")}
            value={searchQuery}
            onChange={(e, { value }) => setSearchQuery(value)}
            style={{ flex: 1 }}
          />
          <Link href="/admin/batch-import">
            <Button color="blue" icon labelPosition="left">
              <Icon name="upload" />
              {_(".batch_import")}
            </Button>
          </Link>
        </div>

        {filteredUsers.length === 0 ? (
          <Message info>{_(".no_users")}</Message>
        ) : (
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell width={1}>{_(".table.id")}</Table.HeaderCell>
                <Table.HeaderCell width={4}>{_(".table.username")}</Table.HeaderCell>
                <Table.HeaderCell width={4}>{_(".table.email")}</Table.HeaderCell>
                <Table.HeaderCell width={2}>{_(".table.ac_count")}</Table.HeaderCell>
                <Table.HeaderCell width={2}>{_(".table.submission_count")}</Table.HeaderCell>
                <Table.HeaderCell width={3}>{_(".table.actions")}</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {filteredUsers.map(user => (
                <UserListItem key={user.id} user={user} onToggleAdmin={handleToggleAdmin} onBanUser={handleBanUser} />
              ))}
            </Table.Body>
          </Table>
        )}
      </Segment>
    </AdminPanelPage>
  );
};

UsersManagePage = observer(UsersManagePage);

export default defineRoute(async () => {
  if (!appState.currentUser || !appState.currentUser.isAdmin) {
    throw new RouteError("Permission denied", { showBack: true });
  }

  return <UsersManagePage />;
});
