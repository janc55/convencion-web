try {
    const native = require('./node_modules/rollup/dist/native.js');
    console.log('Successfully loaded rollup/dist/native.js');
    console.log('Exports:', Object.keys(native));
} catch (err) {
    console.error('Failed to load rollup/dist/native.js');
    console.error(err);
}
