FROM node:alpine

# 将工作目录设置为 /app
WORKDIR /app

# 将当前目录内容复制到位于 /app 中的容器中
ADD . /app

# 安装依赖包
RUN npm install --registry=https://registry.npm.taobao.org
# RUN npm install
RUN npm install mysql2 --registry=https://registry.npm.taobao.org
RUN npm install sqlite3 --registry=https://registry.npm.taobao.org

# 编译
# RUN npm run build

# 使端口 3000 可供此容器外的环境使用
EXPOSE 7001

# 定义环境变量
# ENV NAME World

# 在容器启动时运行
# CMD [ "npm", "run", "dev" ]
CMD [ "npm", "start" ]
