return {
  contest_list: "比赛列表",
  create_contest: "创建比赛",
  edit_contest: "编辑比赛",
  contest_name: "比赛名称",
  start_time: "开始时间",
  end_time: "结束时间",
  type: "赛制",
  status_label: "状态",
  no_contest: "暂无比赛",

  status: {
    not_started: "未开始",
    running: "进行中",
    ended: "已结束"
  },

  basic_info: "基本信息",
  owner: "创建者",
  problem_count: "题目数量",
  time_to_start: "距开始",
  time_to_end: "距结束",
  contest_ended: "比赛已结束",

  tab: {
    problems: "题目",
    ranklist: "排行榜",
    submissions: "提交记录",
    announcement: "公告",
    editorial: "题解"
  },

  view_ranklist: "查看排行榜",
  view_submissions: "查看提交记录",
  problem_index: "编号",
  problem_title: "题目",
  problem_stats: "统计",

  register: "报名参赛",
  unregister: "取消报名",
  login_to_register: "登录以报名",
  register_success: "报名成功",
  unregister_success: "取消报名成功",

  register_error: {
    PERMISSION_DENIED: "权限不足",
    NO_SUCH_CONTEST: "比赛不存在",
    ALREADY_REGISTERED: "已报名该比赛",
    CONTEST_NOT_STARTED: "比赛尚未开始"
  },

  unregister_error: {
    PERMISSION_DENIED: "权限不足",
    NO_SUCH_CONTEST: "比赛不存在",
    NOT_REGISTERED: "未报名该比赛",
    CONTEST_STARTED: "比赛已开始，无法取消报名"
  },

  ranklist_title: "{title} - 排行榜",
  contest_type: "赛制",
  rank: "排名",
  username: "用户",
  total_score: "总分",
  solved: "通过",
  penalty: "罚时",
  no_ranklist_data: "暂无排行榜数据",
  last_update: "最后更新",
  auto_refresh_30s: "每30秒自动刷新",
  refresh: "刷新",

  form: {
    title: "比赛标题",
    title_placeholder: "请输入比赛标题",
    description: "比赛描述",
    description_placeholder: "请输入比赛描述",
    start_time: "开始时间",
    end_time: "结束时间",
    type: "赛制类型",
    visibility: "可见性",
    public: "公开",
    private: "私有",
    problem_ids: "题目 ID 列表",
    problem_ids_placeholder: "输入题目 ID，用逗号分隔，如：1001,1002,1003",
    problem_ids_hint: "请输入已存在的题目 ID，按逗号分隔。题目将按输入顺序排列。",
    announcement: "比赛公告",
    announcement_placeholder: "请输入比赛公告（支持 Markdown）",
    editorial: "题解",
    editorial_placeholder: "请输入题解（支持 Markdown，比赛结束后显示）"
  },

  button: {
    create: "创建",
    update: "更新",
    cancel: "取消"
  },

  error: {
    required_fields: "请填写所有必填字段",
    no_problems: "请至少添加一道题目",
    PERMISSION_DENIED: "权限不足",
    NO_SUCH_CONTEST: "比赛不存在",
    INVALID_TIME_RANGE: "开始时间必须早于结束时间",
    NO_SUCH_PROBLEM: "题目不存在"
  },

  success: {
    created: "比赛创建成功",
    updated: "比赛更新成功"
  },

  contest_not_started: "比赛尚未开始",
  contest_not_started_hint: "比赛开始后才能提交代码",
  contest_ended_hint: "比赛已结束，现在为练习模式",
  problem_in_contest: "比赛题目",
  problem_in_contest_hint: "这是比赛中的题目。提交将计入比赛排名。",
  view_problem_standalone: "在题库中查看",
  redirecting_to_problem: "正在跳转到题目页面...",
  click_here: "点击这里",
  registration_required: "需要报名",
  registration_required_hint: "您必须报名参加此比赛才能访问题目",
  go_to_contest: "返回比赛页面",
  view_problem_list: "题目列表"
};
