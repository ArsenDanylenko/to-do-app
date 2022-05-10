import { NgModule } from '@angular/core';
import { CoreModule } from '@core';
import { TableComponent } from './table.component';

@NgModule({
	imports: [
		CoreModule
	],
	declarations: [
		TableComponent
	],
	providers: [],
	exports: [TableComponent]

})

export class TableModule { }
