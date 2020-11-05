import refs from './refs';
import activeDetailsPage from './3navigation';

const libraryList = document.querySelector('.libraryPage-list');

export function drawWatchedFilmList() {
    libraryList.innerHTML = '';
  const localStorageArray = JSON.parse(localStorage.getItem('filmsWatched'));
  let fragment = document.createDocumentFragment();

  

  if (localStorageArray === null ||localStorageArray.length === 0) {
    const listItemMessage = document.createElement('li');
    listItemMessage.classList.add('libraryPage__filmItem'); 
    listItemMessage.textContent =
      'You do not have WATCHED movies. Add them.';
    libraryList.append(listItemMessage);
  }
  if (localStorageArray !== null && localStorageArray.length !== 0) {  
    localStorageArray.forEach(film =>
      fragment.append(
        createLibraryCardFunc(
          film.title,
          film.backdrop_path,
          film.id,
          film.vote_average,
        ),
      ),
    );
    libraryList.append(fragment);
  }
  
  refs.btnToQueueList.classList.remove('libraryPage__btn--active');
  refs.btnToWatchList.classList.add('libraryPage__btn--active');
}

export function drawQueueFilmList() {
  libraryList.innerHTML = '';

  const localStorageArray = JSON.parse(localStorage.getItem('filmsQueue'));
  let fragment = document.createDocumentFragment();
  if (localStorageArray === null || localStorageArray.length === 0) {
    const listItemMessage = document.createElement('li');
    listItemMessage.classList.add('libraryPage__filmItem'); 
    listItemMessage.textContent =
      'You do not have to QUEUE movies to watch. Add them.';
    libraryList.append(listItemMessage);
  }
  if (localStorageArray !== null && localStorageArray.length !== 0) {
    localStorageArray.forEach(film =>
      fragment.append(
        createLibraryCardFunc(
          film.title,
          film.backdrop_path,
          film.id,
          film.vote_average,
        ),
      ),
    );
    libraryList.append(fragment);
  }
  

  refs.btnToWatchList.classList.remove('libraryPage__btn--active');
  refs.btnToQueueList.classList.add('libraryPage__btn--active');
 
}

function createLibraryCardFunc(name, imgPath, movieId, voteAverage) {
  const listItem = document.createElement('li');
  listItem.classList.add('libraryPage__filmItem');

  const img = document.createElement('img');
  img.classList.add('libraryPage__img');
  img.setAttribute('src', `https://image.tmdb.org/t/p/w500${imgPath}`);

  const movieName = document.createElement('p');
  movieName.classList.add('libraryPage__movieName');
  movieName.textContent = name;

  const voteFilm = document.createElement('p');
  voteFilm.classList.add('libraryPage__vote');
  voteFilm.textContent = voteAverage;

  listItem.append(img, movieName, voteFilm);

  listItem.addEventListener('click', () => activeDetailsPage(movieId, true));

  return listItem;
}
