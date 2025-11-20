return {
  title: "Importuj użytkowników zbiorczo",
  info: {
    title: "Instrukcje",
    format: "Format: username,email,password (jeden użytkownik na linię)",
    example: "Przykład: alice,alice@example.com,password123",
    password_note: "Pole hasła jest opcjonalne. Pozostaw puste, aby wygenerować losowe hasło"
  },
  csv_content: "Zawartość CSV",
  csv_placeholder:
    "username1,email1@example.com,password1\nusername2,email2@example.com,password2\nusername3,email3@example.com,",
  require_password_change: "Wymagaj zmiany hasła przy pierwszym logowaniu",
  require_password_change_note: "Jeśli zaznaczone, użytkownicy będą musieli zmienić hasło przy pierwszym logowaniu",
  submit: "Rozpocznij import",
  cancel: "Anuluj",
  error: {
    empty_csv: "Zawartość CSV nie może być pusta"
  },
  success_all: "Pomyślnie zaimportowano {count} użytkowników",
  success_partial: "Pomyślnie zaimportowano {success} użytkowników, {fail} niepowodzeń",
  results: {
    title: "Wyniki importu",
    summary: "Łącznie {total} użytkowników, {success} powodzenia, {fail} niepowodzeń",
    status: "Status",
    username: "Nazwa użytkownika",
    email: "E-mail",
    message: "Wiadomość",
    success_message: "Import pomy" + "ślny"
  },
  errors: {
    PERMISSION_DENIED: "Brak uprawnień"
  }
};
