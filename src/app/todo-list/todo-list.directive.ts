import { Directive, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
  selector: '[appCtrlKeys]',
})

export class CtrlKeysDirective  {
  @Output() ctrlZ = new EventEmitter();
  @Output() shiftCtrlZ = new EventEmitter();

  @Output() ctrlD = new EventEmitter();

  // When the event ctrl-z is detected by the HostListener, we emit an event that will be catch by the todolist component
  @HostListener('keydown.control.z') onCtrlZ() {
    this.ctrlZ.emit();
  }

  @HostListener('keydown.shift.control.z') onShiftCtrlZ() {
    this.shiftCtrlZ.emit();
  }

  @HostListener('keydown.control.d') onCtrlD() {
    this.ctrlD.emit();
  }
}
