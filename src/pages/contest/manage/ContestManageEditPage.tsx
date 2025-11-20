import React from "react";

import api from "@/api";
import { defineRoute, RouteError } from "@/AppRouter";
import ContestManagePage from "./ContestManagePage";

export default defineRoute(async request => {
  const contestId = parseInt(request.params.id);
  const { requestError, response } = await api.contest.getContestDetail({
    contestId
  });

  if (requestError || !response || response.error) {
    throw new RouteError("Contest not found", { showBack: true });
  }

  return <ContestManagePage isEdit={true} contest={response} />;
});
