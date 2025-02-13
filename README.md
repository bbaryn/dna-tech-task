## Project description



## How to start

Steps needed to run application:

* Run using Docker Compose [**Recommended Method**] 
1. Run `npm install`
2. Copy the contents of `.env.development` to an `.env` file using `cp .env.development .env` and complete with data
3. Run `docker-compose up -d`

* Install Without Docker [**2nd Method**]
1. Run `npm install`
2. Copy the contents of `.env.example` to an `.env` file using `cp .env.example .env` and complete with data
3. Run `npm run start` to run application
   
## Project structure

- `cache` 
- `common` 
- `core` 
- `helpers` 
- `middleware` 
- `routes` 

## Core libraries

_This project uses pnpm!_

- [`nodejs`](https://nestjs.com/) - A progressive Node.js framework for building efficient, reliable and scalable server-side applications.
- [`class-validator`](https://github.com/typestack/class-validator) - Allows use of decorator and non-decorator based validation

## Planned improvements

- [ ] Eslint/Prettier/TS have default settings provided by the NestJS framework. They should be reviewed and brought up to the latest standards
- [ ] Implement documentation using swagger
- [ ] Write e2e tests