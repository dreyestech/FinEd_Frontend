import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router'; 
import { Amplify, Auth } from 'aws-amplify';
import { environment } from 'src/environments/environment';


export interface IUser { 
  email: string; 
  password: string; 
  showPassword: boolean; 
  code: string; 
  name: string; 
  } 

@Injectable({
  providedIn: 'root'
})

export class AuthService implements CanActivate{ 
//export class AuthService {


  private authSubject = new BehaviorSubject<boolean>(false);
  //public isAuthenticated: Observable<boolean> = this.authSubject.asObservable();

  constructor(private router: Router) { 

    Amplify.configure({ 
    Auth: environment.cognito,
    }); 
  } 

  /*
  constructor() { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    throw new Error('Method not implemented.');
  }
  */

  canActivate(): Observable<boolean>{ 
    return this.isAuthenticated().pipe( 
      map(res => { 
        if(res){ 
         return true 
        }else{ 
         this.router.navigate(['']); 
         return false 
        } 
      }) 
    ) 
  }   

  public signUp(user: IUser): Promise<any> { 
    console.log('signup in AUTHSERV')
    return Auth.signUp({
      username: user.email, 
      password: user.password, 
    }); 
  } 

  public confirmSignUp(user: IUser): Promise<any> { 
    return Auth.confirmSignUp(user.email, user.code); 
  } 

  public signIn(user: IUser): Promise<any> { 
    return Auth.signIn(user.email, user.password) 
    .then(() => { 
      this.authSubject.next(true); 
    }); 
  } 

  public signOut(): Promise<any> { 
    return Auth.signOut()
    .then(() => {
      this.authSubject.next(false); 
    }); 
  } 

  isAuthenticated():Observable<boolean> { 
    Auth.currentUserInfo().then( 
      user => { 
        if(user){ 
          this.authSubject.next(true); 
        }else { 
          this.authSubject.next(false); 
        }
      } 
    ); 
    return this.authSubject.asObservable(); 
  }

  //here
  public getUser(): Promise<any> {
    return Auth.currentUserInfo();
  }

  public getUserEmail(): Promise<string> {
    return this.getUser().then(
      user => user.attributes.email
    );
  }

  public getUserRoles = async () => {
    try{
      const userInfo = await Auth.currentAuthenticatedUser({ bypassCache: true});
  
      if(userInfo){
        return userInfo.signInUserSession.idToken.payload["cognito:groups"];
      }

    }catch(err){
      console.log('error: ', err);
    }

  }

  public updateUser(user: IUser): Promise<any> {
    return Auth.currentUserPoolUser()
    .then((cognitoUser: any) => {
      return Auth.updateUserAttributes(cognitoUser, user);
    });
  }
}

