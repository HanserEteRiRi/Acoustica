/*
 *  歌词解释器
 *  @param {String} lrcText 歌词文本
 *  @return {Array} 歌词数组，time单位为毫秒
 */
function parseLrc(lrcText: string) {
  const lines = lrcText.split("\n");
  const lyrics = [];

  for (const line of lines) {
    const match = line.match(/^\[(\d{2}):(\d{2})\.(\d{2})\](.*)$/);

    if (match) {
      const minutes = parseInt(match[1]);
      const seconds = parseInt(match[2]);
      const milliseconds = parseInt(match[3]);
      const text = match[4].trim();

      const time = minutes * 60 * 1000 + seconds * 1000 + milliseconds;

      lyrics.push({ time, text });
    }
  }

  return lyrics;
}

export default parseLrc;
