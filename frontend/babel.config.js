module.exports = {
    presets: ['react-app'],
    plugins: [
        ['@babel/plugin-transform-react-jsx', {
            throwIfNamespace: false, // This allows namespace tags like xmlns:xlink
        }],
    ],
};
