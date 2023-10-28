import { ObjectId } from 'mongodb';

import { Status } from '@/enums/statusType/statusCommon';
import { PromocodeTypes, PromoOffer } from '@/enums/promocodeType/promocodeCommon';
import { MatchCategory } from '@/enums/matchType/matchCommon';

export interface PromocodeAttributes {
    _id: ObjectId;
    sName: string;
    sCode: string;
    sInfo: string;
    bIsPercent: boolean;
    nAmount: number;
    bShow: boolean;
    // for e.g.: there is any social media campaign run by marketing team and users whoever has seen the post, that user can apply promocode from their post to this platform.
    eStatus: Status;
    nMinAmount: number;
    nMaxAmount: number;
    aLeagues: [ObjectId],
    aMatches: [ObjectId],
    eType: PromocodeTypes;
    iSeriesId: string;
    nMaxAllow: number;
    bMaxAllowForAllUser: boolean;
    // Promocode to be used Only N number of times by all the users so that i can generated limited use promocode
    nPerUserUsage: number;
    dStartTime: { type: Date },
    dExpireTime: { type: Date },
    nBonusExpireDays: number;
    eOfferType: PromoOffer;
    sExternalId: string;
    sportsType: MatchCategory;

    dCreatedAt: Date;
    dUpdatedAt: Date;
}
