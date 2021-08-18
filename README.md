<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    
# NestJS GraphQL Docker Boilerplate

This repository is contains the boilerplate to get you started with NestJS and GraphQL using MySQL as DB with TypeOrm.

###### It contains: 
- Dockerfile and Docker-Compose (MySQL, PhpMyAdmin)
- JenkinsFile (with google chat notification integration)
- .env.sample

### Starting the containers

```bash
$ docker-compose run dev
```

### Test

```bash
# unit tests
$ docker-compose run dev npm run test

# e2e tests
$ docker-compose run dev npm run test:e2e

# test coverage
$ docker-compose run dev npm run test:cov
```
