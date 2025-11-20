import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { Grid, Menu, Icon, Header } from "semantic-ui-react";
import { Link } from "react-navi";

import { appState } from "@/appState";
import { useLocalizer, useNavigationChecked } from "@/utils/hooks";
import style from "./AdminPanelPage.module.less";

export interface AdminPanelPageProps {
  children: React.ReactNode;
  activeMenu: "users" | "homepage" | "judge-machines";
}

let AdminPanelPage: React.FC<AdminPanelPageProps> = props => {
  const _ = useLocalizer("admin_panel");
  const navigation = useNavigationChecked();

  useEffect(() => {
    appState.enterNewPage(_(".title"), null);
  }, []);

  if (!appState.currentUser || !appState.currentUser.isAdmin) {
    navigation.navigate("/");
    return null;
  }

  return (
    <div className={style.container}>
      <Header as="h1">
        <Icon name="cog" />
        <Header.Content>{_(".title")}</Header.Content>
      </Header>

      <Grid>
        <Grid.Column width={4}>
          <Menu vertical fluid>
            <Menu.Item as={Link} href="/admin/users" active={props.activeMenu === "users"}>
              <Icon name="users" />
              {_(".menu.users")}
            </Menu.Item>
            <Menu.Item as={Link} href="/homepage-settings" active={props.activeMenu === "homepage"}>
              <Icon name="home" />
              {_(".menu.homepage")}
            </Menu.Item>
            <Menu.Item as={Link} href="/judge-machine" active={props.activeMenu === "judge-machines"}>
              <Icon name="server" />
              {_(".menu.judge_machines")}
            </Menu.Item>
          </Menu>
        </Grid.Column>

        <Grid.Column width={12}>{props.children}</Grid.Column>
      </Grid>
    </div>
  );
};

AdminPanelPage = observer(AdminPanelPage);
export default AdminPanelPage;
