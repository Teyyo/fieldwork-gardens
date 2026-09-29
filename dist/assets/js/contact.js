const form = document.querySelector('#enquiry-form');
const success = document.querySelector('#form-success');
let downloadUrl;
const rules = {
  name: value => value.trim().length >= 2 ? '' : 'Please enter your name (at least 2 characters).',
  email: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) ? '' : 'Please enter a valid email address.',
  postcode: value => value.trim().length >= 3 ? '' : 'Please enter your postcode or town.',
  service: value => value ? '' : 'Please choose a service.',
  message: value => value.trim().length >= 20 ? '' : 'Tell us a little more (at least 20 characters).',
  consent: (_, field) => field.checked ? '' : 'Please confirm that you understand this is a demo.'
};
function validateField(name) {
  const field = form.elements[name];
  const error = rules[name](field.value, field);
  document.getElementById(`${name}-error`).textContent = error;
  field.setAttribute('aria-invalid', String(Boolean(error)));
  return !error;
}
if (form) {
  form.noValidate = true;
  form.querySelector('button[type="submit"]').disabled = false;
  Object.keys(rules).forEach(name => {
    const field = form.elements[name];
    field.addEventListener('blur', () => validateField(name));
    field.addEventListener('input', () => { if (field.getAttribute('aria-invalid') === 'true') validateField(name); });
  });
  form.addEventListener('input', () => { success.hidden = true; });
  form.addEventListener('submit', event => {
    event.preventDefault();
    const results = Object.keys(rules).map(validateField);
    if (results.includes(false)) { form.querySelector('[aria-invalid="true"]').focus(); return; }
    const values = new FormData(form);
    const summary = `FIELDWORK — DEMO ENQUIRY\nNothing has been sent.\n\nName: ${values.get('name').trim()}\nEmail: ${values.get('email').trim()}\nLocation: ${values.get('postcode').trim()}\nService: ${values.get('service')}\nBudget: ${values.get('budget') || 'Not sure yet'}\n\n${values.get('message').trim()}`;
    success.querySelector('pre').textContent = summary;
    if (downloadUrl) URL.revokeObjectURL(downloadUrl);
    downloadUrl = URL.createObjectURL(new Blob([summary], { type: 'text/plain;charset=utf-8' }));
    success.querySelector('a').href = downloadUrl;
    success.hidden = false;
    success.focus();
  });
}

const services = { 'garden-design': 'Full garden design', 'planting-design': 'Planting design', consultation: 'Garden consultation' };
const requestedService = new URLSearchParams(location.search).get('service');
if (form && Object.hasOwn(services, requestedService)) form.elements.service.value = services[requestedService];
