return {
  menu: {
    profile: "Profil",
    preference: "Preferencje",
    security: "Bezpieczeństwo",
    privilege: "Uprawnienia",
    audit: "Dziennik audytu"
  },
  back_to_profile: "Powrót do profilu",
  back_to_profile_of_user: "Powrót do profilu użytkownika",
  admin_warning: "Przeglądasz i edytujesz innego użytkownika, korzystając ze swoich uprawnień.",
  errors: {
    PERMISSION_DENIED: "Brak uprawnień.",
    NO_SUCH_USER: "Użytkownik nie istnieje.",
    DUPLICATE_USERNAME: "Nazwa użytkownika już zajęta.",
    DUPLICATE_EMAIL: "E-mail już używany.",
    FAILED: "Nieznany błąd.",
    FAILED_TO_SEND: "Nie udało się wysłać wiadomości: {errorMessage}",
    RATE_LIMITED: "Twoje operacje są zbyt częste. Spróbuj ponownie później."
  },
  profile: {
    title: "Profil",
    avatar: {
      header: "Awatar",
      gravatar: {
        name: "Gravatar"
      },
      qq: {
        name: "Awatar QQ",
        placeholder: "Numer QQ"
      },
      github: {
        name: "Awatar GitHub",
        placeholder: "Nazwa użytkownika GitHub"
      },
      error: "Nie udało się załadować awatara. Sprawdź połączenie internetowe i nazwę konta powyżej."
    },
    username: "Nazwa użytkownika",
    username_notes: "Nie możesz zmienić swojej nazwy użytkownika.",
    username_notes_admin: "Masz uprawnienia do zmiany nazwy użytkownika.",
    email: "E-mail",
    public_email: "Upublicznij mój e-mail",
    email_notes: "Przejdź do panelu Bezpieczeństwo, aby zmienić e-mail.",
    email_notes_admin: "Masz uprawnienia do zmiany e-maila.",
    nickname: "Pseudonim",
    bio: "O mnie",
    bio_placeholder: "Napisz coś o sobie lub cytaty, które lubisz.",
    organization: "Organizacja",
    organization_placeholder: "Twoja szkoła, firma lub organizacja wirtualna.",
    location: "Lokalizacja",
    location_placeholder: "Twoja fizyczna lokalizacja.",
    url: "URL",
    url_placeholder: "Twoja strona osobista lub blog.",
    qq: "QQ",
    qq_placeholder: "np. 12345678",
    qq_notes: "Twój link QQ: ",
    telegram: "Telegram",
    telegram_placeholder: "Bez '@'",
    telegram_notes: "Twój link Telegram: ",
    github: "GitHub",
    github_placeholder: "Bez '@'",
    github_notes: "Twój link GitHub: ",
    submit: "Wyślij",
    error_invalid_username: "Nieprawidłowa nazwa użytkownika.",
    error_invalid_email: "Nieprawidłowy adres e-mail.",
    error_invalid_url: "Nieprawidłowy URL.",
    success: "Profil zaktualizowany pomyślnie."
  },
  preference: {
    title: "Preferencje",
    locale: {
      header: "Język",
      system: "Preferowany język systemu",
      system_default: "Domyślny przeglądarki",
      system_default_name: "Domyślny przeglądarki ({name})",
      system_notes:
        "Zmiana języka w stopce strony wpływa tylko na Twoją lokalną przeglądarkę. Zmiana tutaj wpłynie na logowania Twojego konta wszędzie.",
      content: "Preferowany język treści",
      content_default: "Taki sam jak język systemu",
      content_default_name: "Taki sam jak język systemu ({name})",
      content_notes:
        "Jeśli wybrany język nie jest dostępny dla niektórych treści, wyświetlimy ich wersje w języku domyślnym.",
      hide_unavailable_message: 'Ukryj komunikat "ta treść nie jest dostępna w Twoim preferowanym języku"'
    },
    appearance: {
      header: "Wygląd",
      theme: "Motyw",
      themes: {
        auto: {
          name: "Auto",
          description: "Użyj jasnego (PURE) lub ciemnego (FAR) motywu na podstawie preferencji przeglądarki lub systemu"
        },
        pure: {
          name: "PURE",
          description: "Jasny motyw"
        },
        far: {
          name: "FAR",
          description: "Ciemny motyw"
        }
      },
      content_font_face: "Czcionka treści",
      system_default_sans_serif: "sans-serif (domyślna przeglądarki)",
      system_default_serif: "serif (domyślna przeglądarki)",
      content_preview: "Podgląd",
      code_font_face: "Czcionka kodu",
      system_default: "monospace (domyślna przeglądarki)",
      code_font_size: "Rozmiar czcionki kodu",
      code_line_height: "Wysokość linii kodu",
      code_font_ligatures: "Włącz ligatury",
      code_font_ligatures_notes:
        "Ligatury mogą wyświetlać niektóre symbole łączone w bardziej czytelnej formie. Tylko niektóre czcionki obsługują tę funkcję.",
      code_preview: "Podgląd",
      markdown_editor_font: {
        markdown_editor: "Edytor Markdown",
        content_font: "Czcionka treści",
        code_font: "Czcionka kodu"
      }
    },
    code_language: {
      header: "Język programowania",
      language: "Domyślny język",
      content_notes: "Ustawienie domyślnych opcji języka tutaj wpłynie na wartości domyślne podczas przesyłania zadań."
    },
    code_formatter: {
      header: "Formater kodu",
      astyle_options: "Opcje Astyle",
      format_code_by_default: "Formatuj kod domyślnie",
      notes_before: "Opcje dotyczą formatowania kodu na stronie przesyłania. Zobacz",
      notes_link: "dokumentację Astyle",
      notes_after: "aby uzyskać pomoc.",
      preview: "Podgląd",
      error: "Nieprawidłowe opcje"
    },
    submit: "Wyślij",
    success: "Preferencje zaktualizowane pomyślnie."
  },
  security: {
    title: "Bezpieczeństwo",
    password_change_required: {
      title: "Wymagana zmiana hasła",
      message: "Ze względów bezpieczeństwa konta musisz zmienić hasło przed kontynuowaniem korzystania z systemu."
    },
    password: {
      header: "Zmień hasło",
      old: "Stare hasło",
      new: "Nowe hasło",
      retype: "Powtórz hasło",
      invalid_password: "Nieprawidłowe hasło.",
      empty_new_password: "Hasło nie może być puste.",
      empty_retype_password: "Powtórzenie hasła nie może być puste",
      wrong_old_password: "Nieprawidłowe stare hasło.",
      passwords_do_not_match: "Hasła nie pasują.",
      success: "Hasło zmienione pomyślnie.",
      submit: "Wyślij"
    },
    email: {
      header: "Zmień e-mail",
      email: "E-mail",
      invalid_email: "Nieprawidłowy adres e-mail.",
      duplicate_email: "Ten adres e-mail jest już zajęty.",
      email_verification_code: "Kod weryfikacyjny e-mail",
      send_email_verification_code: "Wyślij",
      verification_code_sent: "Kod weryfikacyjny e-mail wysłany.",
      invalid_email_verification_code: "Nieprawidłowy kod weryfikacyjny e-mail",
      success: "E-mail zmieniony pomyślnie.",
      submit: "Wyślij"
    },
    sessions: {
      header: "Sesje",
      revoke_all: "Wyloguj wszystkie",
      confirm_revoke_all: "Potwierdź wylogowanie wszystkich",
      success_revoke_all: "Pomyślnie wylogowano wszystkie sesje tego użytkownika.",
      success_revoke_all_current_user: "Pomyślnie wylogowano wszystkie Twoje inne sesje.",
      current: "Bieżąca sesja",
      last_active: "Ostatnio widziano {time}",
      revoke: "Wyloguj",
      confirm_revoke: "Potwierdź wylogowanie",
      success_revoke: "Pomyślnie wylogowano sesję.",
      login_ip: "Zalogowano z {ip}   ·   ",
      login_ip_location: "Zalogowano z {ip}   ·   ",
      no_sessions: "Ten użytkownik nie ma sesji",
      unknown_os_browser: "Nieznana przeglądarka i system operacyjny",
      notes_current_user:
        'Wszystkie zalogowane sesje Twojego konta są powyżej. Jeśli widzisz sesję używaną przez innych, wyloguj ją i natychmiast zmień hasło.\nZmiana hasła na stronie "Resetuj hasło" automatycznie wyloguje WSZYSTKIE Twoje sesje.'
    }
  },
  privilege: {
    title: "Uprawnienia",
    header: "Uprawnienia",
    privileges: {
      EditHomepage: {
        name: "Edytuj stronę główną",
        notes: "Modyfikuj konfigurację i zawartość strony głównej, np. powiadomienia i ogłoszenia."
      },
      ManageUser: {
        name: "Zarządzaj użytkownikami",
        notes: "Modyfikuj profil, preferencje i ustawienia bezpieczeństwa innych użytkowników."
      },
      ManageUserGroup: {
        name: "Zarządzaj grupami użytkowników",
        notes: "Twórz, edytuj i usuwaj grupy użytkowników. Zarządzaj członkami grup."
      },
      ManageProblem: {
        name: "Zarządzaj zadaniami",
        notes: "Przeglądaj, edytuj wszystkie zadania i zgłoszenia, zarządzaj uprawnieniami zadań i usuwaj zadania."
      },
      ManageContest: {
        name: "Zarządzaj konkursami",
        notes: "Placeholder."
      },
      ManageDiscussion: {
        name: "Zarządzaj dyskusjami",
        notes:
          "Przeglądaj, edytuj wszystkie dyskusje i odpowiedzi, zarządzaj uprawnieniami dyskusji i usuwaj dyskusje lub odpowiedzi."
      },
      SkipRecaptcha: {
        name: "Pomiń reCAPTCHA",
        notes: "Wysyłaj wszelkie żądania bez weryfikacji reCAPTCHA (jeśli włączona). Przydatne dla robotów i wirtualnego sędziego."
      }
    },
    display_settings: "Ustawienia wyświetlania",
    hidden_from_ranking: {
      name: "Ukryj w rankingu strony głównej",
      notes: "Po włączeniu ten użytkownik nie będzie wyświetlany na liście rankingu użytkowników na stronie głównej."
    },
    actions: "Akcje",
    reset_password: {
      title: "Zresetuj hasło",
      new_password: "Nowe hasło",
      leave_empty_for_random: "Pozostaw puste, aby wygenerować losowe hasło",
      require_password_change: "Wymagaj zmiany hasła przy następnym logowaniu",
      generated_password: "Wygenerowane hasło",
      cancel: "Anuluj",
      confirm: "Potwierdź reset",
      success: "Hasło zresetowane pomyślnie",
      success_with_generated: "Hasło zresetowane pomyślnie z automatycznie wygenerowanym hasłem",
      button: "Zresetuj hasło użytkownika"
    },
    batch_import: {
      button: "Importuj użytkowników zbiorczo"
    },
    admin_only: "Tylko administratorzy mogą zmieniać uprawnienia użytkowników.",
    submit: "Wyślij",
    success: "Uprawnienia zaktualizowane pomyślnie"
  },
  audit: {
    title: "Dziennik audytu",
    header: "Dziennik audytu",
    query: {
      action_query: "Akcja",
      ip: "Adres IP",
      first_object_id: "Obiekt 1",
      second_object_id: "Obiekt 2",
      filter: "Filtruj"
    },
    no_audit_log: "Brak dziennika audytu",
    no_matched_audit_log: "Brak pasującego dziennika audytu",
    copy_details: "Kopiuj szczegóły",
    goback: "Wróć"
  }
};
