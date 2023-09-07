import "react-native-gesture-handler";
import "react-native-get-random-values";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text } from "react-native";
import QuotesList from "./src/quotes-list";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ThemeProvider, theme } from "react-native-design-system";

export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <ThemeProvider theme={theme} components={null}>
        <QuotesList />
        <StatusBar style="auto" />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
