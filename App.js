import React from "react";
import { StatusBar, Text, View } from "react-native";
import { normalizeHeight } from "./app/components/scaleFontSize";
import FlashMessage from "react-native-flash-message";
import Main from "./app/navigation/index";
import { LoadingProvider, SearchProvider } from "./app/utils/searchContext";

const App = () => {
  return (
    <SearchProvider>
      <LoadingProvider>
      <View
        style={{
          flex: 1,
        }}
      >
        {/* <StatusBar
          animated={true}
          backgroundColor="#ffff"
          barStyle="dark-content"
          showHideTransition={statusBarTransition}
            hidden={hidden} 
        /> */}
        <Main />
        <FlashMessage position="bottom" />
      </View>
      </LoadingProvider>
    </SearchProvider>
  );
};

export default App;
