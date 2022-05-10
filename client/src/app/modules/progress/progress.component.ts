import { Component, Input } from '@angular/core';
@Component({
	selector: 'wprogress',
	templateUrl: './progress.component.html',
	styleUrls: ['./progress.component.scss']
})
export class ProgressComponent{
	@Input() progress;
	constructor() {}
}
