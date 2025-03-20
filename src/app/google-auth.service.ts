import { Injectable } from '@angular/core';
import { SupabaseClient, User, createClient } from '@supabase/supabase-js';
import { environment } from '../environments/environment.development';
import { BehaviorSubject, Subject } from 'rxjs';
import { Router } from '@angular/router';
// import { SocialAuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {

  private supabase! : SupabaseClient
  user = new BehaviorSubject<User | null >(null)

  constructor(private router :Router) {
    this.supabase = createClient(environment.supabase.url, environment.supabase.key)

    this.supabase.auth.onAuthStateChange((event, session)=>{
      console.log(event,"event");
      console.log(session,"session");

      if (event == 'SIGNED_IN' || event == 'TOKEN_REFRESHED' || (event== "INITIAL_SESSION" && session!["access_token"])){
        this.user.next(session!.user)
        this.router.navigate(["/home"])
      }
      else{
        this.user.next(null)
      }
    })
   }

   async singInWithGithub(){
    await this.supabase.auth.signInWithOAuth({
      'provider':'github'
    })
   }

   async sinUpwithoogle(){
    await this.supabase.auth.signInWithOAuth({
      'provider':'google',
      options: {
        redirectTo: "http://localhost:4200/home",
      },
    
    })
   }

   async signOut(){
    // const resposne =await this.supabase.auth.signOut()

    await this.supabase.auth.signOut();
    this.user.next(null); // Explicitly emit null

    // if(!resposne){

    //   this.user.next(null)
    // }
    // console.log(resposne)
   }

   get currentUser(){
    return  this.user.asObservable()
   }

  // signInWithGoogle(): Promise<SocialUser> {
  //   return this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  // }

  // signOut(): Promise<void> {
  //   return this.authService.signOut();
  // }
}
