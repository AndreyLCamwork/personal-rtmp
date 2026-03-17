const NodeMediaServer = require('node-media-server');

const config = {
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60
  },
  http: {
    port: 8000,
    allow_origin: '*',
    mediaroot: './media'
  },
  trans: {
    ffmpeg: '/usr/bin/ffmpeg',
    tasks: [
      {
        app: 'live',
        hls: true,
        hlsFlags: '[hls_time=2:hls_list_size=3:hls_flags=delete_segments]',
        dash: true,
        dashFlags: '[f=dash:window_size=3:extra_window_size=5]'
      }
    ]
  }
};

var nms = new NodeMediaServer(config);
nms.run();

console.log('🎥 RTMP Server запущен!');
console.log('📡 RTMP URL: rtmp://localhost:1935/live');
console.log('🌐 HTTP Server: http://localhost:8000');
console.log('\n📋 Настройки OBS:');
console.log('   Server: rtmp://<ваш-ip>:1935/live');
console.log('   Stream Key: любой_ключ (например: stream)');
console.log('\n📺 Для просмотра на Android TV используйте:');
console.log('   rtmp://<ваш-ip>:1935/live/stream');