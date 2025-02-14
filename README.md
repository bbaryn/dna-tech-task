## Project description

The project is a straightforward yet efficient REST API designed to retrieve and provide detailed information about a specified IP address while incorporating a caching mechanism to optimize performance and reduce redundant requests to external services. When a request is made with an IP address, the API first checks whether the information is already stored in the cache. If the data is available and still valid within the predefined expiration period, it is retrieved directly from the cache, ensuring a rapid response. However, if the requested IP information is not present in the cache or has expired, the API fetches fresh data from an external service, processes it accordingly, stores it in the cache for future use, and then returns the response to the client. This approach significantly improves efficiency by minimizing unnecessary API calls to external providers, reducing latency, and ensuring that frequently requested data remains readily available.

The development of this API follows a well-structured architectural approach, adhering to key software design principles. A clean architecture was implemented, ensuring clear separation of concerns between different layers of the application, such as data retrieval, business logic, and presentation. This makes the system more maintainable, scalable, and testable. The project also strictly followed the SOLID principles, which helped in creating a flexible and easily extendable codebase. By applying these principles, the system remains robust and can accommodate future modifications without introducing significant technical debt. Additionally, architectural patterns were leveraged to ensure the reliability and maintainability of the project. These patterns guided the design choices, ensuring that the API remains modular, scalable, and adaptable to potential changes or enhancements over time.

Overall, the API was built with efficiency, maintainability, and performance in mind, offering a structured yet lightweight solution for retrieving IP-related information while optimizing response times through caching.

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

 ## Project Directory Structure
 ```
├── src
│   ├── index.ts
│   ├── app.ts
│   ├── cache
│   │   └── redis.ts
│   ├── common
│   │   ├── config.ts
│   │   └── constants.ts
│   ├── core
│   │   ├── Errors.ts
│   │   ├── Responses.ts
│   │   └── Logger.ts
│   ├── helpers
│   │   └── validator.ts
│   ├── middleware
│   │   └── checkCache.ts
│   └── routes
│       └── ipInfo
│           ├── dto
│           │    └── writer.ts
│           └── index.ts
├── .env
├── .gitignore
├── .dockerignore
├── .prettierignore
├── Dockerfile
├── docker-compose.yml
├── package-lock.json
├── package.json
└── tsconfig.json
 ```

## Core libraries

- [`nodejs`](https://nodejs.org/en) - Node.js is a free, open-source, cross-platform JavaScript runtime environment that lets developers create servers, web apps, command line tools and scripts.
- [`class-validator`](https://github.com/typestack/class-validator) - Allows use of decorator and non-decorator based validation
- [`axios`](https://axios-http.com/docs/intro) - Axios is a promise-based HTTP Client for node.js and the browser. It is isomorphic (= it can run in the browser and nodejs with the same codebase). On the server-side it uses the native node.js http module, while on the client (browser) it uses XMLHttpRequests.
- [`redis`](https://redis.io/) - Build better experiences that grow with you—with accessible, enterprise-grade caching built by the devs who brought you open source Redis.
- [`winston`](https://github.com/winstonjs/winston) - Winston is designed to be a simple and universal logging library with support for multiple transports. A transport is essentially a storage device for your logs.

## Planned improvements

- [ ] Eslint/Prettier/TS have default settings provided by the NestJS framework. They should be reviewed and brought up to the latest standards
- [ ] Implement documentation using swagger
- [ ] Write tests
- [ ] Refactor to use DDD
- [ ] Implement NestJS
- [ ] Refactor Responses