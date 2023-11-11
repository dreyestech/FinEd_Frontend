import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {


  baseURL: string = environment.baseURL; 

  constructor(private http: HttpClient) { }

  uploadImagePost2(file: File){
    const data:FormData = new FormData();
    console.log("Upload Image Post 2");
    data.append("file", file);
    const imagePostRequest = new HttpRequest('POST', this.baseURL+'/uploadFile', data,{
      reportProgress: true,
      responseType: 'text'
    });
    //Todo: upload image to S3
    return this.http.request(imagePostRequest);
    //this.uploadPost(comment);
  }
}
