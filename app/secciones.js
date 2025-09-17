import React, { useMemo } from "react";
import { View, Text, StyleSheet, SectionList } from "react-native";

// Estas son las secciones
const SECCIONES = [
  {
    title: "Bebidas",
    data: [
      { id: "b-1", nombre: "Agua", precio: 800 },
      { id: "b-2", nombre: "Café", precio: 1200 },
    ],
  },
  {
    title: "Snacks",
    data: [
      { id: "s-1", nombre: "Maní", precio: 900 },
      { id: "s-2", nombre: "Galletas", precio: 1100 },
    ],
  },
  {
    title: "PCs ",
    data: [
      { id: "t-1", nombre: "Tarjeta grafica", precio: 900 },
      { id: "t-2", nombre: "CPU", precio: 1900 },
    ],
  },
];

export default function SeccionesScreen() {
  // Memorizacion de datos
  const sections = useMemo(() => SECCIONES, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SectionList — Por categoría</Text>

      <SectionList
        sections={sections}
        // estraer el id
        keyExtractor={(item) => item.id}
        // para ver cada producto
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.nombre}</Text>
            <Text style={styles.cardPrice}>₡{item.precio}</Text>
          </View>
        )}
        // Como se ve el encabezado de cada seccion
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{title}</Text>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        SectionSeparatorComponent={() => <View style={{ height: 12 }} />}
        contentContainerStyle={{ padding: 12, paddingBottom: 24 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f6f9fc", paddingTop: 12 },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginHorizontal: 12,
    marginBottom: 8,
    color: "#0f172a",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: 12,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#e5e7eb",
    height: 72,
    justifyContent: "space-between",
  },
  cardTitle: { fontSize: 16, fontWeight: "600", color: "#111827" },
  cardPrice: { fontSize: 14, fontWeight: "500", color: "#64748b" },
  sectionHeader: {
    backgroundColor: "#eaf6ff",
    padding: 8,
    borderRadius: 8,
    marginHorizontal: 12,
  },
  sectionTitle: { fontSize: 14, fontWeight: "700", color: "#0f172a" },
});
