import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { onModalBtnsRenderingPageFromPageSwitcher } from './page-switcher';

function onModalBtnWatchedLocalStorage(btnAddWatched, data, watched) {
  btnAddWatched.addEventListener('click', e => {
    if (e.target.classList.contains('pressed')) {
      e.target.classList.remove('pressed');
      e.target.textContent = 'add to watched';
      watched.splice(
        watched.findIndex(obj => obj.id === data.id),
        1,
      );
      localStorage.setItem('watched', JSON.stringify(watched));
      setTimeout(() => Notify.failure('Film removed from watched'), 250);
      onModalBtnsRenderingPageFromPageSwitcher();
      // setTimeout(() => Notify.failure('Film removed on watched'), 250);
    } else {
      e.target.classList.add('pressed');
      e.target.textContent = 'remove from watched';
      watched.push(data);
      localStorage.setItem('watched', JSON.stringify(watched));
      onModalBtnsRenderingPageFromPageSwitcher();
      setTimeout(() => Notify.success('Film added to wathed'), 250);
    }
  });
}

function onModalBtnQueueLocalStorage(btnAddQueue, data, queue) {
  btnAddQueue.addEventListener('click', e => {
    if (e.target.classList.contains('pressed')) {
      e.target.classList.remove('pressed');
      e.target.textContent = 'add to queue';
      queue.splice(
        queue.findIndex(obj => obj.id === data.id),
        1,
      );
      localStorage.setItem('queue', JSON.stringify(queue));

      setTimeout(() => Notify.failure('Film removed from queue'), 250);
      onModalBtnsRenderingPageFromPageSwitcher();
      // setTimeout(() => Notify.failure('Film removed on queue'), 250);
    } else {
      e.target.classList.add('pressed');
      e.target.textContent = 'remove from queue';
      queue.push(data);
      localStorage.setItem('queue', JSON.stringify(queue));
      onModalBtnsRenderingPageFromPageSwitcher();
      setTimeout(() => Notify.success('Film added to queue'), 250);
    }
  });
}

export { onModalBtnWatchedLocalStorage, onModalBtnQueueLocalStorage };
