# Word Cloud Party

An interactive word-cloud of topics, displaying engagement volume and sentiment. A demo is available [here](https://word-cloud-party.herokuapp.com).

![alt tag](https://raw.githubusercontent.com/stefanpearson/word-cloud-party/master/docs/demo.png)

## Design decisions

#### Server

* Server app is responsible for serving both the client assets and REST API
* Integration tests

#### Client

* React app handles client-side rendering with a clean component heirarchy
* Flux architecture takes care of application actions and object stores using [Alt](http://alt.js.org)
* HTML uses [BEM](https://en.bem.info/methodology/key-concepts/) for sane namespacing
* Sass split into BEM components
* Components components components
* Unit tests for controller-views, flux and networking

## Installation

```sh
npm install
```

### Environment variables

A `.env` file in the root provides some development defaults, but should not be used in production.

| Key         | Description                                                          |
|-------------|----------------------------------------------------------------------|
| `NODE_ENV`  | Environment e.g. `production`, `development`                         |
| `PROTOCOL`  | `http`, `https`                                                      |
| `PORT`      | Port for incoming HTTP requests (PaaS should set this automatically) |
| `HOST`      | Used to construct the base URL                                       |
| `LOG_LEVEL` | `debug` for development, `info` for production                       |

### Running

To run the build and server:

```sh
npm start
```

Should you need to watch the Sass & client-side JS during development:

```sh
npm run dev
```

## To do ⏱

* Animation when state changes
* Show detail in flyout menu for small-screen displays
* Isomorphic rendering on the server
