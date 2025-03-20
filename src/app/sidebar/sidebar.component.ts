import { AfterViewInit, Component, inject, OnInit, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHome, faCode ,faBars} from '@fortawesome/free-solid-svg-icons';
import { faCodeCompare, faLaptopCode,faUserAltSlash, faUserCheck, faUser} from '@fortawesome/free-solid-svg-icons';
import { faFileCode } from '@fortawesome/free-regular-svg-icons';
import { EditorModule } from '../editor/editor.module';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { SignupComponent } from '../editor/signup/signup.component';
import { GoogleAuthService } from '../google-auth.service';
// import { GoogleLoginProvider, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports:[FontAwesomeModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements AfterViewInit, OnInit{
  faCode = faCode;
  faFileCode=faFileCode;
  faBars=faBars
  faUserAltSlash = faUserAltSlash
  faUserCheck =faUserCheck
  faUser = faUser
  disabled:boolean=false
  readonly dialog = inject(MatDialog);
  routesArray=[
    {routes:"/home", active:false, icon:faCode},
    {routes:"/codeHistory", active:false, icon:faFileCode},
    {routes:["/trendingCode","/savedCode"], active:false, icon:faLaptopCode, disabled:true, hidden:true},
  ]

  isLoggedIn= false

  userData = signal({})

  constructor(private router:Router, private auth:GoogleAuthService){
    this.auth.currentUser.subscribe((user:any)=>{
      console.log("User in get current user:", user);
      if (user && user.user_metadata) {
        console.log(user.user_metadata, "User metadata");
        this.isLoggedIn = true;
      } else {
        console.log("User is null or does not have metadata");
        this.isLoggedIn = false;
      }
    })
  }

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    this.router.events.subscribe((event:any)=>{
      if(event instanceof NavigationEnd){
        this.routesArray.forEach(e=>{
          if(e.routes.indexOf("/"+event.url.split("/")[1]) !==-1 && e.routes.includes("/"+event.url.split("/")[1]) && event.url.split("/")[1]!=="" || event.urlAfterRedirects==e.routes){
            e.active=true
          }
          else e.active=false
        })
      }
    })
  }

  routerLinkcliked(i:any){
    this.router.navigate([this.routesArray[i].routes])
  }

  openDialoBox(){
    // console.log(this.userData())
    console.log(this.isLoggedIn,"opedialog box callins")
    const dialogRef = this.dialog.open(SignupComponent, {
      width:"350px",
      height:'auto',
      // height:'450px',
      data: {"isLoggedIn":this.isLoggedIn},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        console.log(result)
      }
    });
  }

}
