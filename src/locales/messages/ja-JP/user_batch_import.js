return {
  title: "ユーザー一括インポート",
  info: {
    title: "使用方法",
    format: "形式：username,email,password（1行に1ユーザー）",
    example: "例：alice,alice@example.com,password123",
    password_note: "パスワードは省略可能です。空白の場合はランダムなパスワードが生成されます"
  },
  csv_content: "CSV コンテンツ",
  csv_placeholder:
    "username1,email1@example.com,password1\nusername2,email2@example.com,password2\nusername3,email3@example.com,",
  require_password_change: "初回ログイン時にパスワード変更を要求",
  require_password_change_note: "チェックすると、ユーザーは初回ログイン時にパスワードの変更が必要になります",
  submit: "インポート開始",
  cancel: "キャンセル",
  error: {
    empty_csv: "CSV コンテンツは空にできません"
  },
  success_all: "{count}人のユーザーを正常にインポートしました",
  success_partial: "{success}人のユーザーを正常にインポート、{fail}人が失敗しました",
  results: {
    title: "インポート結果",
    summary: "合計 {total}人、成功 {success}人、失敗 {fail}人",
    status: "ステータス",
    username: "ユーザー名",
    email: "メール",
    message: "メッセージ",
    success_message: "インポート成功"
  },
  errors: {
    PERMISSION_DENIED: "権限がありません"
  }
};
