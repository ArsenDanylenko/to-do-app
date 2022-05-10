import { NgModule } from '@angular/core';
import { CoreModule } from '@core';
import { CardComponent } from './card.component';

@NgModule({
	imports: [
		CoreModule
	],
	declarations: [
		CardComponent
	],
	providers: [],
	exports: [CardComponent]

})

export class CardModule { }
