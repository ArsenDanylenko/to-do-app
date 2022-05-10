import { Component } from '@angular/core';

@Component({
	selector: 'uikit',
	templateUrl: './uikit.component.html',
	styleUrls: ['./uikit.component.scss']
})
export class UikitComponent{
	public value: any = {};

	public rows = [{
		'Column #1': '1 - 1', 
		'Column #2': '1 - 2',
		'Column #3': '1 - 3'
	}, {
		'Column #1': '2 - 1',
		'Column #2': '2 - 2',
		'Column #3': '2 - 3'
	}, {
		'Column #1': '3 - 1',
		'Column #2': '3 - 2',
		'Column #3': '3 - 3'
	}]
	public columns = ['Column #1', 'Column #2', 'Column #3']

	constructor() {}

	test() {
		console.log(this.value);
	}
}
