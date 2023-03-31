import { UserState } from "@/store/modules/UserModule";

// 根状态
interface RootState {
  user: UserState;
  // 其他模块的状态定义
}

export default RootState;
