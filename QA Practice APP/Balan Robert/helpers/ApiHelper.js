/**
 * Helper functions pentru API Testing
 * Contine functii comune pentru operatiile CRUD
 */

const API_BASE_URL = 'http://localhost:8887/api/v1/employees';
const SWAGGER_URL = 'http://localhost:8887/swagger-ui.html';

class ApiHelper {
  
  // Verifica daca API-ul este functional
  static async checkApiHealth(request) {
    const response = await request.get(API_BASE_URL);
    if (!response.ok()) {
      throw new Error('API nu este functional');
    }
    console.log('✅ API este functional');
    return response;
  }

  // Obtine lista de angajati
  static async getEmployees(request) {
    const response = await request.get(API_BASE_URL);
    const employees = await response.json();
    console.log(`✅ GET - Gasiti ${employees.length} angajati`);
    return { response, employees };
  }

  // Creaza un angajat nou
  static async createEmployee(request, employeeData = null) {
    const defaultData = {
      firstName: 'Test',
      lastName: 'User',
      email: `test.${Date.now()}@example.com`,
      dob: '1990-01-01'
    };
    
    const data = employeeData || defaultData;
    const response = await request.post(API_BASE_URL, { data });
    
    let employeeId = null;
    const responseText = await response.text();
    
    if (responseText.trim()) {
      const createdEmployee = await response.json();
      employeeId = createdEmployee.id;
    } else {
      // Gaseste angajatul prin email
      const listResponse = await request.get(API_BASE_URL);
      const employees = await listResponse.json();
      const newEmployee = employees.find(emp => emp.email === data.email);
      employeeId = newEmployee?.id;
    }
    
    console.log(`✅ POST - Angajat creat cu ID: ${employeeId}`);
    return { response, employeeId, data };
  }

  // Actualizeaza un angajat
  static async updateEmployee(request, employeeId, updateData = null) {
    const defaultData = {
      firstName: 'Updated',
      lastName: 'User',
      email: `updated.${Date.now()}@example.com`,
      dob: '1995-01-01'
    };
    
    const data = updateData || defaultData;
    const response = await request.put(`${API_BASE_URL}/${employeeId}`, { data });
    console.log(`✅ PUT - Angajat ${employeeId} actualizat`);
    return { response, data };
  }

  // Sterge un angajat
  static async deleteEmployee(request, employeeId) {
    const response = await request.delete(`${API_BASE_URL}/${employeeId}`);
    
    // Verifica ca a fost sters
    const checkResponse = await request.get(`${API_BASE_URL}/${employeeId}`);
    console.log(`✅ DELETE - Angajat ${employeeId} sters`);
    return { response, checkResponse };
  }

  // Testeaza Swagger UI
  static async testSwaggerUI(page) {
    await page.goto(SWAGGER_URL);
    console.log('✅ Swagger UI functional');
    return page;
  }

  // Test de performanta
  static async performanceTest(request, requestCount = 5) {
    const startTime = Date.now();
    
    const promises = Array(requestCount).fill().map(() => request.get(API_BASE_URL));
    const responses = await Promise.all(promises);
    
    const duration = Date.now() - startTime;
    console.log(`✅ Performance - ${requestCount} requests in ${duration}ms`);
    return { responses, duration };
  }

  // Test validari
  static async testValidations(request) {
    // Date invalide
    const invalidData = { firstName: '', email: 'invalid-email' };
    const invalidResponse = await request.post(API_BASE_URL, { data: invalidData });
    
    // ID inexistent
    const notFoundResponse = await request.get(`${API_BASE_URL}/99999`);
    
    console.log('✅ Validari complete');
    return { invalidResponse, notFoundResponse };
  }

  // Genereaza date random pentru teste
  static generateRandomEmployee() {
    const timestamp = Date.now();
    return {
      firstName: `Test${timestamp}`,
      lastName: `User${timestamp}`,
      email: `test.${timestamp}@example.com`,
      dob: '1990-01-01'
    };
  }

}

export { ApiHelper, API_BASE_URL, SWAGGER_URL };
