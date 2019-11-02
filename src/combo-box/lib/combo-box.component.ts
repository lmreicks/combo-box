import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { CustomValueAccessor } from './custom-value-accessor';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
	selector: 'combo-box',
	templateUrl: 'combo-box.component.html',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => ComboboxComponent),
			multi: true
		}
	]
})
export class ComboboxComponent extends CustomValueAccessor<any> {
	@Input() options: any[];
	/**
	 * Property to render from the options list, if the option is an object
	 * This can be a single property or a list seperated by '.'
	 * ex) options = [{
	 * 		prop: {
	 * 			propNested: 'Name'
	 * 		}
	 * 	}]
	 * render = 'prop.propNested'
	 *
	 * If no render property is passed in, the object will be displayed as is
	 */
	@Input() render?: string;
	/**
	 * string currently displayed in the combobox input, used for searching
	 */
	@Input() displayString: FormControl = new FormControl('');

	/**
	 * Output when an option is selected
	 */
	@Output() callback: EventEmitter<any> = new EventEmitter();

	/**
	 * If the combobox should allow adding a new object from input
	 */
	@Input() canAdd: boolean = false;
	/**
	 * Output for when a new object is added via the input
	 */
	@Output() add: EventEmitter<string> = new EventEmitter();

	@Input() placeholder: string;

	set model(newModel: any) {
		this._model = newModel;
		this.displayString.setValue(newModel);

		if (this.touched) {
			this.callback.emit(newModel);
		}
		this.onChange(newModel);
	}
	get model(): any {
		return this._model;
	}

	private _model: any;

	selectOption(option: any) {
		if (this.disabled) {
			return;
		}
		this.touched = true;
		this.model = option;
	}

	getOptionValue(option: any) {
		if (option instanceof Array) {
			let str: string;
			if (this.render !== undefined) {
				let props = this.render.split('.');
				for (let i = 0; i < option.length; i++) {
					let x = option[i];
					for (let prop of props) {
						x = x[prop];
					}
					str += x.toString();
					if (i < option.length - 1) {
						str += ', ';
					}
				}
			}
			return str;
		}
		switch (typeof (option)) {
			case 'string':
				return option;
			case 'number':
				return option.toString();
			case 'object':
				if (this.render !== undefined) {
					let props = this.render.split('.');
					for (let prop of props) {
						option = option[prop];
					}
				}
				return option.toString();
			default:
				throw new Error('Not option type not supported');
		}
	}
}
