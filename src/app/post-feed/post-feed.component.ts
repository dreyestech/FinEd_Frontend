import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {CreatePostComponent} from '../create-post/create-post.component'
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-post-feed',
  templateUrl: './post-feed.component.html',
  styleUrls: ['./post-feed.component.css']
})
export class PostFeedComponent implements OnInit {

  //posts : PostData [] = [];
  @Input("likesCount")
  likesCount:number=0;
  @Input("isActive")
  isActive:boolean=false;
  onClick(){
    this.likesCount += (this.isActive)?-1:1;
    this.isActive = !this.isActive;
  }
  baseImageURL = environment.baseURL;
  posts : any = [] 
  constructor(private dialog: MatDialog, private httpClient:HttpClient) { }
  //TODO get image
  getData(){
    const url =environment.baseURL+'/posts/api/all'
    this.httpClient.get(url).subscribe((res)=>{
      this.posts = res;
      console.log(this.posts);
    })
  }

  ngOnInit(): void {
    this.getData();
  }


  
  

  onClickPostClick(){
    this.dialog.open(CreatePostComponent);
  }
}
//interface for postData here
export interface PostData{
  comment:string;
  creator:string;
  imageUrl?:string;
}