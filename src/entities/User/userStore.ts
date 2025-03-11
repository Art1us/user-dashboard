import { create } from "zustand";

export type TUser = {
  id: string;
  name: string;
  email: string;
  company: {
    name: string;
  };
  address: {
    city: string;
  };
};

type UserStore = {
  users: TUser[];
  setUsers: (users: TUser[]) => void;
  deleteUser: (id: string) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  users: [],
  setUsers: (users) => set({ users }),
  deleteUser: (id: string) =>
    set((state) => ({
      users: state.users.filter((user) => user.id !== id),
    })),
}));
