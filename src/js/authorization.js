// import { initializeApp } from 'firebase/app';
// import {
//   getAuth,
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signOut,
//   onAuthStateChanged,
//   GoogleAuthProvider,
//   signInWithPopup,
// } from 'firebase/auth';
// import { getDatabase, ref, set, onValue } from 'firebase/database';
// import * as basicLightbox from 'basiclightbox';
// import '../../node_modules/basiclightbox/src/styles/main.scss';
// import getRefs from './get-refs';

// const firebaseConfig = {
//   apiKey: 'AIzaSyDru_yvb94CLLyga06XJjVjjbcRtcd4DxY',
//   authDomain: 'authentication-app-78afc.firebaseapp.com',
//   databaseURL: 'https://authentication-app-78afc-default-rtdb.firebaseio.com',
//   projectId: 'authentication-app-78afc',
//   storageBucket: 'authentication-app-78afc.appspot.com',
//   messagingSenderId: '25662515291',
//   appId: '1:25662515291:web:91dceb30df0dad99c1377e',
// };

// const app = initializeApp(firebaseConfig);
// const auth = getAuth();
// const provider = new GoogleAuthProvider();
// const db = getDatabase();
// const refs = getRefs();
// refs.logoutBtn.style.display = 'none';
// const filmBase = [];

// const instance = basicLightbox.create(
//   `
//   <div class="modal">
//       <div class="login-container">
//         <h3>Войдите</h3>
//         <button id="close-modal-btn">X</button>
//         <p>С помощью логина и пароля</p>
//         <input type="email" placeholder="E-mail" id="login-email">
//         <input type="password" placeholder="Пароль" id="login-password">
//         <button id="loginBtn">Войти</button>
//         <button id="login-google" class="google-btn"><span>
//           <img src="https://img.icons8.com/color/32/000000/google-logo.png"/>
//         </span>Login with Google</button>
//         <button id="openSignUpModalBtn">Зарегистрироваться</button>
//       </div>
//   </div>
// `,
//   {
//     onShow: instance => {
//       instance.element().querySelector('#close-modal-btn').onclick = instance.close;
//     },
//   },
// );

// const instance2 = basicLightbox.create(
//   `
//   <div class="modal">
//   <div class="login-container">
//     <h3>Зарегистрируйтесь</h3>
//     <button id="close-modal-btn">X</button>
//     <input type="email" placeholder="E-mail" id="sign-email">
//     <input type="password" placeholder="Пароль" id="sign-password">
//     <button id="signUp">Зарегистрироваться</button>
//     <button id="alreadyHaveAccount"">Уже есть аккант</button>
//   </div>

// </div>
// `,
//   {
//     onShow: instance => {
//       instance.element().querySelector('#close-modal-btn').onclick = instance.close;
//     },
//   },
// );

// refs.openSignInModalBtn.addEventListener('click', openSigInModal);
// refs.logoutBtn.addEventListener('click', logOutUser);

// function openSigInModal() {
//   instance2.close();
//   instance.show();
//   const openSignUpModalBtn = document.querySelector('#openSignUpModalBtn');
//   openSignUpModalBtn.addEventListener('click', openSignUpModal);

//   const loginBtn = document.querySelector('#loginBtn');
//   loginBtn.addEventListener('click', loginUser);

//   const loginGoogle = document.querySelector('#login-google');
//   loginGoogle.addEventListener('click', loginWithGoogle);
// }

// function openSignUpModal() {
//   instance.close();
//   instance2.show();
//   const alreadyHaveAccount = document.querySelector('#alreadyHaveAccount');
//   alreadyHaveAccount.addEventListener('click', openSigInModal);

//   const signUpBtn = document.querySelector('#signUp');
//   signUpBtn.addEventListener('click', signUpUser);
// }

// function signUpUser() {
//   let email = document.getElementById('sign-email').value;
//   let password = document.getElementById('sign-password').value;

//   createUserWithEmailAndPassword(auth, email, password)
//     .then(userCredential => {
//       // const user = userCredential.user;
//       console.log('User was created');
//       instance2.close();
//     })
//     .catch(error => {
//       console.log(error);
//     });
// }

// function loginUser() {
//   let email = document.getElementById('login-email').value;
//   let password = document.getElementById('login-password').value;

//   signInWithEmailAndPassword(auth, email, password)
//     .then(userCredential => {
//       console.log('User was Logined');
//       instance.close();
//     })
//     .catch(error => {
//       const errorCode = error.code;
//       const errorMessage = error.message;
//     });
// }

// function loginWithGoogle() {
//   signInWithPopup(auth, provider)
//     .then(result => {
//       console.log(result);
//       showUserDetails(result.user);
//       instance.close();
//     })
//     .catch(error => {
//       console.log(error);
//     });
// }

// function logOutUser() {
//   signOut(auth)
//     .then(() => {
//       console.log('User was logOut');
//       refs.userDetails.innerHTML = '';
//       refs.openSignInModalBtn.style.display = 'block';
//       refs.logoutBtn.style.display = 'none';
//     })
//     .catch(error => {
//       console.log(error);
//     });
// }

// function showUserDetails(user) {
//   if (user.photoURL) {
//     refs.userDetails.innerHTML = `
//   <img class="user-img" src="${user.photoURL}" width="50px">
//   <p>${user.displayName}</p>`;
//   } else {
//     refs.userDetails.innerHTML = `<p>${user.email}</p>`;
//   }
// }

// onAuthStateChanged(auth, user => {
//   if (user) {
//     showUserDetails(user);
//     refs.openSignInModalBtn.style.display = 'none';
//     refs.logoutBtn.style.display = 'block';
//     const { displayName, email, uid, photoURL } = user;
//     writeUserData(displayName, email, uid, photoURL);
//     // readUserData(auth);
//   } else {
//   }
// });

// function writeUserData(displayName, email, uid, photoURL) {
//   set(ref(db, 'users/' + uid), {
//     name: displayName,
//     email: email,
//     userId: uid,
//     photoUrl: photoURL,
//     films: ['Matrix', 'Spider-Man'],
//   });
// }

// function readUserData(auth) {
//   const userId = auth.currentUser.uid;
//   return onValue(
//     ref(db, '/users/' + userId),
//     snapshot => {
//       console.log(snapshot.val());
//     },
//     {
//       onlyOnce: true,
//     },
//   );
// }
