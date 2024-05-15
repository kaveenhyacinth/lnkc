import zustymiddleware from 'zustymiddlewarets';
import {create} from 'zustand'

export type AuthState = {
  isAuthenticated: boolean
}

export type AuthActions = {
  setIsAuthenticated: (isAuthenticated: AuthState['isAuthenticated']) => void
}

const useAuthStore = create<AuthState & AuthActions>(
  zustymiddleware((set) => ({
    isAuthenticated: false,
    setIsAuthenticated: (isAuthenticated: boolean) => set(() => ({isAuthenticated})),
  })))

declare global {
  interface Window {
    store: typeof useAuthStore;
  }
}

window.store = useAuthStore;
export default useAuthStore;