import { NgModule } from '@angular/core';
import { CoreModule } from '@core';
import { CheckboxComponent } from './checkbox.component';

@NgModule({
	imports: [
		CoreModule
	],
	declarations: [
		CheckboxComponent
	],
	providers: [],
	exports: [CheckboxComponent]

})

export class CheckboxModule { }
