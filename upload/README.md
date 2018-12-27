# 文件上传下载

- 用于文件的上传下载
- 图片实现自动压缩剪裁
  - 压缩图及原图均保存一份
  - 根据需要剪裁等比例或方形图

## 数据库设计

### 文件表 `Media`

| KEY         | TYPE         | DEFAULT | NOT NULL | INCREMENT | PRIMARY | FOREIGN | REMARK |
|-------------|--------------|---------|----------|-----------|---------|---------|--------|
| id          | INT          |         | Y        |           | Y       |         | UUID   |
| mime        | VARCHAR(64)  |         | Y        |           |         |         |        |
| filename    | VARCHAR(128) |         | Y        |           |         |         |        |
| title       | VARCHAR(128) |         |          |           |         |         |        |
| hashname    | VARCHAR(64)  |         | Y        |           |         |         |        |
| ext         | CHAR(4)      |         | Y        |           |         |         |        |
| path        | VARCHAR(128) |         | Y        |           |         |         |        |
| url         | VARCHAR(255) |         |          |           |         |         |        |
| description | VARCHAR(255) |         |          |           |         |         |        |
| size        | INT          |         | Y        |           |         |         |        |
| width       | INT          |         |          |           |         |         |        |
| height      | INT          |         |          |           |         |         |        |
| create_at   | DATETIME     |         | Y        |           |         |         |        |
| update_at   | DATETIME     |         | Y        |           |         |         |        |
| delete_at   | DATETIME     |         |          |           |         |         |        |

Example

```js
{
  "id": "5c984620-04f6-11e9-85d0-950f3b428717",
  "mime": "image/png",
  "filename": "2016-09-14 11-30-09屏幕截图.png",
  "title": "test_title",
  "hashname": "7b745b688b3d677a0a41c2c85cc56156",
  "ext": ".png",
  "path": "png/7b/74/7b745b688b3d677a0a41c2c85cc56156.png",
  "url": "http://dev.media.test.com/png/7b/74/7b745b688b3d677a0a41c2c85cc56156.png",
  "description": null,
  "size": 148584,
  "width": 600,
  "height": 779,
  "created_at": "2018-12-21T07:59:37.347Z",
  "updated_at": "2018-12-21T07:59:37.347Z",
  "deleted_at": null,
  "resize": 100,
  "resize_path": "png/7b/74/7b745b688b3d677a0a41c2c85cc56156_100.png",
  "resize_url": "http://dev.media.test.com/png/7b/74/7b745b688b3d677a0a41c2c85cc56156_100.png",
  "thumb": 64,
  "thumb_path": "png/7b/74/7b745b688b3d677a0a41c2c85cc56156_s64.png",
  "thumb_url": "http://dev.media.test.com/png/7b/74/7b745b688b3d677a0a41c2c85cc56156_s64.png",
}
```

## API

### 上传文件

```sh
# 上传单个文件
POST /upload
# 上传多个文件
POST /upload/multiple
```

Request From fields

```js
{
  resize: 256, // 等比例的长边
  thumb: 64, // 正方形剪裁
}
```

### 下载文件

```sh
# 下载单个文件
GET /download
```

Request Qeury

```js
{
  id: '123',
}
```

### 文件RESTful

```sh
GET /medias
GET /medias/:id
POST /medias
PUT /medias/:id
DELETE /medias/:id
```
