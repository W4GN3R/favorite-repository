import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthenticationService } from "@services/auth.service";

import { environment } from "@environments/environment";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  githubSocial: string = "https://github.com/W4GN3R/favorite-repository";
  githubAuthUri: string = `https://github.com/login/oauth/authorize?client_id=${environment.client_id}&scope=repo:read`;

  ngOnInit() {
    this.route.queryParams.subscribe((param: any) => {
      this.authenticationService.getToken(param["code"]).subscribe(() => {
        this.router.navigate(["/repositories"]);
      });
    });
  }
}
