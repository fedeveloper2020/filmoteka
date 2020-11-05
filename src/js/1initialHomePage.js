let baseURL = 'https://api.themoviedb.org/3';
let apiKey = 'c5a07ae819d95fe3119594f7b17c2bc2';
let renderFilms = [];
let genres;
let pageNumber = 1;
let inputValue = '';

import activeDetailsPage from './3navigation'
import refs from './refs'

function createCardFunc(imgPath, filmTitle, movieId) {
  const listItem = document.createElement('li');
  listItem.classList.add('homePage__movieItem');
  listItem.setAttribute('id','js-filmListItem');

  const img = document.createElement('img');
    img.classList.add('homePage__movieItem-poster');
    
 img.setAttribute('src', `https://image.tmdb.org/t/p/w500/${imgPath}`)
    

  const title = document.createElement('h2');
  title.classList.add('homePage__movieItem-name');
  title.textContent = filmTitle;

  listItem.append(img, title);

  listItem.addEventListener('click', () => activeDetailsPage(movieId, false));
  return listItem;
};

const fetchPopularMoviesList = () => {
  fetch(`${baseURL}/movie/popular?api_key=${apiKey}&language=en-US&page=${pageNumber}`)
    .then(data => data.json())
    .then(films => {

      if (films.results.length > 1) {
          clearContainer();
      }
        films.results.forEach(film => {
        refs.movieList.insertAdjacentElement('beforeend', createCardFunc(film.backdrop_path, film.title, film.id))
      })
      renderFilms = films.results;
      return renderFilms;
    })
    .catch(err => console.error(err));
}

function fetchGenres() {
  fetch(`${baseURL}/genre/movie/list?api_key=${apiKey}&language=en-US`)
    .then(data => data.json())
    .then(films => {
      genres = [...films.genres];
    })
    .catch(err => console.error(err));
}

fetchPopularMoviesList();
fetchGenres();

function fetchFilms() {
  fetch(`${baseURL}/search/movie?api_key=${apiKey}&language=en-US&page=${pageNumber}&include_adult=false&query=${inputValue}`)
    .then(data => data.json())
    .then(films => {
      if (films.results.length === 0) {
        refs.buttonContainer.classList.add('hidden');
        refs.errorRef.textContent = "Sorry, but there are no exact matches :(";
        clearContainer();

      }
      if (films.results.length > 1) {
        refs.buttonContainer.classList.remove('hidden');
        clearContainer();
        refs.errorRef.textContent = "";
      }
      films.results.forEach(film => {
        refs.movieList.insertAdjacentElement('beforeend', createCardFunc(film.backdrop_path, film.title, film.id))
      })
        renderFilms = films.results;
        refs.title.classList.add('hidden')
      return renderFilms;
    })
    .catch(error => console.error(error));
}

function handleSearchForm(event) {
  event.preventDefault();
  pageNumber = 1;
  refs.pageValue.textContent = pageNumber;
  inputValue = refs.input.value;
  refs.searchForm.reset();
  fetchFilms();
}

pageNumber === 1 ? refs.prevBtn.setAttribute('disabled', 'disabled') : refs.prevBtn.removeAttribute('disabled', 'disabled');
function plaginationNavigation(event) {
    
  
  if (event.target === refs.prevBtn) {
    pageNumber -= 1;
    pageNumber === 1 ? refs.prevBtn.setAttribute('disabled', 'disabled') : refs.prevBtn.removeAttribute('disabled', 'disabled');
    scrollToTop();
    refs.pageValue.textContent = pageNumber;
    if (inputValue === '') {
      fetchPopularMoviesList();
    } else {
      fetchFilms();
    }
  } else {
    pageNumber += 1;
    pageNumber === 1 ? refs.prevBtn.setAttribute('disabled', 'disabled') : refs.prevBtn.removeAttribute('disabled', 'disabled');
    scrollToTop();
    refs.pageValue.textContent = pageNumber;
    if (inputValue === '') {
      fetchPopularMoviesList();
    } else {
      fetchFilms();
    }
  }
  // pageNumber === 1 || pageNumber < 1 ? refs.prevBtn.classList.add('hidden') : refs.prevBtn.classList.remove('hidden');
}

function clearContainer() {
    refs.movieList.innerHTML = "";
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

refs.backToTopBtn.addEventListener('click', scrollToTop)


 refs.prevBtn.addEventListener('click', plaginationNavigation);
 refs.nextBtn.addEventListener('click', plaginationNavigation);
 refs.searchForm.addEventListener('submit', handleSearchForm);

export { renderFilms, genres };