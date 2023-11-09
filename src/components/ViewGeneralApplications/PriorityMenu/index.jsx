import React, { useEffect, useState } from "react";
import { Button, Popover, Space, Radio, Modal, Spin } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./styles.module.scss";

const PriorityMenu = ({
  setPopoverOpen,
  initialPriority,
  record,
  fetchData,
}) => {
  const [priority, setPriority] = useState(initialPriority || "L");
  const [newPriority, setNewPriority] = useState(priority);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const { updatePriortyWorker } = useEndpoints();
  useEffect(() => {
    setPriority(initialPriority);
  }, [initialPriority]);
  const getButtonStyles = (selectedPriority) => {
    let color, borderColor, backgroundColor;

    if (selectedPriority === "H") {
      color = "#239B56";
      backgroundColor = "#ABEBC6";
      borderColor = "#239B56";
    } else if (selectedPriority === "M") {
      color = "#F39C12";
      backgroundColor = "#FAD7A0";
      borderColor = "#F39C12";
    } else {
      color = "#E74C3C";
      backgroundColor = "#F5B7B1";
      borderColor = "#E74C3C";
    }

    return {
      backgroundColor,
      color,
      border: `2px solid ${borderColor}`,
    };
  };

  const handleActionClick = (e) => {
    e.stopPropagation();
  };

  const handlePriorityChange = (e) => {
    const selectedPriority = e.target.value;
    setNewPriority(selectedPriority);
    setIsModalVisible(true);
  };

  const handlePopoverVisibleChange = (visible) => {
    setPopoverOpen(visible);
  };
  const handleModalOk = async (e) => {
    e.stopPropagation();
    setIsLoading(true);
    // try {
    //   const response = await updatePriortyWorker(record?.ID, newPriority);

    //   if (response.status === 200) {
    //     toast.success("تم تغيير الأولوية");
    //     fetchData();
    //   } else {
    //     toast.error("حدث خطأ، جرب مرة أخرى");
    //   }
    // } catch (error) {
    //   toast.error("حدث خطأ، جرب مرة أخرى");
    // } finally {
    //   setPriority(newPriority);
    //   setIsModalVisible(false);
    //   setIsLoading(false);
    // }
  };

  const handleModalCancel = (e) => {
    e.stopPropagation();
    setIsModalVisible(false);
  };

  const getConfirmationMessage = (selectedPriority) => {
    switch (selectedPriority) {
      case "H":
        return `هل أنت متأكد من تغيير الأولوية إلى عالي؟`;
      case "M":
        return `هل أنت متأكد من تغيير الأولوية إلى متوسط؟`;
      case "L":
        return `هل أنت متأكد من تغيير الأولوية إلى منخفض؟`;
      default:
        return "هل أنت متأكد من تغيير الأولوية؟";
    }
  };

  const buttonStyles = getButtonStyles(priority);
  const confirmationMessage = getConfirmationMessage(newPriority);

  return (
    <Space size="middle">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        className={styles.toastConatiner}
      />
      <Popover
        content={
          <div>
            <div>
              <Radio.Group onChange={handlePriorityChange} value={priority}>
                <Radio value="H">عالي</Radio>
                <Radio value="M">متوسط</Radio>
                <Radio value="L">منخفض</Radio>
              </Radio.Group>
            </div>
          </div>
        }
        title="تغيير الاولوية"
        trigger="click"
        onOpenChange={handlePopoverVisibleChange}
      >
        <Button
          icon={<EditOutlined />}
          onClick={(e) => handleActionClick(e)}
          className={styles.priorityButton}
          style={buttonStyles}
        >
          {priority &&
            (priority === "H" ? "عالي" : priority === "M" ? "متوسط" : "منخفض")}
        </Button>
      </Popover>
      <Modal
        title="تأكيد تغيير الاولوية"
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText="تأكيد"
        cancelText="إلغاء"
      >
        {isLoading ? (
          <div style={{ textAlign: "center" }}>
            <Spin size="large" />
          </div>
        ) : (
          confirmationMessage
        )}
      </Modal>
    </Space>
  );
};

export default PriorityMenu;
