import { NgModule } from '@angular/core';
import { CoreModule } from '@core';
import { RadioComponent } from './radio.component';

@NgModule({
	imports: [
		CoreModule
	],
	declarations: [
		RadioComponent
	],
	providers: [],
	exports: [RadioComponent]
})

export class RadioModule { }
