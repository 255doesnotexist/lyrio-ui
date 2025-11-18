return {
  title: "后台面板",
  menu: {
    users: "用户管理",
    homepage: "首页管理",
    judge_machines: "评测机管理"
  },
  owner: "所有者",
  admin: "管理员",
  cannot_modify_owner: "不可操作",
  owner_description: "所有者是第一个注册的用户，拥有最高权限且不可被撤销管理员权限",
  revoke_admin: "撤销管理员",
  grant_admin: "授予管理员",
  admin_granted: "已授予管理员权限",
  admin_revoked: "已撤销管理员权限",
  banned: "已封禁",
  ban_user: "封禁用户",
  unban_user: "解封用户",
  cannot_ban_admin: "不可封禁",
  cannot_ban_admin_description: "管理员用户不可被封禁",
  ban_user_title: "封禁用户",
  ban_reason_label: "封禁理由",
  ban_reason_placeholder: "请输入封禁理由...",
  cancel: "取消",
  confirm_ban: "确认封禁",
  user_banned: "用户已被封禁",
  user_unbanned: "用户已被解封",
  search_users: "搜索用户...",
  no_users: "未找到用户",
  batch_import: "批量导入用户",
  table: {
    id: "ID",
    username: "用户名",
    email: "邮箱",
    ac_count: "通过数",
    submission_count: "提交数",
    actions: "操作"
  },
  user_admin: {
    error: {
      PERMISSION_DENIED: "权限不足",
      NO_SUCH_USER: "用户不存在",
      CANNOT_MODIFY_OWNER: "不能修改所有者的权限"
    }
  },
  user_list: {
    error: {
      PERMISSION_DENIED: "权限不足"
    }
  },
  user_ban: {
    error: {
      PERMISSION_DENIED: "权限不足",
      NO_SUCH_USER: "用户不存在",
      CANNOT_BAN_ADMIN: "不能封禁管理员"
    }
  }
};
