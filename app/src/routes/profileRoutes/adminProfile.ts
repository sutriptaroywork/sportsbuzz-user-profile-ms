import { Router } from 'express';

import Routes from '../index';

import AdminProfileController from '@/src/controllers/adminProfile';
import CommonController from '@/src/controllers/common';
import { RequestParamValidator } from '@/middlewares/validation.middleware';
import { AdminDto, AdminProfile, AdminRecommendationDto, CitieListDto, UpdateProfileDto } from '@/src/dtos/adminProfile/adminRequest';
import { PreSignedURLDto, StateListDto } from '@/src/dtos/common/commonRequest';

export default class adminProfileRoutes implements Routes {
  public path: string;
  public router: Router;
  private adminProfileController: AdminProfileController;
  private commonController: CommonController;

  constructor() {
    this.path = '/admin';
    this.router = Router();
    this.adminProfileController = new AdminProfileController();
    this.commonController = new CommonController();
    this.initializeRoutes();
  }

  private initializeRoutes = (): void => {
    
    this.router.get(`${this.path}/profile/v2`, RequestParamValidator(AdminDto, 'headers'), RequestParamValidator(AdminProfile, 'query'), this.adminProfileController.getProfileDetailsV2);
    this.router.get(`${this.path}/profile/counts/v1`, RequestParamValidator(AdminDto, 'headers'), RequestParamValidator(AdminProfile, 'query'), this.adminProfileController.getAdminCount);
    this.router.get(`${this.path}/user/recommendation/v1`, RequestParamValidator(AdminRecommendationDto, 'query'), this.adminProfileController.getUserRecommendation);
    this.router.get(`${this.path}/states/v1`, RequestParamValidator(StateListDto, 'query'), this.commonController.getStatesList);
    this.router.get(`${this.path}/city/v1`, RequestParamValidator(CitieListDto, 'query'), this.adminProfileController.getCitiesList);
    this.router.get(`${this.path}/profile/:id/v1`, RequestParamValidator(AdminDto, 'headers'), this.adminProfileController.getAdminDetailsById);
    this.router.get(`${this.path}/referred-list/:id/v1`, RequestParamValidator(AdminDto, 'headers'), this.adminProfileController.referredByUserList);

    this.router.post(`${this.path}/profile/pre-signed-url/v1`, RequestParamValidator(AdminDto, 'headers'), RequestParamValidator(PreSignedURLDto, 'body'), this.commonController.getSignedUrl)

    this.router.put(`${this.path}/profile/:id/v1`, RequestParamValidator(AdminDto, 'headers'), RequestParamValidator(UpdateProfileDto, 'body'), this.adminProfileController.updateProfile)
  };
}
