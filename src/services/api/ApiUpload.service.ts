import {Asset} from 'react-native-image-picker';

import axiosInstance from './axiosInstance';

class ApiUploadService {
  async uploadVideo(video: Asset, to: string, from: string) {
    try {
      const formData = new FormData();
      formData.append('file', {
        name: video.fileName,
        type: video.type,
        uri: video.uri,
      });
      formData.append('from', from);
      formData.append('to', to);

      await axiosInstance.post('/upload/video', formData, {
        timeout: 20000,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        transformRequest: () => {
          return formData;
        },
        onUploadProgress: () => {
          console.log('progress....');
        },
        data: formData,
      });
    } catch (err) {
      console.error('Error of uploading video', err);
      throw new Error('Error of uploading video');
    }
  }

  async uploadAudio(path: string, to: string, from: string) {
    try {
      const formData = new FormData();
      formData.append('file', {
        name: 'audio.m4a',
        type: 'audio/m4a',
        uri: path,
      });
      formData.append('from', from);
      formData.append('to', to);

      const response = await axiosInstance.post('/upload/audio', formData, {
        timeout: 20000,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        transformRequest: () => {
          return formData;
        },
        onUploadProgress: () => {
          console.log('progress....');
        },
        data: formData,
      });
      return response.data;
    } catch (err) {
      console.error('Error of uploading audio', err);
      throw new Error('Error of uploading audio');
    }
  }
}

export default ApiUploadService;
