# Personal RTMP Server на MediaMTX

Современный мультипротокольный стриминг-сервер для трансляции с OBS на Android TV приставку.

## 🚀 Быстрый старт

### Требования

- Docker и Docker Compose
- OBS Studio
- Открытые порты: 1935, 8554, 8888, 8889

### Запуск сервера

```bash
docker-compose up -d
```

Сервер запустится автоматически и будет доступен на:
- **RTMP**: порт 1935
- **RTSP**: порт 8554
- **HLS**: порт 8888
- **WebRTC**: порт 8889

### Проверка статуса

```bash
docker ps
docker logs mediamtx-rtmp
```

### Остановка сервера

```bash
docker-compose down
```

## 📺 Настройка OBS

### Вариант 1: Через основной стрим (рекомендуется)

1. Откройте **Settings → Stream**
2. Выберите **Service**: `Custom`
3. Заполните:
   - **Server**: `rtmp://192.168.0.1:1935/live`
   - **Stream Key**: оставьте пустым
4. Нажмите **Apply → OK**
5. Нажмите **Start Streaming** в основном окне

### Вариант 2: Альтернативный формат

```
Server: rtmp://192.168.0.1:1935
Stream Key: live
```

⚠️ **НЕ используйте Multi RTMP плагин** для одного сервера - это вызовет ошибку кодировщика!

## 📱 Просмотр на Android TV

Установите любой медиа-плеер (VLC, MX Player, IPTV) и используйте один из URL:

### RTMP (для VLC)
```
rtmp://192.168.0.1:1935/live
```

### HLS (рекомендуется - более стабильный)
```
http://192.168.0.1:8888/live/index.m3u8
```

### RTSP (универсальный)
```
rtsp://192.168.0.1:8554/live
```

## 🔧 Настройка

Вы можете изменить конфигурацию сервера в файле `mediamtx.yml`:

- Изменить порты
- Включить запись трансляций
- Настроить аутентификацию
- Изменить параметры HLS сегментов

После изменения конфигурации перезапустите сервер:

```bash
docker-compose restart
```

## 🛡️ Firewall (Windows)

Откройте порты в PowerShell (от администратора):

```powershell
New-NetFirewallRule -DisplayName "MediaMTX RTMP" -Direction Inbound -Protocol TCP -LocalPort 1935 -Action Allow
New-NetFirewallRule -DisplayName "MediaMTX HLS" -Direction Inbound -Protocol TCP -LocalPort 8888 -Action Allow
New-NetFirewallRule -DisplayName "MediaMTX RTSP" -Direction Inbound -Protocol TCP -LocalPort 8554 -Action Allow
New-NetFirewallRule -DisplayName "MediaMTX WebRTC" -Direction Inbound -Protocol TCP -LocalPort 8889 -Action Allow
```

## 🐛 Решение проблем

### "Для текущей службы нет доступного URL-адреса" в OBS

1. ✅ Убедитесь, что сервер запущен: `docker ps`
2. ✅ Проверьте формат URL: должен быть `rtmp://IP:1935/live`
3. ✅ НЕ используйте Multi RTMP для одного сервера
4. ✅ Остановите любые другие RTMP серверы на порту 1935

### Проверка доступности сервера

```powershell
Test-NetConnection -ComputerName 192.168.0.1 -Port 1935
```

### Сервер не запускается

```bash
# Проверить логи
docker logs mediamtx-rtmp

# Проверить занятость портов
netstat -ano | findstr :1935
```

## 📝 Узнать свой IP

### Windows
```cmd
ipconfig
```
Ищите "IPv4-адрес" в разделе активного адаптера (обычно начинается с 192.168.x.x)

### Linux/Mac
```bash
ip addr
# или
ifconfig
```

## 🎯 Преимущества MediaMTX

- ✅ Быстрый и легковесный (написан на Go)
- ✅ Поддержка множества протоколов
- ✅ Готовый Docker образ
- ✅ Не требует установки Node.js, npm, FFmpeg
- ✅ Стабильная работа
- ✅ Активная разработка и поддержка

## 📚 Дополнительно

- [Официальная документация MediaMTX](https://github.com/bluenviron/mediamtx)
- [Docker Hub](https://hub.docker.com/r/bluenviron/mediamtx)
- [OBS Studio](https://obsproject.com/)

## 📄 Лицензия

MIT
