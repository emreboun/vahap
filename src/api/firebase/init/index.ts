import { initializeApp } from "@firebase/app";
import { getDatabase } from "@firebase/database";
import { getAuth } from "@firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBxPwo_MMwr3LLeZMzlDRqllnhwUs1wq5I",
  authDomain: "getir-f993c.firebaseapp.com",
  databaseURL:
    "https://getir-f993c-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "getir-f993c",
  storageBucket: "getir-f993c.appspot.com",
  //messagingSenderId:
  //  "155977535451-63gp07vptdj8ll0v60ek2aq9p1vicilc.apps.googleusercontent.com",
  appId: "155977535451",
};

export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);

/* const firebaseConfig1 = {
  apiKey: "AIzaSyCrcAaPvkk1VTd8WeCvcy3oYpPSl2EN6FA",
  authDomain: "yeapp-aed2d.firebaseapp.com",
  databaseURL: "https://yeapp-aed2d-default-rtdb.firebaseio.com",
  projectId: "yeapp-aed2d",
  storageBucket: "yeapp-aed2d.appspot.com",
  messagingSenderId:
    "710802244655-63gp07vptdj8ll0v60ek2aq9p1vicilc.apps.googleusercontent.com",
  appId: "710802244655",
}; */
