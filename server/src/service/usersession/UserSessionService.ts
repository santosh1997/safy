import UserSessionRepo from "../../repo/usersession/UserSessionRepo";
import SFYBaseService from "../base/SFYBaseService";
import { SFYBaseServiceProps } from "../base/SFYBaseService.type";
import { UserSession } from "./UserSessionService.type";

class UserSessionService extends SFYBaseService {
  userSession: UserSessionRepo;

  constructor(props: SFYBaseServiceProps) {
    super(props);
    this.userSession = new UserSessionRepo(this.repoProps);
  }

  async create(email: string, password: string): Promise<UserSession> {
    try {
      const userSessionDBO = await this.userSession.create(email, password);
      return {
        sessionId: userSessionDBO.SessionId,
        userId: userSessionDBO.UserId,
      };
    } catch (e) {
      throw e;
    }
  }

  async get(id: string): Promise<UserSession> {
    try {
      const userSessionDBO = await this.userSession.get(id);
      return {
        sessionId: userSessionDBO.SessionId,
        userId: userSessionDBO.UserId,
      };
    } catch (e) {
      throw e;
    }
  }
}

export default UserSessionService;
