import { Component, Input, OnInit } from '@angular/core';
import { PostData } from 'src/app/post-feed/post-feed.component'
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() postData?: PostData; //something like this here & above


  constructor() { }

  ngOnInit(): void {
  }
}
