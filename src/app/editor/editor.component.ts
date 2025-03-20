import { AfterViewInit, Component, ElementRef, inject, Injectable, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { CodeComponent } from './code/code.component';
import { ResultComponent } from './result/result.component';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAngleDown, faTerminal, faCode } from '@fortawesome/free-solid-svg-icons';
import { faJs } from '@fortawesome/free-brands-svg-icons';
import { faFileCode } from '@fortawesome/free-regular-svg-icons'
import { EditorModule } from './editor.module';
import { CompilerService } from '../compiler.service';
import e from 'express';
import { NavigationEnd, Router } from '@angular/router';
import { CodeHistoryService } from '../service/code-history.service';
import { trendQuestionModel } from '../models/codeHisstory.model';
import { MAT_SELECT_CONFIG, MatSelectModule } from '@angular/material/select';
import { MatDialog } from '@angular/material/dialog';
import { CommonPopupComponent } from '../common-popup/common-popup.component';
import { MatSnackBar } from '@angular/material/snack-bar';
// import { js_beautify } from 'js-beautify';
import { JSBeautifyOptions, js_beautify } from 'js-beautify'
import { IdleService } from './idle.service';
import { debounceTime, Subject, Subscription } from 'rxjs';
import { loadPyodide, PyodideInterface } from 'pyodide';

// import { LanguageIcons } from '../code-history/code-history.component';


export interface LanguageData {
  icon: string,
  color: string
}

export interface LanguageIcons {
  [key: string]: LanguageData
  // This specifies that the keys are strings and the values are strings (icon filenames)
}
export interface FormData {
  id: string,
  question: string,
  description: string,
  language: string,
  code: string,
}
@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [EditorModule, FontAwesomeModule, MatSelectModule],
  providers: [
    {
      provide: MAT_SELECT_CONFIG,
      useValue: { overlayPanelClass: 'select-overlay-pane' }
    }
  ],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss'
})

@Injectable({
  providedIn: 'root'
})


export class EditorComponent implements AfterViewInit, OnInit, OnDestroy {

  idleService = inject(IdleService)
  constructor(private compileService: CompilerService, private fb: FormBuilder, private router: Router, private codeHistory: CodeHistoryService, private dialog: MatDialog, private _snackBar: MatSnackBar) {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        console.log(event);
        if (event.urlAfterRedirects.split("/")[1] == "trendingCode") {
          this.codeRequestedId = event.urlAfterRedirects.split("/")[2]
          if (this.codeRequestedId) {
            this.callQuestionDeatiails(this.codeRequestedId)
          }
        }
        else if (event.urlAfterRedirects.split("/")[1] == "savedCode") {
          this.codeRequestedId = event.urlAfterRedirects.split("/")[2]
          if (this.codeRequestedId) {
            this.callDummySavedData(this.codeRequestedId)
          }
        }

        else if (event.urlAfterRedirects.split("/")[1] == "home" && localStorage.getItem("codeData")) {
          this.mapFormValues(localStorage.getItem("codeData"))
        }
        else {
          this.languageIcons[0].active = true
          this.selectedValue = this.languageIcons[0]
          this.formData.language = this.languageIcons[0].language
        }
      }

    })

  }
  faDropDown = faAngleDown
  faTerminal = faTerminal
  fajs = faJs
  faCode = faCode
  faFileCode = faFileCode
  leftPaneWidth: any
  rightPaneWidth: any
  compileCode: any
  resizeEditor: boolean = false
  mouseClicked: boolean = false
  compiledResult: any
  form: FormGroup | undefined
  codeRequestedId: any
  showLanguagesOptions: boolean = false
  languageIcons = [
    {
      language: "javascript",
      icon: "fa-brands fa-js",
      color: "#EFD81D",
      active: false

    },
    {
      language: "java",
      icon: "fa-brands fa-java",
      color: "#FFA500",
      active: false
    },
    {
      language: "python",
      icon: "fa-brands fa-python",
      color: "#3776AB",
      active: false

    }
  ]
  selectedValue: any

  formData: FormData = {
    id: "",
    question: "",
    description: "",
    language: "",
    code: "",
  }
  currentTime : string = ""
  totalDuration: string= ""
  startTime: string = ""

  errorArray: { [key: string]: any } = {}
  private idleSubscription?: Subscription;
  private timeInterval: any;

  @ViewChild('editorParent') editorWidth!: ElementRef
  @ViewChild('saperatorBtn') saperatorBtn!: ElementRef


  ngAfterViewInit(): void {
    // this.leftPaneWidth =this.editorWidth.nativeElement.clientWidth *.54 //585
    // this.rightPaneWidth =this.editorWidth.nativeElement.clientWidth *.45 //585
  }

  ngOnInit(): void {

    // this.idleSubscription = this.idleService.idleState.subscribe((isIdle)=>{
    //   if(isIdle){
    //     console.log("user is inactive")
    //   }
    //   else{
    //     console.log("user is active")
    //     this.idleService.sendRequest()
    //     // this.idleService.stopEmmision()
    //   }
    // })
    // this.form = this.fb.group({
      // window.addEventListener("load", detectZoom());
      // this.detectZoom()/
      // this.adjustToOptimalResolution()
    //   title:['',Validators.required],
    //   question:['', Validators.required],
    //   code:['', Validators.required],
    //   result:['', Validators.required],
    //   language:['',Validators.required],
    //   id:['',Validators.required]
    // })
  }

  // detectZoom() {
  //   const zoomLevel = Math.round(window.devicePixelRatio * 100);
  //   console.log(window,"zoom lever")
  //   if (zoomLevel !== 100) {
  //     alert(`Your browser zoom is set to ${zoomLevel}%. Please reset it to 100% for the best experience.`);
  //   }
  // }
  // Call the function to log values

  callQuestionDeatiails(id: string) {
    this.codeHistory.getDummyTrendingQuestion().subscribe((res: any) => {
      if (res.data && id) {
        this.findDataWithId(res.data, id)
      }
    })
  }
  callDummySavedData(id: string) {
    this.codeHistory.getDummyDataCode().subscribe((res: any) => {
      if (res && id) {
        this.findDataWithId(res, id)
      }
    })
  }

  findDataWithId(res: any, id: any) {
    let data = res.find((obj: any) => obj.id == id)
    if (data) {
      if (!data.code) {
        data.code = `//${data.question}`
      }
      this.mapFormValues(data)
    }
  }
  deleteCode() {
    const dialogRef = this.dialog.open(CommonPopupComponent, {
      width: '400px',
      height: '120px',
      data: {
        title: "Delete Will result in lost of Changes without save",
        actionButton: [
          {
            "text": "Cancel",
            "icon": "fa-xmark",
            "action": "cancel",
            "style": "style1"
          },
          {
            "text": "Save and Clear",
            "icon": "fa-floppy-disk",
            "action": "save",
            "style": "style2"
          },
          {
            "text": "Delete",
            "icon": "fa-trash",
            "action": "Delete",
            "style": "style3"
          },
        ]
      }
    });

    dialogRef.afterClosed().subscribe(action => {
      // console.log('The dialog was closed', action);
      if (action == 'save') {
        this.saveCode('saveDelete')
      }
      // else if(action=='cancel'){
      // }
      else if (action = 'delete') {
        this.clearFormData()
      }
    });
  }

  clearFormData(action?: any) {
    const emptyData: FormData = Object.keys(this.formData).reduce((acc, curr) => ({ ...acc, [curr]: "" }), {} as FormData)
    this.formData = emptyData
    localStorage.removeItem('codeData')
  }

  mapIconswithLanguage(language: any) {
    return this.languageIcons.find((item: any) => {
      if (item.language == language) {
        return item.active = true
      }
      else return false
    })
  }

  mapFormValues(data: any) {
    // this.formData[0].code=""
    this.formData.code = ""
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (error) {
        console.error("Error parsing JSON data:", error);
        return;
      }
    }
    if (data.language == "") {
      data.language = this.languageIcons[0].language
    }
    this.formData = Object.assign({}, data);
    this.selectedValue = this.mapIconswithLanguage(data.language)
    // this.formData.forEach(ele => {

    // });
  }

  codeChanged(event: any) {
    // console.log(event, "inside parnet code");
    this.compileCode = event
    // this.form?.get("code")?.patchValue(event)
    this.formData.code = event
  }

  questionUpdated($event: any) {
    // this.form?.get('question')?.patchValue($event)
    this.formData.description = $event
  }

  titleUpdatedFn($event: any) {
    this.formData.question = $event
  }

  saveCode(action?: string) {
    console.log("save all the results", this.formData);


    if (!this.formData.id) {
      this.formData.id = (Date.now().toString(36) + Math.random().toString(36).substring(2, 5));
    }
    const fieldValue = this.checkFormField()

    if (fieldValue.length > 0) {
      console.log(fieldValue);
      fieldValue.forEach(field => {
        this.erroFunc(field)
        return
      })
    }
    else {
      let savedCompleted = this.codeHistory.saveCodeHistory(this.formData)
      this.openSnackBar("Saved Successfully", "Hide")
      if (savedCompleted && action) this.clearFormData(action)
    }
  }

  checkFormField() {
    const emptyFields: string[] = Object.keys(this.formData)
      .filter(key => !(this.formData as any)[key].trim())
      .map(key => key);

    return emptyFields
  }

  erroFunc(field: any) {
    let errorbj = {
      field,
      error: `${field} can't be empty !`,
    }
    this.errorArray[field] = errorbj.error
  }

  closeDialogBox(field: any) {
    console.log(field);
    // this.errorArray['filter']((item:any, index:any)=>console.log(item, "inside close box function"))
    delete this.errorArray[field]
  }

  callExecuteCode() {
    let regexedCode = this.matchRegexexpr(this.compileCode)
    this.compileService.executeCodeAPI(regexedCode, this.formData.language).subscribe((res: any) => {
      console.log(res);
      this.compiledResult = res
      this.form?.get('result')?.patchValue(res.result)
    })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { panelClass: 'codeSnackBar' });
  }

  ngOnDestroy(): void {
    console.log("on desstroy called");
    // if(this.checkFormField()){
    //   localStorage.setItem("codeData", JSON.stringify(this.formData, null, 2))
    // }
  
    if(this.idleSubscription){
      this.idleSubscription.unsubscribe()
    }


    localStorage.setItem("codeData", JSON.stringify(this.formData, null, 2))

    if (this.timeInterval) {
      clearInterval(this.timeInterval);
    }

    // Disconnect from WebSocket when the component is destroyed
  }

  onUserAction(){
    // this.idleService.resetTimer()
    this.idleService.reset()
  }

  dropDownClicked(event: any) {
    // this.showLanguagesOptions =!this.showLanguagesOptions
    // this.selectedValue.active=true
    // this.languageIcons[event.language].active=true
    this.languageIcons.forEach(item => {
      if (item.language == event.language) {
        item.active = true
      }
      else item.active = false
    })
    this.formData.language = event.language
    this.selectedValue = event
  }

  // async loadPyodide() {
  //   if (!this.pyodide) {
  //     this.pyodide = await loadPyodide();
  //     await this.pyodide.loadPackage('autopep8');
  //   }
  // }


  formateCode() {
    // console.log(this.formData.language)
    const options:JSBeautifyOptions = { // optional 
      indent_size: 2,
      indent_with_tabs: false,
      end_with_newline: true,
      space_in_paren: false,
      preserve_newlines: true,
      wrap_line_length: 80,
      brace_style: 'collapse',
    };
       let code = js_beautify(this.formData.code, options)
      this.formData.code = code
  }

  trendingCodeApi() {
    this.codeHistory.getDummyTrendingQuestion().subscribe((data: any) => { })
  }

  matchRegexexpr(input: string) {
    const jsCodeString = "function test(){\n\n};\nconsole.log(test());";
    let testStr = "console.log('testing123')"
    // input= input.toString()
    console.log(input);
    input = input.replace(/\r\n/g, '\n');
    // const consoleLogRegex = /console\.log\(([^;]+?)\);?/g;
    // const consoleLogRegex = /console\.log\(([^;]*?)\);?/g;
    const consoleLogRegex = /console\.log\(([^;]*\([^;]*\)[^;]*)\);?/g;
    // const consoleLogRegex = /console\.log\(([^]*?)\);?/g;
    // const consoleLogRegex = /console\.log\(([^;]*\((?:[^()]|(?R))*\)[^;]*)\);?/g
    let match;
    const consoleLogContentArr: ({ [s: string]: unknown; } | ArrayLike<unknown>)[] = []
    while ((match = consoleLogRegex.exec(input)) !== null) {
      consoleLogContentArr.push({ [match[0]]: match[1] })
      console.log(consoleLogContentArr)
    }


    if (consoleLogContentArr.length) {
      consoleLogContentArr.forEach((ele, i) => {
        if (Object.values(ele).includes('JSON.stringify')) {
          return
        }
        else {
          input = input.replace(`${Object.keys(ele)}`, `console.log(JSON.stringify(${Object.values(consoleLogContentArr[i])}, null, 2))`)
          console.log(input);
        }
      });
    }

    return input
  }
  onSeparatorMouseDown($event: any) {
    document.addEventListener('mousemove', this.onMouseMove)
    document.addEventListener('mouseup', this.onMouseUp)
  }

  mouseDown($event: any) {
    console.log($event, "mouse doen even");
    this.mouseClicked = true
    this.resizeEditor = true
    this.saperatorBtn.nativeElement
  }

  onMouseMove = (event: MouseEvent) => {
    if (this.mouseClicked) {
      window.innerWidth
      console.log(this.leftPaneWidth, this.rightPaneWidth, event.clientX, "mouse move event")

      if (event.clientX > window.innerWidth * 30 / 100 && event.clientX < window.innerWidth * 70 / 100) {

        this.leftPaneWidth = event.clientX - (window.innerWidth * 7 / 100)
        this.rightPaneWidth = window.innerWidth - this.leftPaneWidth
      }
      //   if(this.leftPaneWidth>window.innerWidth*30/100){
      //     // console.log(this.leftPaneWidth); 
      //     this.rightPaneWidth = window.innerWidth -event.clientX
      //   }
      else {
        this.resizeEditor = false
        this.mouseClicked = false

        document.removeEventListener('mousemove', this.onMouseMove);
        document.removeEventListener('mouseup', this.onMouseUp);
      }
      //   if(event.clientX>this.leftPaneWidth && (this.leftPaneWidth<window.innerWidth*70/100)){
      //     this.rightPaneWidth = window.innerWidth -event.clientX
      //   }
      //   else{
      //     this.resizeEditor=false
      // this.mouseClicked=false

      //     document.removeEventListener('mousemove', this.onMouseMove);
      //     document.removeEventListener('mouseup', this.onMouseUp);    
      //   }
    }
  }
  onMouseUp = ($event: any) => {
    // console.log($event, "mouse up event")
    this.resizeEditor = false
    this.mouseClicked = false
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
  }

}
