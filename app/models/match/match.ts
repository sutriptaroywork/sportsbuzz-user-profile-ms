import { Schema } from 'mongoose';

import { MatchDBConnect } from '@/connections/database/mongodb/mongodb';
import { MatchAttributes } from '@/interfaces/match/match';
import Constants from '@/configs/constants';

import TeamModel from './team';
import SeasonModel from '../game/season';
import SeriesLBModel from '../seriesLB/seriesLB';

import { MatchFormat, MatchCategory, MatchProvider, MatchStatus, MatchTossWinnerAction } from '@/enums/matchType/matchCommon';

export interface MatchModelInput extends Omit<MatchAttributes, '_id' | 'dCreatedAt' | 'dUpdatedAt'> {}
export interface MatchModelOutput extends Required<MatchAttributes> {}

const MatchSchema = new Schema<MatchAttributes>(
    {
        sKey: { type: String, trim: true },
        eFormat: { type: String, enum: MatchFormat },
        sName: { type: String, trim: true },
        sSponsoredText: { type: String, trim: true },
        sSeasonKey: { type: String, trim: true },
        sVenue: { type: String, trim: true },
        eStatus: { type: String, enum: MatchStatus, default: MatchStatus.PENDING },
        dStartDate: { type: Date, required: true },
        oHomeTeam: {
            iTeamId: { type: Schema.Types.ObjectId, ref: TeamModel },
            sKey: { type: String, trim: true, required: true },
            sName: { type: String, trim: true },
            sShortName: { type: String },
            sImage: { type: String, trim: true },
            nScore: { type: String },
            bIsNameUpdated: { type: Boolean, default: false }
        },
        oAwayTeam: {
            iTeamId: { type: Schema.Types.ObjectId, ref: TeamModel },
            sKey: { type: String, trim: true, required: true },
            sName: { type: String, trim: true },
            sShortName: { type: String },
            sImage: { type: String, trim: true },
            nScore: { type: String },
            bIsNameUpdated: { type: Boolean, default: false }
        },
        sWinning: { type: String },
        iTossWinnerId: { type: Schema.Types.ObjectId, ref: TeamModel },
        eTossWinnerAction: { type: String, enum: MatchTossWinnerAction },
        bMatchOnTop: { type: Boolean, default: false },
        eCategory: { type: String, enum: MatchCategory, default: MatchCategory.CRICKET },
        sInfo: { type: String, trim: true },
        nLatestInningNumber: { type: Number },
        aPlayerRole: [{
            sName: { type: String, trim: true, required: true },
            sFullName: { type: String, trim: true },
            nMax: { type: Number, required: true },
            nMin: { type: Number, required: true },
            nPosition: { type: Number }
        }],
        bScorecardShow: { type: Boolean, default: false },
        sLeagueText: { type: String },
        sSeasonName: { type: String, trim: true },
        nMaxTeamLimit: { type: Number },
        iSeriesId: { type: Schema.Types.ObjectId, ref: SeriesLBModel },
        iSeasonId: { type: Schema.Types.ObjectId, ref: SeasonModel },
        bDisabled: { type: Boolean, default: false },
        eProvider: { type: String, enum: MatchProvider, default: MatchProvider.CUSTOM },
        bLineupsOut: { type: Boolean, default: false },
        sFantasyPost: { type: String },
        sStreamUrl: { type: String, trim: true },
        nRankCount: { type: Number, default: 0 },
        nPrizeCount: { type: Number, default: 0 },
        nWinDistCount: { type: Number, default: 0 },
        dWinDistAt: { type: Date },
        sStatusNote: { type: String },
        sExternalId: { type: String },
        nPrice: { type: Schema.Types.Number, default: 0 },
        isMegaContest: { type: Boolean, default: false },
        bIsNameUpdated: { type: Boolean, default: false },
        nPosition: { type: Number }
    },
    { timestamps: { createdAt: Constants.tableDetails.match.createdAtFieldName, updatedAt: Constants.tableDetails.match.updatedAtFieldName } }
)

// As expected to give these two index as a unique but not given.
MatchSchema.index({ sKey: 1, eCategory: 1 }, { unique: true })
MatchSchema.index({ sKey: 1, eCategory: 1, eProvider: 1 }, { unique: true })
MatchSchema.index({ eCategory: 1, eStatus: 1, sKey: 1 })
MatchSchema.index({ eStatus: 1, dStartDate: 1 })
MatchSchema.index({ iSeriesId: 1, eStatus: 1 })

MatchSchema.virtual('oSeries', {
  ref: SeriesLBModel,
  localField: 'iSeriesId',
  foreignField: '_id',
  justOne: true
})

MatchSchema.virtual('oSeason', {
  ref: SeasonModel,
  localField: 'iSeasonId',
  foreignField: '_id',
  justOne: true
})

const MatchModel = MatchDBConnect.model(Constants.tableDetails.match.tableName, MatchSchema)

MatchModel.syncIndexes().then(() => {
  console.log('Match Model Indexes Synced')
}).catch((err) => {
  console.log('Match Model Indexes Sync Error', err)
})

export default MatchModel;
