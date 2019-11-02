import { ControlValueAccessor } from '@angular/forms';

export class CustomValueAccessor<T> implements ControlValueAccessor {
	protected touched: boolean = false;
	public disabled: boolean;
	public model: T;

	/**
	 * Function to call when input changes
	 */
	onChange = (model: T) => {};

	/**
	 * Function to call when the input is touched.
	 */
	onTouched = () => {};

	// Allows Angular to update the model (rating).
	// Update the model and changes needed for the view here.
	writeValue(model: T): void {
		this.model = model;
		this.onChange(this.model);
	}

	// Allows Angular to register a function to call when the model (rating) changes.
	// Save the function as a property to call later here.
	registerOnChange(fn: (model: T) => void): void {
		this.onChange = fn;
	}

	// Allows Angular to register a function to call when the input has been touched.
	// Save the function as a property to call later here.
	registerOnTouched(fn: () => void): void {
		this.onTouched = fn;
	}

	// Allows Angular to disable the input.
	setDisabledState(isDisabled: boolean): void {
		this.disabled = isDisabled;
	}
}
