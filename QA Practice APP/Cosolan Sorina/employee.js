// employee.js — CRUD complet cu PUT corect (trimite entitatea completă)
// Rulează: node employee.js
// Cu token (dacă API-ul cere):  $env:API_TOKEN="PASTE_TOKEN"; node employee.js

const BASE_URL = process.env.API_BASE_URL || 'http://localhost:8887';
const EMP_BASE = process.env.API_ENDPOINT || '/api/v1/employees';
const TOKEN    = process.env.API_TOKEN || '';

function headers() {
  return {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    ...(TOKEN ? { 'Authorization': `Bearer ${TOKEN}` } : {})
  };
}

async function parseMaybeJSON(res) {
  const text = await res.text();
  if (!text) return null;
  try { return JSON.parse(text); } catch { return text; }
}

async function handle(res) {
  const body = await parseMaybeJSON(res);
  if (!res.ok) {
    const msg = typeof body === 'string' ? body : JSON.stringify(body);
    throw new Error(`HTTP ${res.status} ${res.statusText} - ${msg}`);
  }
  return body;
}

// ---------- CRUD ----------
async function getAllEmployees() {
  const res = await fetch(`${BASE_URL}${EMP_BASE}`, { headers: headers() });
  return handle(res);
}

async function getEmployeeById(id) {
  const res = await fetch(`${BASE_URL}${EMP_BASE}/${id}`, { headers: headers() });
  return handle(res);
}

// POST — suportă 201/204 fără body; încearcă să urmeze Location
async function createEmployee(employee) {
  const res = await fetch(`${BASE_URL}${EMP_BASE}`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify(employee)
  });

  if (!res.ok) return handle(res);

  let body = await parseMaybeJSON(res);
  if (body) return body;

  const loc = res.headers.get('location') || res.headers.get('Location');
  if (loc) {
    const url = loc.startsWith('http') ? loc : `${BASE_URL}${loc}`;
    const follow = await fetch(url, { headers: headers() });
    return handle(follow);
  }
  return null; // nu a trimis body și nici Location
}

async function updateEmployee(id, employee) {
  const res = await fetch(`${BASE_URL}${EMP_BASE}/${id}`, {
    method: 'PUT',
    headers: headers(),
    body: JSON.stringify(employee)
  });
  return handle(res);
}

async function deleteEmployee(id) {
  const res = await fetch(`${BASE_URL}${EMP_BASE}/${id}`, {
    method: 'DELETE',
    headers: headers()
  });
  if (res.status === 204) return { status: 204 };
  return handle(res);
}

// ---------- DEMO: GET → POST → GET(id) → PUT(entitate completă) → DELETE → GET ----------
async function demo() {
  console.log('GET   /employees');
  console.log(await getAllEmployees());

  console.log('\nPOST  /employees');
  const created = await createEmployee({
    // ajustează cheile exact ca în Swagger dacă diferă
    firstName: 'Ana',
    lastName: 'Pop',
    dob: '1998-05-10',
    email: `ana${Date.now()}@ex.com`
  });
  console.log(created);

  // Extrage ID în siguranță
  let id = created?.id ?? created?.data?.id ?? created?.employeeId;

  // Fallback: dacă POST nu întoarce body/ID, deduce din listă (max id)
  if (!id) {
    const all = await getAllEmployees();
    id = Array.isArray(all) && all.length
      ? all.reduce((max, e) => (e.id > max ? e.id : max), all[0].id)
      : null;
    console.log('ID dedus (fallback):', id);
  }

  if (!id) {
    console.warn('Nu am putut determina ID-ul noului employee. Verifică schema/răspunsul POST.');
    return;
  }

  console.log(`\nGET   /employees/${id}`);
  const current = await getEmployeeById(id);
  console.log(current);

  console.log(`\nPUT   /employees/${id}`);
  // IMPORTANT: trimite ENTITATEA COMPLETĂ (nu doar câmpurile schimbate)
  const putBody = {
    ...current,
    lastName: 'Popescu' // modificarea dorită
  };
  console.log('PUT body:', putBody);
  const updated = await updateEmployee(id, putBody);
  console.log(updated);

  console.log(`\nDELETE /employees/${id}`);
  console.log(await deleteEmployee(id));

  console.log('\nGET   /employees (după ștergere)');
  console.log(await getAllEmployees());
}

if (require.main === module) {
  demo().catch(err => {
    console.error(err);
    process.exitCode = 1;
  });
}

module.exports = {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee
};
