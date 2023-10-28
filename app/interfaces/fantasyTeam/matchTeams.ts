import { ObjectId } from 'mongodb';

import { MatchCategory } from '@/enums/matchType/matchCommon';

interface Players {
    iMatchPlayerId: ObjectId;
    iTeamId: ObjectId;
    nScoredPoints: number;
}

export interface MatchTeamsAttributes {
    _id: ObjectId;
    iMatchId: ObjectId;
    aPlayers: [Players],
    nTotalPoint: number;
    nTotalCredit: number;
    sHash: string;
    eCategory: MatchCategory;
    sExternalId: string;

    dCreatedAt: Date;
    dUpdatedAt: Date;
}
