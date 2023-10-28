import { Schema } from 'mongoose';

import { MatchDBConnect } from '@/connections/database/mongodb/mongodb';
import { MatchPlayerAttributes } from '@/interfaces/match/matchPlayer';
import Constants from '@/configs/constants';

import MatchModel from './match';
import TeamModel from './team';
import PlayerModel from './player';

import { PlayerRole } from '@/enums/matchType/matchCommon';

export interface MatchPlayerModelInput extends Omit<MatchPlayerAttributes, '_id' | 'dCreatedAt' | 'dUpdatedAt'> {}
export interface MatchPlayerModelOutput extends Required<MatchPlayerAttributes> {}

const MatchPlayerSchema = new Schema<MatchPlayerAttributes>(
    {
        sKey: { type: String, trim: true },
        iMatchId: { type: Schema.Types.ObjectId, ref: MatchModel, index: true },
        iTeamId: { type: Schema.Types.ObjectId, ref: TeamModel },
        sTeamName: { type: String, trim: true },
        iPlayerId: { type: Schema.Types.ObjectId, ref: PlayerModel },
        sImage: { type: String, trim: true },
        sLogoUrl: { type: String, trim: true },
        sName: { type: String, trim: true },
        sTeamKey: { type: String, trim: true },
        eRole: { type: String, enum: Constants.match.player.role, default: PlayerRole.BATS },
        nFantasyCredit: { type: Number, default: 9 },
        nScoredPoints: { type: Number, default: 0 },
        nSeasonPoints: { type: Number, default: 0 },
        aPointBreakup: [{
            sKey: { type: String, trim: true },
            sName: { type: String, trim: true },
            nPoint: { type: Number },
            nScoredPoints: { type: Number, default: 0 }
        }],
        nSetBy: { type: Number, default: 0 },
        nCaptainBy: { type: Number, default: 0 },
        nViceCaptainBy: { type: Number, default: 0 },
        bShow: { type: Boolean, default: false },
        bSubstitute: { type: Boolean, default: false },
        bStrikeRateBonus: { type: Boolean, default: false },
        bEconomyBonus: { type: Boolean, default: false },
        sExternalId: { type: String }
    },
    { timestamps: { createdAt: Constants.tableDetails.matchPlayer.createdAtFieldName, updatedAt: Constants.tableDetails.matchPlayer.updatedAtFieldName } }
)

MatchPlayerSchema.index({ iMatchId: 1, iTeamId: 1, iPlayerId: 1 }, { unique: true })
MatchPlayerSchema.index({ iMatchId: 1 })

const MatchPlayerModel = MatchDBConnect.model(Constants.tableDetails.matchPlayer.tableName, MatchPlayerSchema)

MatchPlayerModel.syncIndexes().then(() => {
    console.log('Match Player Model Indexes Synced')
}).catch((err) => {
    console.log('Match Player Model Indexes Sync Error', err)
})

export default MatchPlayerModel;
