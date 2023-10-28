import { Router } from 'express';

import Routes from '../index';

import authMiddleware from '@/middlewares/auth.middleware';
import userLanguageMiddleware from '@/middlewares/userLanguage.middleware';

import UserProfileController from '@/src/controllers/userProfile';
import CommonController from '@/src/controllers/common';
import { CitieListDto, UpdateProfileDto, UserDto } from '@/src/dtos/userProfile/userRequest';
import { PreSignedURLDto, StateListDto } from '@/src/dtos/common/commonRequest';
import { RequestParamValidator } from '@/middlewares/validation.middleware';

export default class userProfileRoutes implements Routes {
  public path: string;
  public router: Router;
  private userProfileController: UserProfileController;
  private commonController: CommonController;

  constructor() {
    this.path = '/user';
    this.router = Router();
    this.userProfileController = new UserProfileController();
    this.commonController = new CommonController();
    this.initializeRoutes();
  }

  private initializeRoutes = (): void => {
    this.router.get(`${this.path}/profile/v2`, RequestParamValidator(UserDto, 'headers'), this.userProfileController.getProfileDetailsV2);
    this.router.get(`${this.path}/profile-statistics/v1`, RequestParamValidator(UserDto, 'headers'), this.userProfileController.getStatistic);
    this.router.get(`${this.path}/profile/states/v1`, RequestParamValidator(StateListDto, 'query'), this.commonController.getStatesList);
    this.router.get(`${this.path}/profile/cities/v1`, RequestParamValidator(CitieListDto, 'query'), this.userProfileController.getCitiesList);

    this.router.post(`${this.path}/profile/pre-signed-url/v1`, RequestParamValidator(UserDto, 'headers'), RequestParamValidator(PreSignedURLDto, 'body'), this.commonController.getSignedUrl);

    this.router.put(`${this.path}/profile/v1`, RequestParamValidator(UpdateProfileDto, 'body'), RequestParamValidator(UserDto, 'headers'), this.userProfileController.updateProfile);
  };
}
