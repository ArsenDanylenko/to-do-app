import { Component, ViewChild, ElementRef } from '@angular/core';
import { HashService, HttpService, AlertService } from 'wacom';
import { UserService } from 'src/app/services';
import { Router } from '@angular/router';
@Component({
	selector: 'app-sign',
	templateUrl: './sign.component.html',
	styleUrls: ['./sign.component.scss']
})
export class SignComponent {
	constructor(
		private alert: AlertService,
		private http: HttpService,
		private hash: HashService,
		private us: UserService,
		private router: Router
	) {
		this.user.email = this.hash.get('email') || 'ceo@webart.work';
		this.user.password = this.hash.get('password') || 'asdasdasdasd';
	}
	@ViewChild('email') email: ElementRef;
	email_focus() {
		setTimeout(() => {
			this.email.nativeElement.focus();
		}, 100);
	}
	@ViewChild('password') password: ElementRef;
	password_focus() {
		setTimeout(() => {
			this.password.nativeElement.focus();
		}, 100);
	}
	public user: any = {};
	submit() {
		if (this.reseting && this.user.code) {
			return this.save();
		}
		if (!this.user.email) {
			this.alert.error({
				text: 'Enter your email',
			});
			return this.email_focus();
		}
		this.hash.set('email', this.user.email);
		if (!this.user.password) {
			this.alert.error({
				text: 'Enter your password',
			});
			return this.password_focus();
		}
		this.http.post('/api/user/status', this.user, (resp: any) => {
			if (resp.email && resp.pass) {
				this.login();
			} else if (resp.email) {
				this.reset();
			} else {
				this.sign();
			}
		});
	}
	login() {
		this.http.post('/api/user/login', this.user, (user: any) => {
			if (!user) {
				return this.alert.error({
					text: "Something went wrong",
				});
			}
			this.us.user = user;
			this.http.set('token', user.token);
			localStorage.setItem('waw_user', JSON.stringify(user));
			this.router.navigate(['/profile'])
		});
	}
	sign() {
		this.http.post('/api/user/sign', this.user, (user: any) => {
			if (!user) {
				return this.alert.error({
					text: "Something went wrong",
				});
			}
			this.us.user = user;
			this.http.set('token', user.token);
			localStorage.setItem('waw_user', JSON.stringify(user));
			this.router.navigate(['/profile']);
		})
	}
	public reseting = false;
	reset() {
		this.http.post('/api/user/request', this.user, (resp: any) => {
			this.reseting = true;
		});
		this.alert.info({
			text: "Mail will sent to your email"
		});
	}
	save() {
		this.http.post('/api/user/change', this.user, (resp: any) => {
			this.alert.info({
				text: resp
			});
			if (resp != 'Password successfully changed.') return;
			this.http.post('/api/user/login', this.user, (user: any) => {
				if (!user) {
					return this.alert.error({
						text: "Something went wrong",
					});
				}
				this.us.user = user;
				this.http.set('token', user.token);
				localStorage.setItem('waw_user', JSON.stringify(user));
				this.router.navigate(['/profile']);
			});
		});
	}
}
