
## 创建tarball

[npm-pack](https://docs.npmjs.com/cli/v8/commands/npm-pack):Create a tarball from a package

```
// 最新版本
npm pack lodash  --pack-destination="./libs" 

// 指定版本号
npm pack lodash@4.0.0  --pack-destination="./libs" 
```

## child_process 

```js
child_process.exec(command[, options], callback)
```