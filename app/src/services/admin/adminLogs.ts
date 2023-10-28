import AdminLogsDao from '@/src/daos/admin/adminLogs';

export default class AdminLogsService {
    private adminLogsDao: AdminLogsDao;
  
    constructor() {
      this.adminLogsDao = new AdminLogsDao();
    }

    public createLog = async (input: object) => {
      const result = await this.adminLogsDao.createLog(input);
      return result;
    }
}
