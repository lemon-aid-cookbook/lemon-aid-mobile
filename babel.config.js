module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          pages: './src/pages',
          reduxs: './src/reduxs',
          assets: './src/assets',
          navigators: './src/navigators',
          utils: './src/utils',
          components: './src/components',
          config: './src/config',
        },
      },
    ],
  ],
};
