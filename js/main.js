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
  data.entries.unshift(entry);
  $image.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
}

function renderEntry(entry) {

  const $li = document.createElement('li');
  $li.setAttribute('class', 'list-entry-item');

  const $row = document.createElement('div');
  $row.setAttribute('class', 'row');

  const $listImage = document.createElement('div');
  $listImage.setAttribute('class', 'column-half list-image');

  const $columnHalf = document.createElement('div');
  $columnHalf.setAttribute('class', 'column-half');

  const $image = document.createElement('img');
  $image.setAttribute('src', entry.url);

  const $entryTitle = document.createElement('h3');
  $entryTitle.setAttribute('class', 'entry-title');
  $entryTitle.textContent = entry.title;

  const $entryText = document.createElement('p');
  $entryText.setAttribute('class', 'entry-text');
  $entryText.textContent = entry.notes;

  $li.append($row);
  $row.append($listImage, $columnHalf);
  $listImage.append($image);
  $columnHalf.append($entryTitle, $entryText);

  return $li;
}

document.addEventListener('DOMContentLoaded', function (event) {
  const dataEntries = data.entries;
  const $entryList = document.querySelector('ul');
  for (let i = 0; i < dataEntries.length; i++) {
    const entryObject = renderEntry(dataEntries[i]);
    $entryList.append(entryObject);
  }
});

const $noEntries = document.querySelector('.no-entries');

// eslint-disable-next-line no-unused-vars
function toggleNoEntries(show) {
  if (show === true) {
    $noEntries.className = 'row no-entries';
  } else if (show === false) {
    $noEntries.className = 'hidden';
  }
}
