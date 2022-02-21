const {serve, build} = require('esbuild');
const {watch} = require('chokidar');
const sassPlugin = require('esbuild-plugin-sass');

const liveServer = require('live-server');

const isDevServer = process.argv.includes('--dev');

const params = {
  color: true,
  entryPoints: ['src/index.jsx'],
  bundle: true,
  outfile: 'public/bundle.js',
  minify: !isDevServer,
  sourcemap: true,
  incremental: isDevServer,
  target: ['chrome58', 'firefox57', 'safari11', 'edge18'],
  loader: {
    '.png': 'file',
    '.jpg': 'file',
    '.svg': 'file',
    '.mp3': 'file',
    '.ttf': 'file',
  },
  define: {
    'process.env.NODE_ENV': isDevServer ? '"development"' : '"production"',
  },
  plugins: [sassPlugin()],
};

const noop = () => {};

const updateLine = (input, isBuiltInput = false) => {
  const numberOfLines = (input.match(/\n/g) || []).length;
  process.stdout.cursorTo(0, 2);
  process.stdout.clearScreenDown();
  process.stdout.write(input);
  isBuiltInput ? process.stdout.moveCursor(0, -numberOfLines) : noop();
};

const bundle = async () => {
  const timerStart = Date.now();
  process.stdout.cursorTo(0, 2);
  process.stdout.clearLine(0);
  await build(params).catch((err) => {
    console.log(...arguments);
    console.log(err)
  });
  const timerEnd = Date.now();
  updateLine(`Built in ${timerEnd - timerStart}ms.`, true);
}

(async () => {
  bundle();

  if (isDevServer) {
    const watcher = watch(["src/**/*"]);
    console.log("Watching files... \n");
    watcher.on("change", () => {
      bundle();
    });
    liveServer.start({
      open: true,
      port: +process.env.PORT || 8080,
      root: 'public',
      logLevel: 0,
    });
  }

})();
