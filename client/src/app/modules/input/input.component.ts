import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'winput',
	templateUrl: './input.component.html',
	styleUrls: ['./input.component.scss']
})
export class InputComponent{
	@Input() ngModel;
	@Input() label;
	@Input() placeholder;
	@Output() ngModelChange = new EventEmitter()

	constructor() {}
}
