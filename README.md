# Personal RTMP Server

Лёгкий RTMP-сервер для трансляции с OBS на Android TV приставку.

## 🚀 Быстрый старт

### Установка

```bash
npm install
```

### Запуск

```bash
npm start
```

Сервер запустится на порту **1935** (RTMP) и **8000** (HTTP).

## 📺 Настройка OBS

1. Откройте **Settings → Stream**
2. Выберите **Custom**
3. Заполните:
   - **Server**: `rtmp://<IP-адрес-вашего-сервера>:1935/live`
   - **Stream Key**: `stream` (или любое другое название)

## 📱 Просмотр на Android TV

Используйте любой RTMP-плеер для Android TV (например, VLC):

```
rtmp://<IP-адрес-вашего-сервера>:1935/live/stream
```

## 🔧 Требования

- Node.js >= 14.x
- FFmpeg (опционально, для HLS/DASH транскодинга)

### Установка FFmpeg

**Ubuntu/Debian:**
```bash
sudo apt-get install ffmpeg
```

**macOS:**
```bash
brew install ffmpeg
```

**Windows:**
Скачайте с [ffmpeg.org](https://ffmpeg.org/download.html)

## 📝 Примечания

- Убедитесь, что порт 1935 открыт в файрволе
- Для внешнего доступа используйте внешний IP или проброс портов
- Для production рекомендуется добавить аутентификацию
