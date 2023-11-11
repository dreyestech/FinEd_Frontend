import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  //maybe need to fix for profile/xxx
  constructor(private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap
      .subscribe(params=> {
        console.log(params)
      })
  }

}
