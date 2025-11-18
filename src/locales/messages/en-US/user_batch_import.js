return {
  title: "Batch Import Users",
  info: {
    title: "Instructions",
    format: "Format: username,email,password (one user per line)",
    example: "Example: alice,alice@example.com,password123",
    password_note: "Password field is optional. Leave blank for auto-generated random password"
  },
  csv_content: "CSV Content",
  csv_placeholder: "username1,email1@example.com,password1\nusername2,email2@example.com,password2\nusername3,email3@example.com,",
  require_password_change: "Require password change on first login",
  require_password_change_note: "If checked, users will be required to change their password on first login",
  submit: "Start Import",
  cancel: "Cancel",
  error: {
    empty_csv: "CSV content cannot be empty"
  },
  success_all: "Successfully imported {count} user(s)",
  success_partial: "Successfully imported {success} user(s), failed {fail}",
  results: {
    title: "Import Results",
    summary: "Total {total} user(s), {success} successful, {fail} failed",
    status: "Status",
    username: "Username",
    email: "Email",
    message: "Message",
    success_message: "Import successful"
  },
  errors: {
    PERMISSION_DENIED: "Permission denied"
  }
};
