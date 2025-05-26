import { CommonModule } from '@angular/common';
import { Component, effect, inject, input, output } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { FlightFilter } from '../../logic-flight';
import { FlightFilterStore } from './flight-filter.store';
import { triggerNonReactiveContext } from './reactive-context.util';


@Component({
  selector: 'app-flight-filter',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './flight-filter.component.html',
  providers: [FlightFilterStore]
})
export class FlightFilterComponent {
  protected localStore = inject(FlightFilterStore);

  filter = input.required<FlightFilter>();
  filterChanged = output<FlightFilter>();

  protected inputFilterForm = inject(FormBuilder).nonNullable.group({
    from: ['', [Validators.required]],
    to: ['', [Validators.required]],
    urgent: [false],
  });

  protected selectedFilterControl = new FormControl(this.inputFilterForm.getRawValue(), {
    nonNullable: true,
  });

  constructor() {
    this.localStore.initInputFilterUpdate(
      this.inputFilterForm.valueChanges
    );
    this.localStore.initSelectedFilterUpdate(
      this.selectedFilterControl.valueChanges
    );
    triggerNonReactiveContext(this.localStore.selectedFilter, trigger => {
      this.inputFilterForm.patchValue(trigger)
    });
    triggerNonReactiveContext(this.localStore.latestFilter, trigger => {
      this.selectedFilterControl.setValue(trigger)
    });
    triggerNonReactiveContext(this.localStore.latestFilter, trigger => {
      if (trigger) {
        this.filterChanged.emit(trigger);
      }
    });
    effect(() => this.inputFilterForm.setValue(this.filter()));
  }
}
