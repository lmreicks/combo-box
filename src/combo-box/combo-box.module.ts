import { NgModule } from '@angular/core';
import { Dropdown, DropdownAnchor, DropdownMenu, DropdownToggle } from './lib/dropdown';
import { ComboboxComponent } from './lib/combo-box.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		ReactiveFormsModule
	],
	declarations: [
		ComboboxComponent,
		Dropdown,
		DropdownAnchor,
		DropdownMenu,
		DropdownToggle
	],
	exports: [
		ComboboxComponent,
		Dropdown,
		DropdownAnchor,
		DropdownMenu,
		DropdownToggle
	]
})
export class ComboboxModule { }
