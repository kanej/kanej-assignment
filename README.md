# kanej-assignment

[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

> Authenticated proxy for IPFS API

An assignment where the goal is "to secure a public IPFS API with simpleAPI keys (simply by providing a custom HTTP header) and build an app to manage the keys and view logs/metrics".

A copy of the specification is available in the docs folder [here](./docs/Full-Stack-Engineer-Assignment.pdf).

## Table of Contents

- [kanej-assignment](#kanej-assignment)
  - [Table of Contents](#table-of-contents)
  - [requirements](#requirements)
    - [Assessment criteria](#assessment-criteria)
  - [Plan & Design](#plan--design)
  - [Usage](#usage)
  - [Maintainers](#maintainers)
  - [License](#license)

## requirements

* [ ] Create a React application with simple email/username + password authentication thatlets you create new or disable existing API keys
* [ ] Create a proxy server that handles API Key authentication and forwards request to IPFS API
* [ ] When requests are made to the proxy server , we should log them in a db with relation toAPI key
* [ ] Disabling the API key should block the API request when using that key
* [ ] Display the requests in the application under each API key that was created
* [ ] Provide simple README doc, so we can properly build & run i
Bonus: for logging metrics (request count, bytes transferred)
* [ ] written question: How would you improve this assignment for a production ready solution (e.g., security,deployment)
* [ ] written question: Describe IPFS and compare it to other protocols e.g., HTTP?

### Assessment criteria

* Completion/functionality - 10 pts (are all the pieces working as described?)
* Code quality - 5 pts (structure, style, package selection, efficiency) 
* Documentation - 5 pts (could be as comments or a quick readme)
* Written questions - 5 pts

## Plan & Design

I have put together an [intended plan and system design](./docs/plan-and-design.md),
including my working assumptions and UI sketches.

<!-- ## Install

```
```

## Usage

```
``` -->

## Development

This is a node.js based project that uses docker to run local services (e.g. ipfs).

### Setup

To install the node dependencies, run `yarn` from the root of the repository:

```sh
yarn
```

To run the supporting services, run docker compose on from the repo root:

```
docker-compose up
```

You should now have a running `ipfs` daemon.

You can test the IPFS daemon api endpoint with curl:

```sh
curl -X POST http://127.0.0.1:5001/api/v0/swarm/addrs
```

To run the webserver in development mode:

```sh
yarn start
```

The webserver should now be available at http://localhost:12800.

## Maintainers

[@kanej](https://github.com/kanej)

## License

MIT © 2021 John Kane
