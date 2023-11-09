import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  DatePicker,
  InputNumber,
  Select,
  Button,
  Result,
  Steps,
  Card,
  Spin,
  message,
} from "antd";
import ModalImage from "react-modal-image";
import serverUrl from "../../shared/http/constant";
import { UserOutlined } from "@ant-design/icons";
import {
  arabicCountries,
  jordanCities,
  postions,
  locations,
  gender,
} from "./dropDownData";
import shortid from "shortid";
import commonRules from "./commonRules";
import moment from "moment";

import styles from "./styles.module.scss";

const {
  twoInOneLine,
  inputField,
  selectInputField,
  customSelect,
  formContainer,
  antBtnPrimary,
  formButtonContainer,
  centeredCardTitle,
  attachmentImage,
  imageTypeContainer,
  titleImageType,
  imageStepContainer,
} = styles;

const { Step } = Steps;
const { Option } = Select;

const PreviewForm = ({ formData, readOnly, userAttachments }) => {
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState(false);
  const [imageGroups, setImageGroups] = useState([]);

  useEffect(() => {
    // Format the Birth_Date before setting it in the form
    const formattedData = {
      ...formData,
      Birth_Date: formData.Birth_Date
        ? moment(formData.Birth_Date, "YYYY-MM-DD")
        : null,
      Marriage_Date: formData.Marriage_Date
        ? moment(formData.Marriage_Date, "YYYY-MM-DD")
        : null,
    };

    form.setFieldsValue(formattedData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  const generateRandomName = (file) => {
    const fileExtension = file.name.split(".").pop();
    // Generate a random name with a maximum length of 50 characters
    const randomName = shortid.generate();
    const maxLength = 50 - fileExtension.length - 1; // Account for the dot (.) in the extension
    return randomName.slice(0, maxLength) + "." + fileExtension;
  };

  const groupedAttachments = {};

  userAttachments?.forEach((image) => {
    if (!groupedAttachments[image.Document_Type_Translated]) {
      groupedAttachments[image.Document_Type_Translated] = [];
    }
    groupedAttachments[image.Document_Type_Translated].push(image);
  });
  const formSteps = [
    {
      title: "الخطوة 1",
      caption: "الخطوة 1",
      content: (
        <>
          <div className={twoInOneLine}>
            <div>
              <Form.Item
                label="الاسم كامل"
                name="Full_Name"
                rules={readOnly ? undefined : commonRules.Full_Name}
              >
                <Input
                  prefix={<UserOutlined />}
                  className={inputField}
                  disabled={readOnly}
                />
              </Form.Item>
              <Form.Item
                label="مكان الولادة"
                name="Birth_Place"
                rules={readOnly ? undefined : commonRules.Birth_Place}
                className={inputField}
              >
                <Select className={customSelect} disabled={readOnly}>
                  {arabicCountries?.map((country, index) => (
                    <Option key={index} value={country}>
                      {country}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div>
              <Form.Item
                label="تاريخ الميلاد"
                name="Birth_Date"
                rules={readOnly ? undefined : commonRules.Birth_Date}
                className={inputField}
              >
                <DatePicker
                  format="YYYY-MM-DD"
                  className={inputField}
                  disabled={readOnly}
                />
              </Form.Item>

              <Form.Item
                label="الديانة"
                name="Relegin"
                rules={readOnly ? undefined : commonRules.Relegin}
                className={inputField}
              >
                <Input className={inputField} disabled={readOnly} />
              </Form.Item>
            </div>
            <div>
              <Form.Item
                label="الجنسية"
                name="Nationality"
                rules={readOnly ? undefined : commonRules.Nationality}
              >
                <Select disabled={readOnly}>
                  {arabicCountries?.map((country, index) => (
                    <Option key={index} value={country}>
                      {country}
                    </Option>
                  ))}
                  <Option value={"ابناء اردنيات"}>ابناء اردنيات</Option>
                  <Option value={"ابناء غزة"}>ابناء غزة</Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="الجنس"
                name="Gender"
                rules={readOnly ? undefined : commonRules.Gender}
                className={inputField}
              >
                <Select disabled={readOnly}>
                  {gender?.map((country, index) => (
                    <Option key={index} value={country?.value}>
                      {country?.title}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
          </div>
        </>
      ),
    },
    {
      title: "الخطوة 2",
      caption: "العنوان",
      content: (
        <>
          <div className={twoInOneLine}>
            <div>
              <Form.Item
                label="المدينة"
                name="Address_City"
                rules={readOnly ? undefined : commonRules.Address_City}
                className={inputField}
              >
                <Select disabled={readOnly}>
                  {jordanCities?.map((city, index) => (
                    <Option key={index} value={city}>
                      {city}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                label="الحي"
                name="Address_Region"
                rules={readOnly ? undefined : commonRules.Address_Region}
                className={inputField}
              >
                <Input className={inputField} disabled={readOnly} />
              </Form.Item>
            </div>
            <div>
              <Form.Item
                label="اسم الشارع"
                name="Address_Street"
                rules={readOnly ? undefined : commonRules.Address_Street}
                className={inputField}
              >
                <Input className={inputField} disabled={readOnly} />
              </Form.Item>

              <Form.Item
                label="رقم البناية"
                name="Address_BuildingNo"
                className={inputField}
              >
                <InputNumber
                  maxLength={10}
                  className={inputField}
                  disabled={readOnly}
                />
              </Form.Item>
            </div>
            <div>
              <Form.Item
                label="رقم الهاتف"
                name="Address_Phone"
                rules={readOnly ? undefined : commonRules.Address_Phone}
              >
                <Input
                  className={inputField}
                  placeholder="أدخل رقم الهاتف"
                  disabled={readOnly}
                />
              </Form.Item>
            </div>
          </div>
        </>
      ),
    },
    {
      title: "الخطوة 3",
      caption: "الخطوة 3",
      content: (
        <>
          <div className={twoInOneLine}>
            <div>
              <Form.Item
                label="الوظيفة المطلوبة"
                name="Demand_Position"
                rules={readOnly ? undefined : commonRules.Demand_Position}
                className={inputField}
              >
                <Select disabled={readOnly}>
                  {postions?.map((position, index) => (
                    <Option key={index} value={position}>
                      {position}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                label="رقم الجواز"
                name="Passport_Num"
                className={inputField}
              >
                <InputNumber
                  minLength={0}
                  maxLength={50}
                  className={inputField}
                  disabled={readOnly}
                />
              </Form.Item>
            </div>
            <div>
              <Form.Item
                label="مكان العمل"
                name="Work_Place"
                rules={readOnly ? undefined : commonRules.Work_Place}
                className={inputField}
              >
                <Select disabled={readOnly}>
                  {locations?.map((location, index) => (
                    <Option key={index} value={location}>
                      {location}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                label="رقم الهوية"
                name="IDentity_Num"
                className={inputField}
              >
                <InputNumber
                  minLength={0}
                  maxLength={50}
                  className={inputField}
                  disabled={readOnly}
                />
              </Form.Item>
            </div>
            <div>
              <Form.Item
                label="الرقم الوطني/الرقم الشخصي"
                name="National_Num"
                className={inputField}
                rules={readOnly ? undefined : commonRules.National_Num}
              >
                <InputNumber
                  minLength={0}
                  maxLength={50}
                  className={inputField}
                  disabled={readOnly}
                />
              </Form.Item>
              <Form.Item
                label="اسم الام"
                name="Mother_Name"
                rules={readOnly ? undefined : commonRules.Mother_Name}
                className={inputField}
              >
                <Input className={inputField} disabled={readOnly} />
              </Form.Item>
            </div>
          </div>
        </>
      ),
    },
    {
      title: "الخطوة 4",
      caption: "الخطوة 4",
      content: (
        <>
          <div className={twoInOneLine}>
            <div>
              <Form.Item
                label="الحالة الاجتماعية"
                name="Marriage_Status"
                rules={readOnly ? undefined : commonRules.Marriage_Status}
                className={inputField}
              >
                <Select className={selectInputField} disabled={readOnly}>
                  <Option value="Married">متزوج</Option>
                  <Option value="Single">اعزب</Option>
                </Select>
              </Form.Item>
            </div>
            <div>
              <Form.Item
                label="تاريخ الزواج"
                name="Marriage_Date"
                className={inputField}
              >
                <DatePicker
                  format="YYYY-MM-DD"
                  className={inputField}
                  disabled={readOnly}
                />
              </Form.Item>
            </div>
            <div>
              <Form.Item
                label="عدد الأبناء"
                name="Chlidren_Num"
                className={inputField}
              >
                <InputNumber
                  minLength={0}
                  maxLength={20}
                  className={inputField}
                  disabled={readOnly}
                />
              </Form.Item>
            </div>
          </div>
          <div>
            <Form.Item
              label="ملاحظات"
              name="Description"
              className={inputField}
            >
              <Input.TextArea
                className={inputField}
                maxLength={500}
                disabled={readOnly}
              />
            </Form.Item>
          </div>
        </>
      ),
    },
  ];
  if (userAttachments && userAttachments?.length > 0) {
    formSteps.push({
      title: "الخطوة 5",
      caption: "الخطوة 5",
      content: (
        <div className={imageStepContainer}>
          {Object.entries(groupedAttachments)?.map(
            ([docType, images], index) => (
              <div key={index}>
                <h4 className={titleImageType}>{docType}</h4>
                <div className={imageTypeContainer}>
                  {images?.map((image) => (
                    <div key={image?.ID} className={attachmentImage}>
                      <ModalImage
                        small={`${serverUrl}${image?.Document_FullName}`}
                        large={`${serverUrl}${image?.Document_FullName}`}
                        alt={image.Document_Type_Translated}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      ),
    });
  }
  const handleNext = async () => {
    try {
      await form.validateFields();
      setCurrentStep(currentStep + 1);
    } catch (errorInfo) {
      console.log("Validation failed:", errorInfo);
    }
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };
  const handleStepClick = async (step) => {
    if (step - currentStep === 1) {
      try {
        await form.validateFields();
        setCurrentStep(step);
      } catch (errorInfo) {}
    } else if (step - currentStep > 1) {
      form.validateFields((errors, values) => {
        if (!errors) {
          setCurrentStep(step);
        }
      });
    } else {
      setCurrentStep(step);
    }
  };
  const onFinish = async (values) => {
    setFormLoading(true);
    const formData = form.getFieldsValue(true);
    const formUploadData = new FormData();
    const finalFormData = {
      ...formData,
      Address_BuildingNo: formData?.Address_BuildingNo
        ? `${formData?.Address_BuildingNo}`
        : null,
      National_Num: formData?.National_Num ? `${formData?.National_Num}` : null,
      Passport_Num: formData?.Passport_Num ? `${formData?.Passport_Num}` : null,
      IDentity_Num: formData?.IDentity_Num ? `${formData?.IDentity_Num}` : null,
    };
    imageGroups.forEach((group) => {
      const newGroup = { ...group }; // Create a copy of the group
      newGroup.images = group.images.map((file) => {
        const randomFileName = generateRandomName(file);
        formUploadData.append("images", file, randomFileName);
        return randomFileName; // Update the label to the new random name
      });

      formUploadData.append("labels", JSON.stringify(newGroup));
    });
    const {
      CV,
      FamilyBook,
      DrivingLicense,
      SocialSecurity,
      Identity,
      ...restFormData
    } = finalFormData;
    formUploadData.append("finalFormData", JSON.stringify(restFormData));

    // try {
    //   const response = await addWorekerForm(formUploadData);

    //   if (response.status === 200) {
    //     setFormSubmitted(true);
    //   }
    // } catch (error) {
    //   if (error.response.status === 400) {
    //     message.error("هذا المستخدم قام بتقديم الطلب سابقا");
    //   }
    //   // setFormError(true);
    //   console.error("error", error);
    // } finally {
    //   setImageGroups([]);
    //   setFormLoading(false);
    // }
  };

  const resetForm = () => {
    form.resetFields();
    setCurrentStep(0);
    setFormSubmitted(false);
    setFormError(false);
  };

  const renderContent = () => {
    if (formSubmitted) {
      return (
        <Result
          status="success"
          title="تم تقديم النموذج بنجاح!"
          subTitle="شكرًا لك على تقديم النموذج."
          extra={[
            <Button
              type="primary"
              key="reset"
              onClick={resetForm}
              className={antBtnPrimary}
            >
              إعادة تعبئة النموذج
            </Button>,
          ]}
        />
      );
    } else if (formError) {
      return (
        <Result
          status="error"
          title="عذرا حدث خطأ!"
          subTitle="الرجاء اعادة المحاولة."
          extra={[
            <Button
              type="primary"
              key="reset"
              onClick={resetForm}
              className={antBtnPrimary}
            >
              إعادة تعبئة النموذج
            </Button>,
          ]}
        />
      );
    } else {
      return formSteps[currentStep].content;
    }
  };

  return (
    <div className={formContainer}>
      <Spin spinning={formLoading}>
        <Card
          title={
            currentStep === 1 ? (
              <div className={centeredCardTitle}>
                {formSteps[currentStep].caption}
              </div>
            ) : null
          }
        >
          <Form
            form={form}
            onFinish={onFinish}
            layout="vertical"
            initialValues={{ Gender: "M" }}
          >
            {renderContent()}
            {!formSubmitted && !formError && (
              <div className={formButtonContainer}>
                {currentStep > 0 && (
                  <Button onClick={handlePrev}>السابق</Button>
                )}
                {currentStep < formSteps.length - 1 && (
                  <Button
                    className={antBtnPrimary}
                    type="primary"
                    onClick={handleNext}
                  >
                    التالي
                  </Button>
                )}
                {currentStep === formSteps.length - 1 && !readOnly && (
                  <Button
                    type="primary"
                    htmlType="submit"
                    className={antBtnPrimary}
                  >
                    حفظ
                  </Button>
                )}
              </div>
            )}
          </Form>
        </Card>
        <Steps
          current={currentStep}
          style={{ marginTop: "20px" }}
          onChange={handleStepClick}
        >
          {formSteps?.map((step, index) => (
            <Step key={step.title} />
          ))}
        </Steps>
      </Spin>
    </div>
  );
};

export default PreviewForm;
