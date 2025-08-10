import { test, expect } from '@playwright/test';
import { employeeAPI } from '../Giurgiu Petrica/API/api.helpers.js';

// Test data pentru angajati
const testEmployee = {
  firstName: 'Ion',
  lastName: 'Popescu',
  email: 'ion.popescu@company.com',
  dob: '1990-01-15'
};

const updatedEmployee = {
  firstName: 'Ion',
  lastName: 'Popescu',
  email: 'ion.popescu.updated@company.com',
  dob: '1990-01-15'
};

test.describe('Employee API Tests', () => {
  let createdEmployeeId;

  test.afterAll(async () => {
    // Cleanup - sterge angajatul creat in timpul testelor
    if (createdEmployeeId) {
      try {
        await employeeAPI.deleteEmployee(createdEmployeeId);
        console.log(`Cleaned up test employee with ID: ${createdEmployeeId}`);
      } catch (error) {
        console.log('Cleanup error (expected if employee was already deleted):', error.message);
      }
    }
  });

  test('GET - Returneaza toti angajatii', async () => {
    const { response, data } = await employeeAPI.getAllEmployees();
    
    expect(response.status()).toBe(200);
    expect(Array.isArray(data)).toBeTruthy();
    
    console.log(`Found ${data.length} employees`);
  });

  test('POST - Creeaza un angajat nou', async () => {
    const { response, data } = await employeeAPI.createEmployee(testEmployee);
    
    expect([200, 201]).toContain(response.status());
    
    if (data && data.id) {
      createdEmployeeId = data.id;
      console.log(`Created employee with ID: ${createdEmployeeId}`);
    } else {
      // Cauta angajatul creat dupa email
      const { response: getAllResponse, data: allEmployees } = await employeeAPI.getAllEmployees();
      if (getAllResponse.status() === 200 && allEmployees) {
        const foundEmployee = allEmployees.find(emp => emp.email === testEmployee.email);
        if (foundEmployee) {
          createdEmployeeId = foundEmployee.id;
          console.log(`Found created employee with ID: ${createdEmployeeId}`);
        }
      }
    }
  });

  test('PUT - Actualizeaza angajat dupa ID', async () => {
    // Asigura-te ca avem un angajat creat
    if (!createdEmployeeId) {
      const { response: createResponse, data: createData } = await employeeAPI.createEmployee(testEmployee);
      expect([200, 201]).toContain(createResponse.status());
      
      if (createData && createData.id) {
        createdEmployeeId = createData.id;
      } else {
        const { response: getAllResponse, data: allEmployees } = await employeeAPI.getAllEmployees();
        if (getAllResponse.status() === 200 && allEmployees) {
          const foundEmployee = allEmployees.find(emp => emp.email === testEmployee.email);
          if (foundEmployee) {
            createdEmployeeId = foundEmployee.id;
          }
        }
      }
    }
    
    const { response } = await employeeAPI.updateEmployee(createdEmployeeId, updatedEmployee);
    
    expect([200, 204]).toContain(response.status());
    console.log(`Updated employee with ID: ${createdEmployeeId}`);
  });

  test('DELETE - Sterge angajat dupa ID', async () => {
    // Creeaza un angajat special pentru stergere
    const { response: createResponse, data: createData } = await employeeAPI.createEmployee({
      firstName: 'Test',
      lastName: 'Delete',
      email: 'delete.test@company.com',
      dob: '1995-12-01'
    });
    expect([200, 201]).toContain(createResponse.status());
    
    let deleteEmployeeId;
    if (createData && createData.id) {
      deleteEmployeeId = createData.id;
    } else {
      const { response: getAllResponse, data: allEmployees } = await employeeAPI.getAllEmployees();
      if (getAllResponse.status() === 200 && allEmployees) {
        const foundEmployee = allEmployees.find(emp => emp.email === 'delete.test@company.com');
        if (foundEmployee) {
          deleteEmployeeId = foundEmployee.id;
        }
      }
    }
    
    const { response } = await employeeAPI.deleteEmployee(deleteEmployeeId);
    
    expect([200, 204]).toContain(response.status());
    console.log(`Deleted employee with ID: ${deleteEmployeeId}`);
  });
});