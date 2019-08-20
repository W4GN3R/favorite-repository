import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { AuthenticationService } from "@services/auth.service";
import { ApiRepositoryService } from '@services/api-repository.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  repository: Array<any>;

  constructor(
    private ApiRepositoryService: ApiRepositoryService,
    private router: Router,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.list();
  }

  async list() {
    let token = JSON.parse(localStorage.getItem("currentToken"));
    await this.ApiRepositoryService.list(token.access_token).subscribe(res => this.repository =
      res.map( repo => ({
        isFavorite: false,
        name: repo.name,
        html_url: repo.html_url
      }))
    );
  }

  public handleFavorite(repos) {
    return repos.isFavorite = !repos.isFavorite;
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(["/login"]);
  }

}
