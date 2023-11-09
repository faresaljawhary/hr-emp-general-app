import React, { useState } from "react";
import { Layout, Typography, Menu, Popover } from "antd";
import {
  DotChartOutlined,
  MenuOutlined,
  PieChartOutlined,
  LogoutOutlined,
  CloudUploadOutlined,
} from "@ant-design/icons";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import PreviewIcon from "@mui/icons-material/Preview";
import GradingIcon from "@mui/icons-material/Grading";
import LanguageIcon from "@mui/icons-material/Language";
import { FormattedMessage } from "react-intl";

import { useLocale } from "../../hooks/localeContext";
import "./antdStyle.css";
import styles from "./styles.module.scss";
import ViewGeneralApplications from "../../components/ViewGeneralApplications";

const {
  headerContainer,
  menuContainer,
  menuIcon,
  drawerMenu,
  renderContainer,
  iconSize,
  pageLayOut,
  logoutButton,
  langContainer,
  langIcon,
  iconsContainer,
  logoContainer,
  arrow,
  tab,
} = styles;
const { Header } = Layout;

const ViewAllGeneralFormComponent = () => <ViewGeneralApplications />;
function getItem(label, key, icon, type, children) {
  return {
    key,
    icon,
    label,
    type,
    children,
  };
}

const items = [
  getItem(
    <FormattedMessage id="Employment applications" />,

    "1",
    <PieChartOutlined className={iconSize} />,
    "submenu",
    [
      getItem(
        <FormattedMessage id="View applications" />,
        "1.1",
        <PreviewIcon className={iconSize} />
      ),
    ]
  ),

  getItem(
    <FormattedMessage id="LogOut" />,
    "3",
    <LogoutOutlined className={`${iconSize} ${logoutButton}`} />,
    "logout"
  ),
];

const ApploggedInHeader = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [selectedOption, setSelectedOption] = useState("1.1");
  const [visible, setVisible] = useState(false);
  const { changeLocale, locale } = useLocale();
  const handleLanguageChange = ({ key }) => {
    changeLocale(key);
    setVisible(false); // Close the Popover
  };

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleMenuItemClick = (key) => {
    if (key === "3") {
      sessionStorage.removeItem("authToken");
      window.location.href = "/signin";
    } else {
      setSelectedOption(key);
    }
  };

  // Map selected option to the corresponding component
  const componentMap = {
    1.1: ViewAllGeneralFormComponent,
    // Add more mappings for other options
  };

  const SelectedComponent = componentMap[selectedOption];
  const menu = (
    <Menu onClick={handleLanguageChange} selectedKeys={[locale]}>
      <Menu.Item key="ar">Arabic</Menu.Item>
      <Menu.Item key="en">English</Menu.Item>
    </Menu>
  );
  return (
    <Layout className={pageLayOut}>
      <Header className={headerContainer}>
        <div className={iconsContainer}>
          <div className={menuContainer}>
            <MenuOutlined onClick={toggleCollapsed} className={menuIcon} />
          </div>
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
        </div>
        <div className={tab}>
          <div className={arrow}></div>
          <div className={logoContainer}>
            <img src="/assets/images/npc_logo.png" alt="Logo" />
          </div>
        </div>
      </Header>
      <div
        className={drawerMenu}
        style={{
          zIndex: "999",
        }}
      >
        <Menu
          defaultSelectedKeys={[selectedOption]}
          defaultOpenKeys={["1"]}
          mode="inline"
          inlineCollapsed={collapsed}
          items={items}
          onSelect={({ key }) => handleMenuItemClick(key)}
          style={{
            width: collapsed ? 80 : 256,
            height: "120vh",
          }}
        />
      </div>
      <div className={renderContainer}>
        {SelectedComponent && <SelectedComponent />}
      </div>
    </Layout>
  );
};

export default ApploggedInHeader;
