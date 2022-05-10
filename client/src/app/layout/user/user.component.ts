import { Component } from '@angular/core';
import { UserService } from '@services';
import { Animation } from "src/app/core/animation"
import { StoreService } from 'wacom';

@Component({
	selector: 'app-user',
	templateUrl: './user.component.html',
	styleUrls: ['./user.component.scss'],
	animations: [Animation]
})
export class UserComponent {
	public show: any = false;
	public mode: string = '';
	constructor(public us: UserService, private store: StoreService) {
		store.get('mode', mode => {
			if(mode) {
				this.mode = mode;
				document.getElementById('html').classList.add(mode);
			}
		});
	}
	set(mode = '') {
		if (mode) {
			this.store.set('mode', mode);
			document.getElementById('html').classList.add(mode);
		} else {
			this.store.remove('mode');
			document.getElementById('html').classList.remove(this.mode);
		}
		this.mode = mode;
	}
}
