import { Component, Input } from '@angular/core';
@Component({
	selector: 'wbutton',
	templateUrl: './button.component.html',
	styleUrls: ['./button.component.scss']
})
export class ButtonComponent{
	@Input() type: string = 'primary';
	constructor() {}
}
