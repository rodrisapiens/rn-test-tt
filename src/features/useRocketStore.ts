import { create } from "zustand";

export type Rocket = {
  id: string;
  name: string;
  type: string;
  image: string | null;
};

type RocketStore = {
  rockets: Rocket[];
  setRockets: (rockets: Rocket[]) => void;
};

const useRocketStore = create<RocketStore>((set) => ({
  rockets: [],
  setRockets: (rockets) => set({ rockets }),
}));

export default useRocketStore;
