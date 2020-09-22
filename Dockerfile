FROM node:10.16.0
MAINTAINER Charming
# 创建目录
RUN mkdir /usr/src/tinify-pic

# 进入目录
WORKDIR /usr/src/tinify-pic

# 复制文件到当前目录
COPY . .

# 安装依赖
RUN npm install --registry=https://registry.npm.taobao.org

# 启动命令
CMD ["npm", "run", "dev"]

EXPOSE 3000