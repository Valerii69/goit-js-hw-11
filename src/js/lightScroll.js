function lightScroll() {
    // {const { height: cardHeight } = document.querySelector('.gallery').firstElementChild.getBoundingClientRect();
    if (!gallery.firstElementChild) {
      return;
    } else {
      const { height: cardHeight } =
        gallery.firstElementChild.getBoundingClientRect();
      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    }
  }