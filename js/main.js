const $photoURL = document.querySelector('.url');
const $image = document.querySelector('img');
$photoURL.addEventListener('input', setSRC);

function setSRC(event) {
  $image.setAttribute('src', event.target.value);
  if (event.target.value === '') {
    $image.setAttribute('src', 'images/placeholder-image-square.jpg');
  }
}

const $save = document.querySelector('.save');
$save.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
}
