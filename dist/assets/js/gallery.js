const filters = document.querySelectorAll('[data-filter]');
const cards = document.querySelectorAll('[data-category]');
const count = document.querySelector('#result-count');
filters.forEach(button => button.addEventListener('click', () => {
  const category = button.dataset.filter;
  filters.forEach(filter => filter.setAttribute('aria-pressed', String(filter === button)));
  let visible = 0;
  cards.forEach(card => {
    card.hidden = category !== 'all' && card.dataset.category !== category;
    if (!card.hidden) visible++;
  });
  if (count) count.textContent = `${visible} ${visible === 1 ? 'garden' : 'gardens'} shown`;
}));
const dialog = document.querySelector('#image-dialog');
let trigger;
document.querySelectorAll('[data-lightbox]').forEach(button => button.addEventListener('click', () => {
  if (!dialog || typeof dialog.showModal !== 'function') return;
  trigger = button;
  const source = button.querySelector('img');
  const target = dialog.querySelector('img');
  target.src = source.src; target.alt = source.alt;
  dialog.querySelector('p').textContent = source.alt;
  dialog.showModal();
}));
dialog?.querySelector('.close').addEventListener('click', () => dialog.close());
dialog?.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
dialog?.addEventListener('close', () => trigger?.focus());
