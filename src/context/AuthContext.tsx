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
  CognitoUserAttribute,
} from "amazon-cognito-identity-js";

// Cognito configuration
const poolData = {
  UserPoolId: "eu-west-3_hjGfLZ4ek",
  ClientId: "6o52fu71729piuktpcfg1d7e3m",
};

const userPool = new CognitoUserPool(poolData);

export interface SignupData {
  email: string;
  password: string;
  phoneNumber: string;
  givenName: string;
  familyName: string;
}

export interface User {
  username: string;
  email?: string;
  name?: string;
  attributes?: { [key: string]: string };
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  signup: (signupData: SignupData) => Promise<string>;
  confirmSignup: (username: string, code: string) => Promise<void>;
  resendConfirmationCode: (username: string) => Promise<void>;
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
              console.log("Session user attributes:", attributes);
              const userAttributes: { [key: string]: string } = {};
              attributes?.forEach((attr) => {
                userAttributes[attr.Name] = attr.Value;
              });

              setUser({
                username: currentUser.getUsername(),
                email: userAttributes["email"],
                name:
                  userAttributes["name"] ||
                  userAttributes["given_name"] ||
                  userAttributes["preferred_username"] ||
                  currentUser.getUsername(),
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
          // Log the authentication result to see the token
          console.log("Authentication result:", result);
          console.log("Access Token:", result.getAccessToken().getJwtToken());
          console.log("ID Token:", result.getIdToken().getJwtToken());

          // Get user attributes after successful login
          cognitoUser.getUserAttributes((err, attributes) => {
            console.log("User attributes:", attributes);
            const userAttributes: { [key: string]: string } = {};
            attributes?.forEach((attr) => {
              userAttributes[attr.Name] = attr.Value;
            });

            setUser({
              username: cognitoUser.getUsername(),
              email: userAttributes["email"],
              name:
                userAttributes["name"] ||
                userAttributes["given_name"] ||
                userAttributes["preferred_username"] ||
                cognitoUser.getUsername(),
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

  const signup = async (signupData: SignupData): Promise<string> => {
    setLoading(true);
    setError(null);

    return new Promise((resolve, reject) => {
      const attributeList: CognitoUserAttribute[] = [];

      // Email attribute
      const dataEmail = {
        Name: "email",
        Value: signupData.email,
      };
      const attributeEmail = new CognitoUserAttribute(dataEmail);
      attributeList.push(attributeEmail);

      // Phone number attribute
      const dataPhone = {
        Name: "phone_number",
        Value: signupData.phoneNumber,
      };
      const attributePhone = new CognitoUserAttribute(dataPhone);
      attributeList.push(attributePhone);

      // Given name attribute
      const dataGivenName = {
        Name: "given_name",
        Value: signupData.givenName,
      };
      const attributeGivenName = new CognitoUserAttribute(dataGivenName);
      attributeList.push(attributeGivenName);

      // Family name attribute
      const dataFamilyName = {
        Name: "family_name",
        Value: signupData.familyName,
      };
      const attributeFamilyName = new CognitoUserAttribute(dataFamilyName);
      attributeList.push(attributeFamilyName);

      userPool.signUp(
        signupData.email,
        signupData.password,
        attributeList,
        [],
        (err, result) => {
          setLoading(false);
          if (err) {
            console.error("Signup error:", err);
            setError(err.message || "An error occurred during signup");
            reject(err);
            return;
          }
          console.log("Signup successful:", result);
          if (result?.user) {
            resolve(result.user.getUsername());
          } else {
            reject(new Error("Signup failed - no user returned"));
          }
        }
      );
    });
  };

  const confirmSignup = async (
    username: string,
    code: string
  ): Promise<void> => {
    setLoading(true);
    setError(null);

    return new Promise((resolve, reject) => {
      const userData = {
        Username: username,
        Pool: userPool,
      };

      const cognitoUser = new CognitoUser(userData);

      cognitoUser.confirmRegistration(code, true, (err, result) => {
        setLoading(false);
        if (err) {
          console.error("Confirmation error:", err);
          setError(err.message || "An error occurred during confirmation");
          reject(err);
          return;
        }

        console.log("Confirmation successful:", result);
        resolve();
      });
    });
  };

  const resendConfirmationCode = async (username: string): Promise<void> => {
    setLoading(true);
    setError(null);

    return new Promise((resolve, reject) => {
      const userData = {
        Username: username,
        Pool: userPool,
      };

      const cognitoUser = new CognitoUser(userData);

      cognitoUser.resendConfirmationCode((err, result) => {
        setLoading(false);
        if (err) {
          console.error("Resend confirmation error:", err);
          setError(
            err.message || "An error occurred while resending confirmation code"
          );
          reject(err);
          return;
        }

        console.log("Confirmation code resent:", result);
        resolve();
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
    signup,
    confirmSignup,
    resendConfirmationCode,
    logout,
    loading,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
