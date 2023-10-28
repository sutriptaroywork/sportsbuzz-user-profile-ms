import UserModel from '@/models/userProfile/userProfile';

export default class CommonDao {
    model: any

    constructor() {
        this.model = UserModel
    }

    public removeUnnecessaryFields = (user) => {
        this.model.filterData(user)
    }
}
