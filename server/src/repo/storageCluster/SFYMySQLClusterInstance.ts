import SFYMySQLCluster from "./SFYMySQLCluster";

const SFYMySQLClusterInstance = (() => {
  const clusterInstance = new SFYMySQLCluster();
  return clusterInstance;
})();

export default SFYMySQLClusterInstance;
