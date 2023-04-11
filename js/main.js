const $photoURL = document.querySelector('.url');
const $image = document.querySelector('img');
$photoURL.addEventListener('input', setSRC);

function setSRC(event) {
  $image.setAttribute('src', event.target.value);
  if (event.target.value === '') {
    $image.setAttribute('src', 'images/placeholder-image-square.jpg');
  }
}

const $form = document.querySelector('form');
$form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  const entry = {
    entryId: data.nextEntryId,
    title: $form.elements.title.value,
    url: $form.elements.photoURL.value,
    notes: $form.elements.notes.value
  };

  data.nextEntryId++;
  data.entries.push(entry);
  $image.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
}
