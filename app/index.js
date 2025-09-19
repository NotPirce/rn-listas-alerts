import React from "react";
import { Link } from "expo-router";
import { View, Text, StyleSheet } from "react-native";

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Listas & Alert/Toast</Text>

      {/*Enlaces a las pantallas de productos y secciones*/}
      <Link href="/productos" style={styles.link}>
        ▸ Ir a Productos (FlatList)
      </Link>
      <Link href="/secciones" style={styles.link}>
        ▸ Ir a Secciones (SectionList)
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, gap: 12 },
  title: { fontSize: 22, fontWeight: "800", color: "#0f172a", marginBottom: 8 },
  link: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    fontSize: 16,
    color: "#0f172a",
  },
});
