import {Component, Input, Output, EventEmitter} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {marge, margeItem} from "../../interfaces/lots";

/**
 * Generated class for the MargeitemComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'margeitem',
  templateUrl: 'margeitem.html'
})
export class MargeitemComponent {

  @Input('value') itemToUse;
  @Output() itemSaved = new EventEmitter<margeItem>();
  @Output() itemDelete = new EventEmitter<margeItem>();

  formItem : FormGroup;
  mode : string = 'show';
  item : margeItem;

  constructor(public formBuilder: FormBuilder) {
    this.item = this.itemToUse;
    console.log(this.itemToUse);

  }

  ngOnChanges() {
    console.log(this.itemToUse);
    this.item = this.itemToUse;
    this.prepareform();
  }

  /**
   *
   */
  editForm() {
    this.prepareform();
    this.mode = 'edit';
  }

  /**
   *
   */
  prepareform() {
    this.formItem = this.formBuilder.group({
      label: [ this.item.label, Validators.required],
      value: [ this.item.value, Validators.required],
      unitvalue: [ this.item.unitvalue, Validators.required],
      quantity: [ this.item.quantity, Validators.required],
      comment: [ this.item.comment, Validators.required],

    });
  }

  /**
   * save formulaire
   */
  saveForm() {
    let values = this.formItem.value;
    this.item.quantity = parseFloat( values.quantity );
    this.item.comment = values.comment;
    this.item.unitvalue = values.unitvalue;
    this.item.label = values.label;
    this.item.value = parseFloat(values.value);

    this.mode='show';
    this.itemSaved.emit(this.item);
  }

  deleteForm() {
    this.itemDelete.emit();
  }

  /**
   * annule formulaire
   */
  cancelForm() {
    this.mode="show";
  }

}
