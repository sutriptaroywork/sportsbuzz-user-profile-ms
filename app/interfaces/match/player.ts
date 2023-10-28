import { ObjectId } from 'mongodb';

import { MatchCategory } from '@/enums/matchType/matchCommon';
import { PlayerRole, MatchProvider } from '@/enums/matchType/matchCommon';

export interface PlayerAttributes {
    _id: ObjectId;
    sKey: string;
    sName: string;
    eCategory: MatchCategory;
    sImage: string;
    sLogoUrl: string;
    nFantasyCredit: number;
    eRole: PlayerRole;
    iTeamId: ObjectId;
    eProvider: MatchProvider;
    sExternalId: string;

    dCreatedAt: Date;
    dUpdatedAt: Date;
}
