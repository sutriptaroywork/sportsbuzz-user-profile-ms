import AdminProfileDao from '@/src/daos/admin/adminProfile';

export default class AdminProfileService {
    private adminProfileDao: AdminProfileDao;
  
    constructor() {
      this.adminProfileDao = new AdminProfileDao();
    }

    public findUserListWithSorting = async (filter: object, output: object, sorting: object) => {
      const result = await this.adminProfileDao.findUserListWithSorting(filter, output, sorting);
      return result;
    }

    public findUserListWithSortingSkippingLimiting = async (filter: object, output: object, sorting: object, skiping: string | number, limiting: string | number) => {
      const result = await this.adminProfileDao.findUserListWithSortingSkippingLimiting(filter, output, sorting, skiping, limiting);
      return result;
    }

    public countAdminUser = async (filter: object) => {
      const result = await this.adminProfileDao.countAdminUser(filter);
      return result;
    }

    public findOneByQuery = async (filter: object) => {
      const result = await this.adminProfileDao.findOneByQuery(filter);
      return result;
    }

    public findOneWithSelectedFields = async (filter: object, output: object) => {
      const result = await this.adminProfileDao.findOneWithSelectedFields(filter, output);
      return result;
    }

    public findOneAndUpdateNoUpsert = async (filter: any, data: any) => {
      const result = await this.adminProfileDao.findOneAndUpdateNoUpsert(filter, data);
      return result;
    }
}
