return {
  title: "管理パネル",
  menu: {
    users: "ユーザー管理",
    homepage: "ホームページ管理",
    judge_machines: "ジャッジマシン"
  },
  owner: "オーナー",
  admin: "管理者",
  cannot_modify_owner: "変更不可",
  owner_description: "オーナーは最初に登録されたユーザーで最高権限を持ち、管理者権限を取り消すことはできません",
  revoke_admin: "管理者権限を取り消す",
  grant_admin: "管理者権限を付与",
  admin_granted: "管理者権限を付与しました",
  admin_revoked: "管理者権限を取り消しました",
  banned: "禁止",
  ban_user: "ユーザーを禁止",
  unban_user: "禁止を解除",
  cannot_ban_admin: "禁止不可",
  cannot_ban_admin_description: "管理者は禁止できません",
  ban_user_title: "ユーザーを禁止",
  ban_reason_label: "禁止理由",
  ban_reason_placeholder: "禁止理由を入力...",
  cancel: "キャンセル",
  confirm_ban: "禁止を確認",
  user_banned: "ユーザーを禁止しました",
  user_unbanned: "禁止を解除しました",
  search_users: "ユーザーを検索...",
  no_users: "ユーザーが見つかりません",
  batch_import: "ユーザー一括インポート",
  table: {
    id: "ID",
    username: "ユーザー名",
    email: "メール",
    ac_count: "AC数",
    submission_count: "提出数",
    actions: "操作"
  },
  user_admin: {
    error: {
      PERMISSION_DENIED: "権限がありません",
      NO_SUCH_USER: "ユーザーが存在しません",
      CANNOT_MODIFY_OWNER: "オーナーの権限は変更できません"
    }
  },
  user_list: {
    error: {
      PERMISSION_DENIED: "権限がありません"
    }
  },
  user_ban: {
    error: {
      PERMISSION_DENIED: "権限がありません",
      NO_SUCH_USER: "ユーザーが存在しません",
      CANNOT_BAN_ADMIN: "管理者を禁止できません"
    }
  }
};
