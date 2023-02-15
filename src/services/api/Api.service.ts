import ApiUploadService from './ApiUpload.service';

class ApiService {
  apiUploadService: ApiUploadService;

  constructor() {
    this.apiUploadService = new ApiUploadService();
  }
}

export default new ApiService();
