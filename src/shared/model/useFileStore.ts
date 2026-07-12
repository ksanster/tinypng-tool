import { create } from 'zustand/react';

interface FileStore {
  location: string | null;
  fileName: string | null;
  isLoading: boolean;
  uploadError: string;
}

interface Actions {
  setError: (value: string) => void;
  startUpload: (fileName: string) => void;
  uploadComplete: (location: string) => void;
  clear: () => void;
}

const initState: FileStore = {
  location: null,
  fileName: null,
  uploadError: '',
  isLoading: false,
};

export const useFileStore = create<FileStore & Actions>((set) => ({
  ...initState,
  setError: (value) => {
    set({ uploadError: value, isLoading: false });
  },
  startUpload: (fileName) => {
    set({ isLoading: true, fileName, uploadError: '' });
  },
  uploadComplete: (location) => {
    console.log('Upload complete ' + location)
    set({ location, isLoading: false });
  },
  clear: () => {
    set({ ...initState });
  },
}));
