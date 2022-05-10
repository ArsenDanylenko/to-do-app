import { NgModule } from '@angular/core';
import { CoreModule } from '@core';
import { TextareaComponent } from './textarea.component';

@NgModule({
	imports: [
		CoreModule
	],
	declarations: [
		TextareaComponent
	],
	providers: [],
	exports: [TextareaComponent]

})

export class TextareaModule { }
