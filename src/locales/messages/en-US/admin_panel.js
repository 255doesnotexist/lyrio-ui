return {
  title: "Admin Panel",
  menu: {
    users: "User Management",
    homepage: "Homepage Management",
    judge_machines: "Judge Machines"
  },
  owner: "Owner",
  admin: "Admin",
  cannot_modify_owner: "Cannot Modify",
  owner_description: "The owner is the first registered user with highest privileges and cannot be demoted",
  revoke_admin: "Revoke Admin",
  grant_admin: "Grant Admin",
  admin_granted: "Admin privileges granted",
  admin_revoked: "Admin privileges revoked",
  banned: "Banned",
  ban_user: "Ban User",
  unban_user: "Unban User",
  cannot_ban_admin: "Cannot Ban",
  cannot_ban_admin_description: "Admin users cannot be banned",
  ban_user_title: "Ban User",
  ban_reason_label: "Ban Reason",
  ban_reason_placeholder: "Enter ban reason...",
  cancel: "Cancel",
  confirm_ban: "Confirm Ban",
  user_banned: "User has been banned",
  user_unbanned: "User has been unbanned",
  search_users: "Search users...",
  no_users: "No users found",
  batch_import: "Batch Import Users",
  table: {
    id: "ID",
    username: "Username",
    email: "Email",
    ac_count: "AC Count",
    submission_count: "Submissions",
    actions: "Actions"
  },
  user_admin: {
    error: {
      PERMISSION_DENIED: "Permission denied",
      NO_SUCH_USER: "User not found",
      CANNOT_MODIFY_OWNER: "Cannot modify owner's privileges"
    }
  },
  user_list: {
    error: {
      PERMISSION_DENIED: "Permission denied"
    }
  },
  user_ban: {
    error: {
      PERMISSION_DENIED: "Permission denied",
      NO_SUCH_USER: "User not found",
      CANNOT_BAN_ADMIN: "Cannot ban admin users"
    }
  }
};
