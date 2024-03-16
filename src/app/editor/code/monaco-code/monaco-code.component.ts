import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-monaco-code',
  standalone: false,
  templateUrl: './monaco-code.component.html',
  styleUrl: './monaco-code.component.scss'
})
export class MonacoCodeComponent {

  @Input() width:any


  editorOptions = {
    theme: 'vs-dark', language: 'javascript',
    minimap: {
      enabled: true
    }
  };
  code: string = 'function x() {\nconsole.log("Hello world!");\n}';


}
