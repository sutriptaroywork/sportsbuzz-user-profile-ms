import { ObjectId } from 'mongodb';

import { RuleType } from '@/enums/cashbackType/cashbackCommon';
import { MatchCategory, MatchStatus } from '@/enums/matchType/matchCommon';
import { UserType } from '@/enums/userProfileType/userCommon';

interface MatchLeagueCashback {
    iMatchLeagueId: ObjectId;
    nAmount: number;
    nTeams: number;
    eType: RuleType;
}

interface MatchLeagueWins {
    iMatchLeagueId: ObjectId;
    iUserLeagueId: ObjectId;
    nRealCash: number;
    nBonus: number;
    eType: RuleType;
    aExtraWin: [ExtraWin]
}

interface ExtraWin {
    sInfo: string;
    sImage: string;
}

export interface MyMatchesAttributes {
    _id: ObjectId;
    iUserId: ObjectId;
    aMatchLeagueId: [ObjectId];
    aCMatchLeagueId: [ObjectId];
    aMatchLeagueCashback: [MatchLeagueCashback];
    nTeams: number;
    nJoinedLeague: number;
    nWinnings: number;
    aMatchLeagueWins: [MatchLeagueWins];
    aExtraWin: [ExtraWin];
    nBonusWin: number;
    iMatchId: ObjectId;
    eCategory: MatchCategory;
    eMatchStatus: MatchStatus;
    dStartDate: Date;
    eType: UserType;
    sExternalId: string;

    dCreatedAt: Date;
    dUpdatedAt: Date;
}
