import { Injectable } from '@angular/core';
import { MongoService, AlertService } from 'wacom';

@Injectable({
	providedIn: 'root'
})
export class TaskService {
	public tasks: any = [];
	public _tasks: any = {};
	constructor(private mongo: MongoService, private alert: AlertService) { 
		this.tasks = mongo.get('task', {}, (arr, obj)=>{
			this._tasks = obj;
		});
	}
	create(task:any={}, text = 'task has been created.') {
		if(task._id) return this.save(task);
		this.mongo.create('task', task, created=>{
			this.alert.show({ text });
		}); 
	}
	doc(taskId){
		if(!this._tasks[taskId]){
			this._tasks[taskId] = this.mongo.fetch('task', {
				query: {
					_id: taskId
				}
			});
		}
		return this._tasks[taskId];
	}
	update(task, text = 'task has been updated.') {
		this.mongo.afterWhile(task, _=> {
			this.save(task, text);
		});
	}
	save(task, text = 'task has been updated.'){
		this.mongo.update('task', task, _=>{
			if(text) this.alert.show({ text, unique: task });
		});
	}
	delete(task, text = 'task has been deleted.') {
		this.mongo.delete('task', task, _=>{
			if(text) this.alert.show({ text });
		});
	}
}
