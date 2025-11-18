return {
  menu: {
    profile: "プロファイル",
    preference: "環境設定",
    security: "セキュリティ",
    privilege: "権限",
    audit: "監査ログ"
  },
  back_to_profile: "ユーザページに戻る",
  back_to_profile_of_user: "このユーザのプロファイルに戻る",
  admin_warning: "管理者権限で他のユーザのプロファイルを閲覧しています",
  errors: {
    PERMISSION_DENIED: "権限がありません。",
    NO_SUCH_USER: "ユーザが存在しません。",
    DUPLICATE_USERNAME: "このユーザ名はすでに使用されています。",
    DUPLICATE_EMAIL: "このメールアドレスはすでに使用されています。",
    FAILED: "不明なエラーです。",
    FAILED_TO_SEND: "メール送信に失敗しました：{errorMessage}",
    RATE_LIMITED: "操作が頻繁すぎます。しばらく待ってからもう一度お試しください。"
  },
  profile: {
    title: "プロファイル設定",
    avatar: {
      header: "アイコン設定",
      gravatar: {
        name: "Gravatar"
      },
      qq: {
        name: "QQ アイコン",
        placeholder: "QQ ID"
      },
      github: {
        name: "GitHub アイコン",
        placeholder: "GitHub ID"
      },
      error: "アイコンを取得できませんでした。ユーザ名が正しいか確認してください。"
    },
    username: "ユーザ名",
    username_notes: "ユーザ名は変更できません。",
    username_notes_admin: "管理者は全員のユーザ名を変更できます。",
    email: "メールアドレス",
    public_email: "メールアドレスを公開する",
    email_notes: "セキュリティのページでメールアドレスを変更できます。",
    email_notes_admin: "管理者は全員のメールアドレスを変更できます",
    nickname: "Nickname",
    bio: "自己紹介",
    bio_placeholder: "自己紹介、お気に入りの言葉など",
    organization: "所属",
    organization_placeholder: "学校、会社など",
    location: "場所",
    location_placeholder: "国や地域",
    url: "ウェブページ",
    url_placeholder: "あなたのブログ、ホームページなど",
    qq: "QQ",
    qq_placeholder: "例：12345678",
    qq_notes: "あなたの QQ リンクは：",
    telegram: "Telegram",
    telegram_placeholder: " @ を含めない",
    telegram_notes: "あなたの Telegram リンクは：",
    github: "GitHub",
    github_placeholder: " @ を含めない",
    github_notes: "あなたの GitHub リンクは：",
    submit: "保存",
    error_invalid_username: "無効なユーザ名です。",
    error_invalid_email: "無効なメールアドレスです。",
    error_invalid_url: "無効な URL です。",
    success: "保存に成功しました。"
  },
  preference: {
    title: "環境設定",
    locale: {
      header: "言語",
      system: "言語設定",
      system_default: "ブラウザのデフォルト",
      system_default_name: "ブラウザのデフォルト（{name}）",
      system_notes:
        "フッターで言語を選択すると現在のブラウザにだけ適用されます。ここでの設定はアカウントに適用されます。",
      content: "問題文の言語",
      content_default: "システムのデフォルト",
      content_default_name: "システムのデフォルト（{name}）",
      content_notes: "選択した言語の問題文がない場合は、問題のデフォルト言語で表示します",
      hide_unavailable_message: "「このコンテンツはあなたの言語では利用できません」のメッセージを非表示"
    },
    appearance: {
      header: "外観",
      theme: "テーマ",
      themes: {
        auto: {
          name: "自動",
          description: "ブラウザまたはシステムの設定に基づいてライトテーマ（PURE）またはダークテーマ（FAR）を使用"
        },
        pure: {
          name: "PURE",
          description: "ライトテーマ"
        },
        far: {
          name: "FAR",
          description: "ダークテーマ"
        }
      },
      content_font_face: "コンテンツフォント",
      system_default_sans_serif: "sans-serif（ブラウザのデフォルト）",
      system_default_serif: "serif（ブラウザのデフォルト）",
      content_preview: "プレビュー",
      code_font_face: "コードフォント",
      system_default: "monospace（ブラウザのデフォルト）",
      code_font_size: "コードフォントサイズ",
      code_line_height: "コード行の高さ",
      code_font_ligatures: "合字を有効にする",
      code_font_ligatures_notes:
        "合字により、一部の組み合わせ記号をより読みやすい形で表示できます。この機能をサポートするフォントは限られています。",
      code_preview: "プレビュー",
      markdown_editor_font: {
        markdown_editor: "Markdown エディタ",
        content_font: "コンテンツフォント",
        code_font: "コードフォント"
      }
    },
    code_language: {
      header: "プログラミング言語",
      language: "プログラミング言語",
      content_notes: "提出言語のデフォルト設定。"
    },
    code_formatter: {
      header: "コードフォーマット",
      astyle_options: "Astyle オプション",
      format_code_by_default: "デフォルトでコードをフォーマットして表示",
      notes_before: "提出ページのコードのフォーマットに使用します。",
      notes_link: "Astyle のリファレンス",
      notes_after: "を参照してください",
      preview: "プレビュー",
      error: "オプションが間違っています"
    },
    submit: "保存",
    success: "保存に成功しました。"
  },
  security: {
    title: "セキュリティ設定",
    password_change_required: {
      title: "パスワード変更が必要です",
      message: "アカウントのセキュリティのため、システムを使用する前にパスワードを変更する必要があります。"
    },
    password: {
      header: "パスワード変更",
      old: "現在のパスワード",
      new: "新しいパスワード",
      retype: "新しいパスワードを再入力",
      invalid_password: "無効なパスワードです。",
      empty_new_password: "新しいパスワードを入力してください。",
      empty_retype_password: "新しいパスワードを再入力してください。",
      wrong_old_password: "現在のパスワードが違います。",
      passwords_do_not_match: "パスワードが一致しません。",
      success: "パスワード変更に成功しました。",
      submit: "変更"
    },
    email: {
      header: "メールアドレス変更",
      email: "メールアドレス",
      invalid_email: "無効なメールアドレスです。",
      duplicate_email: "このメールアドレスはすでに使用されています。",
      email_verification_code: "メール確認コード",
      send_email_verification_code: "送信",
      verification_code_sent: "メール確認コードを送信しました。",
      invalid_email_verification_code: "無効なメール確認コードです",
      success: "メールアドレス変更に成功しました。",
      submit: "変更"
    },
    sessions: {
      header: "セッション",
      revoke_all: "すべてログアウト",
      confirm_revoke_all: "すべてログアウトの確認",
      success_revoke_all: "このユーザーのすべてのセッションを正常にログアウトしました。",
      success_revoke_all_current_user: "他のすべてのセッションを正常にログアウトしました。",
      current: "現在のセッション",
      last_active: "最終アクセス {time}",
      revoke: "ログアウト",
      confirm_revoke: "ログアウトの確認",
      success_revoke: "セッションを正常にログアウトしました。",
      login_ip: "{ip} でログイン   ·   ",
      login_ip_location: "{ip} でログイン   ·   ", // Currently we don't support IP location in other languages
      no_sessions: "このユーザーはセッションがありません",
      unknown_os_browser: "不明なブラウザとOS",
      notes_current_user:
        'あなたのアカウントのログイン中のセッションはすべて上記の通りです。他人が使用しているセッションを見つけた場合は、すぐにログアウトしてパスワードを変更してください。\n「パスワードをリセット」ページでパスワードを変更すると、すべてのセッションが自動的にログアウトされます。'
    }
  },
  privilege: {
    // NOTE: "Privilege" is NOT "Permission"
    // "Permission" is granted easily to anyone by a manager/admin or problem's owner to view or edit a problem
    // "Privilege" is granted to a managers by the admin to take control of a part of the app.
    title: "権限",
    header: "権限",
    privileges: {
      EditHomepage: {
        name: "ホームページ編集",
        notes: "ホームページの設定と内容を変更できます。例：お知らせやアナウンス。"
      },
      ManageUser: {
        name: "ユーザー管理",
        notes: "他のユーザーのプロフィール、設定、セキュリティ設定を変更できます。"
      },
      ManageUserGroup: {
        name: "ユーザーグループ管理",
        notes: "ユーザーグループの作成、編集、削除ができます。グループメンバーを管理できます。"
      },
      ManageProblem: {
        name: "問題管理",
        notes: "すべての問題と提出を閲覧・編集でき、問題の権限を管理し、問題を削除できます。"
      },
      ManageContest: {
        name: "コンテスト管理",
        notes: "準備中。"
      },
      ManageDiscussion: {
        name: "ディスカッション管理",
        notes:
          "すべてのディスカッションと返信を閲覧・編集でき、ディスカッションの権限を管理し、ディスカッションまたは返信を削除できます。"
      },
      SkipRecaptcha: {
        name: "reCAPTCHA スキップ",
        notes:
          "reCAPTCHA（有効な場合）を検証せずに任意のリクエストを送信できます。ボットや仮想ジャッジに便利です。"
      }
    },
    display_settings: "表示設定",
    hidden_from_ranking: {
      name: "ホームページのランキングから非表示",
      notes: "有効にすると、このユーザーはホームページのユーザーランキングリストに表示されません。"
    },
    actions: "アクション",
    reset_password: {
      title: "パスワードをリセット",
      new_password: "新しいパスワード",
      leave_empty_for_random: "空欄にするとランダムなパスワードが生成されます",
      require_password_change: "次回ログイン時にパスワード変更を要求",
      generated_password: "生成されたパスワード",
      cancel: "キャンセル",
      confirm: "リセットを確認",
      success: "パスワードのリセットに成功しました",
      success_with_generated: "ランダムパスワードでリセットに成功しました",
      button: "ユーザーパスワードをリセット"
    },
    batch_import: {
      button: "ユーザー一括インポート"
    },
    admin_only: "管理者のみがユーザーの権限を変更できます。",
    submit: "送信",
    success: "権限が正常に更新されました"
  },
  audit: {
    title: "監査ログ",
    header: "監査ログ",
    query: {
      action_query: "アクション",
      ip: "IPアドレス",
      first_object_id: "オブジェクト 1",
      second_object_id: "オブジェクト 2",
      filter: "フィルター"
    },
    no_audit_log: "監査ログがありません",
    no_matched_audit_log: "一致する監査ログがありません",
    copy_details: "詳細をコピー",
    goback: "戻る"
  }
};
