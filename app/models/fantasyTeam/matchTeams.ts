import { Schema } from 'mongoose';

import { FantasyTeamConnect } from '@/connections/database/mongodb/mongodb';
import { MatchTeamsAttributes } from '@/interfaces/fantasyTeam/matchTeams';
import Constants from '@/configs/constants';

import MatchModel from '../match/match';
import TeamModel from '../match/team';
import MatchPlayerModel from '../match/matchPlayer';

import { MatchCategory } from '@/enums/matchType/matchCommon';

export interface MatchTeamsModelInput extends Omit<MatchTeamsAttributes, '_id' | 'dCreatedAt' | 'dUpdatedAt'> {}
export interface MatchTeamsModelOutput extends Required<MatchTeamsAttributes> {}

const MatchTeamsSchema = new Schema<MatchTeamsAttributes>(
    {
        iMatchId: { type: Schema.Types.ObjectId, ref: MatchModel },
        aPlayers: [{
            iMatchPlayerId: { type: Schema.Types.ObjectId, ref: MatchPlayerModel },
            iTeamId: { type: Schema.Types.ObjectId, ref: TeamModel },
            nScoredPoints: { type: Number, default: 0 }
        }],
        nTotalPoint: { type: Number },
        nTotalCredit: { type: Number },
        sHash: { type: String, trim: true },
        eCategory: { type: String, enum: Constants.match.category, default: MatchCategory.CRICKET },
        sExternalId: { type: String }
    },
    { timestamps: { createdAt: Constants.tableDetails.matchTeam.createdAtFieldName, updatedAt: Constants.tableDetails.matchTeam.updatedAtFieldName } }
);

MatchTeamsSchema.index({ sHash: 1, iMatchId: 1 })
MatchTeamsSchema.virtual('aPlayers.oMatchPlayer', {
    ref: MatchPlayerModel,
    localField: 'aPlayers.iMatchPlayerId',
    foreignField: '_id',
    justOne: true
})

MatchTeamsSchema.virtual('aPlayers.oTeams', {
    ref: TeamModel,
    localField: 'aPlayers.iTeamId',
    foreignField: '_id',
    justOne: true
})

const MatchTeamsModel = FantasyTeamConnect.model(Constants.tableDetails.matchTeam.tableName, MatchTeamsSchema);

MatchTeamsModel.syncIndexes().then(() => {
    console.log('MatchTeams Model Indexes Synced')
}).catch((err) => {
    console.log('MatchTeams Model Indexes Sync Error', err)
})

export default MatchTeamsModel;
