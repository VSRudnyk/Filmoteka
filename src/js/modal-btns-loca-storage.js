import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { onModalBtnsRenderingPageFromPageSwitcher } from './page-switcher';

import { translateMsg } from './notiflix-translate';
import messages from './languages/notiflix.json';
const watchedFailureMsg = messages.watched.failure;
const watchedSuccessMsg = messages.watched.success;
const queueFailureMsg = messages.queue.failure;
const queueSuccessMsg = messages.queue.success;
function onModalBtnWatchedLocalStorage(btnAddWatched, data, watched, queue) {
  btnAddWatched.addEventListener('click', e => {
    if (
      e.path[1].children[1].classList.contains('pressed') &&
      !e.target.classList.contains('pressed')
    ) {
      e.path[1].children[1].classList.remove('pressed');
      e.path[1].children[1].textContent = 'add to queue';
      queue.splice(
        queue.findIndex(obj => obj.id === data.id),
        1,
      );
      localStorage.setItem('queue', JSON.stringify(queue));
    } // дві кнопки не може бути активними зразу
    if (e.target.classList.contains('pressed')) {
      e.target.classList.remove('pressed');
      e.target.textContent = 'add to watched';
      watched.splice(
        watched.findIndex(obj => obj.id === data.id),
        1,
      );
      localStorage.setItem('watched', JSON.stringify(watched));
      setTimeout(() => Notify.failure(translateMsg(watchedFailureMsg)), 250);
      onModalBtnsRenderingPageFromPageSwitcher();
      // setTimeout(() => Notify.failure('Film removed on watched'), 250);
    } else {
      e.target.classList.add('pressed');
      e.target.textContent = 'remove from watched';
      watched.push(data);
      localStorage.setItem('watched', JSON.stringify(watched));
      onModalBtnsRenderingPageFromPageSwitcher();
      setTimeout(() => Notify.success(translateMsg(watchedSuccessMsg)), 250);
    }
  });
}

function onModalBtnQueueLocalStorage(btnAddQueue, data, queue, watched) {
  btnAddQueue.addEventListener('click', e => {
    if (
      e.path[1].children[0].classList.contains('pressed') &&
      !e.target.classList.contains('pressed')
    ) {
      e.path[1].children[0].classList.remove('pressed');
      e.path[1].children[0].textContent = 'add to queue';
      watched.splice(
        watched.findIndex(obj => obj.id === data.id),
        1,
      );
      localStorage.setItem('watched', JSON.stringify(watched));
    } // дві кнопки не може бути активними зразу
    if (e.target.classList.contains('pressed')) {
      e.target.classList.remove('pressed');
      e.target.textContent = 'add to queue';
      queue.splice(
        queue.findIndex(obj => obj.id === data.id),
        1,
      );
      localStorage.setItem('queue', JSON.stringify(queue));

      setTimeout(() => Notify.failure(translateMsg(queueFailureMsg)), 250);
      onModalBtnsRenderingPageFromPageSwitcher();
      // setTimeout(() => Notify.failure('Film removed on queue'), 250);
    } else {
      e.target.classList.add('pressed');
      e.target.textContent = 'remove from queue';
      queue.push(data);
      localStorage.setItem('queue', JSON.stringify(queue));
      onModalBtnsRenderingPageFromPageSwitcher();
      setTimeout(() => Notify.success(translateMsg(queueSuccessMsg)), 250);
    }
  });
}

export { onModalBtnWatchedLocalStorage, onModalBtnQueueLocalStorage };
