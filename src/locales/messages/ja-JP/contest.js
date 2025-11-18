return {
  contest_list: "コンテスト一覧",
  create_contest: "コンテスト作成",
  edit_contest: "コンテスト編集",
  contest_name: "コンテスト名",
  start_time: "開始時刻",
  end_time: "終了時刻",
  type: "形式",
  status_label: "状態",
  no_contest: "コンテストがありません",

  status: {
    not_started: "未開始",
    running: "実施中",
    ended: "終了"
  },

  basic_info: "基本情報",
  owner: "作成者",
  problem_count: "問題数",
  time_to_start: "開始まで",
  time_to_end: "終了まで",
  contest_ended: "コンテストは終了しました",

  tab: {
    problems: "問題",
    ranklist: "順位表",
    submissions: "提出一覧",
    announcement: "お知らせ",
    editorial: "解説"
  },

  view_ranklist: "順位表を見る",
  view_submissions: "提出一覧を見る",
  problem_index: "番号",
  problem_title: "問題",
  problem_stats: "統計",

  register: "参加登録",
  unregister: "登録解除",
  login_to_register: "ログインして参加登録",
  register_success: "参加登録が完了しました",
  unregister_success: "登録を解除しました",

  register_error: {
    PERMISSION_DENIED: "権限がありません",
    NO_SUCH_CONTEST: "コンテストが存在しません",
    ALREADY_REGISTERED: "既に参加登録済みです",
    CONTEST_NOT_STARTED: "コンテストがまだ開始していません"
  },

  unregister_error: {
    PERMISSION_DENIED: "権限がありません",
    NO_SUCH_CONTEST: "コンテストが存在しません",
    NOT_REGISTERED: "参加登録していません",
    CONTEST_STARTED: "コンテスト開始後は登録解除できません"
  },

  ranklist_title: "{title} - 順位表",
  contest_type: "コンテスト形式",
  rank: "順位",
  username: "ユーザー名",
  total_score: "合計点",
  solved: "正解数",
  penalty: "ペナルティ",
  no_ranklist_data: "順位表データがありません",

  form: {
    title: "コンテストタイトル",
    title_placeholder: "コンテストタイトルを入力",
    description: "説明",
    description_placeholder: "コンテストの説明を入力",
    start_time: "開始時刻",
    end_time: "終了時刻",
    type: "コンテスト形式",
    visibility: "公開設定",
    public: "公開",
    private: "非公開",
    problem_ids: "問題 ID リスト",
    problem_ids_placeholder: "問題 ID をカンマ区切りで入力（例：1001,1002,1003）",
    problem_ids_hint: "既存の問題 ID をカンマ区切りで入力してください。問題は入力順に並びます。",
    announcement: "お知らせ",
    announcement_placeholder: "お知らせを入力（Markdown 対応）",
    editorial: "解説",
    editorial_placeholder: "解説を入力（Markdown 対応、コンテスト終了後に表示されます）"
  },

  button: {
    create: "作成",
    update: "更新",
    cancel: "キャンセル"
  },

  error: {
    required_fields: "すべての必須項目を入力してください",
    no_problems: "少なくとも1つの問題を追加してください",
    PERMISSION_DENIED: "権限がありません",
    NO_SUCH_CONTEST: "コンテストが存在しません",
    INVALID_TIME_RANGE: "開始時刻は終了時刻より前でなければなりません",
    NO_SUCH_PROBLEM: "問題が存在しません"
  },

  success: {
    created: "コンテストを作成しました",
    updated: "コンテストを更新しました"
  },

  contest_not_started: "コンテストは開始していません",
  contest_not_started_hint: "コンテスト開始後に提出できます",
  contest_ended_hint: "コンテストは終了しました。練習モードです",
  problem_in_contest: "コンテスト問題",
  problem_in_contest_hint: "これはコンテストの問題です。提出はコンテストの順位に反映されます。",
  view_problem_standalone: "問題セットで表示",
  redirecting_to_problem: "問題ページに移動しています...",
  click_here: "こちらをクリック",
  registration_required: "参加登録が必要です",
  registration_required_hint: "このコンテストの問題にアクセスするには参加登録が必要です",
  go_to_contest: "コンテストページへ",
  view_problem_list: "問題一覧"
};
