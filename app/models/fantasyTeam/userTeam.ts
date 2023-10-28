import { Schema } from 'mongoose';

import { FantasyTeamConnect } from '@/connections/database/mongodb/mongodb';
import { UserTeamAttributes, UserTeamStatics } from '@/interfaces/fantasyTeam/userTeam';
import Constants from '@/configs/constants';

import MatchModel from '../match/match';
import UserModel from '../userProfile/userProfile';
import MatchPlayerModel from '../match/matchPlayer';
import MatchTeamsModel from './matchTeams';

import { MatchCategory } from '@/enums/matchType/matchCommon';
import { UserType } from '@/enums/userProfileType/userCommon';

export interface UserTeamModelInput extends Omit<UserTeamAttributes, '_id' | 'dCreatedAt' | 'dUpdatedAt'> {}
export interface UserTeamModelOutput extends Required<UserTeamAttributes> {}

const UserTeamSchema = new Schema<UserTeamAttributes>(
    {
        iMatchId: { type: Schema.Types.ObjectId, ref: MatchModel },
        iUserId: { type: Schema.Types.ObjectId, ref: UserModel },
        sName: { type: String, trim: true, required: true },
        iCaptainId: { type: Schema.Types.ObjectId, ref: MatchPlayerModel, required: true },
        iViceCaptainId: { type: Schema.Types.ObjectId, ref: MatchPlayerModel, required: true },
        nTotalPoints: { type: Number },
        sHash: { type: String, trim: true },
        bPointCalculated: { type: Boolean, default: false },
        eCategory: { type: String, enum: Constants.match.category, default: MatchCategory.CRICKET },
        eType: { type: String, enum: Constants.user.userType, default: UserType.USER }, // U = USER B = BOT
        bSwapped: { type: Boolean, default: false }, // it's true when combination bot replaced with copy bot userTeam and vice versa.
        bIsDuplicated: { type: Boolean, default: false },
        iIsDuplicatedFromUserTeamId: { type: Schema.Types.ObjectId },
        sExternalId: { type: String }
    },
    { 
        timestamps: { createdAt: Constants.tableDetails.userTeam.createdAtFieldName, updatedAt: Constants.tableDetails.userTeam.updatedAtFieldName },
        statics: {
            filterData(userTeam) {
                userTeam.sHash = undefined
                userTeam.dCreatedAt = undefined
                userTeam.dUpdatedAt = undefined
                userTeam.__v = undefined
                userTeam.eType = undefined
                userTeam.bPointCalculated = undefined
            }
        } 
    }
);

UserTeamSchema.index({ iMatchId: 1, sHash: 1 })
UserTeamSchema.index({ iMatchId: 1, iUserId: 1 })
UserTeamSchema.index({ iMatchId: 1, sHash: 1, bPointCalculated: 1 })
UserTeamSchema.index({ iMatchId: 1, iUserId: 1, sName: 1, _id: 1 })
UserTeamSchema.index({ iCaptainId: 1, iMatchId: 1, iUserId: 1, iViceCaptainId: 1, sHash: 1, _id: 1 })
UserTeamSchema.index({ iCaptainId: 1, iViceCaptainId: 1, sHash: 1, _id: 1 })
UserTeamSchema.index({ eType: 1 })

UserTeamSchema.virtual('oUser', {
    ref: UserModel,
    localField: 'iUserId',
    foreignField: '_id',
    justOne: true
})
UserTeamSchema.virtual('oMatch', {
    ref: MatchModel,
    localField: 'iMatchId',
    foreignField: '_id',
    justOne: true
})
  
UserTeamSchema.virtual('oMatchTeamHash', {
    ref: MatchTeamsModel,
    localField: 'sHash',
    foreignField: 'sHash',
    justOne: true
})

const UserTeamModel = FantasyTeamConnect.model<UserTeamAttributes, UserTeamStatics>(Constants.tableDetails.userTeam.tableName, UserTeamSchema);

UserTeamModel.syncIndexes().then(() => {
    console.log('User Team Model Indexes Synced')
}).catch((err) => {
    console.log('User Team Model Indexes Sync Error', err)
})

export default UserTeamModel;
