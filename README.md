# HospitalRun Frontend

<div align="center">

![Status](https://img.shields.io/badge/Status-developing-brightgree) [![Release](https://img.shields.io/github/release/HospitalRun/hospitalrun-frontend.svg)](https://github.com/HospitalRun/hospitalrun-frontend/releases) [![Version](https://img.shields.io/github/package-json/v/hospitalrun/hospitalrun-frontend)](https://github.com/HospitalRun/hospitalrun-frontend/releases)
[![GitHub CI](https://github.com/HospitalRun/frontend/workflows/GitHub%20CI/badge.svg)](https://github.com/HospitalRun/frontend/actions) [![Coverage Status](https://coveralls.io/repos/github/HospitalRun/hospitalrun-frontend/badge.svg?branch=master)](https://coveralls.io/github/HospitalRun/hospitalrun-frontend?branch=master) [![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/HospitalRun/hospitalrun-frontend.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/HospitalRun/hospitalrun-frontend/context:javascript) [![Documentation Status](https://readthedocs.org/projects/hospitalrun-frontend/badge/?version=latest)](https://hospitalrun-frontend.readthedocs.io)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FHospitalRun%2Fhospitalrun-frontend.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2FHospitalRun%2Fhospitalrun-frontend?ref=badge_large) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
![dependabot](https://api.dependabot.com/badges/status?host=github&repo=HospitalRun/hospitalrun-frontend) [![Slack](https://hospitalrun-slack.herokuapp.com/badge.svg)](https://hospitalrun-slack.herokuapp.com) [![Run on Repl.it](https://repl.it/badge/github/HospitalRun/hospitalrun-frontend)](https://repl.it/github/HospitalRun/hospitalrun-frontend)

</div>

React frontend for [HospitalRun](http://hospitalrun.io/): free software for developing world hospitals.

---

**Version 1.0.0-beta is no longer supported. Version 2 is currently under development.**

- To contribute, follow the guidelines in the readme or alternatively ask for details on Slack channel [#contributors](https://hospitalrun-slack.herokuapp.com).
- To use version 1.0.0-beta (not production ready) in a hospital facility, ask for support on Slack channel [#troubleshooting](https://hospitalrun-slack.herokuapp.com).

<div align="center">

[![Slack](https://img.shields.io/badge/Slack-Join%20our%20devs%20group-blueviolet?style=for-the-badge&logo=slack)](https://hospitalrun-slack.herokuapp.com)

</div>

# Contributing

Contributions are always welcome. Before contributing please read our [contributor guide](https://github.com/HospitalRun/hospitalrun-frontend/blob/master/.github/CONTRIBUTING.md).

1. Fork this repository to your own GitHub account and then clone it to your local device
2. Navigate to the cloned folder: `cd hospitalrun-frontend`
3. Install the dependencies: `yarn`
4. Run `yarn run start` to build and watch for code changes

## Connecting to HospitalRun Server

**Note: The following instructions are for connecting to HospitalRun Server during development and are not intended to be for production use. For production deployments, see the deployment instructions.**

1. Configure [HospitalRun Server](https://github.com/HospitalRun/hospitalrun-server)
2. Start the HospitalRun Development Server
3. Copy the `.env.example` file to `.env`
4. Change the `REACT_APP_HOSPITALRUN_API` variable to point to the HospitalRun Development Server.

## Working on an Issue

In order to optimize the workflow and to prevent multiple contributors working on the same issue without interactions, a contributor must ask to be assigned to an issue by one of the core team members: it's enough to ask it inside the specific issue.

## How to commit

This repo uses Conventional Commits. Commitizen is mandatory for making proper commits. Once you have staged your changes, can run `npm run commit` or `yarn commit` from the root directory in order to commit following our standards.

<hr />

# Behind HospitalRun

## Hosted by

[<img src="https://github.com/openjs-foundation/cross-project-council/blob/master/logos/openjsf-color.png?raw=true" width="120px;"/>](https://openjsf.org/projects/#atlarge)

## Sponsors

[![Sponsors](https://opencollective.com/hospitalrun/sponsors.svg?width=890)](https://opencollective.com/hospitalrun/contribute/sponsors-336/checkout)

### Big Thanks

Cross-browser Testing Platform and Open Source <3 Provided by [Sauce Labs][homepage]

[homepage]: https://saucelabs.com

## Backers

[![Backers](https://opencollective.com/hospitalrun/backers.svg?width=890)](https://opencollective.com/hospitalrun/contribute/backers-335/checkout)

## Lead Maintainer

[<img src="https://avatars2.githubusercontent.com/u/1620916?s=460&v=4" width="100px;"/><br /><sub><b>Maksim Sinik</b></sub>](https://github.com/fox1t)<br />

## Core Team

<!-- prettier-ignore -->
| [<img src="https://avatars3.githubusercontent.com/u/25089405?s=460&v=4" width="100px;"/><br /><sub><b>Stefano Casasola</b></sub>](https://github.com/irvelervel) |[<img src="https://avatars2.githubusercontent.com/u/8914893?s=460&v=4" width="100px;"/><br /><sub><b>Michael Daly</b></sub>](https://github.com/MichaelDalyDev)|[<img src="https://avatars1.githubusercontent.com/u/25009192?s=460&v=4" width="100px;"/><br /><sub><b>Riccardo Gulin</b></sub>](https://github.com/bazuzu666) | [<img src="https://avatars3.githubusercontent.com/u/603924?s=460&v=4" width="100px;"/><br /><sub><b>Grace Lau</b></sub>](https://github.com/lauggh) | [<img src="https://avatars3.githubusercontent.com/u/18731800?s=460&v=4" width="100px;"/><br /><sub><b>Jack Meyer</b></sub>](https://github.com/jackcmeyer) | [<img src="https://avatars0.githubusercontent.com/u/6388707?s=460&v=4" width="100px;"/><br /><sub><b>Matteo Vivona</b></sub>](https://github.com/tehKapa) |
|---|---|---|---|---|---|

## Medical Supervisor

[<img src="https://avatars2.githubusercontent.com/u/24660474?s=460&v=4" width="100px;"/><br /><sub><b>M.D. Daniele Piccolo</b></sub>](https://it.linkedin.com/in/danielepiccolo)<br />

## Contributors

[![Contributors](https://opencollective.com/hospitalrun/contributors.svg?width=960&button=false)](https://github.com/HospitalRun/hospitalrun-frontend/graphs/contributors)

## Founders

<!-- prettier-ignore -->
| [<img src="https://avatars0.githubusercontent.com/u/609052?s=460&v=4" width="100px;"/><br /><sub><b>John Kleinschmidtr</b></sub>](https://github.com/jkleinsc) | [<img src="https://avatars0.githubusercontent.com/u/929261?s=400&v=4" width="100px;"/><br /><sub><b>Joel Worrall</b></sub>](https://github.com/tangollama)  | [<img src="https://avatars0.githubusercontent.com/u/1319791?s=460&v=4" width="100px;"/><br /><sub><b>Joel Glovier</b></sub>](https://github.com/jglovier)  |
|---|---|---|

# License

Released under the [MIT license](LICENSE).
