import { Component, Input } from '@angular/core';
@Component({
	selector: 'wcard',
	templateUrl: './card.component.html',
	styleUrls: ['./card.component.scss']
})
export class CardComponent{
	@Input() header: string = null;
	@Input() padding: boolean = false;
	constructor() {}
}
