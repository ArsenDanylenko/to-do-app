import { Component } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'My Planner';
}


LocalNotifications.schedule({
	notifications: [
	{
		title: 'Hello',
		body: "Widgets are 10% off. Act fast!",
		id: 1,
		schedule: { at: new Date(Date.now() + 1000 * 5) },
		sound: null,
		attachments: null,
		actionTypeId: "",
		extra: null
	}
	]
});