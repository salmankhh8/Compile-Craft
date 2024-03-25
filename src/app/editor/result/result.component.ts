import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCode, faTerminal} from '@fortawesome/free-solid-svg-icons';
import { faClipboard, faSave} from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-result',
  standalone: false,
  templateUrl: './result.component.html',
  styleUrl: './result.component.scss'
})
export class ResultComponent implements OnInit, OnChanges {

  faCode= faCode
faCopy= faClipboard;
faSave= faSave;
resultCode:any
@Input() question:string=""
@Input() title:string=""
@Input() result:any="Awaiting result..."
@Input() fieldMessage:any={}
@Output() emitterQuestion =new EventEmitter()
@Output() emitterTitle = new EventEmitter()
@Output() emitterSave = new EventEmitter()
@Output() emitterClose= new  EventEmitter()
// @Input() errorField: any;
ngOnInit(): void {

//   const output = '{"key": "value", "nested": {"foo": "bar"}}';
//   const parsedResult = JSON.parse(this.result);
//   this.resultCode = JSON.stringify(parsedResult, null, 2); // 2 spaces for indentation
// console.log(parsedResult, this.resultCode);

}

questionUpdateFn(event:any){
  this.question = event
  console.log(event);
  this.emitterQuestion.emit(event)
}
titleUpdatedFn(event:any){
  this.title = event
  this.emitterTitle.emit(event)
}

saveClicked(){
  this.emitterSave.emit()
}

closeDialogBox(field:any){
  this.emitterClose.emit(field)
}

copyResult(){
  navigator.clipboard.writeText(this.result.result)
}

ngOnChanges(changes: SimpleChanges): void {
  const output = '{"key": "value", "nested": {"foo": "bar"}}';
  if(this.result?.result){
    this.resultCode = this.result?.result
  }
  else{
    this.resultCode= this.result?.error
  }
  console.log(this.fieldMessage);

  // const parsedResult = JSON.parse(this.result.result);
  // this.resultCode = JSON.stringify(parsedResult, null, 3); // 2 spaces for indentation
// console.log(parsedResult, this.resultCode);
}


}
