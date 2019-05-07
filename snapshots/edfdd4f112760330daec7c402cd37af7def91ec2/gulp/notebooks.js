import { src, task, lastRun } from "gulp";
import exec from "gulp-exec";
import newer from "gulp-newer";

const srcDir = "src";
const ipynbGlob = [
  "src/**/*.ipynb"
];
const extensions = [
  ".js"
];

export function convertNotebooks() {
  const options = {
    continueOnError: false, // default = false, true means don't emit error event
    pipeStdout: false // default = false, true means stdout is written to file.contents
  };
  const reportOptions = {
    err: true, // default = true, false means don't write err
    stderr: true, // default = true, false means don't write stderr
    stdout: true // default = true, false means don't write stdout
  };

  let stream = src(ipynbGlob, { since: lastRun(convertNotebooks) });

  extensions.forEach(ext => {
    stream = stream.pipe(newer({ dest: srcDir, ext }));
  });

  return stream
    .pipe(exec('jupyter nbconvert --to script "<%- file.path %>"', options))
    .pipe(exec.reporter(reportOptions));
}

task("notebooks", convertNotebooks);
