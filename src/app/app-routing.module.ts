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

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';

import { SoftwareComponent } from './Software/Software.component';

import { BusinessEntityComponent } from './BusinessEntity/BusinessEntity.component';
import { EmployeeEntityComponent } from './EmployeeEntity/EmployeeEntity.component';

import { businessClaimComponent } from './businessClaim/businessClaim.component';
import { businessReleaseComponent } from './businessRelease/businessRelease.component';
import { employeeClaimComponent } from './employeeClaim/employeeClaim.component';
import { employeeReleaseComponent } from './employeeRelease/employeeRelease.component';
import { from } from 'rxjs/observable/from';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Software', component: SoftwareComponent },
  { path: 'BusinessEntity', component: BusinessEntityComponent },
  { path: 'EmployeeEntity', component: EmployeeEntityComponent },
  { path: 'businessClaim', component: businessClaimComponent },
  { path: 'businessRelease', component: businessReleaseComponent },
  { path: 'employeeClaim', component: employeeClaimComponent },
  { path: 'employeeRelease', component: employeeReleaseComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule],
 providers: []
})
export class AppRoutingModule { }
