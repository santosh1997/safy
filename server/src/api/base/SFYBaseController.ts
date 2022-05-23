import { SFYBaseServiceProps } from "../../service/base/SFYBaseService.type";
import { SFYBaseControllerProps } from "./SFYBaseController.type";

class SFYBaseContoller {
  props: SFYBaseControllerProps;
  constructor(props: SFYBaseControllerProps) {
    this.props = props;
  }
  get serviceProps(): SFYBaseServiceProps {
    return this.props;
  }
}

export default SFYBaseContoller;
