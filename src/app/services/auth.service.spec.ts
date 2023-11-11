import { ComponentFixture, TestBed, fakeAsync, flush } from '@angular/core/testing';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach((async) => {
    routerSpy = jasmine.createSpyObj('Router',['navigate']);
    TestBed.configureTestingModule({
      providers:[
        {provide:Router, useValue: routerSpy}
      ]
    }).compileComponents();

    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have auth BehaviorSubject that publishes "false" intially',() =>{
    service.isAuthenticated().subscribe(
      res=>expect(res).toBeFalse()
    )
  });

  /*
  //two below test maybe change
  it('should have a signin method that broadcasts true from isAuthenticated and a logOut that broadcasts false',() =>{
    service.signIn();
    service.isAuthenticated.subscribe(
      res=>expect(res).toBeTrue()
    );

  });
  */
  it('should have a signOut method that broadcasts false',fakeAsync(()=>{ 
    service.signOut(); 
    service.isAuthenticated().subscribe( 
      res => expect(res).toBeFalse() 
    ); 
    flush(); 
  })); 

    it(`should have a canActivate method that returns false if user is not logged in and should navigate back to home`,fakeAsync(()=>{ 
    service.signOut();  
    service.canActivate().subscribe(    
      res => {    
      expect(res).toBeFalse();    
      expect(routerSpy.navigate).toHaveBeenCalledWith(['']);  
      } 
    );    
    flush(); 
  })); 
  
});
