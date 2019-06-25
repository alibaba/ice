# @ice/screenshot

Take a screenshot of a web page in the terminal.

Usage: screenshot -u https://www.example.com

Options:

```
-V, --version              output the version number
-u, --url <url>            The target url or path to local server
-l, --local [local]        Set up a local server in a special directory and take screenshot, defaults set up in `./`
-s, --selector <selector>  Select a element through CSS selector
-o, --output <output>      Output path
-h, --help                 output usage information
```

## Usage

For ICE materials, you can take screenshot use following commands:

```bash
# for scaffold
$ npm run build && screenshot -l

# for block
$ npm run build && screenshot -l -s \#mountNode
```

Others:

```bash
# take a screenshot of taobao.com
$ screenshot -u https://www.taobao.com

# take screenshot of a element
$ screenshot -u https://www.taobao.com -s .service.J_Service

# take screenshot export to ~/taobao.jpg
$ screenshot -u https://www.taobao.com -o ~/taboa.jpg

# Set up local server in current working directory and take screenshot of http://localhost:8100/public/index.html
# By default, this will run the contents of current directory on a local server, the URL is http://localhost:8100
$ screenshot -u /public/index.html -l

# Set up local server in ./public directory and take screenshot of http://localhost:8100/index.html
# By default, this will run the contents of `public/` directory on a local server, the URL is http://localhost:8100
$ screenshot -u /index.html -l ./public
```

## Puppeteer

The CLI based on [Puppeteer](https://github.com/GoogleChrome/puppeteer). But we don't want to depend on puppeteer locally, because puppeteer takes a long to install, it's easy to install failed. So we will find puppeteer in the local node_modules, if not found, find in the global node_modules, if still not found, we will install it globally, and you don't need to install it again next time.
