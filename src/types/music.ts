// music interface
export interface Music {
  id: string; // 歌曲id
  title: string; // 歌曲名
  artists?: string[]; // 歌手(多个歌手情况)
  artist: string; // 歌手
  cover?: string; // 封面
  url?: string; // 音乐链接
  lyric?: string; // 歌词
}
