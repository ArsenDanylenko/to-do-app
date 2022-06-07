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

			groups: {
				status: {
					field: doc=>doc.status,
					replace: {
						dateNow: (val, cb, doc) => {
							cb(new Date(doc.date).getTime());

						}
					},
					sort: (a, b) => {
						if (a.dateNow < b.dateNow) {
							return 1;
						} else {
							return -1;
						}
					}
				},
			},
			replace: {
				status: (val, cb, task) => {
					const n = new Date();
					let today = n.getFullYear() + '-';
					today += (n.getMonth() > 9 ? '' : '0') + (n.getMonth() + 1)+ '-';
					today += (n.getDate() > 10 ? '' : '0') + n.getDate();

					if(task.date === today) {
						cb('today');
					} else if(!task.clear && !task.date) {
						cb('today');
					} else if(task.date < today) {
						cb('today');
					} else {
						cb('upcoming');
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
			// if(text) this.alert.show({ text, unique: task });
		});
	}
	delete(task, text = 'task has been deleted.') {
		this.mongo.delete('task', task, _=>{
			// if(text) this.alert.show({ text });
		});
	}
}
