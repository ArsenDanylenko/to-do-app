import { Component, ElementRef, Input, TemplateRef, ViewChild, Output, EventEmitter } from '@angular/core';
@Component({
	selector: 'wselect',
	templateUrl: './select.component.html',
	styleUrls: ['./select.component.scss']
})
export class SelectComponent {
	@Output() update: EventEmitter<any> = new EventEmitter<any>();
	@Input('select') select: any = {};
	@Input('value') value: string = 'name';
	@Input('view') t_view: TemplateRef<any>;
	@Input('item') t_item: TemplateRef<any>;
	@Input('search') t_search: TemplateRef<any>;
	public search:string = '';
	@ViewChild('e_search', {static: false}) e_search: ElementRef;
	focus_search(){
		this.search = '';
		if(!this.searching || this.t_search) return;
		if (!this.e_search){
			return setTimeout(this.focus_search.bind(this), 100);
		}
		this.e_search.nativeElement.focus();
	}
	@Input('init') init: number = 15;
	public slice = this.init;
	initialize() {
		this.slice = this.init;
		setTimeout(() => {
			this.slice = this.items.length;
		}, 1000);
	}
	constructor(){}
	@Input('searching') searching:boolean = false;
	@Input('items') items:any = [];
	public selectShow: any;
	close(){
		this.selectShow = false;
	}


	@Input('label') label = '';
	public counter = 0;
	public groups = [{
		title: 'Group 1',
		items: [{
			title: 'Vocation',
			selected: true
		}, {
			title: 'Automotive',
			selected: true
		}, {
			title: 'Education',
			selected: false
		}, {
			title: 'Government',
			selected: false
		}]
	}, {
		title: 'Group 2',
		items: [{
			title: 'Government',
			selected: false
		}, {
			title: 'Education',
			selected: false
		}, {
			title: 'Automotive',
			selected: true
		}, {
			title: 'Vocation',
			selected: false
		}]
	}, {
		title: 'Group 3',
		items: [{
			title: 'Traveling',
			selected: false
		}]
	}];
	check() {
		this.counter = 0;
		for (var i = 0; i < this.groups.length; i++) {
			for (var j = 0; j < this.groups[i].items.length; j++) {
				if (this.groups[i].items[j].selected) this.counter++;
			}
		}
	}
}
