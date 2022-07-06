# Sync `.env.example`

Create an `.env.example` from your local `.env` without values (just keys). It won't do anything rather than just removing values. No parsing.

It also supports file caching, so it will not process it again if no value changes.

[![test](https://github.com/seanghay/sync-env-example/actions/workflows/test.yml/badge.svg)](https://github.com/seanghay/sync-env-example/actions/workflows/test.yml)


```sh
npx sync-env-example
```

Input `.env`

```env
# Comment
KEY1=abc
KEY2=abc
```

Output `.env.example`

```env
# Comment
KEY1=
KEY2=
```


## Advanced usage

```sh
npx sync-env-example --input .env --output .env.example --replacer MY_REPLACER
```

Input `.env`

```env
# Comment
KEY1=abc
KEY2=abc
```

Output `.env.example`

```env
# Comment
KEY1=MY_REPLACER
KEY2=MY_REPLACER
```

### License

Apache 2.0
