import { HttpRequest } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserPost } from '../entities/userPost';
import { PostService } from '../services/post.service';
import { ImageUploadService } from '../services/image-upload.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})

export class CreatePostComponent implements OnInit {

  selectedImageFile! : File ;
  constructor(
    private dialog: MatDialogRef<CreatePostComponent>,
    private postService: PostService,
    private imageUploadService: ImageUploadService
  ) { }

  onPostClick(commentInput: HTMLTextAreaElement){
    let comment = commentInput.value;
    if(comment.length <=0) return;
    if(this.selectedImageFile){
      this.uploadImagePost(comment);
    }else{
      this.uploadPost(comment);
    }
  }
  
  //below should be sent/uploaded image to storage
  uploadImagePost(comment: string){
    console.log("Upload Image");
    //Todo: upload image to S3
    this.imageUploadService.uploadImagePost2(this.selectedImageFile).subscribe(
      res => console.log("image uploaded")
    );
    this.uploadPost(comment);
  }

  uploadPost(comment: string){
    console.log("Upload Post");
    let userPost: UserPost = this.prepareSave(comment);
    this.postService.saveUserPost(userPost).subscribe(
      res => {
        this.dialog.close();
      }
    );
  }

  //changed here
  baseImageURL = "http://diana-reyes-fintellects-s3.s3-website.us-east-2.amazonaws.com/";

  prepareSave(comment: string):UserPost{
    return new UserPost(
      null,
      null,//<---add user email here
      comment,
      String(this.baseImageURL+this.selectedImageFile?.name)
    )
  }

  onPhotoSelected(photoSelector : HTMLInputElement){
    this.selectedImageFile = photoSelector!.files![0];
    if(!this.selectedImageFile) return;
    let fileReader = new FileReader();
    fileReader.readAsDataURL(this.selectedImageFile);
    
    fileReader.addEventListener(
      "loadend",
      ev => {
        let readableString = fileReader!.result!.toString();
        let postPreviewImage = <HTMLImageElement>document.getElementById("post-preview-image");
        postPreviewImage.src = readableString;
      }
    );

  }

  ngOnInit(): void {
  }
}