// ----------------MODAL!------------------

import { Component } from '@angular/core';
import { TaskService } from '@services'
import { ModalService, AlertService } from 'wacom';

@Component({
	selector: 'task',
	templateUrl: './task.component.html',
	styleUrls: ['./task.component.scss']
})
export class TaskComponent{

	public task: any = {};
	
	constructor(
		public ts: TaskService,
		public modal: ModalService,
		private alert: AlertService
		) {}

	goBack() {
		if (!this.task.name) {
			this.alert.show({
				text: 'Please type the task name',
				timeout: 3000,
				position: 'center'
			});
		} else {
			this.modal.destroy();
		}
	}
}
