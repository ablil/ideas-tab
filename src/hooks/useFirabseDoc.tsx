import firebase from "firebase";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { v4 as uuid } from "uuid";

export default function useFirebaseDoc<T>(docId: string, collection?: "") {
  const [user] = useAuthState(firebase.auth());
  const [collectionName] = useState(
    collection ? `${user.uid}-${collection}` : user.uid
  );

  const [item, loading, error] = useDocumentData<T>(
    firebase.firestore().doc(`${collectionName}/${docId}`)
  );

  function createOrUpdate(item: T & { id: string }) {
    if (!item.id) item.id = uuid();
    return firebase
      .firestore()
      .collection(collectionName)
      .doc(item.id)
      .set(item);
  }

  function remove(id: string) {
    return firebase.firestore().collection(collectionName).doc(docId).delete();
  }

  return { item, loading, createOrUpdate, remove };
}
