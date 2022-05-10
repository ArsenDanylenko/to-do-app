import { Injectable } from '@angular/core';
import { MongoService, AlertService } from 'wacom';

@Injectable({
	providedIn: 'root'
})
export class ListService {
	public lists: any = [];
	public _lists: any = {};
	constructor(private mongo: MongoService, private alert: AlertService) { 
		this.lists = mongo.get('list', {}, (arr, obj)=>{
			this._lists = obj;
		});
	}
	create(list:any={}, text = 'list has been created.') {
		if(list._id) return this.save(list);
		this.mongo.create('list', list, created=>{
			this.alert.show({ text });
		}); 
	}
	doc(listId){
		if(!this._lists[listId]){
			this._lists[listId] = this.mongo.fetch('list', {
				query: {
					_id: listId
				}
			});
		}
		return this._lists[listId];
	}
	update(list, text = 'list has been updated.') {
		this.mongo.afterWhile(list, _=> {
			this.save(list, text);
		});
	}
	save(list, text = 'list has been updated.'){
		this.mongo.update('list', list, _=>{
			if(text) this.alert.show({ text, unique: list });
		});
	}
	delete(list, text = 'list has been deleted.') {
		this.mongo.delete('list', list, _=>{
			if(text) this.alert.show({ text });
		});
	}
}
