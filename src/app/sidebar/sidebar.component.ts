import { AfterViewInit, Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHome, faCode ,faBars} from '@fortawesome/free-solid-svg-icons';
import { faCodeCompare, faLaptopCode} from '@fortawesome/free-solid-svg-icons';
import { faFileCode } from '@fortawesome/free-regular-svg-icons';
import { EditorModule } from '../editor/editor.module';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports:[FontAwesomeModule, RouterLink, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements AfterViewInit{
  faCode = faCode;
  faFileCode=faFileCode;
  faBars=faBars
  disabled:boolean=false
  routesArray=[
    {routes:"/menu", active:false, icon:faBars},
    {routes:"/home", active:false, icon:faCode},
    {routes:"/codeHistory", active:false, icon:faFileCode},
    {routes:["/trendingCode","/savedCode"], active:false, icon:faLaptopCode, disabled:true, hidden:true},
  ]

  constructor(private router:Router){

  }

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
}
