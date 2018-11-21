# meyo

## 启动本地页面搭建系统

启动页面服务
```bash
meyo server
```
（如果之前有创建过proto，在启动服务前，将proto仓库文件复制到``/proto``中，meyo会读取该目录下的原型文件）

Proto分类规则

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