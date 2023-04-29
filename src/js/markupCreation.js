//  export function renderMarkupPhotos(data) {
//     let markup = '';
//     markup = data.hits
//       .map(({
//           webformatURL,
//           largeImageURL,
//           tags,
//           likes,
//           views,
//           comments,
//           downloads,
//         }) => {return `<a class="photo-link" href=${largeImageURL}>
//           <div class="photo-card"><img class="gallery-image" src="${webformatURL}" alt="${tags}" loading="lazy" width = '300px'/></div>
//           <div class="info">
//             <p class="info-item"><b>Likes</b>${likes}</p>
//             <p class="info-item"><b>Views</b>${views}</p>
//             <p class="info-item"><b>Comments</b>${comments}</p>
//             <p class="info-item"><b>Downloads</b>${downloads}</p>
//             </div></a>`
//   }).join('');
//     linkElemById.galleryAll.insertAdjacentHTML('beforeend', markup);
//     //після додавання нової групи карток зображень.
//     lightbox.refresh();
//   }
//   function clearAll() {
//     linkElemById.galleryAll.innerHTML = '';
//   }