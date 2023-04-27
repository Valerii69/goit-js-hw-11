import { lightScroll } from './js/lightScroll';
import Notiflix from 'notiflix';
import ApiPhotoService from './fetchPhotos.js';
// Описаний в документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';

const apiPhotoService = new ApiPhotoService();
const lightbox = new SimpleLightbox('.photo-link', { captionsDelay: 1000 });
const params = {
  root: null,
  rootMargin: '200px',
  threshold: 1,
};

const linkElemById = {
  searchForm: document.getElementById('search-form'),
  galleryAll: document.querySelector('.gallery'),
  btnLoadMore: document.querySelector('.load-more'),
  guard: document.querySelector('.guard'),
};

let totalPage = '15';

function observeObj(entries) {
  //   console.log(entries);

  entries.forEach(entry => {
    if (entry.isIntersecting) {
      observer.unobserve(entry.target);
      apiPhotoService.page += 1;
      if (entry.intersectionRatio === 1 && apiPhotoService.page === totalPage) {
        Notiflix.Notify.failure(
          "We're sorry, but you've reached the end of search results."
        );
      }
      apiPhotoService.fetchPhoto().then(data => {
        renderMarkupPhotos(data);
        const hasPhoto =
          apiPhotoService.page < totalPage && data.totalHits === 500;
        if (hasPhoto) {
          if (data.totalHits < 500) {
            return;
          }
          observer.observe(linkElemById.guard);
        }
      });
    }
  });
}

const observer = new IntersectionObserver(observeObj, params);

linkElemById.searchForm.addEventListener('submit', onSubmitSearchForm);
linkElemById.galleryAll.addEventListener('click', selectGalleryElem);
document.addEventListener('scroll', lightScroll);

function selectGalleryElem(evt) {
  evt.preventDefault();
}

function onSubmitSearchForm(evt) {
  evt.preventDefault();
  apiPhotoService.query = evt.currentTarget.elements.searchQuery.value;
  clearAll();
  if (apiPhotoService.query === '') {
    clearAll();
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }
  apiPhotoService.resetPage();
  apiPhotoService.fetchPhoto().then(data => {
    // console.log(data);
    const { hits, totalHits } = data;
    if (hits.length === 0) {
      clearAll();
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    renderMarkupPhotos(data);
    observer.observe(linkElemById.guard);
    Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`); //повідомлення, в якому написано, скільки всього знайшли зображень (властивість totalHits)
  });
}

function renderMarkupPhotos(data) {
  let markup = '';
  markup = data.hits
    .map(
      ({
        webformatURL, //webformatURL
        largeImageURL, //посилання на велике зображення.
        tags, //рядок з описом зображення. Підійде для атрибуту alt.
        likes, //кількість лайків.
        views, //кількість переглядів.
        comments, //кількість коментарів.
        downloads, //кількість завантажень.
      }) => `<a class="photo-link" href=${largeImageURL}>
        <div class="photo-card"><img class="gallery-image" src="${webformatURL}" alt="${tags}" loading="lazy" width = '300px'/></div>
        <div class="info">
          <p class="info-item"><b>Likes</b>${likes}</p>
          <p class="info-item"><b>Views</b>${views}</p>
          <p class="info-item"><b>Comments</b>${comments}</p>
          <p class="info-item"><b>Downloads</b>${downloads}</p>
          </div></a>`
    ).join('');
  linkElemById.galleryAll.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh(); //після додавання нової групи карток зображень.
}

function clearAll() {
  linkElemById.galleryAll.innerHTML = '';
}
