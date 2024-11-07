FROM node:20-alpine  # Alpine 기반 경량 이미지 사용

WORKDIR /usr/src/app

# package.json과 package-lock.json만 복사하여 의존성 설치
COPY package*.json ./
RUN npm install --only=production

# 애플리케이션 소스 코드 복사
COPY . .

# 포트 노출
EXPOSE 8000

# 애플리케이션 시작 명령
CMD ["node", "app.js"]