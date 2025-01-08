# Python 3.11 slim 이미지를 기본으로 사용
FROM python:3.11-slim

# 작업 디렉토리 설정
WORKDIR /app/server

# 시스템 패키지 설치
# - gcc, g++: C/C++ 컴파일러
# - openjdk-17-jdk: Java 개발 키트
# - nodejs, npm: JavaScript/TypeScript 실행 환경
# - curl: SDKMAN 설치용
RUN apt-get update && apt-get install -y \
    gcc \
    g++ \
    openjdk-17-jdk \
    nodejs \
    npm \
    curl \
    && npm install -g typescript \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Kotlin 설치를 위한 SDKMAN 설치 및 Kotlin 설치
RUN curl -s https://get.sdkman.io | bash \
    && bash -c "source $HOME/.sdkman/bin/sdkman-init.sh && sdk install kotlin"

# Python 관련 환경 설정
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# requirements.txt 복사 및 의존성 설치
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 서버 코드 복사
COPY . .

# Django 설정
ENV DJANGO_SETTINGS_MODULE=config.settings.settings

# 포트 설정
EXPOSE 8000

# 서버 실행
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
