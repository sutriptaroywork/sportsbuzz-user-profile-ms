import AdminLogsModel, { AdminLogsModelInput, AdminLogsModelOutput } from '@/models/adminModel/adminLogs';
import BaseMongoDao from '../baseMongoDao';

export default class AdminLogsDao extends BaseMongoDao<AdminLogsModelInput, AdminLogsModelOutput> {
    constructor() {
      super(AdminLogsModel);
    }

    public createLog = async (input: object) => {
        const result = await this.model.create(input);
        return result;
    }
}
