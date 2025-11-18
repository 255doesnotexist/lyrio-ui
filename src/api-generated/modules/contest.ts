// This file is generated automatically, do NOT modify it.

/// <reference path="../types.d.ts" />

import { createGetApi, createPostApi } from "@/api";

export const getContestList = createPostApi<ApiTypes.GetContestListRequestDto, ApiTypes.GetContestListResponseDto>(
  "contest/getContestList",
  false
);
export const getContestDetail = createPostApi<
  ApiTypes.GetContestDetailRequestDto,
  ApiTypes.GetContestDetailResponseDto
>("contest/getContestDetail", false);
export const createContest = createPostApi<ApiTypes.CreateContestRequestDto, ApiTypes.CreateContestResponseDto>(
  "contest/createContest",
  false
);
export const updateContest = createPostApi<ApiTypes.UpdateContestRequestDto, ApiTypes.UpdateContestResponseDto>(
  "contest/updateContest",
  false
);
export const deleteContest = createPostApi<ApiTypes.DeleteContestRequestDto, ApiTypes.DeleteContestResponseDto>(
  "contest/deleteContest",
  false
);
export const getContestRanklist = createPostApi<
  ApiTypes.GetContestRanklistRequestDto,
  ApiTypes.GetContestRanklistResponseDto
>("contest/getContestRanklist", false);
export const registerContest = createPostApi<ApiTypes.RegisterContestRequestDto, ApiTypes.RegisterContestResponseDto>(
  "contest/registerContest",
  false
);
export const unregisterContest = createPostApi<
  ApiTypes.UnregisterContestRequestDto,
  ApiTypes.UnregisterContestResponseDto
>("contest/unregisterContest", false);
