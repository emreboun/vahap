import { ref, get, set, update, child, remove } from "@firebase/database";
import { db } from "../init";
import { LectureEntity } from "@/types"; // Adjust the path as needed
import { v4 } from "uuid";

//import { initializeApp } from "firebase/app";
/* import {
  getDatabase,
  ref,
  set,
  get,
  update,
  remove,
  child,
} from "firebase/database"; */

// Create a new lecture
export const createLecture = async (lecture: LectureEntity) => {
  const uuid = v4();
  const lectureRef = ref(db, `lectures/${lecture.slug ?? lecture.id ?? uuid}`);
  try {
    await set(lectureRef, {
      ...lecture,
      status: true,
      id: lecture.id ?? uuid,
    });
    return { ...lecture, id: lecture.id ?? uuid, status: true };
  } catch (e: unknown) {
    console.error(e);
    return null;
  }
};

// Read a single lecture by ID
export const getLecture = async (
  slug: string
): Promise<LectureEntity | null> => {
  try {
    const snapshot = await get(child(ref(db), `lectures/${slug}`));
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
  /* const lectureRef = ref(db, `lectures/${id}`);
  const snapshot = await get(lectureRef);
  if (snapshot.exists()) {
    return snapshot.val() as LectureEntity;
  }
  return null; */
};

// Read all lectures
export const getAllLectures = async (): Promise<LectureEntity[]> => {
  try {
    const snapshot = await get(child(ref(db), `lectures/`));
    if (snapshot.exists()) {
      const temp = snapshot.val();
      const list: LectureEntity[] = [];
      Object.keys(temp).forEach((key) => {
        list.push({ id: key, ...temp[key] });
      });
      console.log(list);
      return list;
    } else {
      console.log("No data available");
      return [];
    }
  } catch (error: unknown) {
    //console.error(error);
    throw error;
  }
  /* const lecturesRef = ref(db, "lectures");
  const snapshot = await get(lecturesRef);
  if (snapshot.exists()) {
    return Object.values(snapshot.val()) as LectureEntity[];
  }
  return []; */
};

// Update a lecture
export const updateLecture = async (
  id: string,
  updatedFields: Partial<LectureEntity>
) => {
  const lectureRef = ref(db, `lectures/${id}`);
  await update(lectureRef, updatedFields);
};

// Delete a lecture
export const deleteLecture = async (id: string) => {
  try {
    const lectureRef = ref(db, `lectures/${id}`);
    await remove(lectureRef);
    return true;
  } catch (e: unknown) {
    console.error(e);
    return false;
  }
};
