// import React, { useCallback, useMemo, useState } from "react";
// import {
//   Alert,
//   Button,
//   RefreshControl,
//   SectionList,
//   StyleSheet,
//   Text,
//   View,
//   FlatList,
//   Pressable,
//   Platform,
// } from "react-native";
// import Toast from "react-native-toast-message";

// // npx expo install react-native-toast-message

// const PRODUCTOS_INICIALES = Array.from({ length: 12 }).map((_, i) => ({
//   id: `p-${i + 1}`,
//   nombre: `Producto ${i + 1}`,
//   precio: 1000 + i * 250,
// }));

// const SECCIONES = [
//   {
//     title: "Bebidas",
//     data: [
//       { id: "b-1", nombre: "Agua", precio: 800 },
//       { id: "b-2", nombre: "Café", precio: 1200 },
//     ],
//   },
//   {
//     title: "Snacks",
//     data: [
//       { id: "s-1", nombre: "Maní", precio: 900 },
//       { id: "s-2", nombre: "Galletas", precio: 1100 },
//     ],
//   },
// ];

// export default function App() {
//   const [items, setItems] = useState(PRODUCTOS_INICIALES);
//   const [refreshing, setRefreshing] = useState(false);
//   const [page, setPage] = useState(1);

//   const mostrarAlertaEliminar = () => {
//     Alert.alert(
//       "Eliminar",
//       "¿Seguro que deseas eliminar el último ítem?",
//       [
//         { text: "Cancelar", style: "cancel" },
//         {
//           text: "Eliminar",
//           style: "destructive",
//           onPress: () => {
//             setItems((prev) => prev.slice(0, -1));
//             Toast.show({
//               type: "success",
//               text1: "Eliminado",
//               text2: "Se eliminó el último elemento",
//             });
//           },
//         },
//       ],
//       { cancelable: true }
//     );
//   };

//   const mostrarToastInfo = () => {
//     Toast.show({
//       type: "info",
//       text1: "Información",
//       text2: `Plataforma: ${Platform.OS}`,
//     });
//   };

//   const onRefresh = useCallback(() => {
//     setRefreshing(true);
//     setTimeout(() => {
//       setItems(PRODUCTOS_INICIALES);
//       setPage(1);
//       setRefreshing(false);
//       Toast.show({
//         type: "success",
//         text1: "Actualizado",
//         text2: "Datos refrescados",
//       });
//     }, 900);
//   }, []);

//   const loadMore = useCallback(() => {
//     const nextPage = page + 1;
//     const start = items.length;
//     const extra = Array.from({ length: 6 }).map((_, i) => ({
//       id: `p-${start + i + 1}`,
//       nombre: `Producto ${start + i + 1}`,
//       precio: 1000 + (start + i) * 250,
//     }));
//     setItems((prev) => [...prev, ...extra]);
//     setPage(nextPage);
//     Toast.show({
//       type: "info",
//       text1: "Cargando más",
//       text2: `Página ${nextPage}`,
//     });
//   }, [items.length, page]);

//   const renderItem = useCallback(({ item }) => {
//     return (
//       <Pressable
//         style={styles.card}
//         onPress={() =>
//           Toast.show({
//             type: "success",
//             text1: item.nombre,
//             text2: `₡${item.precio}`,
//           })
//         }
//       >
//         <Text style={styles.cardTitle}>{item.nombre}</Text>
//         <Text style={styles.cardPrice}>₡{item.precio}</Text>
//       </Pressable>
//     );
//   }, []);

//   const keyExtractor = useCallback((item) => item.id, []);

//   const ITEM_HEIGHT = 72;
//   const getItemLayout = useCallback(
//     (_data, index) => ({
//       length: ITEM_HEIGHT,
//       offset: ITEM_HEIGHT * index,
//       index,
//     }),
//     []
//   );

//   const seccionesMemo = useMemo(() => SECCIONES, []);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>FlatList — Productos</Text>

//       <View style={styles.row}>
//         <Button title="Alert (Eliminar)" onPress={mostrarAlertaEliminar} />
//         <View style={{ width: 12 }} />
//         <Button title="Toast Info" onPress={mostrarToastInfo} />
//       </View>

//       <FlatList
//         data={items}
//         renderItem={renderItem}
//         keyExtractor={keyExtractor}
//         ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
//         contentContainerStyle={{ padding: 12 }}
//         refreshControl={
//           <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//         }
//         onEndReached={loadMore}
//         onEndReachedThreshold={0.2}
//         getItemLayout={getItemLayout}
//         style={{ flexGrow: 0, maxHeight: 320 }}
//       />

//       <Text style={styles.title}>SectionList — Por categoría</Text>

//       <SectionList
//         sections={seccionesMemo}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <View style={styles.card}>
//             <Text style={styles.cardTitle}>{item.nombre}</Text>
//             <Text style={styles.cardPrice}>₡{item.precio}</Text>
//           </View>
//         )}
//         renderSectionHeader={({ section: { title } }) => (
//           <View style={styles.sectionHeader}>
//             <Text style={styles.sectionTitle}>{title}</Text>
//           </View>
//         )}
//         ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
//         SectionSeparatorComponent={() => <View style={{ height: 12 }} />}
//         contentContainerStyle={{ padding: 12, paddingBottom: 24 }}
//       />

//       <Toast />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#f6f9fc", paddingTop: 48 },
//   title: {
//     fontSize: 18,
//     fontWeight: "700",
//     marginHorizontal: 12,
//     marginTop: 12,
//     marginBottom: 8,
//     color: "#0f172a",
//   },
//   row: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: 12,
//     marginBottom: 12,
//   },
//   card: {
//     backgroundColor: "#ffffff",
//     padding: 12,
//     borderRadius: 12,
//     borderWidth: StyleSheet.hairlineWidth,
//     borderColor: "#e5e7eb",
//     height: 72,
//     justifyContent: "space-between",
//   },
//   cardTitle: { fontSize: 16, fontWeight: "600", color: "#111827" },
//   cardPrice: { fontSize: 14, fontWeight: "500", color: "#64748b" },
//   sectionHeader: { backgroundColor: "#eaf6ff", padding: 8, borderRadius: 8 },
//   sectionTitle: { fontSize: 14, fontWeight: "700", color: "#0f172a" },
// });
