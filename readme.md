# meyo

## 使用方法
```bash
meyo -p/--proto ./pageProto.json
```

### -c，--config
```bash
meyo -p ./pageProto.json
```
上面的命令会默认在当前目录下寻找``meyo.config.js``文件，也可以通过``-c``或``--config``选项引入工程配置文件
```bash
meyo -c ./meyo.config.js -p ./pageProto.json
```

### -p，--proto
必填选项，必须指明原型JSON文件的地址