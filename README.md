# PayPal CLI

CLI interface to PayPal's REST APIs. Currently only supports payments. 

## Usage:
```sh
$ paypal <command> [options]
```

## Commands:

```sh
$ paypal configure [--clientId=<clientId> --secret=<secret>]
```

```sh
$ paypal payment create --total=1.00 --return-url=<url> --cancel-url=<url> [
        --intent=<intent> --currency=<currency> --payment-method=<method>
        --description=<description> ]
```

```sh
$ paypal payment get --payment-id=<id>
```

```sh
$ paypal payment execute --payment-id=<id> --payer-id=<user> [
        --total=<total> ]
```

```sh
$ paypal payment list [ --count=<count> --start_index:<index> ]
```


### Options:
`-h`, `--help`     Show help  
`-v`, `--version`  Show version number  
