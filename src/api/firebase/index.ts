import {
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updatePassword,
  onAuthStateChanged,
  User,
} from "@firebase/auth";
import { auth } from "./init";

// Login
const login = async (email: string, password: string) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    return res;
  } catch (error: unknown) {
    //console.error("Login error:", error);
    throw error;
  }
};

// Signup
const signup = async (email: string, password: string) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    return res;
  } catch (error: unknown) {
    throw error;
    //return error.message;
    console.error("Signup error:", error);
  }
};

// Password reset
const sendPasswordResetEmail_ = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    console.log("Password reset email sent");
  } catch (error) {
    console.error("Password reset error:", error);
  }
};

// Change password
const changePassword = async (newPassword: string) => {
  try {
    const user = auth.currentUser;
    if (user) {
      await updatePassword(user, newPassword);
      console.log("Password changed successfully");
    } else {
      console.error("No user found");
    }
  } catch (error) {
    console.error("Change password error:", error);
  }
};

const logout = async () => {
  try {
    return await signOut(auth);
    console.log("Logout successful");
    // Perform any additional actions after successful logout
  } catch (error) {
    console.error("Logout error:", error);
  }
};

// Usage example
const getUserCredit = async () => {
  try {
    const currentUser = await getCurrentUser();
    if (currentUser) {
      console.log("Current user:", currentUser);
      console.log("User ID:", currentUser.uid);
      console.log("Email:", currentUser.email);
      return currentUser;
      // Access other user properties as needed
    } else {
      console.log("No user signed in");
      return null;
    }
  } catch (error) {
    console.error("Error getting current user:", error);
  }
};

// User

// Check if a user is currently signed in
const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user: any) => {
        unsubscribe();
        resolve(user);
      },
      reject
    );
  });
};

// Check authentication status using Firebase Auth
const checkAuthentication = (req?: any) => {
  return new Promise((resolve, reject) => {
    //const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve({ authenticatedUser: user });
      } else {
        resolve({ authenticatedUser: null });
      }
    });
  });
};

export {
  logout,
  login,
  signup,
  sendPasswordResetEmail_,
  changePassword,
  getUserCredit,
  checkAuthentication,
};
