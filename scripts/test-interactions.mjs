// Focused logic tests using DOM doubles; these are not browser/layout tests.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
const source = name => readFileSync(new URL(`../dist/assets/js/${name}.js`, import.meta.url), 'utf8');
function element(value = '') {
  const attributes = new Map();
  const classes = new Set();
  return {
    value, checked: false, hidden: false, disabled: true, dataset: {}, textContent: '', events: {},
    setAttribute: (key, val) => attributes.set(key, val),
    getAttribute: key => attributes.get(key),
    addEventListener(name, handler) { this.events[name] = handler; },
    dispatch(name, extra = {}) { this.events[name]?.({ target: this, preventDefault() {}, ...extra }); },
    focus() { this.focused = true; },
    classList: { remove: key => classes.delete(key), toggle: (key, on) => on ? classes.add(key) : classes.delete(key), contains: key => classes.has(key) }
  };
}
// Navigation toggle, Escape and resize reset.
const menu = element(), nav = element(), docEvents = {}, media = {};
menu.setAttribute('aria-expanded', 'false');
vm.runInNewContext(source('main'), {
  document: { querySelector: selector => selector === '.menu-button' ? menu : nav, addEventListener: (name, cb) => docEvents[name] = cb },
  window: {}, matchMedia: () => ({ addEventListener: (name, cb) => media.change = cb })
});
menu.dispatch('click'); assert.equal(menu.getAttribute('aria-expanded'), 'true'); assert(nav.classList.contains('open'));
docEvents.keydown({ key: 'Escape' }); assert.equal(menu.getAttribute('aria-expanded'), 'false'); assert(menu.focused);
menu.dispatch('click'); media.change(); assert(!nav.classList.contains('open'));
// Filtering, result announcements, and reopening all records.
const filters = ['all', 'country', 'courtyard', 'planting'].map(value => { const e = element(); e.dataset.filter = value; return e; });
const cards = ['country', 'courtyard', 'country', 'planting'].map(value => { const e = element(); e.dataset.category = value; return e; });
const count = element();
vm.runInNewContext(source('gallery'), {
  document: { querySelectorAll: selector => selector === '[data-filter]' ? filters : selector === '[data-category]' ? cards : [], querySelector: selector => selector === '#result-count' ? count : null }
});
filters[1].dispatch('click'); assert.equal(cards.filter(c => !c.hidden).length, 2); assert.equal(count.textContent, '2 gardens shown');
filters[2].dispatch('click'); assert.equal(count.textContent, '1 garden shown'); assert.equal(filters[2].getAttribute('aria-pressed'), 'true');
filters[0].dispatch('click'); assert.equal(cards.filter(c => !c.hidden).length, 4);
// Form errors, valid download, URL preselection, escaping and stale-feedback reset.
const form = element(), success = element(), submit = element(), summary = element(), download = element();
const fields = Object.fromEntries(['name', 'email', 'postcode', 'service', 'budget', 'message', 'consent'].map(key => [key, element()]));
const errors = Object.fromEntries(Object.keys(fields).map(key => [`${key}-error`, element()]));
form.elements = fields;
form.querySelector = selector => selector === 'button[type="submit"]' ? submit : Object.values(fields).find(field => field.getAttribute('aria-invalid') === 'true');
success.querySelector = selector => selector === 'pre' ? summary : download;
let blobCount = 0, revoked = 0;
vm.runInNewContext(source('contact'), {
  document: { querySelector: selector => selector === '#enquiry-form' ? form : success, getElementById: id => errors[id] },
  URLSearchParams, location: { search: '?service=planting-design' }, Blob,
  FormData: class { get(key) { return fields[key].value; } },
  URL: { createObjectURL: () => `blob:test-${++blobCount}`, revokeObjectURL: () => revoked++ }
});
assert.equal(fields.service.value, 'Planting design'); assert.equal(submit.disabled, false);
form.dispatch('submit'); assert(fields.name.focused); assert.equal(fields.email.getAttribute('aria-invalid'), 'true'); assert.equal(blobCount, 0);
Object.assign(fields.name, { value: '<img src=x onerror=alert(1)>' });
fields.email.value = 'person@example.com'; fields.postcode.value = 'Bath'; fields.message.value = 'We would like to rethink a small shaded courtyard.'; fields.consent.checked = true;
form.dispatch('submit'); assert.equal(success.hidden, false); assert.equal(blobCount, 1); assert(summary.textContent.includes('<img src=x onerror=alert(1)>')); assert.equal(download.href, 'blob:test-1'); assert(success.focused);
form.dispatch('input'); assert.equal(success.hidden, true);
form.dispatch('submit'); assert.equal(revoked, 1);
fields.email.value = 'not-an-email'; fields.email.dispatch('blur'); assert.equal(fields.email.getAttribute('aria-invalid'), 'true');
console.log('PASS: navigation, Escape/resize, all gallery categories, invalid/valid form, preselection, text-only output, download and feedback reset. DOM doubles only.');
