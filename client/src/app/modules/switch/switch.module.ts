import { NgModule } from '@angular/core';
import { CoreModule } from '@core';
import { SwitchComponent } from './switch.component';

@NgModule({
	imports: [
		CoreModule
	],
	declarations: [
		SwitchComponent
	],
	providers: [],
	exports: [SwitchComponent]
})

export class SwitchModule { }
