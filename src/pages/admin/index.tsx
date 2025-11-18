import { lazy, mount, redirect } from "navi";

export default {
  admin: mount({
    "/users": lazy(() => import("./users/UsersManagePage")),
    "/batch-import": lazy(() => import("./batch-import/BatchImportPage")),
    "/": redirect("/admin/users")
  })
};
