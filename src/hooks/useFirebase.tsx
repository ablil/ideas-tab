import firebase from "firebase";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { v4 as uuid } from "uuid";

export function useFirebase<T>(collection?: string) {
  const [user] = useAuthState(firebase.auth());
  const [collectionName] = useState(
    collection ? `${user.uid}-${collection}` : user.uid
  );
  const [items, loading] = useCollectionData<T>(
    firebase.firestore().collection(collectionName)
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
    return firebase.firestore().collection(collectionName).doc(id).delete();
  }

  return { items: items || [], loading, createOrUpdate, remove };
}
