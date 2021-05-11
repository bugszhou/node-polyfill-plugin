const { ProvidePlugin } = require("webpack");
const filterObject = require("filter-obj");

const excludeObjectKeys = (object, excludeKeys) =>
  filterObject(object, (key) => !excludeKeys.includes(key));

module.exports = class NodeBuiltinPolyfillWebpackPlugin {
  constructor(options = {}) {
    if (!options) {
      this.options = {
        exclude: [],
      };
      return;
    }

    let excludeList = options.exclude;

    if (!Array.isArray(options.exclude)) {
      excludeList = [options.exclude];
    }

    this.options = {
      ...options,
      exclude: excludeList,
    };
  }

  apply(compiler) {
    compiler.options.resolve.fallback = {
      ...excludeObjectKeys(
        {
          assert: "assert",
          buffer: "buffer",
          console: "console-browserify",
          constants: "constants-browserify",
          crypto: "crypto-browserify",
          domain: "domain-browser",
          events: "events",
          http: "stream-http",
          https: "https-browserify",
          os: "os-browserify/browser",
          path: "path-browserify",
          punycode: "punycode",
          process: "process/browser",
          querystring: "querystring-es3",
          stream: "stream-browserify",
          _stream_duplex: "readable-stream/duplex",
          _stream_passthrough: "readable-stream/passthrough",
          _stream_readable: "readable-stream/readable",
          _stream_transform: "readable-stream/transform",
          _stream_writable: "readable-stream/writable",
          string_decoder: "string_decoder",
          sys: "util",
          timers: "timers-browserify",
          tty: "tty-browserify",
          url: "url",
          util: "util",
          vm: "vm-browserify",
          zlib: "browserify-zlib",
        },
        this.options.exclude,
      ),
      ...compiler.options.resolve.fallback,
    };
  }

  get plugin() {
    return new ProvidePlugin(
      excludeObjectKeys(
        {
          Buffer: ["buffer", "Buffer"],
          console: "console-browserify",
          process: "process/browser",
        },
        this.options.exclude,
      ),
    );
  }
};
