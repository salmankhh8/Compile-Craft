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
    theme: 'vs-dark', language: 'python',
    minimap: {
      enabled: true
    }
  };
  code: string = 'def x() {\n print("Hello world!");\n}';


}
