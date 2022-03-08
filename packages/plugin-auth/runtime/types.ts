export interface AuthConfig {
  NoAuthFallback?: React.ReactNode;
}

export type AuthType = Record<string, boolean>;
export type ContextType = [AuthType, React.Dispatch<React.SetStateAction<AuthType>>];