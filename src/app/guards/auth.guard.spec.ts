import { TestBed, inject } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { Router } from "@angular/router";

import { AuthGuard } from "@guards/auth.guard";
import { AuthenticationService } from "@services/auth.service";

describe("AuthGuard", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuard],
      imports: [RouterTestingModule, HttpClientTestingModule]
    });
  });

  it("should use to auth redirect", inject(
    [AuthGuard, AuthenticationService],
    (guard: AuthGuard, auth: AuthenticationService) => {
      spyOnProperty(auth, "currentTokenValue").and.returnValue({
        access_token: "abc"
      });
      expect(guard.canActivate(null, null)).toEqual(true);
    }
  ));

  it("should redirect an unauthorized user to login", inject(
    [AuthGuard, Router, AuthenticationService],
    (guard: AuthGuard, router: Router, auth: AuthenticationService) => {
      spyOnProperty(auth, "currentTokenValue").and.returnValue(null);
      expect(guard).toBeTruthy();
      spyOn(router, "navigate");
      expect(guard.canActivate(null, null)).toEqual(false);
      expect(router.navigate).toHaveBeenCalledWith(["/login"]);
    }
  ));
});
