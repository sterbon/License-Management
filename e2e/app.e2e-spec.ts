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

import { AngularTestPage } from './app.po';
import { ExpectedConditions, browser, element, by } from 'protractor';
import {} from 'jasmine';


describe('Starting tests for License_Management', function() {
  let page: AngularTestPage;

  beforeEach(() => {
    page = new AngularTestPage();
  });

  it('website title should be License_Management', () => {
    page.navigateTo('/');
    return browser.getTitle().then((result)=>{
      expect(result).toBe('License_Management');
    })
  });

  it('network-name should be license-management-network@0.0.5-deploy.62',() => {
    element(by.css('.network-name')).getWebElement()
    .then((webElement) => {
      return webElement.getText();
    })
    .then((txt) => {
      expect(txt).toBe('license-management-network@0.0.5-deploy.62.bna');
    });
  });

  it('navbar-brand should be License_Management',() => {
    element(by.css('.navbar-brand')).getWebElement()
    .then((webElement) => {
      return webElement.getText();
    })
    .then((txt) => {
      expect(txt).toBe('License_Management');
    });
  });

  
    it('Software component should be loadable',() => {
      page.navigateTo('/Software');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Software');
      });
    });

    it('Software table should have 7 columns',() => {
      page.navigateTo('/Software');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(7); // Addition of 1 for 'Action' column
      });
    });
  

  
    it('BusinessEntity component should be loadable',() => {
      page.navigateTo('/BusinessEntity');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('BusinessEntity');
      });
    });

    it('BusinessEntity table should have 7 columns',() => {
      page.navigateTo('/BusinessEntity');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(7); // Addition of 1 for 'Action' column
      });
    });
  
    it('EmployeeEntity component should be loadable',() => {
      page.navigateTo('/EmployeeEntity');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('EmployeeEntity');
      });
    });

    it('EmployeeEntity table should have 7 columns',() => {
      page.navigateTo('/EmployeeEntity');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(7); // Addition of 1 for 'Action' column
      });
    });
  

  
    it('businessClaim component should be loadable',() => {
      page.navigateTo('/businessClaim');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('businessClaim');
      });
    });
  
    it('businessRelease component should be loadable',() => {
      page.navigateTo('/businessRelease');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('businessRelease');
      });
    });
  
    it('employeeClaim component should be loadable',() => {
      page.navigateTo('/employeeClaim');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('employeeClaim');
      });
    });
  
    it('employeeRelease component should be loadable',() => {
      page.navigateTo('/employeeRelease');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('employeeRelease');
      });
    });
  

});