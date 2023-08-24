import { FirebaseApp } from "validator/firebase";
import { signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'

export class AuthAPI {
    static async signin(email, password) {
        const response = await signInWithEmailAndPassword(FirebaseApp.auth, email, password);
        return response.user.toJSON();
    }
    static async signup(email, password) {
        const response = await createUserWithEmailAndPassword(FirebaseApp.auth, email, password);
        return response.user.toJSON();
    }

    static async signout() {
        signOut(FirebaseApp.auth);

    }
}