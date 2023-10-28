import { Schema } from 'mongoose';

import { MatchDBConnect } from '@/connections/database/mongodb/mongodb';
import { PlayerAttributes } from '@/interfaces/match/player';
import Constants from '@/configs/constants';

import TeamModel from './team';

import { MatchCategory } from '@/enums/matchType/matchCommon';
import { PlayerRole, MatchProvider } from '@/enums/matchType/matchCommon';

export interface PlayerModelInput extends Omit<PlayerAttributes, '_id' | 'dCreatedAt' | 'dUpdatedAt'> {}
export interface PlayerModelOutput extends Required<PlayerAttributes> {}

const PlayerSchema = new Schema<PlayerAttributes>(
    {
        sKey: { type: String, trim: true, required: true },
        sName: { type: String, trim: true },
        eCategory: { type: String, enum: Constants.match.category, default: MatchCategory.CRICKET },
        sImage: { type: String, trim: true },
        sLogoUrl: { type: String, trim: true },
        nFantasyCredit: { type: Number }, // check
        eRole: { type: String, trim: true, enum: Constants.match.player.role, default: PlayerRole.BATS },
        iTeamId: { type: Schema.Types.ObjectId, ref: TeamModel }, // check
        eProvider: { type: String, enum: Constants.match.matchProvider, default: MatchProvider.CUSTOM },
        sExternalId: { type: String }
    },
    { timestamps: { createdAt: Constants.tableDetails.player.createdAtFieldName, updatedAt: Constants.tableDetails.player.updatedAtFieldName } }
)

PlayerSchema.index({ sKey: 1 })
PlayerSchema.index({ sKey: 1, eCategory: 1, eProvider: 1 }, { unique: true })

const PlayerModel = MatchDBConnect.model(Constants.tableDetails.player.tableName, PlayerSchema)

export default PlayerModel;
