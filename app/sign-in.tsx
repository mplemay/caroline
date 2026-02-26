import { useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";

import { authClient } from "@/lib/auth/client";

export default function SignInScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleGoogleSignIn = async () => {
    setErrorMessage(null);
    setIsLoading(true);

    try {
      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });

      if (error) {
        setErrorMessage(error.message ?? "Could not sign in with Google.");
      }
    } catch {
      setErrorMessage("Could not sign in with Google.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign in to continue</Text>
      <Pressable
        accessibilityRole="button"
        disabled={isLoading}
        onPress={handleGoogleSignIn}
        style={({ pressed }) => [
          styles.button,
          isLoading ? styles.buttonDisabled : null,
          pressed ? styles.buttonPressed : null,
        ]}>
        {isLoading ? (
          <ActivityIndicator color="#ffffff" />
        ) : (
          <Text style={styles.buttonLabel}>Continue with Google</Text>
        )}
      </Pressable>
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    gap: 16,
    backgroundColor: "#f3f4f6",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
  },
  button: {
    minWidth: 240,
    borderRadius: 12,
    backgroundColor: "#1f2937",
    paddingHorizontal: 20,
    paddingVertical: 14,
    alignItems: "center",
  },
  buttonPressed: {
    opacity: 0.85,
  },
  buttonDisabled: {
    opacity: 0.65,
  },
  buttonLabel: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  error: {
    marginTop: 8,
    color: "#b91c1c",
    fontSize: 14,
  },
});
