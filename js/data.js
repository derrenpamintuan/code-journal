/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

window.addEventListener('beforeunload', beforeUnload);

function beforeUnload(event) {
  const entriesJSON = JSON.stringify(data);
  localStorage.setItem('local-storage', entriesJSON);
}

const previousEntries = localStorage.getItem('local-storage');

if (previousEntries !== null) {
  data = JSON.parse(previousEntries);
}
