import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { MongoService, FileService, HttpService } from 'wacom';

@Injectable({
	providedIn: 'root'
})
export class UserService {
	/*
	*	Declarations
	*/
		public roles = ['admin'];
		public users: any = [];
		public _users: any = {};
		public user: any = { data: {}, is: {} };
		constructor(private mongo: MongoService, private file: FileService,
			private router: Router, private http: HttpService) {
			this.file.add({
				id: 'userAvatarUrl',
				resize: 256,
				part: 'user',
				cb: file=>{
					if(typeof file != 'string') return;
					this.user.thumb = file;
				}
			});
			this.mongo.config('user', {
				replace: {
					data: (data, cb, doc) => {
						if(typeof data != 'object') data = {};
						cb(data);
					},
					is: mongo.beObj
				}
			});
			this.user = mongo.fetch('user', {
				name: 'me'
			}, user => {
				if(localStorage.getItem('waw_user') && !user) {
					this.logout();
				}
        if (user) {
				  this.user = user;
				  localStorage.setItem('waw_user', JSON.stringify(user));
        }
			});
			this.users = mongo.get('user', (arr, obj)=>{
				this._users = obj;
			});
		}
	/*
	*	User Management
	*/
		create(user){
			this.mongo.create('user', user);
		}
		doc(userId){
			if(!this._users[userId]){
				this._users[userId] = this.mongo.fetch('user', {
					query: { _id: userId }
				});
			}
			return this._users[userId];
		}
		update(){
			this.mongo.afterWhile(this, ()=>{
				this.mongo.update('user', this.user);
			});
		}
		save(user){
			this.mongo.afterWhile(this, ()=>{
				this.mongo.update('user', user, {
					name: 'admin'
				});
			});
		}
		delete(user){
			this.mongo.delete('user', user, {
				name: 'admin'
			});
		}
		change_password(oldPass, newPass){
			this.http.post('/api/user/changePassword', {
				newPass: newPass,
				oldPass: oldPass
			}, resp => {
				if(resp) alert('successfully changed password');
				else alert('failed to change password');
			});
		}
		logout(){
			this.user = { data: {}, is: {} };
			localStorage.removeItem('waw_user');
			this.router.navigate(['/']);
			this.http.remove('token');
		}
	/*
	*	End of
	*/
}

@Injectable()
export class Admins implements CanActivate {
	constructor(private router: Router) {}
	canActivate(){
		if ( localStorage.getItem('waw_user') ) {
			let user = JSON.parse(localStorage.getItem('waw_user'));
			if(user.is && user.is.admin) return true;
			this.router.navigate(['/profile']);
			return false;
		} else {
			this.router.navigate(['/']);
			return false;
		}
	}
}

@Injectable()
export class Authenticated implements CanActivate {
	constructor(private router: Router) {}
	canActivate(){
		if ( localStorage.getItem('waw_user') ) {
			return true;
		} else {
			return this.router.navigate(['/']);
		}
	}

}

@Injectable()
export class Guest implements CanActivate {
	constructor(private router: Router) {}
	canActivate(){
		if (localStorage.getItem('waw_user')) {
			return this.router.navigate(['/profile'])
		} else {
			return true;
		}
	}
}
