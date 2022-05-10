import { NgModule } from '@angular/core';
import { CoreModule } from '@core';
import { SelectComponent } from './select.component';

@NgModule({
	imports: [
		CoreModule
	],
	declarations: [
		SelectComponent
	],
	providers: [],
	exports: [SelectComponent]

})

export class SelectModule { }
