import React, { useState } from "react";
import { Layout, Popover, Menu } from "antd";
import LanguageIcon from "@mui/icons-material/Language";
import { useLocale } from "../../hooks/localeContext";
import styles from "./styles.module.scss";

const { headerContainer, logoContainer, tab, arrow, langContainer, langIcon } =
  styles;
const { Header } = Layout;
const handleRefresh = () => {
  window.location.href = "/";
};

const AppHeader = () => {
  const [visible, setVisible] = useState(false);
  const { changeLocale, locale } = useLocale();
  const handleLanguageChange = ({ key }) => {
    changeLocale(key);
    setVisible(false); // Close the Popover
  };

  const menu = (
    <Menu onClick={handleLanguageChange} selectedKeys={[locale]}>
      <Menu.Item key="ar">Arabic</Menu.Item>
      <Menu.Item key="en">English</Menu.Item>
    </Menu>
  );

  return (
    <Header className={headerContainer}>
      <div className={langContainer}>
        <Popover
          content={menu}
          title="Select Language"
          trigger="click"
          visible={visible}
          onVisibleChange={(isVisible) => setVisible(isVisible)}
        >
          <LanguageIcon className={langIcon} />
        </Popover>
      </div>
      <div className={tab} onClick={handleRefresh}>
        <div className={arrow}></div>
        <div className={logoContainer}>
          <img src="/assets/images/npc_logo.png" alt="Logo" />
        </div>
      </div>
    </Header>
  );
};

export default AppHeader;
