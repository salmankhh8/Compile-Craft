import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input, OnChanges, OnDestroy, OnInit, Output, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EditorModule } from '../editor.module';
import { CodeEditorModule, CodeModel } from '@ngstack/code-editor';
// import { EditorComponent, NGX_MONACO_EDITOR_CONFIG } from 'ngx-monaco-editor-v2';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { MonacoEditorModule,EditorComponent} from 'ngx-monaco-editor-v2';
// import { MonacoEditorModule, NgxMonacoEditorConfig } from 'ngx-monaco-editor-v2';



@Component({
  selector: 'app-code',
  standalone: false,
  templateUrl: './code.component.html',
  styleUrl: './code.component.scss'
})
export class CodeComponent implements AfterViewInit , OnChanges, OnInit, OnDestroy {
  // editorOptions = {theme: 'vs-dark', language: 'javascript'};
  // code: string= 'function x() {\nconsole.log("Hello world!");\n}';
  @Output() emitterCode =new EventEmitter()

  @ViewChild('monacoEdiror', { static: false }) monacoEditor!:EditorComponent
  @ViewChild('editorTemplate', { static: true }) editorTemplate!:ElementRef
  // monacoEdiror=null
  @Input() width:any

  @Input() code: any=""
  @Input() resizeEditor:any 
  @Input() language:any
  @Input() errorField:any
  @Output() emitterClose= new EventEmitter()
  resizeEditorAfter:boolean= true
   onResizing=false
   showEditor=false
   startTime = Date.now()
   endTime = Date.now()
  constructor(private renderer:Renderer2) {
    console.log(window.innerWidth, window.innerHeight);
   }

  // theme = 'vs-dark';

  codeModel: CodeModel = {
    language: 'json',
    uri: 'main.json',
    value: '{}'
  };

  options = {
    contextmenu: true,
    minimap: {
      enabled: true
    }
  };

  editorOptions = {
    contextmenu: true,
    theme: 'vs-dark',
    language: 'javascript',
    minimap: {
      enabled: false
    }
  };
  // code: string = "console.log(test())";
  // code: string = ""
  model: any;
  ediorMonaco:any 

  ngOnInit(): void {
    console.log(this.code);
    this.code.toString()
    this.startTime = Date.now();
    setTimeout(()=>{
      this.emitterCode.emit(this.code)
      // this.monacoEditor.writeValue(this.width)
    },0)
  }

  closeDialogBox(field:any){
    this.emitterClose.emit(field)
  }

  formate(){
    // this.monacoEditor.getEditor().trigger('anyString', 'editor.action.formatDocument');
    // this.monacoEditor.propagateChange((ele:any)=>{
    //   console.log(ele);
    // })
    // this.monacoEditor._editor._actions
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(!this.code){
      this.code =``;
    }
    if(this.resizeEditor){
      this.onResizing=true
    // this.editorOptions.language=this.language
    }
    else if(this.onResizing){
      this.resizeEditorFunc()
    }
    else if(changes['language']?.currentValue){
      this.resizeEditorFunc()
      this.editorOptions.language=changes['language'].currentValue
    }
    // console.log(this.resizeEditorAfter, this.errorField);
  }

  ngOnDestroy(): void {
    this.endTime =Date.now()

    console.log((this.endTime- this.startTime)/1000,"seconds spend by user")
  }

  ngAfterViewInit(): void {
  }

  resizeEditorFunc(){
   this.resizeEditorAfter=false
    setTimeout(()=>{
      this.onResizing=false
      this.resizeEditorAfter=true
    },10)
  }

  onCodeChanged(value: any) {
    // let res = \ify(value)
    // res= JSON.parse(res)
    this.emitterCode.emit(value)
  }

}

