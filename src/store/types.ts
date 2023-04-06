import { UserState } from "@/store/modules/UserModule";

interface MusicState {
  name: string;
  artist: string[];
  cover: string;
  url: string;
  lrc: string;
}
// 根状态
interface RootState {
  user: UserState;
  // 其他模块的状态定义
}

export default RootState;
