import { Directive, ElementRef, Renderer2, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appDisableAutoFocus]',
  standalone: true
})
export class DisableAutoFocusDirective implements AfterViewInit {

   constructor(private el: ElementRef, private renderer: Renderer2) {}

   ngAfterViewInit(): void {
    console.log('appDisableAutoFocus directive is running');

    // Select all focusable elements inside the container
    const focusableElements = this.el.nativeElement.querySelectorAll(
      'button, input, textarea, select, a[href], [tabindex]'
    );

    // Remove auto-focus by setting tabindex="-1"
    focusableElements.forEach((element: HTMLElement) => {
      this.renderer.setAttribute(element, 'tabindex', '-1'); // Disable focus
      element.blur(); // Ensure the element is not focused
    });
  }


}
