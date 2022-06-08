import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// Core
import { GuestComponent } from './layout/guest/guest.component';
import { UserComponent } from './layout/user/user.component';
import { Authenticated, Guest, Admins } from 'src/app/services';
import { AppComponent } from './app.component';
import { CoreModule } from 'src/app/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// config
import { WacomModule, MetaGuard } from 'wacom';
import { TaskComponent } from './modals/task/task.component';

const routes: Routes = [{
	path: '',
	canActivate: [Guest],
	component: GuestComponent,
	children: [/* guest */{
		path: 'uikit',
		canActivate: [MetaGuard],
		data: {
			meta: {
				title: 'Uikit'
			}
		},
		loadChildren: () => import('./pages/guest/uikit/uikit.module').then(m => m.UikitModule)
	}, {
		path: '',
		canActivate: [MetaGuard],
		data: {
			meta: {
				title: 'Sign'
			}
		},
		loadChildren: () => import('./pages/guest/sign/sign.module').then(m => m.SignModule)
	}]
}, {
	path: '',
	canActivate: [Authenticated],
	component: UserComponent,
	children: [/* user */{
		path: 'tasks',
		canActivate: [MetaGuard],
		data: {
			meta: {
				title: 'Tasks'
			}
		},
		loadChildren: () => import('./pages/user/tasks/tasks.module').then(m => m.TasksModule)
	}, {
		path: 'profile',
		canActivate: [MetaGuard],
		data: {
			meta: {
				title: 'My Profile'
			}
		},
		loadChildren: () => import('./pages/user/profile/profile.module').then(m => m.ProfileModule)
	}]
}, {
	path: 'admin',
	canActivate: [Admins],
	component: UserComponent,
	children: [/* admin */{
		path: 'users',
		canActivate: [MetaGuard],
		data: {
			meta: {
				title: 'Users'
			}
		},
		loadChildren: () => import('./pages/admin/users/users.module').then(m => m.UsersModule)
	}]
}, {
	path: '**', redirectTo: 'profile', pathMatch: 'full'
}];

@NgModule({
    declarations: [
        AppComponent,
        GuestComponent,
        UserComponent,
        TaskComponent
    ],
    imports: [
        CoreModule,
        BrowserModule,
        BrowserAnimationsModule,
        WacomModule.forRoot({
            socket: false,
            meta: {
                useTitleSuffix: true,
                defaults: {
                    title: 'My Planner',
                    titleSuffix: ' | My Planner',
                    'og:image': 'https://webart.work/api/user/cdn/waw-logo.png'
                }
            },
            alert: {
                alerts: { /* alerts */}
            },
            modal: {
                modals: { /* modals */
					task: TaskComponent,}
            },
            loader: {
                loaders: { /* loaders */}
            },
            popup: {
                popups: { /* popups */}
            }
        }),
        RouterModule.forRoot(routes, {
            scrollPositionRestoration: 'enabled',
            preloadingStrategy: PreloadAllModules,
            relativeLinkResolution: 'legacy'
        })
    ],
    providers: [Authenticated, Guest, Admins],
    bootstrap: [AppComponent]
})
export class AppModule { }
