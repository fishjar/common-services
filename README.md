# 一些常见公共服务的封装

## 目录

```sh
├── upload # 文件上传下载
│   ├── egg
│   ├── koa
│   ├── README.md
│   └── swagger.yaml
└── wxpay # 微信支付

```

## 文档

- [文件上传下载](./upload)

## 开发端口分配

| app    | app port | inspect port | remark |
|--------|----------|--------------|--------|
| upload | 3000     | 9300         |        |
| user   | 3001     | 9301         |        |
| wxapp  | 3002     | 9302         |        |
| wxpay  | 3003     | 9303         |        |
| wxuser | 3004     | 9304         |        |
