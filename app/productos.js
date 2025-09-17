import React, { useCallback, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  Button,
  Pressable,
  Platform,
  Alert,
} from "react-native";
import Toast from "react-native-toast-message";

const PRODUCTOS_INICIALES = Array.from({ length: 12 }).map((_, i) => ({
  id: `p-${i + 1}`,
  nombre: `Producto ${i + 1}`,
  precio: 1000 + i * 250,
}));

export default function ProductosScreen() {
  const [items, setItems] = useState(PRODUCTOS_INICIALES); // PRoductos mostrados por la lista
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1); // Lleva la cuenta de paginas para la paginacion simulada

  const hacerDelete = () => {
    setItems((prev) => prev.slice(0, -1));
    Toast.show({
      type: "success",
      text1: "Eliminado",
      text2: "Se eliminó el último elemento",
    });
  };

  const mostrarAlertaEliminar = () => {
    if (Platform.OS === "web") {
      const ok = window.confirm("¿Seguro que deseas eliminar el último ítem?");
      if (ok) hacerDelete();
      return;
    }

    Alert.alert(
      "Eliminar",
      "¿Seguro que deseas eliminar el último ítem?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Eliminar", style: "destructive", onPress: hacerDelete },
      ],
      { cancelable: true }
    );
  };

  // Simple toast informativo que muestra la plataforma actual
  const mostrarToastInfo = () => {
    Toast.show({
      type: "info",
      text1: "Información",
      text2: `Plataforma: ${Platform.OS}`,
    });
  };

  // Simula recargar datos
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setItems(PRODUCTOS_INICIALES);
      setPage(1);
      setRefreshing(false);
      Toast.show({
        type: "success",
        text1: "Actualizado",
        text2: "Datos refrescados",
      });
    }, 800);
  }, []);

  // Genera items nuevos cuando el usuario llega al final
  const loadMore = useCallback(() => {
    const nextPage = page + 1;
    const start = items.length;
    const extra = Array.from({ length: 1 }).map((_, i) => ({
      id: `p-${start + i + 1}`,
      nombre: `Producto ${start + i + 1}`,
      precio: 1000 + (start + i) * 250,
    }));
    setItems((prev) => [...prev, ...extra]);
    setPage(nextPage);
    Toast.show({
      type: "info",
      text1: "Cargando más",
      text2: `Página ${nextPage}`,
    });
  }, [items.length, page]);

  //Esto lo que hace es que al tocar un item se muestra un toast con info del producto
  const renderItem = useCallback(({ item }) => {
    return (
      <Pressable
        style={styles.card}
        onPress={() =>
          Toast.show({
            type: "success",
            text1: item.nombre,
            text2: `₡${item.precio}`,
          })
        }
      >
        <Text style={styles.cardTitle}>{item.nombre}</Text>
        <Text style={styles.cardPrice}>₡{item.precio}</Text>
      </Pressable>
    );
  }, []);

  const keyExtractor = useCallback((item) => item.id, []);
  const ITEM_HEIGHT = 72;
  const getItemLayout = useCallback(
    (_data, index) => ({
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index,
      index,
    }),
    []
  );

  // Header de la lista con botones de accion
  const header = useMemo(
    () => (
      <View style={{ paddingHorizontal: 12, paddingTop: 12, gap: 8 }}>
        <Text style={styles.title}>FlatList — Productos</Text>
        <View style={styles.row}>
          <Button title="Alert (Eliminar)" onPress={mostrarAlertaEliminar} />
          <View style={{ width: 12 }} />
          <Button title="Toast Info" onPress={mostrarToastInfo} />
        </View>
      </View>
    ),
    [mostrarToastInfo]
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListHeaderComponent={header}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        contentContainerStyle={{ padding: 12, paddingTop: 0 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onEndReached={loadMore}
        onEndReachedThreshold={0.2}
        getItemLayout={getItemLayout}
        style={{ flexGrow: 1 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f6f9fc" },
  title: { fontSize: 18, fontWeight: "700", color: "#0f172a" },
  row: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
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
});
