<p align="center">
  <br/>
  <a href="https://yael-brinkert.fr" target="_blank"><img width="96px" src="https://github.com/yaelbrinkert/github-flat-trees-to-nested/blob/main/src/images/nesty-logo-lg-transparent.png?raw=true" /></a>
  <h3 align="center">NestyJS</h3>
  <p align="center">Transform Github Flat Trees into Nested Trees.</p>
  <p align="center">
    Need help? See <a href="#">NestyJS</a> for the documentation.
  </p>
</p>

# Github Flat Trees to Nested

## _Transform your flat trees into beautiful and useful nested objects or arrays_

<p align="center">
  <img src="https://shields.io/badge/TypeScript-3178C6?logo=TypeScript&logoColor=fff&style=flat-square" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vitest-6E9F18?logo=vitest&logoColor=fff" alt="Vitest" />
  <img src="https://img.shields.io/badge/npm-CB3837?logo=npm&logoColor=fff" alt="NPM" />
  <img src="https://img.shields.io/badge/GitHub-%23121011.svg?logo=github&logoColor=white" alt="Github" />
</p>

NestyJS is a simple package that gives you possibility to transform "flat trees", from Github REST API, to nested trees of different forms.

- Make a request to Github's API
- Receive your flat tree
- Use one of the nested function options
- Choose if you want to keep metadatas from Github response
- ✨ Magic ✨
- You receive a usable nested tree

## Tech

NestyJS uses Typescript to keep safety use of functions. Types have been adapted for a tree given by Github REST API, but can accept more global flat trees depending on the form.

Of course NestyJS itself is open source with a [public repository][github-flat-trees-to-nested]
on GitHub.

## Installation

NestyJS requires [Node.js](https://nodejs.org/) v10+ to run.
You also need [Octokit](https://www.npmjs.com/package/octokit) to be able to get datas from Github API (recommended)

Install the package this way.

```sh
cd your-app
npm install 
node app
```

For production environments...

```sh
npm install --production
NODE_ENV=production node app
```

## Plugins

Dillinger is currently extended with the following plugins.
Instructions on how to use them in your own application are linked below.

| Plugin           | README                                    |
| ---------------- | ----------------------------------------- |
| Dropbox          | [plugins/dropbox/README.md][PlDb]         |
| GitHub           | [plugins/github/README.md][PlGh]          |
| Google Drive     | [plugins/googledrive/README.md][PlGd]     |
| OneDrive         | [plugins/onedrive/README.md][PlOd]        |
| Medium           | [plugins/medium/README.md][PlMe]          |
| Google Analytics | [plugins/googleanalytics/README.md][PlGa] |

## Development

Want to contribute? Great!

Dillinger uses Gulp + Webpack for fast developing.
Make a change in your file and instantaneously see your updates!

Open your favorite Terminal and run these commands.

First Tab:

```sh
node app
```

Second Tab:

```sh
gulp watch
```

(optional) Third:

```sh
karma test
```

#### Building for source

For production release:

```sh
gulp build --prod
```

Generating pre-built zip archives for distribution:

```sh
gulp build dist --prod
```

## Docker

Dillinger is very easy to install and deploy in a Docker container.

By default, the Docker will expose port 8080, so change this within the
Dockerfile if necessary. When ready, simply use the Dockerfile to
build the image.

```sh
cd dillinger
docker build -t <youruser>/dillinger:${package.json.version} .
```

This will create the dillinger image and pull in the necessary dependencies.
Be sure to swap out `${package.json.version}` with the actual
version of Dillinger.

Once done, run the Docker image and map the port to whatever you wish on
your host. In this example, we simply map port 8000 of the host to
port 8080 of the Docker (or whatever port was exposed in the Dockerfile):

```sh
docker run -d -p 8000:8080 --restart=always --cap-add=SYS_ADMIN --name=dillinger <youruser>/dillinger:${package.json.version}
```

> Note: `--capt-add=SYS-ADMIN` is required for PDF rendering.

Verify the deployment by navigating to your server address in
your preferred browser.

```sh
127.0.0.1:8000
```

## License

MIT

**Free Software, Hell Yeah!**

[//]: # "These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax"
[dill]: https://github.com/joemccann/dillinger
[git-repo-url]: https://github.com/joemccann/dillinger.git
[john gruber]: http://daringfireball.net
[df1]: http://daringfireball.net/projects/markdown/
[markdown-it]: https://github.com/markdown-it/markdown-it
[Ace Editor]: http://ace.ajax.org
[node.js]: http://nodejs.org
[Twitter Bootstrap]: http://twitter.github.com/bootstrap/
[jQuery]: http://jquery.com
[@tjholowaychuk]: http://twitter.com/tjholowaychuk
[express]: http://expressjs.com
[AngularJS]: http://angularjs.org
[Gulp]: http://gulpjs.com
[PlDb]: https://github.com/joemccann/dillinger/tree/master/plugins/dropbox/README.md
[PlGh]: https://github.com/joemccann/dillinger/tree/master/plugins/github/README.md
[PlGd]: https://github.com/joemccann/dillinger/tree/master/plugins/googledrive/README.md
[PlOd]: https://github.com/joemccann/dillinger/tree/master/plugins/onedrive/README.md
[PlMe]: https://github.com/joemccann/dillinger/tree/master/plugins/medium/README.md
[PlGa]: https://github.com/RahulHP/dillinger/blob/master/plugins/googleanalytics/README.md
