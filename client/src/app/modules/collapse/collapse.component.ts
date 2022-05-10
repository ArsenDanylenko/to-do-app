import { Component, Input } from '@angular/core';
@Component({
	selector: 'wcollapse',
	templateUrl: './collapse.component.html',
	styleUrls: ['./collapse.component.scss']
})
export class CollapseComponent{
	@Input() name;

	public show: boolean = false;
	constructor() {}
}
