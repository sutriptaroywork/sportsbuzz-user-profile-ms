import CitiesDao from '@/src/daos/statistics/cities';
import { CitiesModelOutputSelected } from '@/models/statistics/cities';

export default class CitiesService {
  private citiesDao: CitiesDao;

  constructor() {
    this.citiesDao = new CitiesDao();
  }

  public getCitiesListByState = async (filter: object, outputFields: object): Promise<CitiesModelOutputSelected> => {
    const result: CitiesModelOutputSelected = await this.citiesDao.getCitiesListByState(filter, outputFields);
    return result;
  }

  public getCitiesListByStateForAdmin = async (nStateId: number, start: number, limit: number) => {
    const result = await this.citiesDao.getCitiesListByStateForAdmin(nStateId, start, limit);
    return result;
  }
}
