import {
  getDatabase,
  ref,
  child,
  get,
  set,
  update,
  push,
} from "@firebase/database";
import { app } from "../init";
import { Address, User } from "@/types";

const db = getDatabase(app);
const collectionName = "users";

export const createUser = async (
  /* {id, email,
    phone,
    firstName,
    lastName,
    password} */
  user: {
    id: string;
    email: string;
    phone: string;
    firstName: string;
    lastName: string;
    //password: string
  }
) => {
  try {
    /* const user = {
      email,
      phone,
      firstName,
      lastName,
      password
    }; */
    const { id } = user;
    await set(ref(db, `users/${id}`), user);
    return true;
  } catch (error) {
    console.error("Error adding user:", error);
    throw error;
  }
};

export const getUser = async (uid: string): Promise<User | null> => {
  try {
    const snapshot = await get(child(ref(db), `users/` + uid));
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log("No data available");
      return null;
    }
  } catch (error: unknown) {
    //console.error(error);
    throw error;
  }
};

export const removeAddress = async (uid: string, addresses: Address[]) => {
  const updates: any = {};
  updates["/users/" + uid + "/addresses"] = addresses;
  try {
    const res = await update(ref(db), updates);
    return res;
  } catch (e) {
    console.error(e);
  }
};

export const addAddress = async (
  uid: string,
  address: Address,
  addresses: Address[]
) => {
  const updates: any = {};
  updates["/users/" + uid + "/addresses"] = addresses;
  updates["/users/" + uid + "/mainAddress"] = address;
  try {
    const res = await update(ref(db), updates);
    return res;
  } catch (e) {
    console.error(e);
  }
};

export const selectAddress = async (uid: string, address: Address) => {
  const updates: any = {};
  updates["/users/" + uid + "/mainAddress"] = address;
  return update(ref(db), updates);
};

export const toggleLike = async (
  uid: string,
  pid: string
  //likes: string[]
) => {
  const updates: any = {};
  // TODO: redux used
  /*  const userReduxData = fetchUserReduxData();
  const { likes } = userReduxData; */
  const result: any[] = [];
  /* const already = likes.some((l) => l === pid);
  if (already) { result = likes.filter((l) => l !== pid) }
  else { result = likes } */
  updates["/users/" + uid + "/likes"] = result;
  try {
    const res = await update(ref(db), updates);
    return res;
  } catch (e) {
    console.error(e);
  }
};

export const updateSearchEvent = async (
  uid: string,
  latestList: string[],
  latestCategoryList?: string[]
) => {
  const updates: any = {};
  updates["/users/" + uid + "/latestList"] = latestList;
  if (latestCategoryList) {
    updates["/users/" + uid + "/latestCategoryList"] = latestCategoryList;
  }
  console.log(update(ref(db), updates));
  return;
};
