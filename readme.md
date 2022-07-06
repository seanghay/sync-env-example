# Sync `.env.example`

Create an `.env.example` from your local `.env` without values (just keys) 

[![test](https://github.com/seanghay/sync-env-example/actions/workflows/test.yml/badge.svg)](https://github.com/seanghay/sync-env-example/actions/workflows/test.yml)

```sh
npx sync-env-example
```

#### Input

```env
# Comment
KEY1=abc
KEY2=abc
```

#### Output

```env
# Comment
KEY1=
KEY2=
```

### License

Apache 2.0
