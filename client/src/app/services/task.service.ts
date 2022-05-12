import { Injectable } from '@angular/core';
import { MongoService, AlertService } from 'wacom';

@Injectable({
	providedIn: 'root'
})
export class TaskService {
	public tasks: any = [];
	public _tasks: any = {};
	constructor(
		private mongo: MongoService,
		private alert: AlertService) { 
		this.tasks = mongo.get('task', {

			groups: 'status',
			replace: {
				status: (val, cb, task) => {
					let today;
					today = new Date().getFullYear() + '-' + ('0' + (new Date().getMonth() + 1)).slice(-2) + '-' + new Date().getDate();
					console.log(task.date, today);
					if(task.date === today) {
						cb('today')
					} else {
						cb('upcoming')
					}
				}
			}
		}, (arr, obj)=>{
			this._tasks = obj;
		});
	}
	create(task:any={}, cb=task=>{}) {
		if(task._id) return this.save(task);
		this.mongo.create('task', task, created=>{
			cb(created);
		}); 
	}
	doc(taskId){
		if(!this._tasks[taskId]){
			this._tasks[taskId] = this.mongo.fetch('task', {
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
