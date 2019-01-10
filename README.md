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
| user    | 3001     | 9301         | [用户及登录](./user)    |
| wxapp   | 3002     | 9302         | [微信APP](./wxapp)   |
| wxpay   | 3003     | 9303         | [微信支付](./wxpay)    |
| wxuser  | 3004     | 9304         | [微信用户](./wxuser)   |
| corp    | 3005     | 9305         | [企业及联系人](./corp)   |
| deliver | 3006     | 9306         | [快递](./deliver)    |
| order   | 3007     | 9307         | [订单及支付](./order)   |
| staff   | 3008     | 9308         | [员工及权限](./staff)   |
| upload  | 3009     | 9309         | [文件上传下载](./upload) |
