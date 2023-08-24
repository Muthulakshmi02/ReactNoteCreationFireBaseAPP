
import { collection, doc, updateDoc, orderBy, query, getDocs, addDoc, deleteDoc, onSnapshot } from "firebase/firestore"
import { FirebaseApp } from "validator/firebase"


// Access using Firebase DB
//https://console.firebase.google.com/u/0/project/reactnotemanager/firestore/data/~2FReactNotes~2FiExMXBiKIhrRjcYtQwkE
//https://firebase.google.com/docs/firestore/query-data/get-data
//Add - https://firebase.google.com/docs/firestore/manage-data/add-data#add_a_document
//Delete - https://firebase.google.com/docs/firestore/manage-data/delete-data
//Update - https://firebase.google.com/docs/firestore/manage-data/add-data#update-data

export class NoteAPI {
    static async create(formValues) {
        const response = await addDoc(collection(FirebaseApp.db, "ReactNotes"), formValues);
        return {
            id: response.id,
            ...formValues,
        }
    }
    static async fetchAll() {
        const q = query(collection(FirebaseApp.db, "ReactNotes"), orderBy("created_at", "asc"))
        const response = await getDocs(q);
        return response.docs.map((document) => {
            return {
                id: document.id,
                ...document.data(),
            }
        })

    }

    static async deleteById(noteId) {
        deleteDoc(doc(FirebaseApp.db, "ReactNotes", noteId));
    }
    static async updateById(id, values) {
        const query = doc(FirebaseApp.db, "ReactNotes", id);
        await updateDoc(query, values)
        return {
            id: id,
            ...values
        }
    }

    //To syn two user at a time
    //https://firebase.google.com/docs/firestore/query-data/listen
    static onShouldSyncNotes(onChange) {
        const q = query(collection(FirebaseApp.db, "ReactNotes"));
        const unsub = onSnapshot(q, (querySnapshot) => {
            const isUserPerformingChange = querySnapshot.metadata.hasPendingWrites;
            if (!isUserPerformingChange) {
                console.log("You are not synced with the nootes collection");
                onChange();
            }
        })
        return unsub;
    }

}

















/* Thie is used for npm run dev server which we have local DB and accessed using PostMap/other API 
import axios from "axios";


const BASE_URL = "http://localhost:3200/notes";

const parseDMY = (dateString) => {
    let [d, m, y] = dateString.split("/");
    return new Date(y, m - 1, d);
}; 

export class NoteAPI {
    static async create(formValues) {
        return this.formatId((await axios.post(`${BASE_URL}`, formValues)).data);
    }
    static async fetchAll() {
        return (await axios.get(`${BASE_URL}`)).data.map(this.formatId);
    }

    static async deleteById(noteId) {
        return (await axios.delete(`${BASE_URL}/${noteId}`)).data;
    }
    static async updateById(id, values) {
        return this.formatId((await axios.patch(`${BASE_URL}/${id}`, values)).data);
    }
    static async fetchById(noteId) {
        return this.formatId((await axios.get(`${BASE_URL}/${noteId}`)).data);
    }

    static formatId(note) {
        return {
            ...note,
            id: note.id.toString()
        }
    }


} */
/*To Sort the  note by date
static async fetchAll() {
    const q = query(
        collection(FirebaseApp.db, "notes"),
        orderBy("created_at", "asc")
    );
    const response = await getDocs(q);
    return response.docs
        .map((document) => {
            return {
                id: document.id,
                ...document.data(),
            };
        })
        .sort((a, b) => {
            return parseDMY(a.created_at) > parseDMY(b.created_at);
        });
} */