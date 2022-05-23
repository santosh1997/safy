import { SFYBaseRepoProps } from "../../repo/base/SFYBaseRepo.type";
import { SFYBaseServiceProps } from "./SFYBaseService.type";

class SFYBaseService {
  props: SFYBaseServiceProps;
  constructor(props: SFYBaseServiceProps) {
    this.props = props;
  }

  get repoProps(): SFYBaseRepoProps {
    return this.props;
  }
}

export default SFYBaseService;
