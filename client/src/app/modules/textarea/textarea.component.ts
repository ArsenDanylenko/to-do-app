import { Component, Input, Output, EventEmitter } from '@angular/core';
@Component({
	selector: 'wtextarea',
	templateUrl: './textarea.component.html',
	styleUrls: ['./textarea.component.scss']
})
export class TextareaComponent{
	@Input() ngModel;
	@Input() label;
	@Input() placeholder;
	@Output() ngModelChange = new EventEmitter()
	
	constructor() {}
}
