import React, { useState, useRef } from "react";
import { View, ScrollView, Pressable, ImageBackground } from "react-native";

export default function Gallery({ pictures, width, height, renderFirst }) {
  const [index, setindex] = useState(0);
  const scroll = useRef();

  const onScroll = (event) => {
    const i = Math.round(event.nativeEvent.contentOffset.x / width);
    setindex(i);
  };

  const next = (event) => {
    const i = event.nativeEvent.locationX > width / 2 ? index + 1 : index - 1;
    if (i < pictures.length && i >= 0) {
      setindex(i);
      scroll.current.scrollTo({ x: i * width });
    }
  };

  return (
    <View>
      <ScrollView
        ref={scroll}
        horizontal
        decelerationRate={"fast"}
        disableIntervalMomentum
        snapToInterval={width}
        scrollEventThrottle={500}
        onScroll={onScroll}
        showsHorizontalScrollIndicator={false}
        indicatorStyle={"white"}
        contentContainerStyle={{ backgroundColor: "green" }}
      >
        {pictures.map((pic, i) => (
          <Pressable key={i} onPress={next}>
            <ImageBackground
              source={pic}
              style={{ width, height, justifyContent: "flex-end" }}
            >
              {i == 0 && renderFirst()}
            </ImageBackground>
          </Pressable>
        ))}
      </ScrollView>
      <View style={{ position: "absolute", flexDirection: "row" }}>
        {pictures.map((pic, i) => (
          <View
            key={i}
            style={{
              flex: 1,
              height: 5,
              backgroundColor: `#${i == index ? "000" : "fff"}7`,
              margin: 4
            }}
          />
        ))}
      </View>
    </View>
  );
}
