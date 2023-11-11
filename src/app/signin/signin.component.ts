import { Component, OnInit } from '@angular/core'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { Router } from '@angular/router'; 
import { IUser, AuthService } from '../services/auth.service';



@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})

export class SigninComponent implements OnInit {
  user: IUser; 
  loading: boolean; 
  
  loginError: boolean = false; 
  loginErrorMessage: string = ""; 
  loginForm: FormGroup = this.fb.group({ 
  username: ['', Validators.required], 
  password: ['', Validators.required], 
  });  
  //add validators above??

  hide:boolean=true; 

  get username():string{return this.loginForm.get('username')?.value} 
  get password():string{return this.loginForm.get('password')?.value} 

  constructor( 
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder) {
      this.loading = false;
      this.user = {} as IUser;
  } 

  signIn(): void { 
    this.loading = true; 
    this.user.email = this.username; 
    this.user.password = this.password; 

    this.authService.signIn(this.user).then(
      () =>this.router.navigate(['post-feed'])
    ).catch( error =>{
      this.loading = false;
      this.loginError = true;
      this.loginErrorMessage = error.toString()
    });

  } 

  ngOnInit(): void { 
  } 

}

