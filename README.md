# Youtube Caption Extractor

author: Daniel Russell @danielrussellla

## Requirements:

1. You need to have a browserstack account <a href='https://browserstack.com'>https://browserstack.com</a>
2. Create a file called `browserstack.config.js` and put in your browserstack API credentials in it like so:
<pre>
// browserstack.config.js
module.exports = {
         browserstack.user: 'USER',
         browserstack.key: 'KEY'
}
</pre>

## Running the App
1. `npm i`
2. `url=https://youtube.com/v=1234a npm start`