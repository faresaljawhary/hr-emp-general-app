import React, { useState } from "react";
import { Button, Switch, Space, DatePicker, Modal, Spin } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./styles.module.scss";

const StatusMenu = ({ fetchData, record }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  // const { updateStatusWorker } = useEndpoints();

  const handleActionClick = (e) => {
    e.stopPropagation();
    setIsModalVisible(true);
  };

  const handleModalOk = async (e) => {
    e.stopPropagation();
    setIsLoading(true);
    // try {
    //   if (checked && selectedDate) {
    //     const response = await updateStatusWorker(
    //       record?.ID,
    //       "employee",
    //       selectedDate
    //     );
    //     if (response.status === 200) {
    //       toast.success("تم تغيير الحالة الى موظف");
    //       fetchData();
    //       // Call the fetchData function to refresh the data
    //     } else {
    //       toast.error("حدث خطأ، جرب مرة أخرى");
    //     }
    //   } else {
    //     toast.error("الرجاء التحقق من البيانات المدخلة");
    //   }
    // } catch (error) {
    //   toast.error("حدث خطأ، جرب مرة أخرى");
    // } finally {
    //   setIsModalVisible(false);
    //   setChecked(false); // Reset the Switch to its initial value
    //   setSelectedDate(null); // Reset the DatePicker to its initial value
    //   setIsLoading(false);
    // }
  };

  const handleModalCancel = (e) => {
    e.stopPropagation();
    setIsModalVisible(false);
    setChecked(false); // Reset the Switch to its initial value
    setSelectedDate(null); // Reset the DatePicker to its initial value
  };

  const onChangeSwitch = (isChecked) => {
    setChecked(isChecked);
  };

  const handleStartDate = (date) => {
    setSelectedDate(date);
  };

  return (
    <Space size="middle">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        className={styles.toastConatiner}
      />

      <Button
        icon={<SettingOutlined />}
        onClick={(e) => handleActionClick(e)}
        className={styles.priorityButton}
      ></Button>

      <Modal
        title={<div className={styles.modalTitle}>تغيير الى موظف</div>}
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText="تأكيد"
        cancelText="إلغاء"
        okButtonProps={{ disabled: !checked || !selectedDate }}
        wrapProps={{ onClick: (e) => e.stopPropagation() }}
      >
        <div className={styles.modalContainer}>
          <div>
            <div>موظف</div>
            <Switch checked={checked} onChange={onChangeSwitch} />
          </div>
          <div>
            <div>: تاريخ البدء</div>
            <DatePicker
              format="YYYY-MM-DD"
              onChange={handleStartDate}
              value={selectedDate}
            />
          </div>
        </div>
        {isLoading && (
          <div className={styles.loadingContainer}>
            <Spin size="large" />
          </div>
        )}
      </Modal>
    </Space>
  );
};

export default StatusMenu;
