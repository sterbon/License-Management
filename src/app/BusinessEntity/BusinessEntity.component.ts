/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BusinessEntityService } from './BusinessEntity.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-businessentity',
  templateUrl: './BusinessEntity.component.html',
  styleUrls: ['./BusinessEntity.component.css'],
  providers: [BusinessEntityService]
})
export class BusinessEntityComponent implements OnInit {

  myForm: FormGroup;

  private allParticipants;
  private participant;
  private currentId;
  private errorMessage;

  businessEntityID = new FormControl('', Validators.required);
  businessEntity = new FormControl('', Validators.required);
  bName = new FormControl('', Validators.required);
  software = new FormControl('', Validators.required);
  availableQuantity = new FormControl('', Validators.required);
  totalQuantity = new FormControl('', Validators.required);


  constructor(public serviceBusinessEntity: BusinessEntityService, fb: FormBuilder) {
    this.myForm = fb.group({
      businessEntityID: this.businessEntityID,
      businessEntity: this.businessEntity,
      bName: this.bName,
      software: this.software,
      availableQuantity: this.availableQuantity,
      totalQuantity: this.totalQuantity
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceBusinessEntity.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(participant => {
        tempList.push(participant);
      });
      this.allParticipants = tempList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
        this.errorMessage = error;
      }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the participant field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the participant updateDialog.
   * @param {String} name - the name of the participant field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified participant field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addParticipant(form: any): Promise<any> {
    this.participant = {
      $class: 'org.hcl.licensenetwork.BusinessEntity',
      'businessEntityID': this.businessEntityID.value,
      'businessEntity': this.businessEntity.value,
      'bName': this.bName.value,
      'software': this.software.value,
      'availableQuantity': this.availableQuantity.value,
      'totalQuantity': this.totalQuantity.value
    };

    this.myForm.setValue({
      'businessEntityID': null,
      'businessEntity': null,
      'bName': null,
      'software': null,
      'availableQuantity': null,
      'totalQuantity': null
    });

    return this.serviceBusinessEntity.addParticipant(this.participant)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'businessEntityID': null,
        'businessEntity': null,
        'bName': null,
        'software': null,
        'availableQuantity': null,
        'totalQuantity': null
      });
      this.loadAll(); 
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
        this.errorMessage = error;
      }
    });
  }


   updateParticipant(form: any): Promise<any> {
    this.participant = {
      $class: 'org.hcl.licensenetwork.BusinessEntity',
      'businessEntity': this.businessEntity.value,
      'bName': this.bName.value,
      'software': this.software.value,
      'availableQuantity': this.availableQuantity.value,
      'totalQuantity': this.totalQuantity.value
    };

    return this.serviceBusinessEntity.updateParticipant(form.get('businessEntityID').value, this.participant)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }


  deleteParticipant(): Promise<any> {

    return this.serviceBusinessEntity.deleteParticipant(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {

    return this.serviceBusinessEntity.getparticipant(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'businessEntityID': null,
        'businessEntity': null,
        'bName': null,
        'software': null,
        'availableQuantity': null,
        'totalQuantity': null
      };

      if (result.businessEntityID) {
        formObject.businessEntityID = result.businessEntityID;
      } else {
        formObject.businessEntityID = null;
      }

      if (result.businessEntity) {
        formObject.businessEntity = result.businessEntity;
      } else {
        formObject.businessEntity = null;
      }

      if (result.bName) {
        formObject.bName = result.bName;
      } else {
        formObject.bName = null;
      }

      if (result.software) {
        formObject.software = result.software;
      } else {
        formObject.software = null;
      }

      if (result.availableQuantity) {
        formObject.availableQuantity = result.availableQuantity;
      } else {
        formObject.availableQuantity = null;
      }

      if (result.totalQuantity) {
        formObject.totalQuantity = result.totalQuantity;
      } else {
        formObject.totalQuantity = null;
      }

      this.myForm.setValue(formObject);
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });

  }

  resetForm(): void {
    this.myForm.setValue({
      'businessEntityID': null,
      'businessEntity': null,
      'bName': null,
      'software': null,
      'availableQuantity': null,
      'totalQuantity': null
    });
  }
}
