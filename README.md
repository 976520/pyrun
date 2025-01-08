## server 에서

처음이시면

```shell
pip install -r requirements.txt
```

로 패키지 깔고

```shell
source venv/Scripts/activate
```

로 가상환경 키고 나서

```shell
python manage.py runserver
```

로 로컬에서 열거나

```shell
docker build -t code-executor .
```

```shellcd
docker run -d -p 8000:8000 -e DJANGO_SETTINGS_MODULE=config.settings.production --name code-executor code-executor
```

로 도커에서 ㄱㄱ헛

## client 에서

```shell
npm run dev
```

하거나 뭐

```shell
npm run build
```

하거나 알아서
