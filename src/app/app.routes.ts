import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CodeHistoryComponent } from './code-history/code-history.component';
import { EditorComponent } from './editor/editor.component';

// export const routes: Routes = [];
export const routes: Routes = [
    {path:"",pathMatch:'full', redirectTo:"home"},
    {path:"home",component: EditorComponent},
    {path:"codeHistory",component: CodeHistoryComponent},
    {path:"trendingCode/:id", component:EditorComponent},
    {path:"savedCode/:id", component:EditorComponent}
  ];
  
