gb2260-x
========

A simple library for looking-up administrative divisions

Installation
------------

```
npm install gb2260-x
```

Usage
-----

```javascript
const { Division } = require('gb2260-x/division')
const division = new Division(445100)
```

```javascript
> division
Division {
  code: 445100,
  name: '潮州市',
  isProvince: false,
  isPrefecture: true,
  isCounty: false,
  type: 'prefecture'
}
```

```javascript
const express = require('express')
const gb2260 = require('gb2260-x')
const server = express()
```

```javascript
server.use(gb2260.routes())
```

License
-------

The Commons Clause
