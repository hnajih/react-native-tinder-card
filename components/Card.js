import React, { useRef, forwardRef, useImperativeHandle } from "react";
import { View, Text, StyleSheet, ScrollView, Button } from "react-native";

import Gallery from "./Gallery";

function Card(
  {
    data,
    width,
    height,
    contentContainerStyle,
    tags = [],
    renderTag,
    actions = [],
    renderAction,
    renderDetails
  },
  ref
) {
  const { title, subtitle, pictures = [] } = data;
  const scroll = useRef();

  useImperativeHandle(ref, () => ({
    showGallery: () => {
      scroll.current.scrollTo({ y: 0 });
    },
    showDetails: () => {
      scroll.current.scrollTo({ y: height });
    }
  }));

  const renderInfo = () => {
    return (
      <>
        <View style={styles.info}>
          <Text style={styles.title}>{title}</Text>
          <Text style={[styles.title, styles.subtitle]}>{subtitle}</Text>
          <View
            style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 5 }}
          >
            {tags.map((tag, index) => (
              <View key={index} style={{ margin: 3 }}>
                {renderTag ? renderTag(tag) : <Button {...tag}></Button>}
              </View>
            ))}
          </View>
        </View>
        <View style={styles.actions}>
          {actions.map((action, index) => (
            <View key={index} style={{ margin: 5 }}>
              {renderAction ? (
                renderAction(action)
              ) : (
                <Button title={action}></Button>
              )}
            </View>
          ))}
        </View>
      </>
    );
  };

  return (
    <View
      style={[
        styles.container,
        contentContainerStyle,
        { width, minHeight: height }
      ]}
    >
      <ScrollView
        ref={scroll}
        showsVerticalScrollIndicator={false}
        disableIntervalMomentum
        snapToInterval={height}
        decelerationRate={"fast"}
      >
        <View style={styles.images}>
          <Gallery
            renderFirst={() => renderInfo()}
            pictures={pictures}
            width={width}
            height={height}
          />
        </View>
        <View style={[styles.details, { minHeight: height }]}>
          {renderDetails(data)}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,

    elevation: 15,
    backgroundColor: "white",
    borderRadius: 10,
    alignSelf: "center",
    flex: 1,
    overflow: "hidden"
  },
  images: {},
  info: {
    position: "absolute",
    bottom: 0,
    padding: 10
  },
  title: {
    fontSize: 25,
    color: "white",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    paddingVertical: 2,
    paddingHorizontal: 5
  },
  subtitle: {
    fontSize: 22
  },
  actions: {
    position: "absolute",
    bottom: 0,
    padding: 10,
    right: 0,
    alignItems: "center"
  },
  details: {}
});

export default forwardRef(Card);
