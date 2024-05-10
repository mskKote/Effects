import {
  GoogleAuthProvider,
  GithubAuthProvider,
  createUserWithEmailAndPassword as _createUserWithEmailAndPassword,
  signInWithEmailAndPassword as _signInWithEmailAndPassword,
  signInWithPopup,
  sendEmailVerification,
  onAuthStateChanged as _onAuthStateChanged,
  NextOrObserver,
  User,
} from "firebase/auth";

import { auth } from "@lib/firebase/firebase";

export function onAuthStateChanged(cb: NextOrObserver<User>) {
  return _onAuthStateChanged(auth, cb);
}

export async function createUserWithEmailAndPassword(
  email: string,
  password: string
) {
  console.log("[signInWithEmailAndPassword] auth", auth);
  try {
    const { user } = await _createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await sendEmailVerification(user);
  } catch (error) {
    console.error("Error creating account with email & password", error);
  }
}

export async function signInWithEmailAndPassword(
  email: string,
  password: string
) {
  console.log("[signInWithEmailAndPassword] auth", auth);

  try {
    await _signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error("Error signing in with email & password", error);
  }
}

export async function signInWithGoogle() {
  console.log("[signInWithGoogle] auth", auth);
  const provider = new GoogleAuthProvider();

  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.error("Error signing in with Google", error);
  }
}

export async function signInWithGithub() {
  console.log("[signInWithGithub] auth", auth);
  const provider = new GithubAuthProvider();

  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.error("Error signing in with Google", error);
  }
}

export async function signOut() {
  try {
    return auth.signOut();
  } catch (error) {
    console.error("Error signing out with Google", error);
  }
}
