import { Component, Input, Output, EventEmitter } from '@angular/core';
@Component({
	selector: 'wradio',
	templateUrl: './radio.component.html',
	styleUrls: ['./radio.component.scss']
})
export class RadioComponent{
	@Input() wngModel = false;
	@Input() name;
	@Input() value;
	@Input() label;
	@Output() wngModelChange = new EventEmitter()
	constructor() {}

	set() {
		console.log(this.wngModel);
		this.wngModelChange.emit(this.wngModel)
	}
}
