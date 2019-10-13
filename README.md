# Loger

Very simple loger for NodeJS.

## Documentation

```javascript
const path = require('path')
const {createLoger} = require('@fczbkk/loger')

const loger = await createLoger({
    logPath: path.resolve(__dirname, 'logs/history.log'),
    maxLines: 10, // optional
    useConsole: true // optional
})

await loger.log('something happened')
```

## Bug reports, feature requests and contact

If you found any bugs, if you have feature requests or any questions, please, either [file an issue at GitHub](https://github.com/fczbkk/loger/issues) or send me an e-mail at <a href="mailto:riki@fczbkk.com">riki@fczbkk.com</a>.

## License

Loger is published under the [MIT license](https://github.com/fczbkk/loger/blob/master/LICENSE).
