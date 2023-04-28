import { Music } from "./Music";

export interface Comment {
  id: string; // 评论id
  username: string; // 用户名
  comment: string; // 评论内容
  time?: string; // 评论时间
  music?: Music; // 评论的音乐
}
