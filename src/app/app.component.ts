import { Component, HostListener } from '@angular/core';
import { EditorComponent } from './editor/editor.component';
import { EditorModule } from './editor/editor.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CompilerService } from './compiler.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports:[EditorModule, EditorComponent, SidebarComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'jsCompilerFrontend';
  cell1Content = 'Cell 1';
  cell2Content = 'Cell 2';
  totalWidth = 500; // Initial total width of the container
  resizing = false;
  startX = 0;
  cell1Width = 250; // Initial width of Cell 1

  @HostListener('mousemove', ['$event'])
  onMouseMove(event:MouseEvent){
    if (this.resizing) {
      const deltaX = event.clientX - this.startX;
      this.cell1Width += deltaX;

      // Ensure the width doesn't go below a minimum value
      this.cell1Width = Math.max(100, this.cell1Width);

      this.startX = event.clientX;
    }
  }

  @HostListener('mouseup')
  onMouseUp() {
    if (this.resizing) {
      this.resizing = false;
    }
  }

  onMouseDown(event: MouseEvent) {
    this.resizing = true;
    this.startX = event.clientX;
  }

}
