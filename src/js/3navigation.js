import { renderFilms } from './1initialHomePage'
import refs from './refs'
import { drawWatchedFilmList, drawQueueFilmList } from './5libraryPage';
import { showDetails, toggleToQueue, toggleToWatched} from './4filmDetailsPage'
let selectFilm = [];

refs.libraryPage.classList.add('hidden');
refs.detailsSectionBlock.classList.add('hidden');

function activeLibraryPage() {
    refs.homePage.classList.add('hidden');
    refs.detailsSectionBlock.classList.add('hidden');
    refs.libraryPage.classList.remove('hidden')
    
    drawQueueFilmList();
    refs.btnToQueueList.classList.add('undreline');
    refs.btnToQueueList.addEventListener('click', drawQueueFilmList);
    refs.btnToWatchList.addEventListener('click', drawWatchedFilmList);
document.querySelector('.js-details__queue').removeEventListener('click', toggleToQueue);
document.querySelector('.js-details__watched').removeEventListener('click', toggleToWatched);



//   refs.prevBtn.removeEventListener('click', plaginationNavigation);
//   refs.nextBtn.removeEventListener('click', plaginationNavigation);
};

function activeHomePage() {
    refs.homePage.classList.remove('hidden');
    refs.movieList.classList.remove('hidden');
    refs.detailsSectionBlock.classList.add('hidden');
    refs.libraryPage.classList.add('hidden');

    refs.btnToQueueList.removeEventListener('click', drawQueueFilmList);
    refs.btnToWatchList.removeEventListener('click', drawWatchedFilmList);

    // refs.addQueueBtn.removeEventListener('click', toggleToQueue);
    // refs.addWatchedBtn.removeEventListener('click', toggleToWatched);

    // refs.prevBtn.addEventListener('click', plaginationNavigation);
    // refs.nextBtn.addEventListener('click', plaginationNavigation);
}

 export default function activeDetailsPage(movieId, itsLibraryFilm) {
     refs.homePage.classList.add('hidden');
     refs.movieList.classList.add('hidden');
     refs.footerContainer.classList.add('hidden');
     refs.detailsSectionBlock.classList.remove('hidden')
    //  refs.libraryPage.classList.add('visually-hidden');
     
      if (itsLibraryFilm) {
    let allLocalStorageFilms  = [...JSON.parse(localStorage.getItem('filmsQueue')), ...JSON.parse(localStorage.getItem('filmsWatched'))];
     selectFilm = allLocalStorageFilms.find(film => film.id === movieId);
   } else {
     selectFilm = renderFilms.find(film => film.id === movieId);
   }
     showDetails(selectFilm);

    const button = document.querySelector('#back-button')
     button.addEventListener('click', () => {
         refs.homePage.classList.remove('hidden');
         refs.movieList.classList.remove('hidden');
         refs.footerContainer.classList.remove('hidden');
         refs.detailsSectionBlock.classList.add('visually-hidden')
     });

     document.querySelector('.js-details__queue').addEventListener('click', toggleToQueue);
     document.querySelector('.js-details__watched').addEventListener('click', toggleToWatched);

     refs.btnToQueueList.removeEventListener('click', drawQueueFilmList);
     refs.btnToWatchList.removeEventListener('click', drawWatchedFilmList);
}

refs.linkHomePage.addEventListener('click', activeHomePage);
refs.linkLibrary.addEventListener('click', activeLibraryPage);
refs.linkLogotype.addEventListener('click', activeHomePage);

export {
    selectFilm
}