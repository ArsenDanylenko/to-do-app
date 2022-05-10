import { NgModule } from '@angular/core';
import { CoreModule } from '@core';
import { UikitComponent } from './uikit.component';
import { Routes, RouterModule } from '@angular/router';
import { InputModule, TextareaModule, SwitchModule, CheckboxModule, RadioModule, BreadcrumbModule, CollapseModule, ProgressModule, CardModule, SelectModule, ButtonModule, TableModule} from 'src/app/modules';

const routes: Routes = [{
	path: '',
	component: UikitComponent
}];

@NgModule({
	imports: [
		RouterModule.forChild(routes),
		CoreModule,
		InputModule,
		TextareaModule,
		SwitchModule,
		CheckboxModule,
		RadioModule,
		BreadcrumbModule,
		CollapseModule,
		ProgressModule,
		CardModule,
		SelectModule,
		ButtonModule,
		TableModule
	],
	declarations: [
		UikitComponent
	],
	providers: []
	
})

export class UikitModule { }
