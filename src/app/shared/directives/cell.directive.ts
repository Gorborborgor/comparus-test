import { Directive, ElementRef, Input,Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
  selector: '[appCell]'
})
export class CellDirective {
  timeOut: any;
  @Input() lifetime: number;
  @Input() set status(value: string) {
    this.elemRef.nativeElement.classList.add(value);

    this.timeOut = setTimeout(()=>{
      this.isClicked.emit(false);
      this.elemRef.nativeElement.classList.remove('active');
      this.elemRef.nativeElement.classList.add('not-clicked');
    }, this.lifetime)
  }
  
  @Output() isClicked: EventEmitter<boolean> = new EventEmitter();

  @HostListener('click',['$event']) onClick() {
    if(!this.elemRef.nativeElement.classList.contains('active')) return;
    clearTimeout(this.timeOut);
    this.isClicked.emit(true);
    this.elemRef.nativeElement.classList.remove('active');
    this.elemRef.nativeElement.classList.add('clicked');
  }

  constructor(private elemRef: ElementRef) {
  }

  reload() {
    this.elemRef.nativeElement.classList.remove('active', 'clicked', 'not-clicked');
  }
}
