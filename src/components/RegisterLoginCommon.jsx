import Art from "../assets/images/Art2.png";
import styles from "../styles/RegisterLogin.module.css";

function RegisterLoginCommon() {
  return (
    <div className={styles.leftSide}>
      <div className={styles.subLeftSide}>
        <div className={styles.imageContainer}>
          <img src={Art} alt="Art" className={styles.topImage} />
        </div>
        <h2 className={styles.title}>Welcome aboard, my friend</h2>
        <p>Just a couple of clicks and we start</p>
      </div>
    </div>
  );
}

export default RegisterLoginCommon;
