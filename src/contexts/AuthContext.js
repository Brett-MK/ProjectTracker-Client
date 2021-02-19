import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  async function register(email, password, firstName, lastName) {
    await auth.createUserWithEmailAndPassword(email, password);
    return auth.currentUser.updateProfile({
      displayName: `${firstName} ${lastName}`,
    });
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut();
  }

  function updateEmail(email) {
    auth.currentUser.updateEmail(email);
  }

  function updatePassword(password) {
    auth.currentUser.updatePassword(password);
  }

  function updateName(name) {
    auth.currentUser.updateProfile({ displayName: name });
  }

  function getIdToken() {
    return auth.currentUser.getIdToken(true);
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    register,
    login,
    logout,
    updateEmail,
    updatePassword,
    updateName,
    getIdToken,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
