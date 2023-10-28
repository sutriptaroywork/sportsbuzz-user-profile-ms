import { Schema } from 'mongoose';

import { GameDBConnect } from '@/connections/database/mongodb/mongodb';
import { MyMatchesAttributes } from '@/interfaces/game/myMatches';
import Constants from '@/configs/constants';

import UserModel from '../userProfile/userProfile';
import MatchModel from '../match/match';
import MatchLeagueModel from './matchLeague';
import UserLeagueModel from './userLeague';

import { MatchCategory, MatchStatus } from '@/enums/matchType/matchCommon';
import { UserType } from '@/enums/userProfileType/userCommon';

export interface MyMatchesModelInput extends Omit<MyMatchesAttributes, '_id' | 'dCreatedAt' | 'dUpdatedAt'> {}
export interface MyMatchesModelOutput extends Required<MyMatchesAttributes> {}

const MyMatchesSchema = new Schema<MyMatchesAttributes>(
    {
        iUserId: { type: Schema.Types.ObjectId, ref: UserModel, required: true },
        aMatchLeagueId: [{ type: Schema.Types.ObjectId, ref: MatchLeagueModel, default: [] }],
        aCMatchLeagueId: [{ type: Schema.Types.ObjectId, ref: MatchLeagueModel, default: [] }], // created private league ids
        aMatchLeagueCashback: [{
            iMatchLeagueId: { type: Schema.Types.ObjectId, ref: MatchLeagueModel },
            nAmount: { type: Number },
            nTeams: { type: Number },
            eType: { type: String, enum: Constants.ruleType } // C = CASH, B = BONUS
        }],
        nTeams: { type: Number },
        nJoinedLeague: { type: Number },
        nWinnings: { type: Number, default: 0 },
        aMatchLeagueWins: [{
            iMatchLeagueId: { type: Schema.Types.ObjectId, ref: MatchLeagueModel },
            iUserLeagueId: { type: Schema.Types.ObjectId, ref: UserLeagueModel },
            nRealCash: { type: Number },
            nBonus: { type: Number },
            aExtraWin: [{
            sInfo: { type: String },
            sImage: { type: String, trim: true }
            }]
        }],
        aExtraWin: [{
            sInfo: { type: String },
            sImage: { type: String, trim: true }
        }],
        nBonusWin: { type: Number, default: 0 },
        iMatchId: { type: Schema.Types.ObjectId, ref: MatchModel, required: true },
        eCategory: { type: String, enum: Constants.match.category, default: MatchCategory.CRICKET },
        eMatchStatus: { type: String, enum: Constants.match.status, default: MatchStatus.UPCOMING },
        dStartDate: { type: Date, required: true },
        eType: { type: String, enum: Constants.user.userType, default: UserType.USER },
        sExternalId: { type: String }
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }, 
        timestamps: { createdAt: Constants.tableDetails.myMatches.createdAtFieldName, updatedAt: Constants.tableDetails.myMatches.updatedAtFieldName } 
    }
);

MyMatchesSchema.virtual('oMatch', {
    ref: MatchModel,
    localField: 'iMatchId',
    foreignField: '_id'
})

MyMatchesSchema.index({ iMatchId: 1, iUserId: 1 })
MyMatchesSchema.index({ aMatchLeagueId: 1, iMatchId: 1 })
MyMatchesSchema.index({ iUserId: 1, eCategory: 1, dStartDate: -1, eMatchStatus: 1 })

const MyMatchesModel = GameDBConnect.model(Constants.tableDetails.myMatches.tableName, MyMatchesSchema);

MyMatchesModel.syncIndexes().then(() => {
    console.log('MyMatch Model Indexes Synced')
}).catch((err) => {
    console.log('MyMatch Model Indexes Sync Error', err)
})

export default MyMatchesModel;
