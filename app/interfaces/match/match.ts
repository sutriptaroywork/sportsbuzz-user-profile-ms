import { ObjectId } from 'mongodb';
import { MatchFormat, MatchStatus, MatchTossWinnerAction, MatchCategory, MatchProvider } from '@/enums/matchType/matchCommon';

export interface MatchAttributes {
    _id: ObjectId;
    sKey: string;
    eFormat: MatchFormat,
    sName: string;
    sSponsoredText: string;
    sSeasonKey: string;
    sVenue: string;
    eStatus: MatchStatus;
    dStartDate: Date;
    oHomeTeam: {
        iTeamId: ObjectId,
        sKey: string;
        sName: string;
        sShortName: string;
        sImage: string;
        nScore: string;
        bIsNameUpdated: boolean;
    },
    oAwayTeam: {
        iTeamId: ObjectId;
        sKey: string;
        sName: string;
        sShortName: string;
        sImage: string;
        nScore: string;
        bIsNameUpdated: boolean;
    },
    sWinning: string;
    iTossWinnerId: ObjectId;
    eTossWinnerAction: MatchTossWinnerAction;
    bMatchOnTop: boolean;
    eCategory: MatchCategory,
    sInfo: string;
    nLatestInningNumber: number;
    aPlayerRole: [{
        sName: string;
        sFullName: string;
        nMax: number;
        nMin: number;
        nPosition: number;
    }],
    bScorecardShow: boolean;
    sLeagueText: string;
    sSeasonName: string;
    nMaxTeamLimit: number;
    iSeriesId: ObjectId;
    iSeasonId: ObjectId;
    bDisabled: boolean;
    eProvider: MatchProvider,
    bLineupsOut: boolean;
    sFantasyPost: string;
    sStreamUrl: string;
    nRankCount: number;
    nPrizeCount: number;
    nWinDistCount: number;
    dWinDistAt: Date;
    sStatusNote: string;
    sExternalId: string;
    nPrice: number;
    isMegaContest: boolean;
    bIsNameUpdated: boolean;
    nPosition: number;

    dCreatedAt: Date;
    dUpdatedAt: Date;
}
