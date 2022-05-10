import { Component } from '@angular/core';
import { TaskService } from '@services';
import { ModalService } from 'wacom';

@Component({
	selector: 'tasks',
	templateUrl: './tasks.component.html',
	styleUrls: ['./tasks.component.scss']
})
export class TasksComponent{
	public task: {
		name: any;
		description: any;
	};
	constructor(
		public ts: TaskService,
		public modal: ModalService
		) {}

	// display() {
		
	// }
}
