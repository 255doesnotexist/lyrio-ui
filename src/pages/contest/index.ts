import { mount, lazy } from "navi";

export default {
  c: mount({
    "/": lazy(() => import("./list/ContestListPage")),
    "/:id": mount({
      "/": lazy(() => import("./detail/ContestDetailPage")),
      "/ranklist": lazy(() => import("./ranklist/ContestRanklistPage")),
      "/edit": lazy(() => import("./manage/ContestManageEditPage")),
      "/p/:problemId": lazy(() => import("./problem/ContestProblemPage"))
    }),
    "/new": lazy(() => import("./manage/ContestManageNewPage"))
  })
};
