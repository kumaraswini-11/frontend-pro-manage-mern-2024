import { LuLoader2 } from "../../utils/iconExports.js";
import styles from "./PageLoader.module.css";

const PageLoader = () => (
  <div className={styles.loaderOverlay}>
    <LuLoader2 className={styles.loaderIcon} />
    <p className={styles.loadingText}>Loading...</p>
  </div>
);

export default PageLoader;
