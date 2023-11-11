import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { SigninComponent } from './signin.component';

describe('SigninComponent', () => {
  let component: SigninComponent;
  let fixture: ComponentFixture<SigninComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['signIn']);
    routerSpy = jasmine.createSpyObj('Router',['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule
      ],
      declarations: [ SigninComponent ],
      providers:[
        { provide: AuthService, useValue:authServiceSpy },
        { provide:Router, useValue: routerSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SigninComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('submitting a log-in form authenticates a user, then redirects user to personal dashboard', () => { 
      const formData = { 
       "username": "email@gmail.com", 
       "password": "password" 
      }; 

      component.loginForm.setValue(formData); 
      component.signIn();    
      expect(authServiceSpy.signIn).toHaveBeenCalled();    
      expect(routerSpy.navigate).toHaveBeenCalledWith(['dashboard']);    
  }) 

});
