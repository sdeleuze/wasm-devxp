let imports = { '': { rand: Math.random } };
WebAssembly.instantiateStreaming(fetch('fire.wasm'), imports)
    .then(results => {
        let canvasData = new Uint8Array(results.instance.exports.mem.buffer, 53760, 215040);

        let canvas = document.querySelector('canvas');
        let context = canvas.getContext('2d');
        let imageData = context.createImageData(320, 168);

        let update = function () {
            requestAnimationFrame(update);
            results.instance.exports.run();
            imageData.data.set(canvasData);
            context.putImageData(imageData, 0, 0);
        };
        update();
    });