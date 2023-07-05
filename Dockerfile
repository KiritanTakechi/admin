# 阶段一：编译
FROM node:lts as build-stage

WORKDIR /app

# 确保git已经安装
RUN apt-get update && \
    apt-get install -y git locales locales-all fonts-noto-cjk && \
    locale-gen zh_CN.UTF-8 && \
    npm install -g pnpm && \
    git clone https://github.com/KiritanTakechi/vue-admin.git . && \
    pnpm i && \
    pnpm run build && \
    pnpm store prune && \
    apt clean && \
    rm -rf /var/lib/apt/lists/*

# 阶段二：生产环境
FROM nginx:stable-alpine as production-stage

# 将编译得到的文件复制到nginx目录下
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
COPY ssl/ /etc/nginx/

ENV TZ=Asia/Shanghai \
    LC_ALL=zh_CN.UTF-8 \
    LANG=zh_CN.UTF-8 \
    LANGUAGE=zh_CN.UTF-8

EXPOSE 3210

LABEL authors="kiritan"

CMD ["nginx", "-g", "daemon off;"]
