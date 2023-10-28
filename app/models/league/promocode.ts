import { Schema } from 'mongoose';

import { LeaguesDBConnect } from '@/connections/database/mongodb/mongodb';
import { PromocodeAttributes } from '@/interfaces/league/promocode';
import Constants from '@/configs/constants';

import MatchModel from '../match/match';
import LeagueModel from './league';

import { Status } from '@/enums/statusType/statusCommon';
import { PromocodeTypes } from '@/enums/promocodeType/promocodeCommon';

export interface PromocodeModelInput extends Omit<PromocodeAttributes, '_id' | 'dCreatedAt' | 'dUpdatedAt'> {}
export interface PromocodeModelOutput extends Required<PromocodeAttributes> {}

const PromocodeSchema = new Schema<PromocodeAttributes>(
    {
        sName: { type: String, required: true },
        sCode: { type: String, required: true },
        sInfo: { type: String, trim: true },
        bIsPercent: { type: Boolean, default: false },
        nAmount: { type: Number },
        bShow: { type: Boolean, default: false }, // if eStatus is Y and this flag is false, no need to show in front, but it's active for users.
        // for e.g.: there is any social media campaign run by marketing team and users whoever has seen the post, that user can apply promocode from their post to this platform.
        eStatus: { type: String, enum: Constants.status, default: Status.INACTIVE }, // Y = Active, N = Inactive
        nMinAmount: { type: Number },
        nMaxAmount: { type: Number },
        aLeagues: [{ type: Schema.Types.ObjectId, ref: LeagueModel }],
        aMatches: [{ type: Schema.Types.ObjectId, ref: MatchModel }],
        eType: { type: String, enum: Constants.promocode.promocodeTypes, default: PromocodeTypes.DEPOSIT },
        iSeriesId: { type: String, default: null },
        nMaxAllow: { type: Number },
        bMaxAllowForAllUser: { type: Boolean, default: false },
        // Promocode to be used Only N number of times by all the users so that i can generated limited use promocode
        nPerUserUsage: { type: Number, default: 1 },
        dStartTime: { type: Date },
        dExpireTime: { type: Date },
        nBonusExpireDays: { type: Number },
        eOfferType: { type: String, enum: Constants.promocode.promoOffer },
        sExternalId: { type: String },
        sportsType: { type: String, enum: Constants.match.category }
    },
    { timestamps: { createdAt: Constants.tableDetails.promocode.createdAtFieldName, updatedAt: Constants.tableDetails.promocode.updatedAtFieldName } }
);

PromocodeSchema.index({ sCode: 1, eStatus: 1, bShow: 1, eType: 1 })

const PromocodeModel = LeaguesDBConnect.model(Constants.tableDetails.promocode.tableName, PromocodeSchema);

export default PromocodeModel;
