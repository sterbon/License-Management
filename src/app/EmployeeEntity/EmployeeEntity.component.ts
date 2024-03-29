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
import { EmployeeEntityService } from './EmployeeEntity.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-employeeentity',
  templateUrl: './EmployeeEntity.component.html',
  styleUrls: ['./EmployeeEntity.component.css'],
  providers: [EmployeeEntityService]
})
export class EmployeeEntityComponent implements OnInit {

  myForm: FormGroup;

  private allParticipants;
  private participant;
  private currentId;
  private errorMessage;

  employeeEntityID = new FormControl('', Validators.required);
  businessEnties = new FormControl('', Validators.required);
  eName = new FormControl('', Validators.required);
  claimed = new FormControl('', Validators.required);
  businessEntity = new FormControl('', Validators.required);
  software = new FormControl('', Validators.required);


  constructor(public serviceEmployeeEntity: EmployeeEntityService, fb: FormBuilder) {
    this.myForm = fb.group({
      employeeEntityID: this.employeeEntityID,
      businessEnties: this.businessEnties,
      eName: this.eName,
      claimed: this.claimed,
      businessEntity: this.businessEntity,
      software: this.software
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceEmployeeEntity.getAll()
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
      $class: 'org.hcl.licensenetwork.EmployeeEntity',
      'employeeEntityID': this.employeeEntityID.value,
      'businessEnties': this.businessEnties.value,
      'eName': this.eName.value,
      'claimed': this.claimed.value,
      'businessEntity': this.businessEntity.value,
      'software': this.software.value
    };

    this.myForm.setValue({
      'employeeEntityID': null,
      'businessEnties': null,
      'eName': null,
      'claimed': null,
      'businessEntity': null,
      'software': null
    });

    return this.serviceEmployeeEntity.addParticipant(this.participant)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'employeeEntityID': null,
        'businessEnties': null,
        'eName': null,
        'claimed': null,
        'businessEntity': null,
        'software': null
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
      $class: 'org.hcl.licensenetwork.EmployeeEntity',
      'businessEnties': this.businessEnties.value,
      'eName': this.eName.value,
      'claimed': this.claimed.value,
      'businessEntity': this.businessEntity.value,
      'software': this.software.value
    };

    return this.serviceEmployeeEntity.updateParticipant(form.get('employeeEntityID').value, this.participant)
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

    return this.serviceEmployeeEntity.deleteParticipant(this.currentId)
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

    return this.serviceEmployeeEntity.getparticipant(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'employeeEntityID': null,
        'businessEnties': null,
        'eName': null,
        'claimed': null,
        'businessEntity': null,
        'software': null
      };

      if (result.employeeEntityID) {
        formObject.employeeEntityID = result.employeeEntityID;
      } else {
        formObject.employeeEntityID = null;
      }

      if (result.businessEnties) {
        formObject.businessEnties = result.businessEnties;
      } else {
        formObject.businessEnties = null;
      }

      if (result.eName) {
        formObject.eName = result.eName;
      } else {
        formObject.eName = null;
      }

      if (result.claimed) {
        formObject.claimed = result.claimed;
      } else {
        formObject.claimed = null;
      }

      if (result.businessEntity) {
        formObject.businessEntity = result.businessEntity;
      } else {
        formObject.businessEntity = null;
      }

      if (result.software) {
        formObject.software = result.software;
      } else {
        formObject.software = null;
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
      'employeeEntityID': null,
      'businessEnties': null,
      'eName': null,
      'claimed': null,
      'businessEntity': null,
      'software': null
    });
  }
}
