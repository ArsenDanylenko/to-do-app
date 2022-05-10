import { NgModule } from '@angular/core';
import { CoreModule } from '@core';
import { ProgressComponent } from './progress.component';

@NgModule({
	imports: [
		CoreModule
	],
	declarations: [
		ProgressComponent
	],
	providers: [],
	exports: [ProgressComponent]

})

export class ProgressModule { }
