import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
} from "amazon-cognito-identity-js";

// Cognito configuration
const poolData = {
  UserPoolId: "eu-west-3_hjGfLZ4ek",
  ClientId: "6o52fu71729piuktpcfg1d7e3m",
};

const userPool = new CognitoUserPool(poolData);

export interface User {
  username: string;
  email?: string;
  attributes?: { [key: string]: string };
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check if user is already logged in on app load
  useEffect(() => {
    const currentUser = userPool.getCurrentUser();
    if (currentUser) {
      currentUser.getSession((err: any, session: any) => {
        if (err) {
          console.error("Error getting session:", err);
          setLoading(false);
          return;
        }

        if (session.isValid()) {
          currentUser.getUserAttributes((err, attributes) => {
            if (err) {
              console.error("Error getting user attributes:", err);
            } else {
              const userAttributes: { [key: string]: string } = {};
              attributes?.forEach((attr) => {
                userAttributes[attr.Name] = attr.Value;
              });

              setUser({
                username: currentUser.getUsername(),
                email: userAttributes["email"],
                attributes: userAttributes,
              });
            }
            setLoading(false);
          });
        } else {
          setLoading(false);
        }
      });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (username: string, password: string): Promise<void> => {
    setLoading(true);
    setError(null);

    return new Promise((resolve, reject) => {
      const authenticationData = {
        Username: username,
        Password: password,
      };

      const authenticationDetails = new AuthenticationDetails(
        authenticationData
      );
      const userData = {
        Username: username,
        Pool: userPool,
      };

      const cognitoUser = new CognitoUser(userData);

      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          // Get user attributes after successful login
          cognitoUser.getUserAttributes((err, attributes) => {
            const userAttributes: { [key: string]: string } = {};
            attributes?.forEach((attr) => {
              userAttributes[attr.Name] = attr.Value;
            });

            setUser({
              username: cognitoUser.getUsername(),
              email: userAttributes["email"],
              attributes: userAttributes,
            });
            setLoading(false);
            resolve();
          });
        },
        onFailure: (err) => {
          setError(err.message || "Login failed");
          setLoading(false);
          reject(err);
        },
      });
    });
  };

  const logout = () => {
    const currentUser = userPool.getCurrentUser();
    if (currentUser) {
      currentUser.signOut();
    }
    setUser(null);
    setError(null);
  };

  const value = {
    user,
    login,
    logout,
    loading,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
