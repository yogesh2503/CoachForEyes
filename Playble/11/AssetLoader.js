var AssetLoader = {};
AssetLoader.maxConcurrency = Infinity;
AssetLoader.assetProgress = {};
AssetLoader.loadedAssets = {};
AssetLoader.queue = [];
AssetLoader.queueIdx = 0;
AssetLoader.loader = {};
AssetLoader.load = function(callback) {
    AssetLoader.asyncQueue(AssetLoader.queue, function() {
        AssetLoader.queue = [];
        AssetLoader.assetProgress = {};
        if (typeof callback === 'function') {
            callback();
        }
    });
};
AssetLoader.queueNext = function() {
    AssetLoader.queueIdx++;
};
AssetLoader.done = function(key, asset) {
    AssetLoader.loadedAssets[key] = asset;
    AssetLoader.updateAssetProgress(key, 1, 1);
};
AssetLoader.push = function(func) {
    if (typeof AssetLoader.queue[AssetLoader.queueIdx] === 'undefined') {
        AssetLoader.queue[AssetLoader.queueIdx] = [];
    }
    AssetLoader.queue[AssetLoader.queueIdx].push(func);
};
AssetLoader.progressListener = null;
AssetLoader.getProgress = function() {
    if (AssetLoader.queue.length <= 0) {
        return 1;
    }
    var total = 0;
    Object.keys(AssetLoader.assetProgress).forEach(function(asset) {
        total += AssetLoader.assetProgress[asset];
    });

    var totalLoaders = 0;
    AssetLoader.queue.forEach(function(collection) {
        totalLoaders += collection.length;
    });

    return total / totalLoaders;
};
AssetLoader.updateAssetProgress = function(asset, done, total) {
    if (AssetLoader.assetProgress[asset] === 1 || total < done || total <= 0) return;
    var progress = 1;
    if (typeof done !== 'undefined' && typeof total !== 'undefined') {
        progress = done / total;
    }

    AssetLoader.assetProgress[asset] = progress;

    if (typeof AssetLoader.progressListener === 'function') {
        AssetLoader.progressListener(AssetLoader.getProgress());
    }
};

AssetLoader.getAssetById = function(id) {
    return AssetLoader.loadedAssets[id];
};


AssetLoader.asyncQueue = function(queue, callback) {
    var workingQueue = queue.slice();
    var next = function() {
        var collection = workingQueue.shift();
        AssetLoader.asyncCollection(collection, function() {
            if (workingQueue.length > 0) {
                next();
            } else {
                callback();
            }
        });
    };
    next();
};


AssetLoader.asyncCollection = function(collection, callback) {
    var collection = collection.slice();
    var numLoading = Math.min(AssetLoader.maxConcurrency, collection.length);

    var loadAndContinue = function(func) {
        func(function() {
            numLoading--;
            if (collection.length > 0) {
                numLoading++;
                loadAndContinue(collection.shift());
            } else if (numLoading === 0) {
                callback();
            }
        });
    };
    collection.splice(0, AssetLoader.maxConcurrency).forEach(loadAndContinue);
};

AssetLoader.add = function(asset) {
    var fileType = asset.split('.').pop();
    if (fileType === 'png') {
        AssetLoader.add.image(asset);
    } else if (fileType === 'json') {
        AssetLoader.add.json(asset);
    } else if (fileType === 'css') {
        AssetLoader.add.css(asset);
    } else {
        throw new Error('Unsupported file-type (' + fileType + ') passed to AssetLoader.add.');
    }
};

AssetLoader.add.image = function(asset) {
    AssetLoader.push(function(done) {
        var img = new Image();
        img.onload = function() {
            AssetLoader.done(asset, img);
            AssetLoader.updateAssetProgress(asset, 1, 1);
            done();
        };
        console.log("asset = " + " " + asset)
        img.src = asset;
    });
};
AssetLoader.add.image64 = function(key, asset) {
    AssetLoader.push(function(done) {
        var img = new Image();
        img.src = asset;
        AssetLoader.done(key, img);
        done();
    });
};
AssetLoader.setupAudioLoader = function() {
    AssetLoader.audioLoader = AssetLoader.audioLoader || new THREE.AudioLoader();
};
AssetLoader.add.audio = function(filename) {
    AssetLoader.setupAudioLoader();
    AssetLoader.push(function(done) {
        AssetLoader.audioLoader.load(filename, function(buffer) {
            AssetLoader.done(filename, buffer);
            done();
        });
    });
};
AssetLoader.add.plainAudio = function(asset) {
    AssetLoader.push(function(done) {
        var audio = new Audio(asset);
        AssetLoader.done(asset, audio);
        done();
    });
};
AssetLoader.add.webFont = function(fontFamily, css) {
    AssetLoader.add.css(css);
    var el = document.createElement('div');
    el.innerText = 'Loading ' + fontFamily;
    el.style.fontFamily = fontFamily;
    el.style.width = 0;
    el.style.height = 0;
    el.style.overflow = 'hidden';
    document.body.appendChild(el);
};
AssetLoader.add.json = function(asset) {
    AssetLoader.push(function(done) {
        loadJSON(asset, function(response) {
            AssetLoader.done(asset, response);
            done();
        });
    });
};
AssetLoader.add.script = function(asset) {
    AssetLoader.push(function(done) {
        AssetLoader.loader.script(asset, function() {
            AssetLoader.done(asset, asset);
            done();
        });
    })
};
AssetLoader.loader.script = function(asset, callback) {
    var el = document.createElement('script');
    el.src = asset;
    el.onload = callback;
    document.head.appendChild(el);
};
AssetLoader.add.css = function(asset) {
    AssetLoader.push(function(done) {
        var el = document.createElement('link');
        el.type = 'text/css';
        el.rel = 'stylesheet';
        el.href = asset;
        el.onload = function() {
            AssetLoader.done(asset, el);
            done();
        };
        document.head.appendChild(el);
    });
};
var loadGeneric = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    var readyCallback = function() {
        if (xhr.readyState === 4) { // Done
            callback(xhr.response || xhr.responseText);
            xhr.onload = null;
            xhr.onreadystatechange = null;
        }
    };
    xhr.onload = readyCallback;
    xhr.onreadystatechange = readyCallback;
    xhr.onprogress = function(evt) {
        AssetLoader.updateAssetProgress(url, evt.loaded, evt.total);
    };
    xhr.onerror = function(error) {
        throw new Error('Error during XHR: ' + error);
    };

    xhr.send();
};

var loadJSON = function(url, callback) {
    loadGeneric(url, function(response) {
        callback(JSON.parse(response));
    });
};
window.AssetLoader = AssetLoader;
