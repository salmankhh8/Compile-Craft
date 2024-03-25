import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeComponent } from './code/code.component';
// import { EditorComponent, MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditorComponent } from './editor.component';
import { ResultComponent } from './result/result.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MonacoEditorModule, NgxMonacoEditorConfig } from 'ngx-monaco-editor-v2';
import { CompilerService } from '../compiler.service';
import { HttpClientModule } from '@angular/common/http';
import { MonacoCodeComponent } from './code/monaco-code/monaco-code.component';
import { MatSelectModule } from '@angular/material/select';
import { MessageComponent } from '../message/message.component';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { CommonPopupComponent } from '../common-popup/common-popup.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';

// import {MonacoEditorModule, NgxMonacoEditorConfig} from 'ngx-monaco-editor'

const monacoConfig: NgxMonacoEditorConfig = {
  baseUrl: '', // configure base path for monaco editor. Starting with version 8.0.0 it defaults to './assets'. Previous releases default to '/assets'
  defaultOptions: { scrollBeyondLastLine: false }, // pass default options to be used
  onMonacoLoad: () => { console.log((<any>window).monaco); }, // here monaco object will be available as window.monaco use this function to extend monaco editor functionalities.
  requireConfig: { preferScriptTags: true }, // allows to oweride configuration passed to monacos loader
  monacoRequire: (<any>window).monacoRequire // pass here monacos require function if you loaded monacos loader (loader.js) yourself 
};



@NgModule({
    
    declarations: [CodeComponent, ResultComponent, MonacoCodeComponent, MessageComponent, CommonPopupComponent ],
  imports: [
    FormsModule,
    FontAwesomeModule,
    CommonModule,
    MonacoEditorModule.forRoot(monacoConfig),
    HttpClientModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule
    // MonacoEditorModule.forRoot(monacoConfig)
  ],
  providers:[CompilerService],
    exports:[CodeComponent,ResultComponent, CommonModule, FontAwesomeModule,FormsModule, MatSelectModule, MatDialogModule,MatSnackBarModule]
})
export class EditorModule { }
