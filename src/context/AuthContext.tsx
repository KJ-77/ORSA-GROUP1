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
  address: string;
  birthdate: string;
  gender: "M" | "F";
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
  forgotPassword: (username: string) => Promise<void>;
  confirmPasswordReset: (
    username: string,
    code: string,
    newPassword: string
  ) => Promise<void>;
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
  const [pendingSignupData, setPendingSignupData] = useState<SignupData | null>(
    null
  );

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
          console.log("ID Token:", result.getIdToken().getJwtToken()); // Get user attributes after successful login
          cognitoUser.getUserAttributes((_err, attributes) => {
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
            // Store signup data for later use in confirmSignup
            setPendingSignupData(signupData);
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

      cognitoUser.confirmRegistration(code, true, async (err, result) => {
        if (err) {
          console.error("Confirmation error:", err);
          setError(err.message || "An error occurred during confirmation");
          setLoading(false);
          reject(err);
          return;
        }

        console.log("Confirmation successful:", result);

        // After successful confirmation, save user data to API
        if (pendingSignupData) {
          try {
            // Since we can't easily get the sub immediately after confirmation,
            // we'll need to authenticate the user first to get their attributes
            const authenticationData = {
              Username: username,
              Password: pendingSignupData.password,
            };

            const authenticationDetails = new AuthenticationDetails(
              authenticationData
            );
            cognitoUser.authenticateUser(authenticationDetails, {
              onSuccess: (_authResult) => {
                // Now we can get user attributes
                cognitoUser.getUserAttributes((attrErr, attributes) => {
                  if (attrErr) {
                    console.error(
                      "Error getting user attributes after auth:",
                      attrErr
                    );
                    setPendingSignupData(null);
                    setLoading(false);
                    resolve(); // Still resolve since confirmation was successful
                    return;
                  }

                  const subAttribute = attributes?.find(
                    (attr) => attr.Name === "sub"
                  );

                  if (subAttribute && pendingSignupData) {
                    // Call API to save user data
                    saveUserToDatabase(subAttribute.Value, pendingSignupData)
                      .then(() => {
                        console.log("User data saved to API successfully");
                        setPendingSignupData(null);
                        setLoading(false);
                        resolve();
                      })
                      .catch((apiError) => {
                        console.error(
                          "Failed to save user to database:",
                          apiError
                        );
                        setPendingSignupData(null);
                        setLoading(false);
                        resolve(); // Still resolve since confirmation was successful
                      });
                  } else {
                    console.error("Could not find user sub attribute");
                    setPendingSignupData(null);
                    setLoading(false);
                    resolve();
                  }
                });
              },
              onFailure: (authError) => {
                console.error(
                  "Authentication failed after confirmation:",
                  authError
                );
                setPendingSignupData(null);
                setLoading(false);
                resolve(); // Still resolve since confirmation was successful
              },
            });
          } catch (error) {
            console.error("Error in confirmSignup API call:", error);
            setPendingSignupData(null);
            setLoading(false);
            resolve(); // Still resolve since Cognito confirmation was successful
          }
        } else {
          setLoading(false);
          resolve();
        }
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

  // Function to save user data to API
  const saveUserToDatabase = async (
    userId: string,
    signupData: SignupData
  ): Promise<void> => {
    try {
      const userData = {
        id: userId,
        first_name: signupData.givenName,
        last_name: signupData.familyName,
        email: signupData.email,
        address: signupData.address,
        birthdate: signupData.birthdate,
        gender: signupData.gender,
        phone_number: signupData.phoneNumber.replace(/^\+/, ""), // Remove + if present
      };

      const response = await fetch(
        import.meta.env.VITE_API_URL + "/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      if (!response.ok) {
        throw new Error(
          `API call failed: ${response.status} ${response.statusText}`
        );
      }

      console.log("User data saved to database successfully");
    } catch (error) {
      console.error("Failed to save user data to database:", error);
      throw error;
    }
  };

  const forgotPassword = async (username: string): Promise<void> => {
    setLoading(true);
    setError(null);

    return new Promise((resolve, reject) => {
      const userData = {
        Username: username,
        Pool: userPool,
      };

      const cognitoUser = new CognitoUser(userData);

      cognitoUser.forgotPassword({
        onSuccess: () => {
          console.log("Password reset code sent successfully");
          setLoading(false);
          resolve();
        },
        onFailure: (err) => {
          console.error("Forgot password error:", err);
          setError(err.message || "An error occurred while sending reset code");
          setLoading(false);
          reject(err);
        },
        inputVerificationCode: () => {
          // This callback is called when the verification code is sent
          console.log("Verification code sent");
          setLoading(false);
          resolve();
        },
      });
    });
  };

  const confirmPasswordReset = async (
    username: string,
    code: string,
    newPassword: string
  ): Promise<void> => {
    setLoading(true);
    setError(null);

    return new Promise((resolve, reject) => {
      const userData = {
        Username: username,
        Pool: userPool,
      };

      const cognitoUser = new CognitoUser(userData);

      cognitoUser.confirmPassword(code, newPassword, {
        onSuccess: () => {
          console.log("Password reset successful");
          setLoading(false);
          resolve();
        },
        onFailure: (err) => {
          console.error("Password reset confirmation error:", err);
          setError(err.message || "An error occurred while resetting password");
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
    signup,
    confirmSignup,
    resendConfirmationCode,
    forgotPassword,
    confirmPasswordReset,
    logout,
    loading,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
