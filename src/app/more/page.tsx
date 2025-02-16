import ArrowIcon from '@/elements/svg/Arrow';
import styles from './more.module.css';

const App = () => {
    return (
        <div className={styles.container}>
            <div className={styles.contents}>
                <section className={styles.topSection}>
                    <div className={styles.topSectionLeft}>
                        <img src="/profile.png" alt="계정 이미지" />
                        <div className={styles.topSectionLeft_account}>
                            <p className={styles.nickname}>닉네임</p>
                            <p className={styles.id}>아이디</p>
                        </div>
                    </div>
                    <div className={styles.topSectionRight}>
                        <ArrowIcon
                            direction="right"
                            color="#9e9e9e"
                            size={16}
                        />
                    </div>
                </section>
                <section className={styles.mainSection}>
                    <div className={styles.metrics}>
                        <p>프로필관리</p>
                        <ArrowIcon
                            direction="right"
                            color="#9e9e9e"
                            size={16}
                        />
                    </div>
                    <div className={styles.metrics}>
                        <p>앱 버전</p>
                        <ArrowIcon
                            direction="right"
                            color="#9e9e9e"
                            size={16}
                        />
                    </div>
                    <div className={styles.metrics}>
                        <p>개인정보 보호</p>
                        <ArrowIcon
                            direction="right"
                            color="#9e9e9e"
                            size={16}
                        />
                    </div>
                    <div className={styles.metrics}>
                        <p>이용약관</p>
                        <p>1.0.0.0</p>
                    </div>
                    <div className={styles.metrics}>
                        <p>개인정보처리방침</p>
                        <ArrowIcon
                            direction="right"
                            color="#9e9e9e"
                            size={16}
                        />
                    </div>
                </section>
            </div>
        </div>
    );
};

export default App;
