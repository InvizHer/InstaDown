const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post('/api/fetch', async (req, res) => {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: 'No URL provided' });

    try {
        const id = url.split("/p/")[1]?.split("/")[0] || url.split("/reel/")[1]?.split("/")[0];
        const apiUrl = `https://www.instagram.com/p/${id}/?__a=1&__d=dis`;

        const response = await axios.get(apiUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0'
            }
        });

        const media = response.data?.graphql?.shortcode_media;
        if (!media) return res.status(404).json({ error: 'Media not found' });

        const result = {
            is_video: media.is_video,
            media_url: media.is_video ? media.video_url : media.display_url
        };

        res.json(result);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Failed to fetch Instagram media' });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
