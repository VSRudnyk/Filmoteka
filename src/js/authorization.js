import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { getDatabase, ref, set, onValue } from 'firebase/database';
import * as basicLightbox from 'basiclightbox';
import '../../node_modules/basiclightbox/src/styles/main.scss';
import getRefs from './get-refs';

const firebaseConfig = {
  apiKey: 'AIzaSyDru_yvb94CLLyga06XJjVjjbcRtcd4DxY',
  authDomain: 'authentication-app-78afc.firebaseapp.com',
  databaseURL: 'https://authentication-app-78afc-default-rtdb.firebaseio.com',
  projectId: 'authentication-app-78afc',
  storageBucket: 'authentication-app-78afc.appspot.com',
  messagingSenderId: '25662515291',
  appId: '1:25662515291:web:91dceb30df0dad99c1377e',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const providerFb = new FacebookAuthProvider();
const providerGithub = new GithubAuthProvider();
const db = getDatabase();
const refs = getRefs();
refs.logoutBtn.style.display = 'none';
const filmBase = [];

const instance = basicLightbox.create(
  `
  <div class="modal">
      <div class="modal-auth-container">
        <h3 class="auth-container-title">Log in</h3>
        <button type="button" id="close-modal-btn">
          <svg width="25" height="25">
            <use href="/Filmoteka/sprite.ba1893dc.svg#close-btn"></use>
          </svg>
        </button>
        <p class="auth-container-text">To log in, enter your email address and password</p>
        <input type="email" placeholder="E-mail" class="email-input" id="login-email">
        <input type="password" placeholder="Password" class="passw-input" id="login-password">
        <button class="login-btn" id="loginBtn">Log in</button>
        <p class="auth-google-text">Authorization with social networks</p>
        <div class="auth-social">
          <ul class="social-list">
            <li class="social-items">
              <a id="login-google" class="social-login-btn">
                <svg width="25" height="25">
                  <use href="/Filmoteka/sprite.ba1893dc.svg#icon-google"></use>
                </svg>
              </a>
            </li>
            <li class="social-items">
              <a id="login-fb" class="social-login-btn fb-btn">
                <svg width="25" height="25">
                  <use href="/Filmoteka/sprite.ba1893dc.svg#facebook"></use>
                </svg>
              </a>
            </li>
            <li class="social-items">
              <a id="login-github" class="social-login-btn git-btn">
                <svg width="25" height="25">
                  <use href="/Filmoteka/sprite.ba1893dc.svg#icon-github"</use>
                </svg>
              </a>
            </li>            
          </ul>
          
          
        </div>

        <button id="openSignUpModalBtn" class="sign-up-btn">Sign up</button>
      </div>
  </div>
`,
  {
    onShow: instance => {
      instance.element().querySelector('#close-modal-btn').onclick = instance.close;
    },
  },
);

const instance2 = basicLightbox.create(
  `
  <div class="modal">
  <div class="modal-auth-container">
    <h3 class="auth-container-title">Sign up</h3>
      <button type="button" id="close-modal-btn">
        <svg width="25" height="25">
          <use href="/Filmoteka/sprite.ba1893dc.svg#close-btn"></use>
        </svg>
      </button>
        <input type="email" placeholder="E-mail" class="email-input sign-up" id="sign-email">
        <input type="password" placeholder="Password" class="passw-input" id="sign-password">
    <button class="login-btn" id="signUp">Sign up</button>
    <button id="alreadyHaveAccount" class="sign-up-btn">Log in</button>
  </div>

</div>
`,
  {
    onShow: instance => {
      instance.element().querySelector('#close-modal-btn').onclick = instance.close;
    },
  },
);

refs.openSignInModalBtn.addEventListener('click', openSigInModal);
refs.logoutBtn.addEventListener('click', logOutUser);

function openSigInModal() {
  instance2.close();
  instance.show();
  const openSignUpModalBtn = document.querySelector('#openSignUpModalBtn');
  openSignUpModalBtn.addEventListener('click', openSignUpModal);

  const loginBtn = document.querySelector('#loginBtn');
  loginBtn.addEventListener('click', loginUser);

  const loginGoogle = document.querySelector('#login-google');
  loginGoogle.addEventListener('click', loginWithGoogle);

  const loginFb = document.querySelector('#login-fb');
  loginFb.addEventListener('click', loginWithFacebook);

  const loginGithub = document.querySelector('#login-github');
  loginGithub.addEventListener('click', loginWithGithub);

  document.addEventListener('keydown', e =>
    e.code === 'Escape' ? instance.close() : instance.show(),
  );
}

function openSignUpModal() {
  instance.close();
  instance2.show();
  const alreadyHaveAccount = document.querySelector('#alreadyHaveAccount');
  alreadyHaveAccount.addEventListener('click', openSigInModal);

  const signUpBtn = document.querySelector('#signUp');
  signUpBtn.addEventListener('click', signUpUser);

  document.addEventListener('keydown', e =>
    e.code === 'Escape' ? instance2.close() : instance2.show(),
  );
}

function signUpUser() {
  let email = document.getElementById('sign-email').value;
  let password = document.getElementById('sign-password').value;

  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      // const user = userCredential.user;
      Notify.success('User created');
      instance2.close();
    })
    .catch(error => {
      Notify.failure('Oops, something went wrong');
      console.log(error);
    });
}

function loginUser() {
  let email = document.getElementById('login-email').value;
  let password = document.getElementById('login-password').value;

  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      Notify.success('User logged');
      instance.close();
    })
    .catch(error => {
      Notify.failure('Wrong username or password');
      console.log(error);
    });
}

function loginWithGoogle() {
  signInWithPopup(auth, provider)
    .then(result => {
      showUserDetails(result.user);
      instance.close();
      Notify.success('User logged in with Google');
    })
    .catch(error => {
      Notify.failure('Oops, something went wrong');
      console.log(error);
    });
}

function loginWithFacebook() {
  signInWithPopup(auth, providerFb)
    .then(result => {
      showUserDetails(result.user);
      instance.close();
      Notify.success('User logged in with Facebook');
    })
    .catch(error => {
      Notify.failure('Oops, something went wrong');
      console.log(error);
    });
}

function loginWithTwitter() {
  signInWithPopup(auth, providerTwit)
    .then(result => {
      showUserDetails(result.user);
      instance.close();
      Notify.success('User logged in with Twitter');
    })
    .catch(error => {
      Notify.failure('Oops, something went wrong');
      console.log(error);
    });
}

function loginWithGithub() {
  signInWithPopup(auth, providerGithub)
    .then(result => {
      showUserDetails(result.user);
      instance.close();
      Notify.success('User logged in with Github');
    })
    .catch(error => {
      Notify.failure('Oops, something went wrong');
      console.log(error);
    });
}

function logOutUser() {
  signOut(auth)
    .then(() => {
      Notify.success('User logged out');
      refs.userDetails.innerHTML = '';
      refs.openSignInModalBtn.style.display = 'block';
      refs.logoutBtn.style.display = 'none';
    })
    .catch(error => {
      Notify.failure('Oops, something went wrong');
      console.log(error);
    });
}

function showUserDetails(user) {
  if (user.photoURL) {
    refs.userDetails.innerHTML = `
  <img class="user-img" src="${user.photoURL}" width=25"px">
  <p class="user-name">${user.displayName}</p>`;
  } else {
    refs.userDetails.innerHTML = `<p class="user-email">${user.email}</p>`;
  }
}

onAuthStateChanged(auth, user => {
  if (user) {
    showUserDetails(user);
    refs.openSignInModalBtn.style.display = 'none';
    refs.logoutBtn.style.display = 'block';
    const { displayName, email, uid, photoURL } = user;
    writeUserData(displayName, email, uid, photoURL);
    // readUserData(auth);
  } else {
  }
});

function writeUserData(displayName, email, uid, photoURL) {
  set(ref(db, 'users/' + uid), {
    name: displayName,
    email: email,
    userId: uid,
    photoUrl: photoURL,
    films: ['Matrix', 'Spider-Man'],
  });
}

function readUserData(auth) {
  const userId = auth.currentUser.uid;
  return onValue(
    ref(db, '/users/' + userId),
    snapshot => {
      console.log(snapshot.val());
    },
    {
      onlyOnce: true,
    },
  );
}
