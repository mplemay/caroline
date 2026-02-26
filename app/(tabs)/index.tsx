import { useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { authClient } from "@/lib/auth/client";

export default function HomeScreen() {
  const { data: session, isPending } = authClient.useSession();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await authClient.signOut();
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        <ThemedText type="title">Welcome</ThemedText>
        {isPending ? (
          <ActivityIndicator />
        ) : (
          <View style={styles.userInfo}>
            <ThemedText type="subtitle">{session?.user.name ?? "Unknown user"}</ThemedText>
            <ThemedText>{session?.user.email ?? "No email available"}</ThemedText>
          </View>
        )}
        <Pressable
          accessibilityRole="button"
          disabled={isSigningOut}
          onPress={handleSignOut}
          style={({ pressed }) => [
            styles.button,
            isSigningOut ? styles.buttonDisabled : null,
            pressed ? styles.buttonPressed : null,
          ]}>
          <ThemedText style={styles.buttonLabel}>{isSigningOut ? "Signing out..." : "Sign out"}</ThemedText>
        </Pressable>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  content: {
    width: "100%",
    maxWidth: 360,
    gap: 16,
    alignItems: "center",
  },
  userInfo: {
    gap: 6,
    alignItems: "center",
  },
  button: {
    minWidth: 180,
    borderRadius: 10,
    backgroundColor: "#1f2937",
    paddingHorizontal: 18,
    paddingVertical: 12,
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
    fontWeight: "600",
  },
});
