const $photoURL = document.querySelector('.url');
const $image = document.querySelector('img');
const $entryList = document.querySelector('ul');
const $editTitleHeader = document.querySelector('.switch-title');
const $deleteButton = document.querySelector('.button');
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

  const $entryObject = document.querySelector('li');
  const render = renderEntry(entry);
  const $entryList = document.querySelector('ul');

  if (data.editing === null) {
    data.nextEntryId++;
    data.entries.unshift(entry);
    $image.setAttribute('src', 'images/placeholder-image-square.jpg');

    $entryList.insertBefore(render, $entryObject);
  } else if (data.editing !== null) {
    const newObj = {};
    newObj.entryId = data.editing.entryId;
    newObj.title = $form.elements.title.value;
    newObj.url = $form.elements.photoURL.value;
    newObj.notes = $form.elements.notes.value;
    for (let i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === newObj.entryId) {
        const index = data.entries.indexOf(data.editing);
        data.entries.splice(index, 1, newObj);
        const $liTags = document.querySelectorAll('[data-entry-id]');
        for (let x = 0; x < $liTags.length; x++) {
          if (Number($liTags[x].getAttribute('data-entry-id')) === newObj.entryId) {
            $liTags[x].replaceWith(renderEntry(newObj));
            $editTitleHeader.textContent = 'New Entry';
            data.editing = null;
            $image.setAttribute('src', 'images/placeholder-image-square.jpg');
          }
        }
      }
    }
  }

  $form.reset();

  viewSwap('entries');

  if (event) {
    toggleNoEntries(false);
  }
}

function renderEntry(entry) {

  const $li = document.createElement('li');
  $li.setAttribute('class', 'list-entry-item');
  $li.setAttribute('data-entry-id', entry.entryId);

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

  const $entryPen = document.createElement('i');
  $entryPen.setAttribute('class', 'fa-solid fa-pen');

  const $entryText = document.createElement('p');
  $entryText.setAttribute('class', 'entry-text');
  $entryText.textContent = entry.notes;

  const $titleRow = document.createElement('div');
  $titleRow.setAttribute('class', 'title-row');

  $li.append($row);
  $row.append($listImage, $columnHalf);
  $listImage.append($image);
  $columnHalf.append($titleRow, $entryText);
  $titleRow.append($entryTitle, $entryPen);

  return $li;
}

document.addEventListener('DOMContentLoaded', function (event) {
  const dataEntries = data.entries;

  for (let i = 0; i < dataEntries.length; i++) {
    const entryObject = renderEntry(dataEntries[i]);
    $entryList.append(entryObject);
  }

  viewSwap(data.view);
  if (data.entries.length === 0) {
    toggleNoEntries(true);
  } else {
    toggleNoEntries(false);
  }
});

const $noEntries = document.querySelector('.no-entries');

function toggleNoEntries(show) {
  if (show === true) {
    $noEntries.className = 'row no-entries';
  } else if (show === false) {
    $noEntries.className = 'hidden';
  }
}

const $entryForm = document.getElementById('entry-form');
const $entries = document.getElementById('entries');

function viewSwap(view) {
  data.view = view;
  if (view === 'entries') {
    $entries.className = 'view';
    $entryForm.className = 'view hidden';
  } else {
    $entries.className = 'view hidden';
    $entryForm.className = 'view';
  }
}

const $entryHeader = document.querySelector('.entries-header');

$entryHeader.addEventListener('click', function () {
  viewSwap('entries');
  data.editing = null;
  $form.reset();
  $image.setAttribute('src', 'images/placeholder-image-square.jpg');
  $editTitleHeader.textContent = 'New Entry';
});

const $newButton = document.querySelector('.new');

$newButton.addEventListener('click', function () {
  $deleteButton.setAttribute('class', 'button hidden');
  viewSwap('entry-form');
});

$entryList.addEventListener('click', function (event) {
  if (event.target.tagName === 'I') {
    $deleteButton.setAttribute('class', 'button');
    viewSwap('entry-form');
    for (let i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === Number(event.target.closest('li').getAttribute('data-entry-id'))) {
        data.editing = data.entries[i];

        const $editImage = document.querySelector('.switch-image');
        const $editTitle = document.querySelector('.title');
        const $editUrl = document.querySelector('.url');
        const $editNotes = document.querySelector('.notes');

        $editImage.setAttribute('src', data.editing.url);
        $editTitle.value = data.editing.title;
        $editUrl.value = data.editing.url;
        $editNotes.value = data.editing.notes;
        $editTitleHeader.textContent = 'Edit Entry';
      }
    }
  }
});

const $button = document.querySelector('.button');
const $modal = document.querySelector('.overlay');

$button.addEventListener('click', function (event) {
  $modal.style.display = 'flex';
});

const $cancel = document.querySelector('.cancel');
const $confirm = document.querySelector('.confirm');

$cancel.addEventListener('click', function (event) {
  $modal.style.display = 'none';
});

$confirm.addEventListener('click', function (event) {
  for (let i = 0; i < data.entries.length; i++) {
    if (data.entries[i] === data.editing) {
      const index = data.entries.indexOf(data.editing);
      data.entries.splice(index, 1);
      const $liTags = document.querySelectorAll('[data-entry-id]');
      for (let x = 0; x < $liTags.length; x++) {
        if (Number($liTags[x].getAttribute('data-entry-id')) === data.editing.entryId) {
          $liTags[x].remove();
          if ($entryList.childNodes.length === 0) {
            toggleNoEntries(true);
          }
        }
      }
    }
    $modal.style.display = 'none';
    viewSwap('entries');
    $editTitleHeader.textContent = 'New Entry';
    data.editing = null;
    $image.setAttribute('src', 'images/placeholder-image-square.jpg');
    $form.reset();
  }
});
