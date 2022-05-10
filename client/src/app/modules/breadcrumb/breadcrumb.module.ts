import { NgModule } from '@angular/core';
import { CoreModule } from '@core';
import { BreadcrumbComponent } from './breadcrumb.component';

@NgModule({
	imports: [
		CoreModule
	],
	declarations: [
		BreadcrumbComponent
	],
	providers: [],
	exports: [BreadcrumbComponent]

})

export class BreadcrumbModule { }
