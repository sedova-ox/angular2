import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {RoleshelperService} from '../roleshelper.service';
import {USERS_ROLES} from '../mock-users-roles';

export class User {
  constructor(
    public login: any,
    public password: any,
    public roles: string[]) { }
}
@Injectable()
export class AuthenticationService {

  constructor(
    private _router: Router,
    private rolesHelperServise: RoleshelperService
  ) {}

  logout() {
    localStorage.removeItem('user');
    this._router.navigate(['login']);
  }
  login(user) {
    const authenticatedUser = USERS_ROLES.find(u => u.login === user.login);
    if (authenticatedUser && authenticatedUser.password === user.password) {
       localStorage.setItem('user', JSON.stringify(authenticatedUser));
      this.rolesHelperServise.setUserRoles(authenticatedUser.roles);
      this._router.navigate(['home']);
      return true;
    }
    return false;

  }

  checkCredentials() {
    if (localStorage.getItem('user') === null) {
      this._router.navigate(['login']);
    }
  }
}
