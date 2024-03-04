# url-format

This is a tool for url

* url format (supporting recursive analysis)
* url generate
* url encode
* url decode

## How To use?

1. Select the text
2. `CMD + Shift + P`: get the vscode Command Pallttle
3. Enter the `url:`, get the command, return

## Functions

### Url Format

```
// origin url
http://www.xxx.com/search?url=http%3A%2F%2Fwww.bbb.com%3Fa%3D1%26b%3D1&a=1

// Url: Format 
// this a format result (supporting recursive analysis)
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

### Url Generate

```
// Url: Generate 
// this is text
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

// this is result
http://www.xxx.com/search?url=http%3A%2F%2Fwww.bbb.com%3Fa%3D1%26b%3D1&a=1
```

### Url Encode

```
// origin text
http://

// Url: Encode
http%3A%2F%2F
```

### Url Decode

```
// origin text
http%3A%2F%2F

// Url: Decode
http://
```