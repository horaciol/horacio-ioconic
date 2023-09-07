import { useState } from "react";
import { Pressable, View, StyleSheet, Text, Button } from "react-native";

import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator,
} from "react-native-draggable-flatlist";
import { TextInput } from "react-native-gesture-handler";
import { v4 as RandomUUID } from "uuid";
import { QuoteType, useQuotesStore } from "./store";

export default function QuotesList() {
  const data = useQuotesStore((state) => state.data);
  const addQuote = useQuotesStore((state) => state.addQuote);
  const deleteQuote = useQuotesStore((state) => state.deleteQuote);
  const updateQuotes = useQuotesStore((state) => state.updateQuotes);

  const [text, setText] = useState<string>("");

  const handleTextInput = (input: string) => {
    setText(input);
  };

  const handleAddQuote = () => {
    const quote = text.trim();
    if (!quote) return;
    const key = RandomUUID();
    addQuote({ key, quote });
    setText("");
  };

  const handleDeleteQuote = (key: string) => {
    deleteQuote(key);
  };

  const handleUpdateQuotes = (data: QuoteType[]) => {
    updateQuotes(data);
  };

  const renderItem = ({
    item,
    drag,
    isActive,
    getIndex,
  }: RenderItemParams<QuoteType>) => {
    const rank = getIndex() != undefined ? Number(getIndex()) + 1 : "";
    return (
      <ScaleDecorator>
        <Pressable
          onLongPress={drag}
          disabled={isActive}
          style={{
            backgroundColor: isActive ? "grey" : "white",
            minHeight: 50,
          }}
        >
          <View style={styles.itemContainer}>
            <Text>{`${rank}. "${item.quote}"`}</Text>
            <Button
              onPress={() => handleDeleteQuote(item.key)}
              title="delete"
            ></Button>
          </View>
        </Pressable>
      </ScaleDecorator>
    );
  };

  return (
    <View style={styles.container}>
      <Text>Movie Quotes</Text>
      <TextInput
        style={styles.textInput}
        value={text}
        placeholder="Add movie quote"
        onChangeText={handleTextInput}
        onSubmitEditing={handleAddQuote}
        autoCorrect={false}
      />

      {data && data.length === 0 && (
        <Text>Start typing to add movie quotes...</Text>
      )}
      <DraggableFlatList
        data={data}
        onDragEnd={({ data }) => handleUpdateQuotes(data)}
        keyExtractor={(item) => item.key}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    paddingHorizontal: 25,
  },
  itemContainer: {
    flex: 1,
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
  },
  textInput: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#CCCCCC",
    minHeight: 50,
    padding: 10,
    marginVertical: 25,
  },
});
