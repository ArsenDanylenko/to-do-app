// ----------------MODAL!------------------

import { Component } from '@angular/core';
import { TaskService } from '@services'
import { ModalService } from 'wacom';

@Component({
	selector: 'task',
	templateUrl: './task.component.html',
	styleUrls: ['./task.component.scss']
})
export class TaskComponent{

	public task: any = {};
	
	constructor(
		public ts: TaskService,
		public modal: ModalService
		) {}
}
