import {
  async,
  ComponentFixture,
  TestBed,
  inject
} from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";

import { LoginComponent } from "@components/login/login.component";
import { AuthenticationService } from "@services/auth.service";
import { Observable, of } from "rxjs";
import { Router } from "@angular/router";

describe("LoginComponent", () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [AuthenticationService],
      imports: [RouterTestingModule, HttpClientTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", async(
    inject(
      [AuthenticationService],
      (AuthenticationService: AuthenticationService) => {
        expect(component).toBeTruthy();
      }
    )
  ));

  it("should call auth service on init", async(
    inject(
      [AuthenticationService],
      (AuthenticationService: AuthenticationService) => {
        spyOn(AuthenticationService, "getToken").and.returnValue(
          new Observable<any>()
        );

        component.ngOnInit();
        expect(AuthenticationService.getToken).toHaveBeenCalled();
      }
    )
  ));

  it("should redirect to repositories if has token", async(
    inject(
      [Router, AuthenticationService],
      (router: Router, AuthenticationService: AuthenticationService) => {
        spyOn(router, "navigate");
        spyOn(AuthenticationService, "getToken").and.returnValue(
          of({ message: "token" })
        );
        component.ngOnInit();
        expect(router.navigate).toHaveBeenCalled();
      }
    )
  ));
});
