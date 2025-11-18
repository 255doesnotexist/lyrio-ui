import { getRoute } from "@/AppRouter";

export default {
  batchImport: getRoute(() => import("./BatchImportPage"), "batchImport")
};
