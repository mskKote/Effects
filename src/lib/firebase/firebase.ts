import configuration from "@lib/configuration";
import { initializeApp, getApps } from "firebase/app";
import {
  getAuth,
  signInWithCustomToken,
  connectAuthEmulator,
} from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getStorage, connectStorageEmulator } from "firebase/storage";

export const firebaseApp =
  getApps().length === 0 ? initializeApp(configuration.firebase) : getApps()[0];
export const auth = getAuth(firebaseApp);
export const storage = getStorage(firebaseApp);
export const db = getFirestore(firebaseApp);

if (configuration.emulator.useEmulator && !configuration.isStorybookBuild) {
  connectFirestoreEmulator(
    db,
    "localhost",
    configuration.emulator.firestoreEmulatorPort
  );

  connectAuthEmulator(
    auth,
    `http://localhost:${configuration.emulator.firebaseAuthPort}`
  );

  connectStorageEmulator(
    storage,
    "localhost",
    configuration.emulator.firebaseStoragePort
  );
}
