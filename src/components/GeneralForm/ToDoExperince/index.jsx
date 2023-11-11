import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Form,
  Input,
  DatePicker,
  InputNumber,
  Button,
  Card,
  Checkbox,
} from "antd";
import { v4 as uuidv4 } from "uuid";
import { FormattedMessage } from "react-intl";
import { CloseCircleOutlined } from "@ant-design/icons"; 
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./styles.module.scss";
const {
  threrInOneRow,
  addButton,
  endDateContainer,
  addButtonInvalidFrom,
  cardsContainer,
  cardTitle,
  cardContent,
  toastConatiner,
  closeIcon,
  cardAndCloseContainer
} = styles;
function ToDoPracticalExperiences({
  setWorkExperiences = () => {},
  workExperiences,
}) {
  const [form] = Form.useForm();
  const [vaildForm, setValidFrom] = useState(true);
  const [formData, setFormData] = useState({
    workplace: "",
    position: "",
    startDate: null,
    endDate: null,
    salary: null,
    isPresent: false,
  });

  const [experiences, setExperiences] = useState(workExperiences || []);

  const endDateRules = [
    {
      required: !formData.isPresent,
      message: <FormattedMessage id="Please select end date" />,
    },
  ];
  const deleteExperinceHandler=(id)=>{
    const filterExperincess=experiences?.filter(el=>el?.id !== id);
    setExperiences(filterExperincess);

      }
  const handleAddExperience = () => {
    form
      .validateFields()
      .then(() => {
        setValidFrom(true);
        if (
          formData.startDate &&
          formData.endDate &&
          formData.startDate > formData.endDate
        ) {
          toast.error(
            <FormattedMessage id="Start date cannot be greater than end date" />,
            {
              position: toast.POSITION.TOP_CENTER,
            }
          );

          return;
        }

        // Check for date conflicts with existing experiences
        const hasDateConflict = experiences.some((experience) => {
          if (
            (formData.startDate <= experience.endDate &&
              formData.endDate >= experience.startDate) ||
            (experience.startDate <= formData.endDate &&
              experience.endDate >= formData.startDate)
          ) {
            toast.error(
              <FormattedMessage id="Date conflict with existing experience" />,
              {
                position: toast.POSITION.TOP_CENTER,
              }
            );
            return true;
          }
          return false;
        });

        if (hasDateConflict) {
          return;
        }

        const newExperience = {
          id:uuidv4(),
          workplace: formData.workplace,
          position: formData.position,
          startDate: formData.startDate,
          endDate: formData.isPresent ? null : formData.endDate,
          salary: formData.salary,
        };

        setExperiences([...experiences, newExperience]);

        setFormData({
          workplace: "",
          position: "",
          startDate: null,
          endDate: null,
          salary: null,
          isPresent: false,
        });

        form.resetFields();
      })
      .catch((errorInfo) => {
        setValidFrom(false);
        console.log("Validation failed:", errorInfo);
      });
  };
  useEffect(() => {
    setWorkExperiences(experiences);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [experiences]);

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        className={toastConatiner}
      />
      <Form form={form}>
        <div className={threrInOneRow}>
          <div>
            <Form.Item
              label={<FormattedMessage id="Workplace" />}
              name="workplace"
              rules={[
                {
                  required: true,
                  message: <FormattedMessage id="Please enter workplace" />,
                },
              ]}
            >
              <Input
                value={formData.workplace}
                onChange={(e) =>
                  setFormData({ ...formData, workplace: e.target.value })
                }
              />
            </Form.Item>
          </div>
          <div>
            <Form.Item
              label={<FormattedMessage id="Position" />}
              name="position"
              rules={[
                {
                  required: true,
                  message: <FormattedMessage id="Please enter position" />,
                },
              ]}
            >
              <Input
                value={formData.position}
                onChange={(e) =>
                  setFormData({ ...formData, position: e.target.value })
                }
              />
            </Form.Item>
          </div>
          <div>
            <Form.Item
              label={<FormattedMessage id="Start Date" />}
              name="startDate"
              rules={[
                {
                  required: true,
                  message: <FormattedMessage id="Please select start date" />,
                },
              ]}
            >
              <DatePicker.MonthPicker
                style={{ width: "100%" }}
                value={formData.startDate}
                onChange={(date) =>
                  setFormData({ ...formData, startDate: date })
                }
              />
            </Form.Item>
          </div>
          <div className={endDateContainer}>
            <Form.Item
              label={<FormattedMessage id="End Date" />}
              name="endDate"
              rules={endDateRules}
            >
              <DatePicker.MonthPicker
                style={{ width: "100%" }}
                value={formData.endDate}
                onChange={(date) => setFormData({ ...formData, endDate: date })}
                renderExtraFooter={() => (
                  <Checkbox
                    onChange={(e) => {
                      const isPresent = e.target.checked;
                      const updatedEndDateRules = isPresent ? [] : endDateRules;
                      setFormData({ ...formData, isPresent });
                      form.setFields([
                        {
                          name: "endDate",
                          rules: updatedEndDateRules,
                        },
                      ]);
                    }}
                  >
                    Present
                  </Checkbox>
                )}
              />
            </Form.Item>
          </div>
          <div>
            <Form.Item
              label={<FormattedMessage id="Salary" />}
              name="salary"
              rules={[
                {
                  required: true,
                  message: <FormattedMessage id="Please enter salary" />,
                },
              ]}
            >
              <InputNumber
                style={{ width: "100%" }}
                value={formData.salary}
                onChange={(value) =>
                  setFormData({ ...formData, salary: value })
                }
              />
            </Form.Item>
          </div>
        </div>

        <div className={vaildForm ? addButton : addButtonInvalidFrom}>
          <Form.Item>
            <Button type="primary" onClick={handleAddExperience}>
              <FormattedMessage id="Add" />
            </Button>
          </Form.Item>
        </div>
      </Form>
      <Row className={cardsContainer}>
        {experiences?.map((item, index) => (
          <div className={cardAndCloseContainer}>
            <div className={closeIcon} onClick={()=>deleteExperinceHandler(item?.id)}><CloseCircleOutlined /></div>
            <Card
            key={index}
            style={{ marginBottom: "10px" }}
            className={cardContent}
            title={<div className={cardTitle}>{item.workplace}</div>}
          >
            <p>
              <span>
                <FormattedMessage id="Position" />:
              </span>
              {"  "}
              {item.position}
            </p>
            <p>
              <span>
                <FormattedMessage id="Start Date" />:
              </span>
              {"  "}
              {item.startDate?.format("YYYY-MM")}
            </p>
            <p>
              <span>
                <FormattedMessage id="End Date" />:
              </span>
              {"  "}
              {item.isPresent ? (
                <FormattedMessage id="Present" />
              ) : (
                item.endDate?.format("YYYY-MM") || (
                  <FormattedMessage id="Present" />
                )
              )}
            </p>
            <p>
              <span>
                <FormattedMessage id="Salary" />:
              </span>
              {"  "}
              {item.salary}
            </p>
          </Card>
          </div>
        ))}
      </Row>
    </>
  );
}

export default ToDoPracticalExperiences;
