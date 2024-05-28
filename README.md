# url-format

This is a simple tool for url format

## How To use?

1. Select target text
2. `CMD + Shift + P`: get the vscode Command Pallttle
3. Enter the `url:`, get the command, return
    * Url: Format (Format url to a json)
    * Url: Generate (Generate url from a json)
    * Url: Decode
    * Url: Encode

## Samples

### format url string to json

```
// origin url
http://www.xxx.com/search?url=http%3A%2F%2Fwww.bbb.com%3Fa%3D1%26b%3D1&a=1

// cmd> Url: Format

// result
{
    "main": "http://www.xxx.com/search",
    "params": {
        "url": {
            "main": "http://www.bbb.com/",
            "params": {
                "a": "1",
                "b": "1"
            },
            "hash": ""
        },
        "a": "1"
    },
    "hash": ""
}
```

### format json to url

```
// origin json string for url
{
    "main": "http://www.xxx.com/search",
    "params": {
        "url": {
            "main": "http://www.bbb.com",
            "params": {
                "a": "1",
                "b": "1"
            },
            "hash": ""
        }
        "a": "1"
    },
    "hash": ""
}
// cmd> Url: Generate

// result
http://www.xxx.com/search?url=http%3A%2F%2Fwww.bbb.com%2F%3Fa%3D1%26b%3D1&a=1
```

### Url Encode

```
// origin text
http://

// cmd> Url: Encode

// result
http%3A%2F%2F
```

### Url Decode

```
// origin text
http%3A%2F%2F

// cmd> Url: Decode

// result
http://
```