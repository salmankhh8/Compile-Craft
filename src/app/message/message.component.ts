import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-message',
  standalone: false,
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss'
})
export class MessageComponent implements OnInit, OnChanges {

  gotItClicked:boolean=false

  @Output() closeErrorBox = new EventEmitter()

  @Input() message:any
  @Input() leftArrow:boolean=false
  close(field:any){
    this.gotItClicked=true
    setTimeout(()=>{
      this.closeErrorBox.emit()
    },1000)
  }

  ngOnInit(): void {
      
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.message);
      
  }
}
