module.exports = function babelConfig(api) {
  api.cache(true);
  return {
    presets: [['babel-preset-expo', { unstable_transformImportMeta: true }]],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@components': './src/components',
            '@screens': './src/screens',
            '@utils': './src/utils',
            '@assets': './assets',
            '@theme': './src/theme',
            '@redux': './src/redux',
            '@hooks': './src/hooks',
          },
        },
        'react-native-worklets/plugin',
      ],
      ['inline-import', { extensions: ['.sql'] }],
    ],
  };
};
