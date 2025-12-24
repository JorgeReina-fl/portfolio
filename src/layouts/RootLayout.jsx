import { Outlet } from "react-router-dom";
import { Header, Footer, MobileNav } from "@organisms";
import styles from '@styles/layouts/RootLayout.module.css';

function RootLayout() {
  return (
    <div className={styles.appWrapper}>
      <Header />
      <main className={styles.mainContent}>
        <Outlet />
      </main>
      <Footer />
      <MobileNav />
    </div>
  )
}

export default RootLayout;