import { ObjectId } from 'mongodb';

import { SeriesLBCategoriesTemplateType } from '@/enums/seriesLBType/seriesLBCommon';

export interface SeriesLBCategoriesTemplateAttributes {
    _id: ObjectId;
    sName: string;
    eType: SeriesLBCategoriesTemplateType;
    sInfo: string;
    sImage: string;
    sColumnText: string;
    sExternalId: string;

    dCreatedAt: Date;
    dUpdatedAt: Date;
}
