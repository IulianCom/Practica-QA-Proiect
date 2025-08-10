import { request } from '@playwright/test';

const BASE_URL = 'http://localhost:8887';

/**
 * API Helper class for Employee management
 */
export class EmployeeAPI {
  constructor() {
    this.baseURL = BASE_URL;
  }

  /**
   * Initialize API context
   * @returns {Promise<import('@playwright/test').APIRequestContext>}
   */
  async getAPIContext() {
    return await request.newContext({
      baseURL: this.baseURL,
      extraHTTPHeaders: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
  }

  /**
   * GET - Returneaza toti angajatii
    @returns {Promise<{response: import('@playwright/test').APIResponse, data: any}>}
   */
  async getAllEmployees() {
    const apiContext = await this.getAPIContext();
    
    try {
      const response = await apiContext.get('/api/v1/employees');
      const data = await response.json();
      
      return { response, data };
    } catch (error) {
      console.error('Error getting all employees:', error);
      throw error;
    } finally {
      await apiContext.dispose();
    }
  }

  /**
   * GET - Returneaza un angajat dupa ID
   * @param {number|string} id - ID-ul angajatului
   * @returns {Promise<{response: import('@playwright/test').APIResponse, data: any}>}
   */
  async getEmployeeById(id) {
    const apiContext = await this.getAPIContext();
    
    try {
      const response = await apiContext.get(`/api/v1/employees/${id}`);
      
      let data = null;
      try {
        const responseText = await response.text();
        if (responseText && responseText.trim()) {
          data = JSON.parse(responseText);
        }
      } catch (parseError) {
        console.log('Response is not JSON or empty, status:', response.status());
        data = null;
      }
      
      return { response, data };
    } catch (error) {
      console.error(`Error getting employee with id ${id}:`, error);
      throw error;
    } finally {
      await apiContext.dispose();
    }
  }

  /**
   * POST - Adauga un angajat nou
   * @param {Object} employeeData - Datele angajatului
   * @param {string} employeeData.firstName - Prenumele angajatului
   * @param {string} employeeData.lastName - Numele de familie al angajatului
   * @param {string} employeeData.email - Email-ul angajatului
   * @param {string} employeeData.dob - Data nasterii (format: YYYY-MM-DD)
   * @returns {Promise<{response: import('@playwright/test').APIResponse, data: any}>}
   */
  async createEmployee(employeeData) {
    const apiContext = await this.getAPIContext();
    
    try {
      const response = await apiContext.post('/api/v1/employees', {
        data: employeeData
      });
      
      let data = null;
      try {
        const responseText = await response.text();
        if (responseText && responseText.trim()) {
          data = JSON.parse(responseText);
        }
      } catch (parseError) {
        console.log('Response is not JSON or empty, status:', response.status());
        data = null;
      }
      
      return { response, data };
    } catch (error) {
      console.error('Error creating employee:', error);
      throw error;
    } finally {
      await apiContext.dispose();
    }
  }

  /**
   * PUT - Update la un angajat dupa ID
   * @param {number|string} id - ID-ul angajatului
   * @param {Object} employeeData - Datele actualizate ale angajatului
   * @returns {Promise<{response: import('@playwright/test').APIResponse, data: any}>}
   */
  async updateEmployee(id, employeeData) {
    const apiContext = await this.getAPIContext();
    
    try {
      const response = await apiContext.put(`/api/v1/employees/${id}`, {
        data: employeeData
      });
      
      let data = null;
      try {
        const responseText = await response.text();
        if (responseText && responseText.trim()) {
          data = JSON.parse(responseText);
        }
      } catch (parseError) {
        console.log('Response is not JSON or empty, status:', response.status());
        data = null;
      }
      
      return { response, data };
    } catch (error) {
      console.error(`Error updating employee with id ${id}:`, error);
      throw error;
    } finally {
      await apiContext.dispose();
    }
  }

  /**
   * DELETE - Sterge un angajat dupa ID
   * @param {number|string} id - ID-ul angajatului de sters
   * @returns {Promise<{response: import('@playwright/test').APIResponse}>}
   */
  async deleteEmployee(id) {
    const apiContext = await this.getAPIContext();
    
    try {
      const response = await apiContext.delete(`/api/v1/employees/${id}`);
      
      return { response };
    } catch (error) {
      console.error(`Error deleting employee with id ${id}:`, error);
      throw error;
    } finally {
      await apiContext.dispose();
    }
  }
}

// Export instance pentru utilizare directa
export const employeeAPI = new EmployeeAPI();