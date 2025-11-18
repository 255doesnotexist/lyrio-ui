return {
  title: "批量导入用户",
  info: {
    title: "使用说明",
    format: "格式：username,email,password（每行一个用户）",
    example: "示例：alice,alice@example.com,password123",
    password_note: "密码字段为可选，留空则自动生成随机密码"
  },
  csv_content: "CSV 内容",
  csv_placeholder: "username1,email1@example.com,password1\nusername2,email2@example.com,password2\nusername3,email3@example.com,",
  require_password_change: "要求用户首次登录时修改密码",
  require_password_change_note: "勾选后，用户在首次登录时将被强制要求修改密码",
  submit: "开始导入",
  cancel: "取消",
  error: {
    empty_csv: "CSV 内容不能为空"
  },
  success_all: "成功导入 {count} 个用户",
  success_partial: "成功导入 {success} 个用户，失败 {fail} 个",
  results: {
    title: "导入结果",
    summary: "共 {total} 个用户，成功 {success} 个，失败 {fail} 个",
    status: "状态",
    username: "用户名",
    email: "邮箱",
    message: "信息",
    success_message: "导入成功"
  },
  errors: {
    PERMISSION_DENIED: "权限不足"
  }
};
