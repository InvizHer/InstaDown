async function download() {
  const url = document.getElementById('instaUrl').value;
  const result = document.getElementById('result');
  result.innerHTML = 'Fetching...';

  try {
    const res = await fetch('http://localhost:5000/api/fetch', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url })
    });
    const data = await res.json();

    if (data.error) {
      result.innerHTML = `<p>${data.error}</p>`;
    } else {
      if (data.is_video) {
        result.innerHTML = `
          <video controls>
            <source src="${data.media_url}" type="video/mp4">
          </video>
          <a href="${data.media_url}" download>Download Video</a>
        `;
      } else {
        result.innerHTML = `
          <img src="${data.media_url}" />
          <a href="${data.media_url}" download>Download Image</a>
        `;
      }
    }
  } catch (error) {
    result.innerHTML = `<p>Error fetching media</p>`;
  }
}