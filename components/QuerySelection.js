import React from "react";
import { View, Text, StyleSheet } from "react-native";
import SelectableText from "./SelectableText";
import { updateQuery } from "../redux/actions";
import { connect } from "react-redux";

const instructionText = "Select the words that are part of the ";

class QuerySelection extends React.Component {
  isWordSelected = (queryWord) => {
    return queryWord.isSelected;
  };

  wordTapped = (category, index) => {
    let queryWords;
    if (category === 0) {
      queryWords = [
        [
          ...this.props.queryWords[category].slice(0, index),
          {
            word: this.props.queryWords[category][index].word,
            isSelected: !this.props.queryWords[category][index].isSelected,
            color: this.props.queryWords[category][index].color,
          },
          ...this.props.queryWords[category].slice(index + 1),
        ],
        this.props.queryWords[1],
      ];
    } else {
      queryWords = [
        this.props.queryWords[0],
        [
          ...this.props.queryWords[category].slice(0, index),
          {
            word: this.props.queryWords[category][index].word,
            isSelected: !this.props.queryWords[category][index].isSelected,
            color: this.props.queryWords[category][index].color,
          },
          ...this.props.queryWords[category].slice(index + 1),
        ],
      ];
    }
    this.props.updateQuery(queryWords);
  };

  render() {
    return (
      <View style={styles.vStack}>
        {this.props.queryWords.map((queryWordsCategory, category) => {
          return (
            <View
              key={`${category}-${queryWordsCategory.length}`}
              style={styles.gridContainer}
            >
              {queryWordsCategory.map((queryWord, index) => {
                return (
                  <SelectableText
                    key={`${index}-${queryWord.word}`}
                    queryWord={queryWord}
                    onPress={() => this.wordTapped(category, index)}
                  />
                );
              })}
            </View>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  vStack: {
    flex: 1,
    alignItems: "center",
  },
  gridContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
  },
});

const mapStateToProps = (state) => ({
  selectedQuery: state.tracksReducer.selectedQuery,
  queryWords:
    state.tracksReducer.selectedQuery === "track"
      ? state.tracksReducer.trackKeywords
      : state.tracksReducer.artistKeywords,
});

const mapDispatchToProps = (dispatch) => ({
  updateQuery: (queryWords) => dispatch(updateQuery(queryWords)),
});

export default connect(mapStateToProps, mapDispatchToProps)(QuerySelection);
