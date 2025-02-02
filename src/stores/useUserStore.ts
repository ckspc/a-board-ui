import { create } from "zustand";
import { UserData } from "@/types/user";

interface UserState {
  profile: UserData | null;
  setProfile: (profile: UserData) => void;
}

const useUserStore = create<UserState>((set) => ({
  profile: null,
  setProfile: (profile) => set({ profile }),
}));

export default useUserStore;