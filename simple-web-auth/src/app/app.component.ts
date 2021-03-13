import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import * as MicrosoftGraph from "@microsoft/microsoft-graph-types";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styles: []
})
export class AppComponent implements OnInit {
loggedIn = false;
profile?: MicrosoftGraph.User;
users?: MicrosoftGraph.User[];
userNameFilter = '';
pokemons?: string[];
friends?: MicrosoftGraph.User[];

  constructor(private authService: MsalService, private client:HttpClient){ }

  ngOnInit(){
    this.checkAccount();
  }


  private checkAccount(){
    this.loggedIn = this.authService.instance.getAllAccounts().length > 0;
  }

  login(){
    this.authService.loginPopup()
      .subscribe(response =>{
        this.authService.instance.setActiveAccount(response.account);
        this.checkAccount();
      })
  }

  logout(){
    this.authService.logout();
  }

  getProfile(){
    this.client.get('https://graph.microsoft.com/v1.0/me/')
      .subscribe(profile => this.profile = profile)
  }

  getPokemons(){
    this.client.get<any>('https://localhost:5001/api/pokemon')
      .subscribe(pokemons => this.pokemons = pokemons)
  }

  getUsers() {
    let params = new HttpParams().set("$top", "100");
    if (this.userNameFilter) {
      params = params.set(
        "$filter",
        `startsWith(displayName, '${this.userNameFilter}')`
      );
    }
    let url = `https://graph.microsoft.com/v1.0/users?${params.toString()}`;
    this.client
      .get<any>(url)
      .subscribe((users) => (this.users = users.value));
  }

  addToFriends(user: MicrosoftGraph.User){
    this.friends?.push(user);
  }

  removeFromFriends(user: MicrosoftGraph.User){
    this.friends!.splice(this.friends?.indexOf(user)!,1);
  }

  isFriend(user: MicrosoftGraph.User): boolean{
    if(this.friends?.includes(user))
      return true;
    else
      return false;
  }


}
