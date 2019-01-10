# 一些常见公共服务的封装

## 目录

```sh
├── corp
├── deliver
├── LICENSE
├── order
├── README.md
├── staff
├── upload
├── user
├── wxapp
├── wxpay
└── wxuser
```

## 开发端口分配

| app     | app port | inspect port | remark             |
|---------|----------|--------------|--------------------|
| user    | 3001     | 9301         | 用户及登录              |
| wxapp   | 3002     | 9302         | 微信APP              |
| wxpay   | 3003     | 9303         | 微信支付               |
| wxuser  | 3004     | 9304         | 微信用户               |
| corp    | 3005     | 9305         | 企业                 |
| deliver | 3006     | 9306         | 快递                 |
| order   | 3007     | 9307         | 订单及支付              |
| staff   | 3008     | 9308         | 员工及权限              |
| upload  | 3009     | 9309         | [文件上传下载](./upload) |
