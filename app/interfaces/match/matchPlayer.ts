import { ObjectId } from 'mongodb';

import { PlayerRole } from '@/enums/matchType/matchCommon';

interface PointBreakup {
    sKey: string;
    sName: string;
    nPoint: number;
    nScoredPoints: number;
}

export interface MatchPlayerAttributes {
    _id: ObjectId;
    sKey: string;
    iMatchId: ObjectId;
    iTeamId: ObjectId;
    sTeamName: string;
    iPlayerId: ObjectId;
    sImage: string;
    sLogoUrl: string;
    sName: string;
    sTeamKey: string;
    eRole: PlayerRole;
    nFantasyCredit: number;
    nScoredPoints: number;
    nSeasonPoints: number;
    aPointBreakup: [PointBreakup],
    nSetBy: number;
    nCaptainBy: number;
    nViceCaptainBy: number;
    bShow: boolean;
    bSubstitute: boolean;
    bStrikeRateBonus: boolean;
    bEconomyBonus: boolean;
    sExternalId: string;

    dCreatedAt: Date;
    dUpdatedAt: Date;
}
