module.exports = function(api) {
    api.cache(true);
  
    return {
      presets: [
        ["babel-preset-expo", {
          jsxImportSource: "nativewind",
        }],
        "nativewind/babel"
      ],
      plugins: [
        ["module-resolver", {
          root: ["./"],
          alias: {
            "@": "./",
            "tailwind.config": "./tailwind.config.js"
          }
        }],
        // Ensure Reanimated plugin is correctly set up
        "react-native-reanimated/plugin"
      ],
    };
  };
  