# typescript-isolating-the-domain

[system-sekkei/isolating-the-domain](https://github.com/system-sekkei/isolating-the-domain)
をもとに Typescript で作成した DDD のサンプルコードです。(WIP)

# Environments

- Typescript
- TSyringe (for DI)
- TypeORM (for handling RBD)

# Setup

## Build Docker

```bash
$ docker-compose build
```

## Exec Docker container

```bash
$ docker-compose run --rm --service-ports app /bin/bash
```

### In Docker container

After entered a container.

#### Run tests

```bash
/app# yarn test
```

# Notes 
See Wiki.
