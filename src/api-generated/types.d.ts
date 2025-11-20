// This file is generated automatically, do NOT modify it.

declare namespace ApiTypes {
  namespace Schemas {
    export interface AddJudgeClientRequestDto {
      name: string;
      allowedHosts: string[];
    }
    export interface AddJudgeClientResponseDto {
      error?: "PERMISSION_DENIED";
      judgeClient?: JudgeClientInfoDto;
    }
    export interface AddProblemFileRequestDto {
      problemId: number;
      type: "TestData" | "AdditionalFile";
      filename: string;
      uploadInfo: FileUploadInfoDto;
    }
    export interface AddProblemFileResponseDto {
      error?:
        | "NO_SUCH_PROBLEM"
        | "PERMISSION_DENIED"
        | "TOO_MANY_FILES"
        | "TOTAL_SIZE_TOO_LARGE"
        | "FILE_UUID_EXISTS"
        | "FILE_NOT_UPLOADED";
      signedUploadRequest?: SignedFileUploadRequestDto;
    }
    export interface AddUserToGroupRequestDto {
      userId: number;
      groupId: number;
    }
    export interface AddUserToGroupResponseDto {
      error?: "PERMISSION_DENIED" | "NO_SUCH_USER" | "NO_SUCH_GROUP" | "USER_ALREADY_IN_GROUP";
    }
    export interface BanUserRequestDto {
      userId: number;
      isBanned: boolean;
      banReason?: string;
    }
    export interface BanUserResponseDto {
      error?: "PERMISSION_DENIED" | "NO_SUCH_USER" | "CANNOT_BAN_ADMIN";
    }
    export interface BatchImportUsersRequestDto {
      /**
       * CSV content with format: username,email,password (one user per line, no header row)
       */
      csvContent: string;
      /**
       * Whether imported users should be required to change password on first login
       */
      requirePasswordChange: boolean;
    }
    export interface BatchImportUsersResponseDto {
      error?: "PERMISSION_DENIED" | "INVALID_CSV_FORMAT" | "DUPLICATE_USERNAME" | "DUPLICATE_EMAIL";
      importedUsers?: {
        [key: string]: any;
      }[];
      successCount?: number;
      failureCount?: number;
    }
    export interface CalculateContestRatingRequestDto {
      contestId: number;
      /**
       * If true, recalculate this contest and all subsequent contests
       */
      recalculate?: boolean;
    }
    export interface CalculateContestRatingResponseDto {
      error?: "NO_SUCH_CONTEST" | "PERMISSION_DENIED" | "CONTEST_NOT_ENDED";
    }
    export interface CancelSubmissionRequestDto {
      submissionId: number;
    }
    export interface CancelSubmissionResponseDto {
      error?: "NO_SUCH_SUBMISSION" | "PERMISSION_DENIED";
    }
    export interface ChangeProblemTypeRequestDto {
      problemId: number;
      type: "Traditional" | "Interaction" | "SubmitAnswer";
    }
    export interface ChangeProblemTypeResponseDto {
      error?: "NO_SUCH_PROBLEM" | "PERMISSION_DENIED" | "PROBLEM_HAS_SUBMISSION";
    }
    export interface CheckAvailabilityResponseDto {
      usernameAvailable?: boolean;
      emailAvailable?: boolean;
    }
    export interface ContestMetaDto {
      id: number;
      title: string;
      description: string;
      startTime: string; // date-time
      endTime: string; // date-time
      type: "OI" | "IOI" | "ACM";
      isPublic: boolean;
      ownerId: number;
      ownerUsername: string;
      ownerRating?: number;
      createTime: string; // date-time
      problemCount: number;
    }
    export interface ContestProblemMetaDto {
      contestProblemId: number;
      orderIndex: number;
      problemId: number;
      problemDisplayId: number;
      problemTitle: string;
    }
    export interface ContestRanklistItemDto {
      rank: number;
      userId: number;
      username: string;
      rating?: number;
      totalScore?: number;
      solvedCount?: number;
      totalPenalty?: number;
      problemStatuses: ContestRanklistProblemStatusDto[];
    }
    export interface ContestRanklistProblemStatusDto {
      problemId: number;
      orderIndex: number;
      score?: number;
      accepted?: boolean;
      wrongAttempts?: number;
      solveTime?: number;
      firstAcceptTime?: number;
      lastSubmitTime?: number;
      status?: string;
    }
    export interface CreateContestRequestDto {
      title: string;
      description?: string;
      startTime: string;
      endTime: string;
      type: "OI" | "IOI" | "ACM";
      isPublic: boolean;
      announcement?: string;
      editorial?: string;
      problemIds: number[];
    }
    export interface CreateContestResponseDto {
      error?: "PERMISSION_DENIED" | "INVALID_TIME_RANGE" | "NO_SUCH_PROBLEM";
      contestId?: number;
    }
    export interface CreateDiscussionReplyRequestDto {
      discussionId: number;
      content: string;
      isPublic?: boolean;
    }
    export interface CreateDiscussionReplyResponseDto {
      error?: "PERMISSION_DENIED" | "NO_SUCH_DISCUSSION";
      reply?: DiscussionReplyDto;
    }
    export interface CreateDiscussionRequestDto {
      problemId?: number;
      title: string;
      content: string;
      isPublic?: boolean;
    }
    export interface CreateDiscussionResponseDto {
      error?: "PERMISSION_DENIED" | "NO_SUCH_PROBLEM";
      discussionId?: number;
    }
    export interface CreateGroupRequestDto {
      groupName: string;
    }
    export interface CreateGroupResponseDto {
      error?: "PERMISSION_DENIED" | "DUPLICATE_GROUP_NAME";
      groupId?: number;
    }
    export interface CreateProblemRequestDto {
      type: "Traditional" | "Interaction" | "SubmitAnswer";
      statement: ProblemStatementDto;
    }
    export interface CreateProblemResponseDto {
      error?: "PERMISSION_DENIED" | "NO_SUCH_PROBLEM_TAG" | "FAILED";
      id?: number;
    }
    export interface CreateProblemTagRequestDto {
      localizedNames: [ProblemTagLocalizedNameDto, ...ProblemTagLocalizedNameDto[]];
      color: string;
    }
    export interface CreateProblemTagResponseDto {
      error?: "PERMISSION_DENIED";
      id?: number;
    }
    export interface DeleteContestRequestDto {
      contestId: number;
    }
    export interface DeleteContestResponseDto {
      error?: "PERMISSION_DENIED" | "NO_SUCH_CONTEST";
    }
    export interface DeleteDiscussionReplyRequestDto {
      discussionReplyId: number;
    }
    export interface DeleteDiscussionReplyResponseDto {
      error?: "PERMISSION_DENIED" | "NO_SUCH_DISCUSSION_REPLY";
    }
    export interface DeleteDiscussionRequestDto {
      discussionId: number;
    }
    export interface DeleteDiscussionResponseDto {
      error?: "PERMISSION_DENIED" | "NO_SUCH_DISCUSSION";
    }
    export interface DeleteGroupRequestDto {
      groupId: number;
    }
    export interface DeleteGroupResponseDto {
      error?: "PERMISSION_DENIED" | "NO_SUCH_GROUP";
    }
    export interface DeleteJudgeClientRequestDto {
      id: number;
    }
    export interface DeleteJudgeClientResponseDto {
      error?: "PERMISSION_DENIED" | "NO_SUCH_JUDGE_CLIENT";
    }
    export interface DeleteProblemRequestDto {
      problemId: number;
    }
    export interface DeleteProblemResponseDto {
      error?: "PERMISSION_DENIED" | "NO_SUCH_PROBLEM";
    }
    export interface DeleteProblemTagRequestDto {
      id: number;
    }
    export interface DeleteProblemTagResponseDto {
      error?: "NO_SUCH_PROBLEM_TAG" | "PERMISSION_DENIED";
    }
    export interface DeleteSubmissionRequestDto {
      submissionId: number;
    }
    export interface DeleteSubmissionResponseDto {
      error?: "NO_SUCH_SUBMISSION" | "PERMISSION_DENIED";
    }
    export interface DiscussionDto {
      meta: DiscussionMetaDto;
      content: string;
      problem?: GetDiscussionAndRepliesResponseProblemDto;
      publisher: UserMetaDto;
      reactions: DiscussionOrReplyReactionsDto;
      permissions: ("View" | "Modify" | "ManagePermission" | "ManagePublicness" | "Delete")[];
    }
    export interface DiscussionGroupPermissionDto {
      group: GroupMetaDto;
      permissionLevel: 1 | 2;
    }
    export interface DiscussionMetaDto {
      id: number;
      title: string;
      publishTime: string; // date-time
      editTime: string; // date-time
      sortTime: string; // date-time
      replyCount: number;
      isPublic: boolean;
      publisherId: number;
      problemId?: number;
    }
    export interface DiscussionOrReplyReactionsDto {
      count: {
        [key: string]: any;
      };
      currentUserReactions: string[];
    }
    export interface DiscussionPermissionsDto {
      userPermissions: DiscussionUserPermissionDto[];
      groupPermissions: DiscussionGroupPermissionDto[];
    }
    export interface DiscussionReplyDto {
      id: number;
      content: string;
      publishTime: string; // date-time
      editTime: string; // date-time
      isPublic: boolean;
      publisher: UserMetaDto;
      reactions: DiscussionOrReplyReactionsDto;
      /**
       * ManagePermission is not valid for replies.
       */
      permissions: ("View" | "Modify" | "ManagePermission" | "ManagePublicness" | "Delete")[];
    }
    export interface DiscussionUserPermissionDto {
      user: UserMetaDto;
      permissionLevel: 1 | 2;
    }
    export interface DownloadProblemFilesRequestDto {
      problemId: number;
      type: "TestData" | "AdditionalFile";
      filenameList: string[];
    }
    export interface DownloadProblemFilesResponseDto {
      error?: "NO_SUCH_PROBLEM" | "PERMISSION_DENIED";
      downloadInfo?: ProblemFileDownloadInfoDto[];
    }
    export interface DownloadSubmissionFileRequestDto {
      submissionId: number;
      filename: string;
    }
    export interface DownloadSubmissionFileResponseDto {
      error?: "NO_SUCH_SUBMISSION" | "NO_SUCH_FILE" | "PERMISSION_DENIED";
      url?: string;
    }
    export interface FileUploadInfoDto {
      uuid?: string; // uuid
      size: number;
    }
    export interface GetAllProblemTagsOfAllLocalesResponseDto {
      error?: "PERMISSION_DENIED";
      tags?: ProblemTagWithAllLocalesDto[];
    }
    export interface GetAllProblemTagsRequestDto {
      locale: "zh_CN" | "pl_PL" | "en_US" | "ja_JP";
    }
    export interface GetAllProblemTagsResponseDto {
      tags: LocalizedProblemTagDto[];
    }
    export interface GetContestDetailRequestDto {
      contestId: number;
    }
    export interface GetContestDetailResponseDto {
      error?: "NO_SUCH_CONTEST" | "PERMISSION_DENIED";
      id?: number;
      title?: string;
      description?: string;
      startTime?: string; // date-time
      endTime?: string; // date-time
      type?: "OI" | "IOI" | "ACM";
      isPublic?: boolean;
      announcement?: string;
      editorial?: string;
      ownerId?: number;
      ownerUsername?: string;
      ownerRating?: number;
      createTime?: string; // date-time
      problems?: ContestProblemMetaDto[];
      hasPermissionToManage?: boolean;
      isRegistered?: boolean;
    }
    export interface GetContestListRequestDto {
      skipCount: number;
      takeCount: number;
    }
    export interface GetContestListResponseDto {
      contests: ContestMetaDto[];
      count: number;
    }
    export interface GetContestRanklistRequestDto {
      contestId: number;
    }
    export interface GetContestRanklistResponseDto {
      error?: "NO_SUCH_CONTEST" | "PERMISSION_DENIED";
      contestTitle?: string;
      contestType?: "OI" | "IOI" | "ACM";
      ranklist?: ContestRanklistItemDto[];
      problemIds?: number[];
    }
    export interface GetDiscussionAndRepliesRequestDto {
      locale: "zh_CN" | "pl_PL" | "en_US" | "ja_JP";
      discussionId: number;
      /**
       * `HeadTail` is for the first query of a discussion page while `IdRange` is for loading the ramaining.
       */
      queryRepliesType?: "HeadTail" | "IdRange";
      getDiscussion?: boolean;
      /**
       * Only valid for `type` = `HeadTail`.
       */
      headTakeCount?: number;
      /**
       * Only valid for `type` = `HeadTail`.
       */
      tailTakeCount?: number;
      /**
       * Only valid for `type` = `IdRange`.
       */
      beforeId?: number;
      /**
       * Only valid for `type` = `IdRange`.
       */
      afterId?: number;
      /**
       * Only valid for `type` = `IdRange`.
       */
      idRangeTakeCount?: number;
    }
    export interface GetDiscussionAndRepliesResponseDto {
      error?: "NO_SUCH_DISCUSSION" | "PERMISSION_DENIED" | "TAKE_TOO_MANY";
      discussion?: DiscussionDto;
      /**
       * Only valid for `type` = `HeadTail`.
       */
      repliesHead?: DiscussionReplyDto[];
      /**
       * Only valid for `type` = `HeadTail`.
       */
      repliesTail?: DiscussionReplyDto[];
      /**
       * Only valid for `type` = `HeadTail`.
       */
      repliesTotalCount?: number;
      /**
       * Only valid for `type` = `IdRange`.
       */
      repliesInRange?: DiscussionReplyDto[];
      /**
       * Only valid for `type` = `IdRange`.
       */
      repliesCountInRange?: number;
      permissionCreateNewDiscussion?: boolean;
    }
    export interface GetDiscussionAndRepliesResponseProblemDto {
      meta: ProblemMetaDto;
      title: string;
      titleLocale: "zh_CN" | "pl_PL" | "en_US" | "ja_JP";
    }
    export interface GetDiscussionPermissionsRequestDto {
      id: number;
    }
    export interface GetDiscussionPermissionsResponseDto {
      error?: "PERMISSION_DENIED" | "NO_SUCH_DISCUSSION";
      permissions?: DiscussionPermissionsDto;
      haveManagePermissionsPermission?: boolean;
    }
    export interface GetGroupListResponseDto {
      groups: GroupMetaDto[];
      groupsWithAdminPermission: number[];
    }
    export interface GetGroupMemberListRequestDto {
      groupId: number;
    }
    export interface GetGroupMemberListResponseDto {
      error?: "NO_SUCH_GROUP" | "PERMISSION_DENIED";
      memberList?: GetGroupMemberListResponseItem[];
    }
    export interface GetGroupMemberListResponseItem {
      userMeta: UserMetaDto;
      isGroupAdmin: boolean;
    }
    export interface GetGroupMetaResponseDto {
      error?: "NO_SUCH_GROUP";
      groupMeta?: GroupMetaDto;
    }
    export interface GetHomepageResponseDto {
      notice: string;
      noticeLocale: "zh_CN" | "pl_PL" | "en_US" | "ja_JP";
      annnouncements: DiscussionMetaDto[];
      annnouncementsLocale: "zh_CN" | "pl_PL" | "en_US" | "ja_JP";
      hitokoto?: HomepageSettingsHitokoto;
      countdown?: HomepageSettingsCountdown;
      friendLinks?: HomepageSettingsFriendLinks;
      topUsers: UserMetaDto[];
      latestUpdatedProblems: GetHomepageResponseProblemDto[];
    }
    export interface GetHomepageResponseProblemDto {
      meta: ProblemMetaDto;
      title: string;
      submission: SubmissionBasicMetaDto;
    }
    export interface GetHomepageSettingsResponseDto {
      error?: "PERMISSION_DENIED";
      settings?: HomepageSettings;
      annnouncementDiscussions?: DiscussionMetaDto[];
    }
    export interface GetProblemRequestDto {
      id?: number;
      displayId?: number;
      owner?: boolean;
      localizedContentsOfLocale?: "zh_CN" | "pl_PL" | "en_US" | "ja_JP";
      localizedContentsTitleOnly?: boolean;
      localizedContentsOfAllLocales?: boolean;
      tagsOfLocale?: "zh_CN" | "pl_PL" | "en_US" | "ja_JP";
      tagsOfAllLocales?: boolean;
      samples?: boolean;
      judgeInfo?: boolean;
      judgeInfoToBePreprocessed?: boolean;
      testData?: boolean;
      additionalFiles?: boolean;
      statistics?: boolean;
      discussionCount?: boolean;
      permissionOfCurrentUser?: boolean;
      permissions?: boolean;
      lastSubmissionAndLastAcceptedSubmission?: boolean;
      contestId?: number;
    }
    export interface GetProblemResponseDto {
      error?: "PERMISSION_DENIED" | "NO_SUCH_PROBLEM";
      meta?: ProblemMetaDto;
      owner?: UserMetaDto;
      localizedContentsOfLocale?: ProblemLocalizedContentDto;
      localizedContentsOfAllLocales?: ProblemLocalizedContentDto[];
      tagsOfLocale?: LocalizedProblemTagDto[];
      tagsOfAllLocales?: ProblemTagWithAllLocalesDto[];
      samples?: ProblemSampleDataMemberDto[];
      judgeInfo?: {
        [key: string]: any;
      };
      submittable?: boolean;
      testData?: ProblemFileDto[];
      additionalFiles?: ProblemFileDto[];
      discussionCount?: number;
      permissionOfCurrentUser?: ("View" | "Modify" | "ManagePermission" | "ManagePublicness" | "Delete")[];
      permissions?: ProblemPermissionsDto;
      lastSubmission?: ProblemLastSubmissionDto;
    }
    export interface GetProblemTagDetailRequestDto {
      id: number;
    }
    export interface GetProblemTagDetailResponseDto {
      error?: "NO_SUCH_PROBLEM_TAG";
      id?: number;
      color?: string;
      localizedNames?: ProblemTagLocalizedNameDto[];
    }
    export interface GetSessionInfoResponseDto {
      userMeta?: UserMetaDto;
      joinedGroupsCount?: number;
      userPrivileges?: any[][];
      userPreference?: UserPreferenceDto;
      serverPreference: PreferenceConfig;
      serverVersion: ServerVersionDto;
    }
    export interface GetSubmissionDetailRequestDto {
      submissionId: string;
      locale: "zh_CN" | "pl_PL" | "en_US" | "ja_JP";
    }
    export interface GetSubmissionDetailResponseDto {
      error?: "NO_SUCH_SUBMISSION" | "PERMISSION_DENIED";
      meta?: SubmissionMetaDto;
      content?: {
        [key: string]: any;
      };
      progress?: {
        [key: string]: any;
      };
      progressSubscriptionKey?: string;
      permissionRejudge?: boolean;
      permissionCancel?: boolean;
      permissionSetPublic?: boolean;
      permissionDelete?: boolean;
    }
    export interface GetUserDetailRequestDto {
      userId?: number;
      username?: string;
      timezone?: string;
      now?: string;
    }
    export interface GetUserDetailResponseDto {
      error?: "NO_SUCH_USER";
      meta?: UserMetaDto;
      information?: UserInformationDto;
      submissionCountPerDay?: number[];
      rank?: number;
      hasPrivilege?: boolean;
      contestParticipationCount?: number;
      ratingHistory?: RatingChangeDto[];
    }
    export interface GetUserListRequestDto {
      sortBy: "acceptedProblemCount" | "rating";
      skipCount: number;
      takeCount: number;
    }
    export interface GetUserListResponseDto {
      error?: "TAKE_TOO_MANY";
      userMetas?: UserMetaDto[];
      count?: number;
    }
    export interface GetUserMetaRequestDto {
      userId?: number;
      username?: string;
      getPrivileges?: boolean;
    }
    export interface GetUserMetaResponseDto {
      error?: "NO_SUCH_USER";
      meta?: UserMetaDto;
      privileges?: (
        | "EditHomepage"
        | "ManageUser"
        | "ManageUserGroup"
        | "ManageProblem"
        | "ManageContest"
        | "ManageDiscussion"
        | "SkipRecaptcha"
      )[];
    }
    export interface GetUserPreferenceRequestDto {
      userId?: number;
      username?: string;
    }
    export interface GetUserPreferenceResponseDto {
      error?: "NO_SUCH_USER" | "PERMISSION_DENIED";
      meta?: UserMetaDto;
      preference?: UserPreferenceDto;
    }
    export interface GetUserProfileRequestDto {
      userId?: number;
      username?: string;
    }
    export interface GetUserProfileResponseDto {
      error?: "NO_SUCH_USER" | "PERMISSION_DENIED";
      meta?: UserMetaDto;
      publicEmail?: boolean;
      avatarInfo?: string;
      information?: UserInformationDto;
    }
    export interface GetUserRatingHistoryRequestDto {
      userId: number;
    }
    export interface GetUserRatingHistoryResponseDto {
      error?: "NO_SUCH_USER";
      ratingHistory?: RatingChangeDto[];
    }
    export interface GetUserSecuritySettingsRequestDto {
      userId?: number;
      username?: string;
    }
    export interface GetUserSecuritySettingsResponseDto {
      error?: "NO_SUCH_USER" | "PERMISSION_DENIED";
      meta?: UserMetaDto;
    }
    export interface GroupMetaDto {
      id: number;
      name: string;
      memberCount: number;
    }
    export interface HomepageSettings {
      notice: HomepageSettingsNotice;
      annnouncements: HomepageSettingsAnnouncements;
      hitokoto: HomepageSettingsHitokoto;
      countdown: HomepageSettingsCountdown;
      friendLinks: HomepageSettingsFriendLinks;
    }
    export interface HomepageSettingsAnnouncements {
      items: {
        [key: string]: any;
      };
    }
    export interface HomepageSettingsCountdown {
      enabled: boolean;
      items: {
        [key: string]: any;
      };
    }
    export interface HomepageSettingsFriendLinks {
      enabled: boolean;
      links: {
        [key: string]: any;
      };
    }
    export interface HomepageSettingsHitokoto {
      enabled: boolean;
      apiUrl: string;
      customTitle: string;
    }
    export interface HomepageSettingsNotice {
      enabled: boolean;
      contents: {
        [key: string]: any;
      };
    }
    export interface JudgeClientInfoDto {
      id: number;
      name: string;
      key: string;
      allowedHosts: string[];
      online: boolean;
      systemInfo?: {
        [key: string]: any;
      };
    }
    export interface ListJudgeClientsResponseDto {
      judgeClients: JudgeClientInfoDto[];
      hasManagePermission: boolean;
    }
    export interface ListUserSessionsRequestDto {
      userId?: number;
      username?: string;
    }
    export interface ListUserSessionsResponseDto {
      error?: "PERMISSION_DENIED";
      sessions?: UserSessionDto[];
      /**
       * Only available when querying the current user
       */
      currentSessionId?: number;
    }
    export interface LocalizedProblemTagDto {
      id: number;
      name: string;
      color: string;
      nameLocale: "zh_CN" | "pl_PL" | "en_US" | "ja_JP";
    }
    export interface LoginRequestDto {
      /**
       * A SYZOJ 2 username is allowed to check if a user is not migrated.
       */
      username?: string;
      email?: string; // email
      password: string;
    }
    export interface LoginResponseDto {
      error?:
        | "ALREADY_LOGGEDIN"
        | "NO_SUCH_USER"
        | "WRONG_PASSWORD"
        | "USER_NOT_MIGRATED"
        | "USER_BANNED"
        | "PASSWORD_CHANGE_REQUIRED";
      token?: string;
      username?: string;
      banReason?: string;
      requirePasswordChange?: boolean;
    }
    export interface MigrateUserRequestDto {
      email?: string; // email
      oldUsername?: string;
      oldPassword: string;
      newUsername?: string;
      newPassword: string;
    }
    export interface MigrateUserResponseDto {
      error?: "ALREADY_LOGGEDIN" | "NO_SUCH_USER" | "WRONG_PASSWORD" | "ALREADY_MIGRATED" | "DUPLICATE_USERNAME";
      token?: string;
    }
    export interface PreferenceConfig {
      siteName: string;
      security: PreferenceConfigSecurity;
      pagination: PreferenceConfigPagination;
      misc: PreferenceConfigMisc;
    }
    export interface PreferenceConfigMisc {
      appLogo: string;
      appLogoForTheme: {
        [key: string]: any;
      };
      googleAnalyticsId: string;
      plausibleApiEndpoint: string;
      gravatarCdn: string;
      redirectLegacyUrls: boolean;
      legacyContestsEntryUrl: boolean;
      homepageUserListOnMainView: boolean;
      sortUserByRating: boolean;
      renderMarkdownInUserBio: boolean;
      discussionReactionEmojis: string[];
      discussionReactionAllowCustomEmojis: boolean;
    }
    export interface PreferenceConfigPagination {
      homepageUserList: number;
      homepageProblemList: number;
      problemSet: number;
      searchProblemsPreview: number;
      submissions: number;
      submissionStatistics: number;
      userList: number;
      userAuditLogs: number;
      discussions: number;
      searchDiscussionsPreview: number;
      discussionReplies: number;
      discussionRepliesHead: number;
      discussionRepliesMore: number;
    }
    export interface PreferenceConfigSecurity {
      recaptchaEnabled: boolean;
      recaptchaKey: string;
      requireEmailVerification: boolean;
      allowUserChangeUsername: boolean;
      allowEveryoneCreateProblem: boolean;
      allowNonPrivilegedUserEditPublicProblem: boolean;
      allowOwnerManageProblemPermission: boolean;
      allowOwnerDeleteProblem: boolean;
      discussionDefaultPublic: boolean;
      discussionReplyDefaultPublic: boolean;
      allowEveryoneCreateDiscussion: boolean;
    }
    export interface ProblemContentSectionDto {
      sectionTitle: string;
      type: "Text" | "Sample";
      sampleId?: number;
      text?: string;
    }
    export interface ProblemFileDownloadInfoDto {
      filename: string;
      downloadUrl: string;
    }
    export interface ProblemFileDto {
      uuid: string;
      filename: string;
      size?: number;
    }
    export interface ProblemGroupPermissionDto {
      group: GroupMetaDto;
      permissionLevel: 1 | 2;
    }
    export interface ProblemLastSubmissionDto {
      lastSubmission?: SubmissionBasicMetaDto;
      lastSubmissionContent?: {
        [key: string]: any;
      };
      lastAcceptedSubmission?: SubmissionBasicMetaDto;
    }
    export interface ProblemLocalizedContentDto {
      locale: "zh_CN" | "pl_PL" | "en_US" | "ja_JP";
      title: string;
      contentSections: [
        ProblemContentSectionDto?,
        ProblemContentSectionDto?,
        ProblemContentSectionDto?,
        ProblemContentSectionDto?,
        ProblemContentSectionDto?,
        ProblemContentSectionDto?,
        ProblemContentSectionDto?,
        ProblemContentSectionDto?,
        ProblemContentSectionDto?,
        ProblemContentSectionDto?,
        ProblemContentSectionDto?,
        ProblemContentSectionDto?,
        ProblemContentSectionDto?,
        ProblemContentSectionDto?,
        ProblemContentSectionDto?,
        ProblemContentSectionDto?,
        ProblemContentSectionDto?,
        ProblemContentSectionDto?,
        ProblemContentSectionDto?,
        ProblemContentSectionDto?
      ];
    }
    export interface ProblemMetaDto {
      id: number;
      displayId?: number;
      type: "Traditional" | "Interaction" | "SubmitAnswer";
      isPublic: boolean;
      publicTime: string; // date-time
      ownerId: number;
      locales: ("zh_CN" | "pl_PL" | "en_US" | "ja_JP")[];
      submissionCount?: number;
      acceptedSubmissionCount?: number;
    }
    export interface ProblemPermissionsDto {
      userPermissions: ProblemUserPermissionDto[];
      groupPermissions: ProblemGroupPermissionDto[];
    }
    export interface ProblemSampleDataMemberDto {
      inputData: string;
      outputData: string;
    }
    export interface ProblemStatementDto {
      localizedContents: [ProblemLocalizedContentDto, ...ProblemLocalizedContentDto[]];
      samples: ProblemSampleDataMemberDto[];
      problemTagIds: [
        number?,
        number?,
        number?,
        number?,
        number?,
        number?,
        number?,
        number?,
        number?,
        number?,
        number?,
        number?,
        number?,
        number?,
        number?,
        number?,
        number?,
        number?,
        number?,
        number?
      ];
    }
    export interface ProblemTagLocalizedNameDto {
      name: string;
      locale: "zh_CN" | "pl_PL" | "en_US" | "ja_JP";
    }
    export interface ProblemTagWithAllLocalesDto {
      id?: number;
      color?: string;
      localizedNames?: ProblemTagLocalizedNameDto[];
    }
    export interface ProblemUserPermissionDto {
      user: UserMetaDto;
      permissionLevel: 1 | 2;
    }
    export interface QueryAuditLogsRequestDto {
      userId?: number;
      username?: string;
      /**
       * The query string for action field, will be matching as prefix.
       */
      actionQuery?: string;
      ip?: string;
      firstObjectId?: number;
      secondObjectId?: number;
      locale: "zh_CN" | "pl_PL" | "en_US" | "ja_JP";
      skipCount: number;
      takeCount: number;
    }
    export interface QueryAuditLogsResponseDto {
      error?: "NO_SUCH_USER" | "PERMISSION_DENIED" | "TAKE_TOO_MANY";
      results?: QueryAuditLogsResponseItemDto[];
      count?: number;
    }
    export interface QueryAuditLogsResponseItemDto {
      user: UserMetaDto;
      ip: string;
      ipLocation: string;
      time: string; // date-time
      action: string;
      firstObjectType?: "User" | "Group" | "Problem" | "ProblemTag" | "Submission" | "Discussion" | "DiscussionReply";
      firstObjectId?: number;
      firstObject?: {
        [key: string]: any;
      };
      secondObjectType?: "User" | "Group" | "Problem" | "ProblemTag" | "Submission" | "Discussion" | "DiscussionReply";
      secondObjectId?: number;
      secondObject?: {
        [key: string]: any;
      };
      details?: {
        [key: string]: any;
      };
    }
    export interface QueryDiscussionsRequestDto {
      locale: "zh_CN" | "pl_PL" | "en_US" | "ja_JP";
      keyword?: string;
      /**
       * `null` for global. `-1` for ALL problems.
       */
      problemId?: number;
      publisherId?: number;
      nonpublic?: boolean;
      /**
       * Pass true to return discussion title only. For a preview in search bar.
       */
      titleOnly?: boolean;
      skipCount: number;
      takeCount: number;
    }
    export interface QueryDiscussionsResponseDiscussionDto {
      meta: DiscussionMetaDto;
      problem?: QueryDiscussionsResponseProblemDto;
      publisher: UserMetaDto;
    }
    export interface QueryDiscussionsResponseDto {
      error?: "TAKE_TOO_MANY" | "NO_SUCH_PROBLEM" | "NO_SUCH_USER" | "PERMISSION_DENIED";
      discussions?: QueryDiscussionsResponseDiscussionDto[];
      permissions?: QueryDiscussionsResponsePermissionDto;
      count?: number;
      filterPublisher?: UserMetaDto;
      filterProblem?: QueryDiscussionsResponseProblemDto;
    }
    export interface QueryDiscussionsResponsePermissionDto {
      createDiscussion?: boolean;
      filterNonpublic?: boolean;
    }
    export interface QueryDiscussionsResponseProblemDto {
      meta: ProblemMetaDto;
      title: string;
      titleLocale: "zh_CN" | "pl_PL" | "en_US" | "ja_JP";
    }
    export interface QueryProblemSetRequestDto {
      locale: "zh_CN" | "pl_PL" | "en_US" | "ja_JP";
      keyword?: string;
      /**
       * The result item by ID may NOT be included in the count.
       */
      keywordMatchesId?: boolean;
      tagIds?: [
        number?,
        number?,
        number?,
        number?,
        number?,
        number?,
        number?,
        number?,
        number?,
        number?,
        number?,
        number?,
        number?,
        number?,
        number?,
        number?,
        number?,
        number?,
        number?,
        number?
      ];
      ownerId?: number;
      nonpublic?: boolean;
      /**
       * Pass true to return problem title only. For a preview in search bar.
       */
      titleOnly?: boolean;
      skipCount: number;
      takeCount: number;
    }
    export interface QueryProblemSetResponseDto {
      error?: "PERMISSION_DENIED" | "TAKE_TOO_MANY";
      result?: QueryProblemSetResponseItemDto[];
      count?: number;
      filterTags?: LocalizedProblemTagDto[];
      filterOwner?: UserMetaDto;
      permissions?: QueryProblemSetResponsePermissionDto;
    }
    export interface QueryProblemSetResponseItemDto {
      meta: ProblemMetaDto;
      title: string;
      tags?: LocalizedProblemTagDto[];
      resultLocale?: "zh_CN" | "pl_PL" | "en_US" | "ja_JP";
      submission?: SubmissionBasicMetaDto;
    }
    export interface QueryProblemSetResponsePermissionDto {
      createProblem?: boolean;
      manageTags?: boolean;
      filterByOwner?: boolean;
      filterNonpublic?: boolean;
    }
    export interface QuerySubmissionRequestDto {
      locale: "zh_CN" | "pl_PL" | "en_US" | "ja_JP";
      problemId: number;
      problemDisplayId: number;
      submitter: string;
      codeLanguage: string;
      status:
        | "Pending"
        | "Hidden"
        | "ConfigurationError"
        | "SystemError"
        | "Canceled"
        | "CompilationError"
        | "FileError"
        | "RuntimeError"
        | "TimeLimitExceeded"
        | "MemoryLimitExceeded"
        | "OutputLimitExceeded"
        | "PartiallyCorrect"
        | "WrongAnswer"
        | "Accepted"
        | "JudgementFailed";
      minId: number;
      maxId: number;
      takeCount: number;
      contestId: number;
    }
    export interface QuerySubmissionResponseDto {
      error?: "NO_SUCH_PROBLEM" | "NO_SUCH_USER";
      submissions?: SubmissionMetaDto[];
      hasSmallerId?: boolean;
      hasLargerId?: boolean;
      progressSubscriptionKey?: string;
    }
    export interface QuerySubmissionStatisticsRequestDto {
      locale: "zh_CN" | "pl_PL" | "en_US" | "ja_JP";
      problemId?: number;
      problemDisplayId?: number;
      statisticsType: "Fastest" | "MinMemory" | "MinAnswerSize" | "Earliest";
      skipCount: number;
      takeCount: number;
    }
    export interface QuerySubmissionStatisticsResponseDto {
      error?: "NO_SUCH_PROBLEM" | "PERMISSION_DENIED" | "TAKE_TOO_MANY";
      submissions?: SubmissionMetaDto[];
      count?: number;
      scores?: number[];
    }
    export interface QueryUserMigrationInfoRequestDto {
      email?: string; // email
      oldUsername?: string;
    }
    export interface QueryUserMigrationInfoResponseDto {
      error?: "ALREADY_LOGGEDIN" | "NO_SUCH_USER";
      migrated?: boolean;
      usernameMustChange?: boolean;
    }
    export interface RatingChangeDto {
      contestId: number;
      contestTitle: string;
      time: string; // date-time
      oldRating: number;
      newRating: number;
      ratingChange: number;
      rank: number;
      participantCount: number;
    }
    export interface RegisterContestRequestDto {
      contestId: number;
    }
    export interface RegisterContestResponseDto {
      error?: "PERMISSION_DENIED" | "NO_SUCH_CONTEST" | "ALREADY_REGISTERED" | "CONTEST_NOT_STARTED";
    }
    export interface RegisterRequestDto {
      username: string;
      email: string; // email
      emailVerificationCode?: string;
      password: string;
    }
    export interface RegisterResponseDto {
      error?: "ALREADY_LOGGEDIN" | "DUPLICATE_USERNAME" | "DUPLICATE_EMAIL" | "INVALID_EMAIL_VERIFICATION_CODE";
      token?: string;
    }
    export interface RejudgeSubmissionRequestDto {
      submissionId: number;
    }
    export interface RejudgeSubmissionResponseDto {
      error?: "NO_SUCH_SUBMISSION" | "PERMISSION_DENIED";
    }
    export interface RemoveProblemFilesRequestDto {
      problemId: number;
      type: "TestData" | "AdditionalFile";
      filenames: string[];
    }
    export interface RemoveProblemFilesResponseDto {
      error?: "NO_SUCH_PROBLEM" | "PERMISSION_DENIED";
    }
    export interface RemoveUserFromGroupRequestDto {
      userId: number;
      groupId: number;
    }
    export interface RemoveUserFromGroupResponseDto {
      error?:
        | "PERMISSION_DENIED"
        | "NO_SUCH_USER"
        | "NO_SUCH_GROUP"
        | "USER_NOT_IN_GROUP"
        | "GROUP_ADMIN_CAN_NOT_BE_REMOVED";
    }
    export interface RenameGroupRequestDto {
      groupId: number;
      name: string;
    }
    export interface RenameGroupResponseDto {
      error?: "PERMISSION_DENIED" | "NO_SUCH_GROUP" | "DUPLICATE_GROUP_NAME";
    }
    export interface RenameProblemFileRequestDto {
      problemId: number;
      type: "TestData" | "AdditionalFile";
      filename: string;
      newFilename: string;
    }
    export interface RenameProblemFileResponseDto {
      error?: "NO_SUCH_PROBLEM" | "PERMISSION_DENIED" | "NO_SUCH_FILE";
    }
    export interface ResetJudgeClientKeyRequestDto {
      id: number;
    }
    export interface ResetJudgeClientKeyResponseDto {
      error?: "PERMISSION_DENIED" | "NO_SUCH_JUDGE_CLIENT";
      key?: string;
    }
    export interface ResetPasswordRequestDto {
      email: string; // email
      emailVerificationCode?: string;
      newPassword: string;
    }
    export interface ResetPasswordResponseDto {
      error?: "ALREADY_LOGGEDIN" | "NO_SUCH_USER" | "INVALID_EMAIL_VERIFICATION_CODE";
      token?: string;
    }
    export interface ResetUserPasswordRequestDto {
      userId: number;
      newPassword?: string;
      requirePasswordChange?: boolean;
    }
    export interface ResetUserPasswordResponseDto {
      error?: "PERMISSION_DENIED" | "NO_SUCH_USER";
      generatedPassword?: string;
    }
    export interface RevokeUserSessionRequestDto {
      userId: number;
      /**
       * Falsy to revoke ALL sessions of the user (except the current session, if the user is current user)
       */
      sessionId?: number;
    }
    export interface RevokeUserSessionResponseDto {
      error?: "PERMISSION_DENIED" | "NO_SUCH_USER";
    }
    export interface SearchGroupResponseDto {
      groupMetas: GroupMetaDto[];
    }
    export interface SearchUserResponseDto {
      userMetas: UserMetaDto[];
    }
    export interface SendEmailVerificationCodeRequestDto {
      email: string; // email
      type: "Register" | "ChangeEmail" | "ResetPassword";
      locale: "zh_CN" | "pl_PL" | "en_US" | "ja_JP";
    }
    export interface SendEmailVerificationCodeResponseDto {
      error?:
        | "PERMISSION_DENIED"
        | "DUPLICATE_EMAIL"
        | "NO_SUCH_USER"
        | "ALREADY_LOGGEDIN"
        | "FAILED_TO_SEND"
        | "RATE_LIMITED";
      errorMessage?: string;
    }
    export interface ServerVersionDto {
      hash: string;
      date: string;
    }
    export interface SetDiscussionPermissionsRequestDto {
      discussionId: number;
      userPermissions: SetDiscussionPermissionsRequestUserPermissionDto[];
      groupPermissions: SetDiscussionPermissionsRequestGroupPermissionDto[];
    }
    export interface SetDiscussionPermissionsRequestGroupPermissionDto {
      groupId: number;
      permissionLevel: 1 | 2;
    }
    export interface SetDiscussionPermissionsRequestUserPermissionDto {
      userId: number;
      permissionLevel: 1 | 2;
    }
    export interface SetDiscussionPermissionsResponseDto {
      error?: "PERMISSION_DENIED" | "NO_SUCH_DISCUSSION" | "NO_SUCH_USER" | "NO_SUCH_GROUP";
      errorObjectId?: number;
    }
    export interface SetDiscussionPublicRequestDto {
      discussionId: number;
      isPublic: boolean;
    }
    export interface SetDiscussionPublicResponseDto {
      error?: "PERMISSION_DENIED" | "NO_SUCH_DISCUSSION";
    }
    export interface SetDiscussionReplyPublicRequestDto {
      discussionReplyId: number;
      isPublic: boolean;
    }
    export interface SetDiscussionReplyPublicResponseDto {
      error?: "PERMISSION_DENIED" | "NO_SUCH_DISCUSSION_REPLY";
    }
    export interface SetGroupAdminRequestDto {
      userId: number;
      groupId: number;
      isGroupAdmin: boolean;
    }
    export interface SetGroupAdminResponseDto {
      error?: "PERMISSION_DENIED" | "NO_SUCH_USER" | "NO_SUCH_GROUP" | "USER_NOT_IN_GROUP";
    }
    export interface SetProblemDisplayIdRequestDto {
      problemId: number;
      displayId: number;
    }
    export interface SetProblemDisplayIdResponseDto {
      error?: "PERMISSION_DENIED" | "NO_SUCH_PROBLEM" | "DUPLICATE_DISPLAY_ID" | "PUBLIC_PROBLEM_MUST_HAVE_DISPLAY_ID";
    }
    export interface SetProblemPermissionsRequestDto {
      problemId: number;
      userPermissions: SetProblemPermissionsRequestUserPermissionDto[];
      groupPermissions: SetProblemPermissionsRequestGroupPermissionDto[];
    }
    export interface SetProblemPermissionsRequestGroupPermissionDto {
      groupId: number;
      permissionLevel: 1 | 2;
    }
    export interface SetProblemPermissionsRequestUserPermissionDto {
      userId: number;
      permissionLevel: 1 | 2;
    }
    export interface SetProblemPermissionsResponseDto {
      error?: "PERMISSION_DENIED" | "NO_SUCH_PROBLEM" | "NO_SUCH_USER" | "NO_SUCH_GROUP";
      errorObjectId?: number;
    }
    export interface SetProblemPublicRequestDto {
      problemId: number;
      isPublic: boolean;
    }
    export interface SetProblemPublicResponseDto {
      error?: "PERMISSION_DENIED" | "NO_SUCH_PROBLEM" | "NO_DISPLAY_ID";
    }
    export interface SetSubmissionPublicRequestDto {
      submissionId: number;
      isPublic: boolean;
    }
    export interface SetSubmissionPublicResponseDto {
      error?: "NO_SUCH_SUBMISSION" | "PERMISSION_DENIED";
    }
    export interface SetUserAdminRequestDto {
      userId: number;
      isAdmin: boolean;
    }
    export interface SetUserAdminResponseDto {
      error?: "PERMISSION_DENIED" | "NO_SUCH_USER" | "CANNOT_MODIFY_OWNER";
    }
    export interface SetUserPrivilegesRequestDto {
      userId: number;
      privileges: (
        | "EditHomepage"
        | "ManageUser"
        | "ManageUserGroup"
        | "ManageProblem"
        | "ManageContest"
        | "ManageDiscussion"
        | "SkipRecaptcha"
      )[];
      isHiddenFromHomeRanking?: boolean;
    }
    export interface SetUserPrivilegesResponseDto {
      error?: "PERMISSION_DENIED" | "NO_SUCH_USER" | "FAILED";
    }
    export interface SignedFileUploadRequestDto {
      uuid: string;
      method: "POST" | "PUT";
      url: string;
      extraFormData?: {
        [key: string]: any;
      };
      fileFieldName?: string;
    }
    export interface SubmissionBasicMetaDto {
      id: number;
      isPublic: boolean;
      codeLanguage: string;
      answerSize: number;
      score: number;
      status:
        | "Pending"
        | "Hidden"
        | "ConfigurationError"
        | "SystemError"
        | "Canceled"
        | "CompilationError"
        | "FileError"
        | "RuntimeError"
        | "TimeLimitExceeded"
        | "MemoryLimitExceeded"
        | "OutputLimitExceeded"
        | "PartiallyCorrect"
        | "WrongAnswer"
        | "Accepted"
        | "JudgementFailed";
      submitTime: string; // date-time
      timeUsed: number;
      memoryUsed: number;
    }
    export interface SubmissionMetaDto {
      id: number;
      isPublic: boolean;
      codeLanguage: string;
      answerSize: number;
      score: number;
      status:
        | "Pending"
        | "Hidden"
        | "ConfigurationError"
        | "SystemError"
        | "Canceled"
        | "CompilationError"
        | "FileError"
        | "RuntimeError"
        | "TimeLimitExceeded"
        | "MemoryLimitExceeded"
        | "OutputLimitExceeded"
        | "PartiallyCorrect"
        | "WrongAnswer"
        | "Accepted"
        | "JudgementFailed";
      submitTime: string; // date-time
      timeUsed: number;
      memoryUsed: number;
      problem: ProblemMetaDto;
      problemTitle: string;
      submitter: UserMetaDto;
      progressType?: "Preparing" | "Compiling" | "Running" | "Finished";
      contestId?: number;
      contestTitle?: string;
    }
    export interface SubmitRequestDto {
      problemId: number;
      content: {
        [key: string]: any;
      };
      uploadInfo?: FileUploadInfoDto;
      contestId?: number;
    }
    export interface SubmitResponseDto {
      error?: "PERMISSION_DENIED" | "NO_SUCH_PROBLEM" | "FILE_TOO_LARGE" | "FILE_UUID_EXISTS" | "FILE_NOT_UPLOADED";
      submissionId?: number;
      signedUploadRequest?: SignedFileUploadRequestDto;
    }
    export interface ToggleReactionRequestDto {
      type: "Discussion" | "DiscussionReply";
      id: number;
      emoji: string;
      reaction: boolean;
    }
    export interface ToggleReactionResponseDto {
      error?: "PERMISSION_DENIED" | "NO_SUCH_DISCUSSION" | "NO_SUCH_DISCUSSION_REPLY" | "INVALID_EMOJI";
    }
    export interface UnregisterContestRequestDto {
      contestId: number;
    }
    export interface UnregisterContestResponseDto {
      error?: "PERMISSION_DENIED" | "NO_SUCH_CONTEST" | "NOT_REGISTERED" | "CONTEST_STARTED";
    }
    export interface UpdateContestRequestDto {
      contestId: number;
      title?: string;
      description?: string;
      startTime?: string;
      endTime?: string;
      type?: "OI" | "IOI" | "ACM";
      isPublic?: boolean;
      announcement?: string;
      editorial?: string;
      problemIds?: number[];
    }
    export interface UpdateContestResponseDto {
      error?: "PERMISSION_DENIED" | "NO_SUCH_CONTEST" | "INVALID_TIME_RANGE" | "NO_SUCH_PROBLEM";
    }
    export interface UpdateDiscussionReplyRequestDto {
      discussionReplyId: number;
      content: string;
    }
    export interface UpdateDiscussionReplyResponseDto {
      error?: "PERMISSION_DENIED" | "NO_SUCH_DISCUSSION_REPLY";
      editTime?: string; // date-time
    }
    export interface UpdateDiscussionRequestDto {
      discussionId: number;
      title: string;
      content: string;
    }
    export interface UpdateDiscussionResponseDto {
      error?: "PERMISSION_DENIED" | "NO_SUCH_DISCUSSION";
    }
    export interface UpdateHomepageSettingsRequestDto {
      settings: HomepageSettings;
    }
    export interface UpdateHomepageSettingsResponseDto {
      error?: "PERMISSION_DENIED" | "NO_SUCH_DISCUSSION";
      errorDiscussionId?: number;
    }
    export interface UpdateProblemJudgeInfoRequestDto {
      problemId: number;
      judgeInfo: {
        [key: string]: any;
      };
      submittable: boolean;
    }
    export interface UpdateProblemJudgeInfoResponseDto {
      error?: "NO_SUCH_PROBLEM" | "PERMISSION_DENIED" | "INVALID_JUDGE_INFO";
      judgeInfoError?: string[];
    }
    export interface UpdateProblemRequestUpdatingLocalizedContentDto {
      locale: "zh_CN" | "pl_PL" | "en_US" | "ja_JP";
      title: string;
      contentSections: [
        ProblemContentSectionDto?,
        ProblemContentSectionDto?,
        ProblemContentSectionDto?,
        ProblemContentSectionDto?,
        ProblemContentSectionDto?,
        ProblemContentSectionDto?,
        ProblemContentSectionDto?,
        ProblemContentSectionDto?,
        ProblemContentSectionDto?,
        ProblemContentSectionDto?,
        ProblemContentSectionDto?,
        ProblemContentSectionDto?,
        ProblemContentSectionDto?,
        ProblemContentSectionDto?,
        ProblemContentSectionDto?,
        ProblemContentSectionDto?,
        ProblemContentSectionDto?,
        ProblemContentSectionDto?,
        ProblemContentSectionDto?,
        ProblemContentSectionDto?
      ];
    }
    export interface UpdateProblemStatementRequestDto {
      problemId: number;
      localizedContents: [
        UpdateProblemRequestUpdatingLocalizedContentDto,
        ...UpdateProblemRequestUpdatingLocalizedContentDto[]
      ];
      samples: ProblemSampleDataMemberDto[];
      problemTagIds: [
        number?,
        number?,
        number?,
        number?,
        number?,
        number?,
        number?,
        number?,
        number?,
        number?,
        number?,
        number?,
        number?,
        number?,
        number?,
        number?,
        number?,
        number?,
        number?,
        number?
      ];
    }
    export interface UpdateProblemStatementResponseDto {
      error?: "PERMISSION_DENIED" | "NO_SUCH_PROBLEM" | "NO_SUCH_PROBLEM_TAG" | "FAILED";
    }
    export interface UpdateProblemTagRequestDto {
      id: number;
      localizedNames: [ProblemTagLocalizedNameDto, ...ProblemTagLocalizedNameDto[]];
      color: string;
    }
    export interface UpdateProblemTagResponseDto {
      error?: "NO_SUCH_PROBLEM_TAG" | "PERMISSION_DENIED";
    }
    export interface UpdateUserPasswordRequestDto {
      userId: number;
      oldPassword?: string;
      password: string;
    }
    export interface UpdateUserPasswordResponseDto {
      error?: "PERMISSION_DENIED" | "NO_SUCH_USER" | "WRONG_OLD_PASSWORD";
    }
    export interface UpdateUserPreferenceRequestDto {
      userId: number;
      preference: UserPreferenceDto;
    }
    export interface UpdateUserPreferenceResponseDto {
      error?: "NO_SUCH_USER" | "PERMISSION_DENIED";
    }
    export interface UpdateUserProfileRequestDto {
      userId: number;
      username?: string;
      email?: string; // email
      publicEmail: boolean;
      avatarInfo: string;
      nickname: string;
      bio: string;
      information: UserInformationDto;
    }
    export interface UpdateUserProfileResponseDto {
      error?: "PERMISSION_DENIED" | "NO_SUCH_USER" | "DUPLICATE_USERNAME" | "DUPLICATE_EMAIL";
    }
    export interface UpdateUserSelfEmailRequestDto {
      email: string; // email
      emailVerificationCode?: string;
    }
    export interface UpdateUserSelfEmailResponseDto {
      error?: "PERMISSION_DENIED" | "DUPLICATE_EMAIL" | "INVALID_EMAIL_VERIFICATION_CODE";
    }
    export interface UserAvatarDto {
      type: "gravatar" | "github" | "qq";
      key: string;
    }
    export interface UserInformationDto {
      organization: string;
      location: string;
      url: string; // uri
      telegram: string;
      qq: string;
      github: string;
    }
    export interface UserMetaDto {
      id: number;
      username: string;
      email: string;
      nickname: string;
      bio: string;
      avatar: UserAvatarDto;
      isAdmin: boolean;
      isOwner: boolean;
      isBanned: boolean;
      banReason: string;
      acceptedProblemCount: number;
      submissionCount: number;
      rating: number;
      registrationTime: string; // date-time
    }
    export interface UserPreferenceCodeDto {
      defaultLanguage?: string;
      defaultCompileAndRunOptions?: {
        [key: string]: any;
      };
    }
    export interface UserPreferenceCodeFormatterDto {
      disableByDefault?: boolean;
      options?: string;
    }
    export interface UserPreferenceDto {
      locale?: UserPreferenceLocaleDto;
      theme?: string;
      font?: UserPreferenceFontDto;
      codeFormatter?: UserPreferenceCodeFormatterDto;
      code?: UserPreferenceCodeDto;
    }
    export interface UserPreferenceFontDto {
      contentFontFace?: string;
      codeFontFace?: string;
      codeFontSize?: number;
      codeLineHeight?: number;
      codeFontLigatures?: boolean;
      markdownEditorFont?: "content" | "code";
    }
    export interface UserPreferenceLocaleDto {
      system?: "zh_CN" | "pl_PL" | "en_US" | "ja_JP";
      content?: "zh_CN" | "pl_PL" | "en_US" | "ja_JP";
      hideUnavailableMessage?: boolean;
    }
    export interface UserSessionDto {
      sessionId: number;
      loginIp: string;
      loginIpLocation: string;
      userAgent: string;
      loginTime: number;
      lastAccessTime: number;
    }
  }
}
declare namespace ApiTypes {
  namespace AppControllerRunMaintainceTasks {
    export interface HeaderParameters {
      "maintaince-key": Parameters.MaintainceKey;
    }
    namespace Parameters {
      export type MaintainceKey = string;
    }
    namespace Responses {
      export type $201 = string;
    }
  }
  namespace AuthControllerCheckAvailability {
    namespace Parameters {
      export type Email = string; // email
      export type Username = string;
    }
    export interface QueryParameters {
      username?: Parameters.Username;
      email?: Parameters.Email /* email */;
    }
    namespace Responses {
      export type $200 = ApiTypes.Schemas.CheckAvailabilityResponseDto;
    }
  }
  namespace AuthControllerGetSessionInfo {
    namespace Parameters {
      export type Jsonp = string;
      export type Token = string;
    }
    export interface QueryParameters {
      token?: Parameters.Token;
      jsonp?: Parameters.Jsonp;
    }
    namespace Responses {
      export type $200 = ApiTypes.Schemas.GetSessionInfoResponseDto;
    }
  }
  namespace AuthControllerListUserSessions {
    export type RequestBody = ApiTypes.Schemas.ListUserSessionsRequestDto;
    namespace Responses {
      export type $201 = ApiTypes.Schemas.ListUserSessionsResponseDto;
    }
  }
  namespace AuthControllerLogin {
    export type RequestBody = ApiTypes.Schemas.LoginRequestDto;
    namespace Responses {
      export type $201 = ApiTypes.Schemas.LoginResponseDto;
    }
  }
  namespace AuthControllerLogout {
    namespace Responses {
      export interface $201 {}
    }
  }
  namespace AuthControllerRegister {
    export type RequestBody = ApiTypes.Schemas.RegisterRequestDto;
    namespace Responses {
      export type $201 = ApiTypes.Schemas.RegisterResponseDto;
    }
  }
  namespace AuthControllerResetPassword {
    export type RequestBody = ApiTypes.Schemas.ResetPasswordRequestDto;
    namespace Responses {
      export type $201 = ApiTypes.Schemas.ResetPasswordResponseDto;
    }
  }
  namespace AuthControllerRevokeUserSession {
    export type RequestBody = ApiTypes.Schemas.RevokeUserSessionRequestDto;
    namespace Responses {
      export type $201 = ApiTypes.Schemas.RevokeUserSessionResponseDto;
    }
  }
  namespace AuthControllerSendEmailVerificationCode {
    export type RequestBody = ApiTypes.Schemas.SendEmailVerificationCodeRequestDto;
    namespace Responses {
      export type $201 = ApiTypes.Schemas.SendEmailVerificationCodeResponseDto;
    }
  }
  namespace ContestControllerCalculateContestRating {
    export type RequestBody = ApiTypes.Schemas.CalculateContestRatingRequestDto;
    namespace Responses {
      export type $201 = ApiTypes.Schemas.CalculateContestRatingResponseDto;
    }
  }
  namespace ContestControllerCreateContest {
    export type RequestBody = ApiTypes.Schemas.CreateContestRequestDto;
    namespace Responses {
      export type $201 = ApiTypes.Schemas.CreateContestResponseDto;
    }
  }
  namespace ContestControllerDeleteContest {
    export type RequestBody = ApiTypes.Schemas.DeleteContestRequestDto;
    namespace Responses {
      export type $201 = ApiTypes.Schemas.DeleteContestResponseDto;
    }
  }
  namespace ContestControllerGetContestDetail {
    export type RequestBody = ApiTypes.Schemas.GetContestDetailRequestDto;
    namespace Responses {
      export type $201 = ApiTypes.Schemas.GetContestDetailResponseDto;
    }
  }
  namespace ContestControllerGetContestList {
    export type RequestBody = ApiTypes.Schemas.GetContestListRequestDto;
    namespace Responses {
      export type $201 = ApiTypes.Schemas.GetContestListResponseDto;
    }
  }
  namespace ContestControllerGetContestRanklist {
    export type RequestBody = ApiTypes.Schemas.GetContestRanklistRequestDto;
    namespace Responses {
      export type $201 = ApiTypes.Schemas.GetContestRanklistResponseDto;
    }
  }
  namespace ContestControllerRegisterContest {
    export type RequestBody = ApiTypes.Schemas.RegisterContestRequestDto;
    namespace Responses {
      export type $201 = ApiTypes.Schemas.RegisterContestResponseDto;
    }
  }
  namespace ContestControllerUnregisterContest {
    export type RequestBody = ApiTypes.Schemas.UnregisterContestRequestDto;
    namespace Responses {
      export type $201 = ApiTypes.Schemas.UnregisterContestResponseDto;
    }
  }
  namespace ContestControllerUpdateContest {
    export type RequestBody = ApiTypes.Schemas.UpdateContestRequestDto;
    namespace Responses {
      export type $201 = ApiTypes.Schemas.UpdateContestResponseDto;
    }
  }
  namespace CorsControllerCors {
    namespace Responses {
      export type $200 = string;
    }
  }
  namespace CorsControllerStreamsaverMitm {
    namespace Responses {
      export type $200 = string;
    }
  }
  namespace CorsControllerStreamsaverSw {
    namespace Responses {
      export type $200 = string;
    }
  }
  namespace CorsControllerXdomain {
    namespace Responses {
      export type $200 = string;
    }
  }
  namespace DiscussionControllerCreateDiscussion {
    export type RequestBody = ApiTypes.Schemas.CreateDiscussionRequestDto;
    namespace Responses {
      export type $201 = ApiTypes.Schemas.CreateDiscussionResponseDto;
    }
  }
  namespace DiscussionControllerCreateDiscussionReply {
    export type RequestBody = ApiTypes.Schemas.CreateDiscussionReplyRequestDto;
    namespace Responses {
      export type $201 = ApiTypes.Schemas.CreateDiscussionReplyResponseDto;
    }
  }
  namespace DiscussionControllerDeleteDiscussion {
    export type RequestBody = ApiTypes.Schemas.DeleteDiscussionRequestDto;
    namespace Responses {
      export type $201 = ApiTypes.Schemas.DeleteDiscussionResponseDto;
    }
  }
  namespace DiscussionControllerDeleteDiscussionReply {
    export type RequestBody = ApiTypes.Schemas.DeleteDiscussionReplyRequestDto;
    namespace Responses {
      export type $201 = ApiTypes.Schemas.DeleteDiscussionReplyResponseDto;
    }
  }
  namespace DiscussionControllerGetDiscussionAndReplies {
    export type RequestBody = ApiTypes.Schemas.GetDiscussionAndRepliesRequestDto;
    namespace Responses {
      export type $201 = ApiTypes.Schemas.GetDiscussionAndRepliesResponseDto;
    }
  }
  namespace DiscussionControllerGetDiscussionPermissions {
    export type RequestBody = ApiTypes.Schemas.GetDiscussionPermissionsRequestDto;
    namespace Responses {
      export type $201 = ApiTypes.Schemas.GetDiscussionPermissionsResponseDto;
    }
  }
  namespace DiscussionControllerQueryDiscussions {
    export type RequestBody = ApiTypes.Schemas.QueryDiscussionsRequestDto;
    namespace Responses {
      export type $201 = ApiTypes.Schemas.QueryDiscussionsResponseDto;
    }
  }
  namespace DiscussionControllerSetDiscussionPermissions {
    export type RequestBody = ApiTypes.Schemas.SetDiscussionPermissionsRequestDto;
    namespace Responses {
      export type $201 = ApiTypes.Schemas.SetDiscussionPermissionsResponseDto;
    }
  }
  namespace DiscussionControllerSetDiscussionPublic {
    export type RequestBody = ApiTypes.Schemas.SetDiscussionPublicRequestDto;
    namespace Responses {
      export type $201 = ApiTypes.Schemas.SetDiscussionPublicResponseDto;
    }
  }
  namespace DiscussionControllerSetDiscussionReplyPublic {
    export type RequestBody = ApiTypes.Schemas.SetDiscussionReplyPublicRequestDto;
    namespace Responses {
      export type $201 = ApiTypes.Schemas.SetDiscussionReplyPublicResponseDto;
    }
  }
  namespace DiscussionControllerToggleReaction {
    export type RequestBody = ApiTypes.Schemas.ToggleReactionRequestDto;
    namespace Responses {
      export type $201 = ApiTypes.Schemas.ToggleReactionResponseDto;
    }
  }
  namespace DiscussionControllerUpdateDiscussion {
    export type RequestBody = ApiTypes.Schemas.UpdateDiscussionRequestDto;
    namespace Responses {
      export type $201 = ApiTypes.Schemas.UpdateDiscussionResponseDto;
    }
  }
  namespace DiscussionControllerUpdateDiscussionReply {
    export type RequestBody = ApiTypes.Schemas.UpdateDiscussionReplyRequestDto;
    namespace Responses {
      export type $201 = ApiTypes.Schemas.UpdateDiscussionReplyResponseDto;
    }
  }
  namespace GroupControllerAddMember {
    export type RequestBody = ApiTypes.Schemas.AddUserToGroupRequestDto;
    namespace Responses {
      export type $201 = ApiTypes.Schemas.AddUserToGroupResponseDto;
    }
  }
  namespace GroupControllerCreateGroup {
    export type RequestBody = ApiTypes.Schemas.CreateGroupRequestDto;
    namespace Responses {
      export type $201 = ApiTypes.Schemas.CreateGroupResponseDto;
    }
  }
  namespace GroupControllerDeleteGroup {
    export type RequestBody = ApiTypes.Schemas.DeleteGroupRequestDto;
    namespace Responses {
      export type $201 = ApiTypes.Schemas.DeleteGroupResponseDto;
    }
  }
  namespace GroupControllerGetGroupList {
    namespace Responses {
      export type $200 = ApiTypes.Schemas.GetGroupListResponseDto;
    }
  }
  namespace GroupControllerGetGroupMemberList {
    export type RequestBody = ApiTypes.Schemas.GetGroupMemberListRequestDto;
    namespace Responses {
      export type $201 = ApiTypes.Schemas.GetGroupMemberListResponseDto;
    }
  }
  namespace GroupControllerGetGroupMeta {
    namespace Parameters {
      export type GroupId = string;
    }
    export interface QueryParameters {
      groupId: Parameters.GroupId;
    }
    namespace Responses {
      export type $200 = ApiTypes.Schemas.GetGroupMetaResponseDto;
    }
  }
  namespace GroupControllerRemoveMember {
    export type RequestBody = ApiTypes.Schemas.RemoveUserFromGroupRequestDto;
    namespace Responses {
      export type $201 = ApiTypes.Schemas.RemoveUserFromGroupResponseDto;
    }
  }
  namespace GroupControllerRenameGroup {
    export type RequestBody = ApiTypes.Schemas.RenameGroupRequestDto;
    namespace Responses {
      export type $201 = ApiTypes.Schemas.RenameGroupResponseDto;
    }
  }
  namespace GroupControllerSearchGroup {
    namespace Parameters {
      export type Query = string;
      export type Wildcard = "Start" | "End" | "Both";
    }
    export interface QueryParameters {
      query: Parameters.Query;
      wildcard?: Parameters.Wildcard;
    }
    namespace Responses {
      export type $200 = ApiTypes.Schemas.SearchGroupResponseDto;
    }
  }
  namespace GroupControllerSetGroupAdmin {
    export type RequestBody = ApiTypes.Schemas.SetGroupAdminRequestDto;
    namespace Responses {
      export type $201 = ApiTypes.Schemas.SetGroupAdminResponseDto;
    }
  }
  namespace HomepageControllerGetHomepage {
    namespace Parameters {
      export type Locale = "zh_CN" | "pl_PL" | "en_US" | "ja_JP";
    }
    export interface QueryParameters {
      locale: Parameters.Locale;
    }
    namespace Responses {
      export type $200 = ApiTypes.Schemas.GetHomepageResponseDto;
    }
  }
  namespace HomepageControllerGetHomepageSettings {
    namespace Responses {
      export type $200 = ApiTypes.Schemas.GetHomepageSettingsResponseDto;
    }
  }
  namespace HomepageControllerUpdateHomepageSettings {
    export type RequestBody = ApiTypes.Schemas.UpdateHomepageSettingsRequestDto;
    namespace Responses {
      export type $201 = ApiTypes.Schemas.UpdateHomepageSettingsResponseDto;
    }
  }
  namespace JudgeClientControllerAddJudgeClient {
    export type RequestBody = ApiTypes.Schemas.AddJudgeClientRequestDto;
    namespace Responses {
      export type $201 = ApiTypes.Schemas.AddJudgeClientResponseDto;
    }
  }
  namespace JudgeClientControllerDeleteJudgeClient {
    export type RequestBody = ApiTypes.Schemas.DeleteJudgeClientRequestDto;
    namespace Responses {
      export type $201 = ApiTypes.Schemas.DeleteJudgeClientResponseDto;
    }
  }
  namespace JudgeClientControllerListJudgeClients {
    namespace Responses {
      export type $200 = ApiTypes.Schemas.ListJudgeClientsResponseDto;
    }
  }
  namespace JudgeClientControllerResetJudgeClientKey {
    export type RequestBody = ApiTypes.Schemas.ResetJudgeClientKeyRequestDto;
    namespace Responses {
      export type $201 = ApiTypes.Schemas.ResetJudgeClientKeyResponseDto;
    }
  }
  namespace MigrationControllerMigrateUser {
    export type RequestBody = ApiTypes.Schemas.MigrateUserRequestDto;
    namespace Responses {
      export type $201 = ApiTypes.Schemas.MigrateUserResponseDto;
    }
  }
  namespace MigrationControllerQueryUserMigrationInfo {
    export type RequestBody = ApiTypes.Schemas.QueryUserMigrationInfoRequestDto;
    namespace Responses {
      export type $201 = ApiTypes.Schemas.QueryUserMigrationInfoResponseDto;
    }
  }
  namespace ProblemControllerAddProblemFile {
    export type RequestBody = ApiTypes.Schemas.AddProblemFileRequestDto;
    namespace Responses {
      export type $201 = ApiTypes.Schemas.AddProblemFileResponseDto;
    }
  }
  namespace ProblemControllerChangeProblemType {
    export type RequestBody = ApiTypes.Schemas.ChangeProblemTypeRequestDto;
    namespace Responses {
      export type $201 = ApiTypes.Schemas.ChangeProblemTypeResponseDto;
    }
  }
  namespace ProblemControllerCreateProblem {
    export type RequestBody = ApiTypes.Schemas.CreateProblemRequestDto;
    namespace Responses {
      export type $201 = ApiTypes.Schemas.CreateProblemResponseDto;
    }
  }
  namespace ProblemControllerCreateProblemTag {
    export type RequestBody = ApiTypes.Schemas.CreateProblemTagRequestDto;
    namespace Responses {
      export type $201 = ApiTypes.Schemas.CreateProblemTagResponseDto;
    }
  }
  namespace ProblemControllerDeleteProblem {
    export type RequestBody = ApiTypes.Schemas.DeleteProblemRequestDto;
    namespace Responses {
      export type $201 = ApiTypes.Schemas.DeleteProblemResponseDto;
    }
  }
  namespace ProblemControllerDeleteProblemTag {
    export type RequestBody = ApiTypes.Schemas.DeleteProblemTagRequestDto;
    namespace Responses {
      export type $201 = ApiTypes.Schemas.DeleteProblemTagResponseDto;
    }
  }
  namespace ProblemControllerDownloadProblemFiles {
    export type RequestBody = ApiTypes.Schemas.DownloadProblemFilesRequestDto;
    namespace Responses {
      export type $201 = ApiTypes.Schemas.DownloadProblemFilesResponseDto;
    }
  }
  namespace ProblemControllerGetAllProblemTags {
    export type RequestBody = ApiTypes.Schemas.GetAllProblemTagsRequestDto;
    namespace Responses {
      export type $201 = ApiTypes.Schemas.GetAllProblemTagsResponseDto;
    }
  }
  namespace ProblemControllerGetAllProblemTagsOfAllLocales {
    namespace Responses {
      export type $201 = ApiTypes.Schemas.GetAllProblemTagsOfAllLocalesResponseDto;
    }
  }
  namespace ProblemControllerGetProblem {
    export type RequestBody = ApiTypes.Schemas.GetProblemRequestDto;
    namespace Responses {
      export type $201 = ApiTypes.Schemas.GetProblemResponseDto;
    }
  }
  namespace ProblemControllerGetProblemTagDetail {
    export type RequestBody = ApiTypes.Schemas.GetProblemTagDetailRequestDto;
    namespace Responses {
      export type $201 = ApiTypes.Schemas.GetProblemTagDetailResponseDto;
    }
  }
  namespace ProblemControllerQueryProblemSet {
    export type RequestBody = ApiTypes.Schemas.QueryProblemSetRequestDto;
    namespace Responses {
      export type $201 = ApiTypes.Schemas.QueryProblemSetResponseDto;
    }
  }
  namespace ProblemControllerRemoveProblemFiles {
    export type RequestBody = ApiTypes.Schemas.RemoveProblemFilesRequestDto;
    namespace Responses {
      export type $201 = ApiTypes.Schemas.RemoveProblemFilesResponseDto;
    }
  }
  namespace ProblemControllerRenameProblemFile {
    export type RequestBody = ApiTypes.Schemas.RenameProblemFileRequestDto;
    namespace Responses {
      export type $201 = ApiTypes.Schemas.RenameProblemFileResponseDto;
    }
  }
  namespace ProblemControllerSetProblemDisplayId {
    export type RequestBody = ApiTypes.Schemas.SetProblemDisplayIdRequestDto;
    namespace Responses {
      export type $201 = ApiTypes.Schemas.SetProblemDisplayIdResponseDto;
    }
  }
  namespace ProblemControllerSetProblemPermissions {
    export type RequestBody = ApiTypes.Schemas.SetProblemPermissionsRequestDto;
    namespace Responses {
      export type $201 = ApiTypes.Schemas.SetProblemPermissionsResponseDto;
    }
  }
  namespace ProblemControllerSetProblemPublic {
    export type RequestBody = ApiTypes.Schemas.SetProblemPublicRequestDto;
    namespace Responses {
      export type $201 = ApiTypes.Schemas.SetProblemPublicResponseDto;
    }
  }
  namespace ProblemControllerUpdateProblemJudgeInfo {
    export type RequestBody = ApiTypes.Schemas.UpdateProblemJudgeInfoRequestDto;
    namespace Responses {
      export type $201 = ApiTypes.Schemas.UpdateProblemJudgeInfoResponseDto;
    }
  }
  namespace ProblemControllerUpdateProblemTag {
    export type RequestBody = ApiTypes.Schemas.UpdateProblemTagRequestDto;
    namespace Responses {
      export type $201 = ApiTypes.Schemas.UpdateProblemTagResponseDto;
    }
  }
  namespace ProblemControllerUpdateStatement {
    export type RequestBody = ApiTypes.Schemas.UpdateProblemStatementRequestDto;
    namespace Responses {
      export type $201 = ApiTypes.Schemas.UpdateProblemStatementResponseDto;
    }
  }
  namespace SubmissionControllerCancelSubmission {
    export type RequestBody = ApiTypes.Schemas.CancelSubmissionRequestDto;
    namespace Responses {
      export type $201 = ApiTypes.Schemas.CancelSubmissionResponseDto;
    }
  }
  namespace SubmissionControllerDeleteSubmission {
    export type RequestBody = ApiTypes.Schemas.DeleteSubmissionRequestDto;
    namespace Responses {
      export type $201 = ApiTypes.Schemas.DeleteSubmissionResponseDto;
    }
  }
  namespace SubmissionControllerDownloadSubmissionFile {
    export type RequestBody = ApiTypes.Schemas.DownloadSubmissionFileRequestDto;
    namespace Responses {
      export type $201 = ApiTypes.Schemas.DownloadSubmissionFileResponseDto;
    }
  }
  namespace SubmissionControllerGetSubmissionDetail {
    export type RequestBody = ApiTypes.Schemas.GetSubmissionDetailRequestDto;
    namespace Responses {
      export type $201 = ApiTypes.Schemas.GetSubmissionDetailResponseDto;
    }
  }
  namespace SubmissionControllerQuerySubmission {
    export type RequestBody = ApiTypes.Schemas.QuerySubmissionRequestDto;
    namespace Responses {
      export type $201 = ApiTypes.Schemas.QuerySubmissionResponseDto;
    }
  }
  namespace SubmissionControllerQuerySubmissionStatistics {
    export type RequestBody = ApiTypes.Schemas.QuerySubmissionStatisticsRequestDto;
    namespace Responses {
      export type $201 = ApiTypes.Schemas.QuerySubmissionStatisticsResponseDto;
    }
  }
  namespace SubmissionControllerRejudgeSubmission {
    export type RequestBody = ApiTypes.Schemas.RejudgeSubmissionRequestDto;
    namespace Responses {
      export type $201 = ApiTypes.Schemas.RejudgeSubmissionResponseDto;
    }
  }
  namespace SubmissionControllerSetSubmissionPublic {
    export type RequestBody = ApiTypes.Schemas.SetSubmissionPublicRequestDto;
    namespace Responses {
      export type $201 = ApiTypes.Schemas.SetSubmissionPublicResponseDto;
    }
  }
  namespace SubmissionControllerSubmit {
    export type RequestBody = ApiTypes.Schemas.SubmitRequestDto;
    namespace Responses {
      export type $201 = ApiTypes.Schemas.SubmitResponseDto;
    }
  }
  namespace UserControllerBanUser {
    export type RequestBody = ApiTypes.Schemas.BanUserRequestDto;
    namespace Responses {
      export type $201 = ApiTypes.Schemas.BanUserResponseDto;
    }
  }
  namespace UserControllerBatchImportUsers {
    export type RequestBody = ApiTypes.Schemas.BatchImportUsersRequestDto;
    namespace Responses {
      export type $201 = ApiTypes.Schemas.BatchImportUsersResponseDto;
    }
  }
  namespace UserControllerGetUserDetail {
    export type RequestBody = ApiTypes.Schemas.GetUserDetailRequestDto;
    namespace Responses {
      export type $201 = ApiTypes.Schemas.GetUserDetailResponseDto;
    }
  }
  namespace UserControllerGetUserList {
    export type RequestBody = ApiTypes.Schemas.GetUserListRequestDto;
    namespace Responses {
      export type $201 = ApiTypes.Schemas.GetUserListResponseDto;
    }
  }
  namespace UserControllerGetUserMeta {
    export type RequestBody = ApiTypes.Schemas.GetUserMetaRequestDto;
    namespace Responses {
      export type $201 = ApiTypes.Schemas.GetUserMetaResponseDto;
    }
  }
  namespace UserControllerGetUserPreference {
    export type RequestBody = ApiTypes.Schemas.GetUserPreferenceRequestDto;
    namespace Responses {
      export type $201 = ApiTypes.Schemas.GetUserPreferenceResponseDto;
    }
  }
  namespace UserControllerGetUserProfile {
    export type RequestBody = ApiTypes.Schemas.GetUserProfileRequestDto;
    namespace Responses {
      export type $201 = ApiTypes.Schemas.GetUserProfileResponseDto;
    }
  }
  namespace UserControllerGetUserRatingHistory {
    export type RequestBody = ApiTypes.Schemas.GetUserRatingHistoryRequestDto;
    namespace Responses {
      export type $201 = ApiTypes.Schemas.GetUserRatingHistoryResponseDto;
    }
  }
  namespace UserControllerGetUserSecuritySettings {
    export type RequestBody = ApiTypes.Schemas.GetUserSecuritySettingsRequestDto;
    namespace Responses {
      export type $201 = ApiTypes.Schemas.GetUserSecuritySettingsResponseDto;
    }
  }
  namespace UserControllerQueryAuditLogs {
    export type RequestBody = ApiTypes.Schemas.QueryAuditLogsRequestDto;
    namespace Responses {
      export type $201 = ApiTypes.Schemas.QueryAuditLogsResponseDto;
    }
  }
  namespace UserControllerResetUserPassword {
    export type RequestBody = ApiTypes.Schemas.ResetUserPasswordRequestDto;
    namespace Responses {
      export type $201 = ApiTypes.Schemas.ResetUserPasswordResponseDto;
    }
  }
  namespace UserControllerSearchUser {
    namespace Parameters {
      export type Query = string;
      export type Wildcard = "Start" | "End" | "Both";
    }
    export interface QueryParameters {
      query: Parameters.Query;
      wildcard?: Parameters.Wildcard;
    }
    namespace Responses {
      export type $200 = ApiTypes.Schemas.SearchUserResponseDto;
    }
  }
  namespace UserControllerSetUserAdmin {
    export type RequestBody = ApiTypes.Schemas.SetUserAdminRequestDto;
    namespace Responses {
      export type $201 = ApiTypes.Schemas.SetUserAdminResponseDto;
    }
  }
  namespace UserControllerSetUserPrivileges {
    export type RequestBody = ApiTypes.Schemas.SetUserPrivilegesRequestDto;
    namespace Responses {
      export type $201 = ApiTypes.Schemas.SetUserPrivilegesResponseDto;
    }
  }
  namespace UserControllerUpdateUserPassword {
    export type RequestBody = ApiTypes.Schemas.UpdateUserPasswordRequestDto;
    namespace Responses {
      export type $201 = ApiTypes.Schemas.UpdateUserPasswordResponseDto;
    }
  }
  namespace UserControllerUpdateUserPreference {
    export type RequestBody = ApiTypes.Schemas.UpdateUserPreferenceRequestDto;
    namespace Responses {
      export type $201 = ApiTypes.Schemas.UpdateUserPreferenceResponseDto;
    }
  }
  namespace UserControllerUpdateUserProfile {
    export type RequestBody = ApiTypes.Schemas.UpdateUserProfileRequestDto;
    namespace Responses {
      export type $201 = ApiTypes.Schemas.UpdateUserProfileResponseDto;
    }
  }
  namespace UserControllerUpdateUserSelfEmail {
    export type RequestBody = ApiTypes.Schemas.UpdateUserSelfEmailRequestDto;
    namespace Responses {
      export type $201 = ApiTypes.Schemas.UpdateUserSelfEmailResponseDto;
    }
  }
}
