import { NgModule } from '@angular/core';
import { CoreModule } from '@core';
import { CollapseComponent } from './collapse.component';

@NgModule({
	imports: [
		CoreModule
	],
	declarations: [
		CollapseComponent
	],
	providers: [],
	exports: [CollapseComponent]

})

export class CollapseModule { }
