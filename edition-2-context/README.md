1. // eslint-disable-next-line 可以消除 useEffect 的提示警告。

2. useState, useEffect, useRef, useReducer, useContext

3. react-router-dom 一条 Route 处理多个 component

4. 多个 context 叠加使用。

5. 设定 context 的过程。重点，设定 context 的 3个文件。

6. 关于 。env.local 与 CRA 内置全局 variables 的设定规则。

Deployed on netlify

1. .env.local

```js
let githubClientId;
let githubClientSecret;

if(process.env.NODE_ENV ！== ‘production’){
    githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
    githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
}else{
    githubClientId = process.env.GITHUB_CLIENT_ID;
    githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}
```

2. sudo npm i -g netlify-cli

3. new file: netlify.toml

```
[build]
    publish='build'
```

4. netlify init

5. yes => site name => 

6. add env variables

7. npm run build

8. netlify deploy --prod