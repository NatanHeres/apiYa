const axios = require('axios');

async function play(videoUrl) {
    try {
        const memanggil_tobrut = async () => {
            const apayah = 'https://youtube-dl.wave.video/info';
            const nganuyt = encodeURIComponent(videoUrl);
            const apanya = `${apayah}?url=${nganuyt}`;
            const respon_tobrut = await axios.get(apanya);
            return respon_tobrut.data;
        };

        const respon_cekerbabat = async (url_nganu) => {
            try {
                const Kebakaran = `https://cdn36.savetube.me/info?url=${encodeURIComponent(url_nganu)}`;
                const ngloot = await axios.get(Kebakaran);
                
                if (!ngloot.data || !ngloot.data.data || !ngloot.data.data.audio_formats) {
                    throw new Error('Gagal nggawe daptar format audio');
                }
                
                const key = ngloot.data.data.key;
                
                const pecel_lele = `https://cdn34.savetube.me/download/audio/128/${key}`;
                const pencuri_matiae = await axios.get(pecel_lele);
                
                if (!pencuri_matiae.data || !pencuri_matiae.data.data || !pencuri_matiae.data.data.downloadUrl) {
                    throw new Error('Gagal nggawe daptar URL dhuwit');
                }
                
                return pencuri_matiae.data.data.downloadUrl;
            } catch (error) {
                console.error('Kesalahan:', error.message);
                return null;
            }
        };

        const [videoInfo, audioUrl] = await Promise.all([memanggil_tobrut(), respon_cekerbabat(videoUrl)]);

        if (!videoInfo) {
            throw new Error('未收到视频信息');
        }

        const anu = videoInfo.formats.find(format => format.format_id === '18');
        const inpo_pemanggilan = {
            channel_name: videoInfo.uploader,
            channel_name_id: videoInfo.uploader_id,
            title: videoInfo.title || '没有可用的标题',
            duration: videoInfo.duration,
            thumbnails: videoInfo.thumbnail ? [{ url: videoInfo.thumbnail }] : [],
            v1_video_url: anu ? anu.url : null,
            v1_audio_url: audioUrl || null
        };

        return inpo_pemanggilan;
    } catch (error) {
        console.error('gagal memanggil tobrut:', error);

        return {
            error: 'terjadi kegagalan saat memanggil tobrut',
            status: 1
        };
    }
}

module.exports = play