import { SiteOptions } from "@/types";
import { db } from "../init";
import {
  getDatabase,
  ref,
  get,
  set,
  update,
  remove,
  limitToFirst,
  startAt,
  Query,
  query,
  startAfter,
  orderByKey,
  orderByValue,
  orderByChild,
} from "@firebase/database";

const getOrder = () => {
  const val = (Math.random() * Math.random() * Math.random() * 1000000) % 16;
  if (val < 10) {
    return (
      (Math.random() * Math.random() * Math.random() * 1000000) %
      256
    ).toString();
  } else {
    switch (val) {
      case 10:
        return "A";
      case 11:
        return "B";
      case 12:
        return "C";
      case 13:
        return "D";
      case 14:
        return "E";
      case 15:
        return "F";
      default:
        return null;
    }
  }
};

// Function to save site preferences to Firebase Firestore

export const saveSiteOptions = async (
  preferences: SiteOptions
): Promise<void> => {
  try {
    let id = "";
    for (let i = 0; i < 8; i++) {
      const char = getOrder();
      id += char;
    }
    const siteRef = ref(db, "sites/" + id);
    await set(siteRef, { id: id, ...preferences });
    console.log("Site preferences saved successfully!");
  } catch (error) {
    console.error("Error saving site preferences:", error);
    throw error;
  }
};
/* 
// Function to get site preferences from Firebase Firestore
export const getSiteOptions = async (): Promise<SiteOptions | null> => {
  try {
    const siteRef = ref(db, "sites/");
    const siteSnapshot = await get(siteRef);
    if (siteSnapshot.exists()) {
      return siteSnapshot.val() as SiteOptions;
    }
    return null;
  } catch (error) {
    console.error("Error fetching site:", error);
    throw error;
  }
};

// Example usage:
const newSiteOptions: SiteOptions = {
  theme: {
    primaryColor: "#ff0000",
    secondaryColor: "#00ff00",
    border: "1px solid #000000",
    borderRadius: 5,
  },
  logoUrl: "https://example.com/logo.png",
  domainUrl: "https://example.com",
  companyName: "Example Company",
  contactEmail: "example@example.com",
  currency: "TL",
  // Other preferences if present
};

// Save site preferences
saveSiteOptions(newSiteOptions);

// Retrieve site preferences
getSiteOptions().then((preferences) => {
  if (preferences) {
    console.log("Retrieved site preferences:", preferences);
  }
}); */
