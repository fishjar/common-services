# 一些常见公共服务的封装

## 目录

```sh
├── corp
├── deliver
├── email
├── order
├── product
├── promo
├── staff
├── stock
├── upload
├── user
├── wxacode
├── wxapp
├── wxpay
└── wxuser

```

## 开发端口分配

| app      | app port | inspect port | remark             |
|----------|----------|--------------|--------------------|
| user     | 3001     | 9301         | [用户及登录](./user)    |
| wxapp    | 3002     | 9302         | [微信APP](./wxapp)   |
| wxpay    | 3003     | 9303         | [微信支付](./wxpay)    |
| wxuser   | 3004     | 9304         | [微信用户](./wxuser)   |
| corp     | 3005     | 9305         | [企业及联系人](./corp)   |
| deliver  | 3006     | 9306         | [快递](./deliver)    |
| order    | 3007     | 9307         | [订单及支付](./order)   |
| staff    | 3008     | 9308         | [员工及权限](./staff)   |
| upload   | 3009     | 9309         | [文件上传下载](./upload) |
| email    | 3010     | 9310         | [邮件发送](./email)    |
| product  | 3011     | 9311         | [商品](./product)    |
| promo    | 3012     | 9312         | [推广](./promo)      |
| stock    | 3013     | 9313         | [库存](./stock)      |
| wxacode  | 3014     | 9314         | [小程序码](./wxacode)  |
| rabbitmq | 3015     | 9315         | [消息队列](./rabbitmq) |
| baiduai  | 3016     | 9316         | [百度AI](./baiduai)  |
