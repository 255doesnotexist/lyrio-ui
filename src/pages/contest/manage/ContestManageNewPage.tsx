import React from "react";
import { defineRoute } from "@/AppRouter";
import ContestManagePage from "./ContestManagePage";

export default defineRoute(async () => {
  return <ContestManagePage isEdit={false} />;
});
