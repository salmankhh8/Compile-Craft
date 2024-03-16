import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { CodeComponent } from './code/code.component';
import { ResultComponent } from './result/result.component';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAngleDown, faTerminal, faCode } from '@fortawesome/free-solid-svg-icons';
import { faJs } from '@fortawesome/free-brands-svg-icons';
import { EditorModule } from './editor.module';
import { CompilerService } from '../compiler.service';
import e from 'express';
import { NavigationEnd, Router } from '@angular/router';
import { CodeHistoryService } from '../service/code-history.service';
import { trendQuestionModel } from '../models/codeHisstory.model';
import { MAT_SELECT_CONFIG, MatSelectModule } from '@angular/material/select';
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
  link: string,
  language: string,
  code: string,
  title: string
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


export class EditorComponent implements AfterViewInit, OnInit, OnDestroy {

  constructor(private compileService: CompilerService, private fb: FormBuilder, private router: Router, private codeHistory: CodeHistoryService) {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        console.log(event);
        if (event.urlAfterRedirects.split("/")[1] == "trendingCode") {
          this.codeRequestedId = event.urlAfterRedirects.split("/")[2]
          if (this.codeRequestedId) {
            this.callQuestionDeatiails(this.codeRequestedId)
          }
        }
        if (event.urlAfterRedirects.split("/")[1] == "savedCode") {
          this.codeRequestedId = event.urlAfterRedirects.split("/")[2]
          if (this.codeRequestedId) {
            this.callDummySavedData(this.codeRequestedId)
          }
        }

        if (event.urlAfterRedirects.split("/")[1] == "home" && localStorage.getItem("codeData")) {
          this.mapFormValues(localStorage.getItem("codeData"))
        }
      }

    })

    this.languageIcons[0].active = true
    this.selectedValue = this.languageIcons[0]
    this.formData.language = this.languageIcons[0].language
  }
  faDropDown = faAngleDown
  faTerminal = faTerminal
  fajs = faJs
  faCode = faCode
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
    link: "",
    language: "",
    code: "",
    title: ""
  }

  @ViewChild('editorParent') editorWidth!: ElementRef
  @ViewChild('saperatorBtn') saperatorBtn!: ElementRef


  ngAfterViewInit(): void {
    // this.leftPaneWidth =this.editorWidth.nativeElement.clientWidth *.54 //585
    // this.rightPaneWidth =this.editorWidth.nativeElement.clientWidth *.45 //585
  }

  ngOnInit(): void {
    // this.form = this.fb.group({
    //   title:['',Validators.required],
    //   question:['', Validators.required],
    //   code:['', Validators.required],
    //   result:['', Validators.required],
    //   language:['',Validators.required],
    //   id:['',Validators.required]
    // })
  }

  callQuestionDeatiails(id: string) {
    this.codeHistory.getDummyTrendingQuestion().subscribe((res: any) => {
      if (res && id) {
        this.findDataWithId(res, id)
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

  mapIconswithLanguage(language: any) {
    if (language == 'js') {
      language = 'javascript'
    }
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

  saveCode() {
    console.log("save all the results", this.formData);
    const emptyFields: string[] = Object.keys(this.formData)
      .filter(key => !(this.formData as any)[key].trim())
      .map(key => key);

    if (emptyFields.length > 0) {
      console.log(emptyFields);

    }
  }

  callExecuteCode() {
    let regexedCode = this.matchRegexexpr(this.compileCode)

    this.compileService.executeCodeAPI(regexedCode, this.formData.language).subscribe((res: any) => {
      console.log(res);
      this.compiledResult = res
      this.form?.get('result')?.patchValue(res.result)

    })
  }

  ngOnDestroy(): void {
    console.log("on desstroy called");
    localStorage.setItem("codeData", JSON.stringify(this.formData, null, 2))
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

  formateCode() {
    let code = this.formData.code
    code = JSON.parse(code)
    this.formData.code = JSON.stringify(code, null, 2)
  }

  trendingCodeApi() {
    this.codeHistory.getDummyTrendingQuestion().subscribe((data: any) => { })
  }

  matchRegexexpr(input: string) {
    const jsCodeString = "function test(){\n\n};\nconsole.log(test());";
    let testStr = "console.log('testing123')"
    // input= input.toString()
    console.log(input);
    input = input.replace(/\r\n/g, ';\n');
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
