import { create } from "zustand";
import { getSession, saveSession, clearSession, type Session } from "@pulseboard/shared-core";

type SessionState = {
  session: Session | null;
  setSession: (session: Session | null) => void;
};

export const useSessionStore = create<SessionState>((set) => ({
  session: typeof window !== "undefined" ? getSession() : null,
  setSession: (session) => {
    if (session) {
      saveSession(session);
    } else {
      clearSession();
    }
    set({ session });
  },
}));
