import { test, expect } from '@playwright/test';

/*
 * API Testing 
 */

const API_BASE_URL = 'http://localhost:8887/api/v1/employees';
const SWAGGER_URL = 'http://localhost:8887/swagger-ui.html';
let testEmployeeId = null;

test.describe('QA Practice API Tests', () => {
  
  test.beforeAll(async ({ request }) => {
    const response = await request.get(API_BASE_URL);
    expect(response.ok()).toBeTruthy();
    console.log('✅ API este functional');
  });

  test('GET - Lista angajati', async ({ request }) => {
    const response = await request.get(API_BASE_URL);
    const employees = await response.json();
    expect(Array.isArray(employees)).toBeTruthy();
    console.log(`✅ GET - Gasiti ${employees.length} angajati`);
  });

  test('POST - Creare angajat', async ({ request }) => {
    const newEmployee = { firstName: 'Test', lastName: 'User', email: `test.${Date.now()}@test.com`, dob: '1990-01-01' };
    const response = await request.post(API_BASE_URL, { data: newEmployee });
    expect(response.status()).toBe(201);
    
    const text = await response.text();
    if (text.trim()) {
      testEmployeeId = (await response.json()).id;
    } else {
      const listResponse = await request.get(API_BASE_URL);
      const employees = await listResponse.json();
      testEmployeeId = employees.find(emp => emp.email === newEmployee.email)?.id;
    }
    console.log(`✅ POST - Angajat creat cu ID: ${testEmployeeId}`);
  });

  test('PUT - Actualizare angajat', async ({ request }) => {
    test.skip(!testEmployeeId, 'Nu exista angajat');
    const updatedData = { firstName: 'Updated', lastName: 'User', email: `updated.${Date.now()}@test.com`, dob: '1995-01-01' };
    const response = await request.put(`${API_BASE_URL}/${testEmployeeId}`, { data: updatedData });
    expect([200, 204]).toContain(response.status());
    console.log(`✅ PUT - Angajat ${testEmployeeId} actualizat`);
  });

  test('DELETE - Stergere angajat', async ({ request }) => {
    test.skip(!testEmployeeId, 'Nu exista angajat');
    const response = await request.delete(`${API_BASE_URL}/${testEmployeeId}`);
    expect(response.status()).toBe(204);
    console.log(`✅ DELETE - Angajat ${testEmployeeId} sters`);
  });

  test('Swagger UI functional', async ({ page }) => {
    await page.goto(SWAGGER_URL);
    await expect(page).toHaveTitle(/Swagger UI/);
    console.log('✅ Swagger UI functional');
  });

  test('Test performanta', async ({ request }) => {
    const start = Date.now();
    await Promise.all(Array(5).fill().map(() => request.get(API_BASE_URL)));
    const duration = Date.now() - start;
    expect(duration).toBeLessThan(5000);
    console.log(`✅ Performance - 5 requests in ${duration}ms`);
  });

});