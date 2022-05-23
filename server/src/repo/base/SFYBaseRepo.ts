import SFYMySQLClusterInstance from "../storageCluster";
import SFYMySQLCluster from "../storageCluster/SFYMySQLCluster";
import { SFYBaseRepoProps } from "./SFYBaseRepo.type";

class SFYBaseRepo {
  props: SFYBaseRepoProps;
  db: SFYMySQLCluster;
  constructor(props: SFYBaseRepoProps) {
    this.props = props;
    this.db = SFYMySQLClusterInstance;
  }
}

export default SFYBaseRepo;
