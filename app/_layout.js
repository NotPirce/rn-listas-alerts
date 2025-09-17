import React from "react";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Toast from "react-native-toast-message";

// Un layout actua como marco para sus rutas hijas

export default function RootLayout() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f6f9fc" }}>
      {/* Las pantallas dentro de esta carpeta se renderizarn dentro de este stack */}
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#0ea5e9" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "700" },
        }}
      />

        {/*Monta el contenedor global de toast una sola vez*/}
      <Toast />
      <StatusBar style="dark" />
    </SafeAreaView>
  );
}
