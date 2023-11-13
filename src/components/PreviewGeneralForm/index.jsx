/* eslint-disable react/jsx-no-target-blank */
import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  DatePicker,
  InputNumber,
  Select,
  Button,
  Steps,
  Card,
  Checkbox,
  Radio,
} from "antd";
import { FormattedMessage } from "react-intl";
import { useLocale } from "../../hooks/localeContext";

import { UserOutlined } from "@ant-design/icons";
import {
  arabicCountries,
  jordanCities,
  gender,
  Religions,
  nationalityCountries,
  locationsObj,
  universityOptions,
  majors,
  degreeOptions,
  languageLevels,
  marriageStatusAr,
  extensionToType,
  iconMap,
} from "./dropDownData";
import "./customAntdStyle.css";
import moment from "moment";

import styles from "./styles.module.scss";
import ToDoPracticalExperiences from "./ToDoExperince";
import serverUrl from "../../shared/http/constant";
const {
  twoInOneLine,
  inputField,
  selectInputField,
  customSelect,
  imagesContainer,
  imagesContainerTitle,
  formContainer,
  antBtnPrimary,
  formButtonContainer,
  centeredCardTitle,
  phoneNumberContainer,
  countryCode,
  passportNumContainer,
  attachmentIcon,
} = styles;

const { Step } = Steps;
const { Option } = Select;

const PreviewGeneralForm = ({
  formData,
  userAttachments,
  userWorkExperince,
  readOnly,
}) => {
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [workExperiences, setWorkExperiences] = useState(
    formData?.Work_Experiences || []
  );
  const [demandPositions, setDemandPositions] = useState([]);
  const [showExplanation1, setShowExplanation1] = useState(
    formData.Explanation_Radio1 || false
  );
  const [showExplanation2, setShowExplanation2] = useState(
    formData.Explanation_Radio2 || false
  );
  const [qualificationsFormData, setQualificationsFormData] = useState({
    Degree_Type: "",
    Major: "",
    GPA: null,
    University_Name: "",
    OtherDegree: "",
    OtherMajor: "",
    OtherUniversity: "",
  });
  const [religion, setReligion] = useState({
    Religion: "",
    OtherReligion: "",
  });
  const { locale } = useLocale();

  useEffect(() => {
    // Format the Birth_Date before setting it in the form
    const formattedData = {
      ...formData,
      Birth_Date: formData.Birth_Date
        ? moment(formData.Birth_Date, "YYYY-MM-DD")
        : null,
      Explanation_Date_Radio2: formData.Explanation_Date_Radio2
        ? moment(formData.Explanation_Date_Radio2, "YYYY-MM-DD")
        : null,
    };
    form.setFieldsValue(formattedData);
    setReligion(formattedData.Relegin);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);
  const workPlaceAndDemand = [];

  if (true) {
    for (const workPlace in locationsObj) {
      if (locationsObj.hasOwnProperty(workPlace)) {
        workPlaceAndDemand.push({
          Work_Place: workPlace,
          Demand_Positions: locationsObj[workPlace],
        });
      }
    }
  }

  const handleSelectChange = (field, value) => {
    if (value === "Other") {
      setQualificationsFormData({
        ...qualificationsFormData,
        [field]: value,
        [`Other${field}`]: "",
      });
    } else {
      setQualificationsFormData({
        ...qualificationsFormData,
        [field]: value,
        [`Other${field}`]: "",
      });
    }
  };
  const handleSelectChangeReligion = (field, value) => {
    if (value === "Other") {
      setReligion({
        ...religion,
        [field]: value,
        [`Other${field}`]: "",
      });
    } else {
      setReligion({
        ...religion,
        [field]: value,
        [`Other${field}`]: "",
      });
    }
  };

  const handleWorkPlaceChange = (value) => {
    const filterWorkPlaceAndDemand = workPlaceAndDemand
      ?.filter((el) => el?.Work_Place === value)
      ?.map((el2) => el2?.Demand_Positions);
    setDemandPositions(...filterWorkPlaceAndDemand);
  };
  const handleRadioChange1 = (e) => {
    setShowExplanation1(e.target.value === "Yes");
  };

  const handleRadioChange2 = (e) => {
    setShowExplanation2(e.target.value === "Yes");
  };
  const formSteps = [
    {
      title: <FormattedMessage id="step 1" />,
      caption: <FormattedMessage id="step 1" />,
      content: (
        <>
          <div className={twoInOneLine}>
            <div>
              <Form.Item
                label={<FormattedMessage id="fullName" />}
                name="Full_Name"
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id="fullNameReq" />,
                  },
                  {
                    max: 250,
                    message: <FormattedMessage id="fullNameLength" />,
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined />}
                  className={inputField}
                  disabled={readOnly}
                />
              </Form.Item>
              <Form.Item
                label={<FormattedMessage id="birthPlace" />}
                name="Birth_Place"
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id="birthPlaceReq" />,
                  },
                ]}
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
                label={<FormattedMessage id="birthDate" />}
                name="Birth_Date"
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id="birthDateReq" />,
                  },
                ]}
                className={inputField}
              >
                <DatePicker
                  format="YYYY-MM-DD"
                  className={inputField}
                  disabled={readOnly}
                />
              </Form.Item>

              <Form.Item
                label={<FormattedMessage id="Religion" />}
                name="Relegin"
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id="ReligionReq" />,
                  },
                ]}
                className={inputField}
              >
                <Select
                  onChange={(value) =>
                    handleSelectChangeReligion("Relegin", value)
                  }
                  disabled={readOnly}
                >
                  {Religions?.map((country, index) => (
                    <Option key={index} value={country}>
                      {country}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              {(religion.Relegin === "Other" ||
                religion.Relegin === "أخرى") && (
                <Form.Item
                  label={<FormattedMessage id="Other" />}
                  name="OtherRelegin"
                  rules={[
                    {
                      required: true,
                      message: <FormattedMessage id="This Field Is Required" />,
                    },
                  ]}
                >
                  <Input disabled={readOnly} />
                </Form.Item>
              )}
            </div>
            <div>
              <Form.Item
                label={<FormattedMessage id="Nationality" />}
                name="Nationality"
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id="NationalityReq" />,
                  },
                ]}
              >
                <Select disabled={readOnly}>
                  {nationalityCountries?.map((country, index) => (
                    <Option key={index} value={country}>
                      {country}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                label={<FormattedMessage id="Gender" />}
                name="Gender"
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id="GenderReq" />,
                  },
                ]}
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
      title: <FormattedMessage id="step 2" />,
      caption: <FormattedMessage id="Address" />,
      content: (
        <>
          <div className={twoInOneLine}>
            <div>
              <Form.Item
                label={<FormattedMessage id="AddressCity" />}
                name="Address_City"
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id="AddressCityReq" />,
                  },
                ]}
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
                label={<FormattedMessage id="BuildingNumber" />}
                name="Address_BuildingNo"
                className={inputField}
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id="BuildingNumberReq" />,
                  },
                ]}
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
                label={<FormattedMessage id="StreetName" />}
                name="Address_Street"
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id="StreetNameReq" />,
                  },
                ]}
                className={inputField}
              >
                <Input className={inputField} disabled={readOnly} />
              </Form.Item>
              <Form.Item
                label={<FormattedMessage id="phone1" />}
                name="Address_Phone1"
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id="phone1Req" />,
                  },
                  {
                    pattern: /^7\d{8}$/,
                    message: <FormattedMessage id="phone1ReqLength" />,
                  },
                ]}
              >
                <Input
                  className={`${phoneNumberContainer} ${inputField}`}
                  placeholder="7-999-999-99"
                  addonAfter={
                    <div className={countryCode}>
                      <div>(962+)</div>
                    </div>
                  }
                  disabled={readOnly}
                />
              </Form.Item>
            </div>
            <div>
              <Form.Item
                label={<FormattedMessage id="AddressArea" />}
                name="Address_Region"
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id="AddressAreaReq" />,
                  },
                ]}
                className={inputField}
              >
                <Input className={inputField} disabled={readOnly} />
              </Form.Item>
              <Form.Item
                label={<FormattedMessage id="phone2" />}
                name="Address_Phone2"
                rules={[
                  {
                    pattern: /^7\d{8}$/,
                    message: <FormattedMessage id="phone1ReqLength" />,
                  },
                ]}
              >
                <Input
                  className={`${phoneNumberContainer} ${inputField}`}
                  placeholder="7-999-999-99"
                  addonAfter={
                    <div className={countryCode}>
                      <div>(962+)</div>
                    </div>
                  }
                  disabled={readOnly}
                />
              </Form.Item>
            </div>
          </div>
        </>
      ),
    },
    {
      title: <FormattedMessage id="step 3" />,
      caption: <FormattedMessage id="step 3" />,
      content: (
        <>
          <div className={twoInOneLine} style={{ marginBottom: "20px" }}>
            <div>
              <Form.Item
                label={<FormattedMessage id="IDNumber" />}
                name="National_Num"
                className={inputField}
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id="IDNumberReq" />,
                  },
                ]}
              >
                <InputNumber
                  minLength={0}
                  maxLength={50}
                  className={inputField}
                  disabled={readOnly}
                />
              </Form.Item>
              <div className={passportNumContainer}>
                <Form.Item
                  label={<FormattedMessage id="passportNum" />}
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
                <p>
                  <FormattedMessage id="passportNumCaption" />
                </p>
              </div>
            </div>
            <div>
              <Form.Item
                label={<FormattedMessage id="department" />}
                name="Work_Place"
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id="departmentReq" />,
                  },
                ]}
                className={inputField}
              >
                <Select onChange={handleWorkPlaceChange} disabled={readOnly}>
                  {workPlaceAndDemand?.map((workPlace, index) => (
                    <Option key={index} value={workPlace?.Work_Place}>
                      {workPlaceAndDemand?.Work_Place}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                label={<FormattedMessage id="maritalStatus" />}
                name="Marriage_Status"
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id="maritalStatusReq" />,
                  },
                ]}
                className={inputField}
              >
                <Select className={selectInputField} disabled={readOnly}>
                  {marriageStatusAr?.map((status, index) => (
                    <Option key={index} value={status}>
                      {status}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div>
              <Form.Item
                label={<FormattedMessage id="postion" />}
                name="Demand_Position"
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id="postionReq" />,
                  },
                ]}
                className={inputField}
              >
                <Select disabled={readOnly}>
                  {demandPositions.map((position, index) => (
                    <Option key={index} value={position}>
                      {position}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                label={<FormattedMessage id="MotherName" />}
                name="Mother_Name"
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id="MotherNameReq" />,
                  },
                ]}
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
      title: <FormattedMessage id="step 4" />,
      caption: <FormattedMessage id="Qualifications" />,
      content: (
        <>
          <div>
            <Form.Item
              label={<FormattedMessage id="Dgree" />}
              name="Degree_Type"
              rules={[
                {
                  required: true,
                  message: <FormattedMessage id="DgreeReq" />,
                },
              ]}
            >
              <Select
                onChange={(value) => handleSelectChange("Degree_Type", value)}
                disabled={readOnly}
              >
                {degreeOptions?.map((option, index) => (
                  <Option key={index} value={option}>
                    {option}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            {(qualificationsFormData.Degree_Type === "Other" ||
              qualificationsFormData.Degree_Type === "أخرى") && (
              <Form.Item
                label={<FormattedMessage id="Other" />}
                name="OtherDegree"
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id="This Field Is Required" />,
                  },
                ]}
              >
                <Input disabled={readOnly} />
              </Form.Item>
            )}
          </div>
          <div>
            <Form.Item
              label={<FormattedMessage id="Major" />}
              name="Major"
              rules={[
                {
                  required: true,
                  message: <FormattedMessage id="MajorReq" />,
                },
              ]}
            >
              <Select
                onChange={(value) => handleSelectChange("Major", value)}
                disabled={readOnly}
              >
                {majors?.map((option, index) => (
                  <Option key={index} value={option}>
                    {option}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            {(qualificationsFormData.Major === "Other" ||
              qualificationsFormData.Major === "أخرى") && (
              <Form.Item
                label={<FormattedMessage id="Other" />}
                name="OtherMajor"
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id="This Field Is Required" />,
                  },
                ]}
              >
                <Input disabled={readOnly} />
              </Form.Item>
            )}
          </div>
          <div>
            <Form.Item
              label={<FormattedMessage id="University" />}
              name="University_Name"
              rules={[
                {
                  required: true,
                  message: <FormattedMessage id="UniversityReq" />,
                },
              ]}
            >
              <Select
                onChange={(value) =>
                  handleSelectChange("University_Name", value)
                }
                disabled={readOnly}
              >
                {universityOptions?.map((option, index) => (
                  <Option key={index} value={option}>
                    {option}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            {(qualificationsFormData.University_Name === "Other" ||
              qualificationsFormData.University_Name === "أخرى") && (
              <Form.Item
                label={<FormattedMessage id="Other" />}
                name="OtherUniversity"
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id="This Field Is Required" />,
                  },
                ]}
              >
                <Input disabled={readOnly} />
              </Form.Item>
            )}
          </div>
          <Form.Item
            label={<FormattedMessage id="GPA" />}
            name="GPA"
            rules={[
              {
                required: true,
                message: <FormattedMessage id="GPAReq" />,
              },
            ]}
          >
            <InputNumber maxLength={10} disabled={readOnly} />
          </Form.Item>
        </>
      ),
    },
    {
      title: <FormattedMessage id="step 5" />,
      caption: <FormattedMessage id="Work Experiences" />,
      content: (
        <ToDoPracticalExperiences
          setWorkExperiences={setWorkExperiences}
          workExperiences={workExperiences}
        />
      ),
    },
    {
      title: <FormattedMessage id="step 6" />,
      caption: <FormattedMessage id="Languages" />,
      content: (
        <>
          <Form.Item
            label={<FormattedMessage id="English Proficiency" />}
            name="English_Proficiency"
            rules={[
              {
                required: true,
                message: (
                  <FormattedMessage id="Please select your English proficiency level" />
                ),
              },
            ]}
          >
            <Select disabled={readOnly}>
              {languageLevels.map((level) => (
                <Select.Option key={level} value={level}>
                  {level}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label={<FormattedMessage id="Arabic Proficiency" />}
            name="Arabic_Proficiency"
            rules={[
              {
                required: true,
                message: (
                  <FormattedMessage id="Please select your Arabic proficiency level" />
                ),
              },
            ]}
          >
            <Select disabled={readOnly}>
              {languageLevels.map((level) => (
                <Select.Option key={level} value={level}>
                  {level}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </>
      ),
    },
    {
      title: <FormattedMessage id="step 7" />,
      caption: <FormattedMessage id="step 7" />,
      content: (
        <>
          <Form.Item
            label={<FormattedMessage id="Does someone in your family work" />}
            name="Radio1"
            rules={[
              {
                required: true,
                message: <FormattedMessage id="This Field Is Required" />,
              },
            ]}
          >
            <Radio.Group onChange={handleRadioChange1} disabled={readOnly}>
              <Radio value="Yes">
                <FormattedMessage id="Yes" />
              </Radio>
              <Radio value="No">
                <FormattedMessage id="No" />
              </Radio>
            </Radio.Group>
          </Form.Item>

          {showExplanation1 && (
            <Form.Item
              label={<FormattedMessage id="Mention this person's name" />}
              name="Explanation_Radio1"
              rules={[
                {
                  required: showExplanation1,
                  message: <FormattedMessage id="This Field Is Required" />,
                },
              ]}
            >
              <Input.TextArea rows={4} cols={50} disabled={readOnly} />
            </Form.Item>
          )}

          <Form.Item
            label={<FormattedMessage id="Have you ever worked" />}
            name="Radio2"
            rules={[
              {
                required: true,
                message: <FormattedMessage id="This Field Is Required" />,
              },
            ]}
          >
            <Radio.Group onChange={handleRadioChange2} disabled={readOnly}>
              <Radio value="Yes">
                <FormattedMessage id="Yes" />
              </Radio>
              <Radio value="No">
                <FormattedMessage id="No" />
              </Radio>
            </Radio.Group>
          </Form.Item>

          {showExplanation2 && (
            <div>
              <Form.Item
                label={<FormattedMessage id="reason" />}
                name="Explanation_Radio2"
                rules={[
                  {
                    required: showExplanation2,
                    message: <FormattedMessage id="This Field Is Required" />,
                  },
                ]}
              >
                <Input.TextArea rows={4} cols={50} disabled={readOnly} />
              </Form.Item>
              <Form.Item
                label={<FormattedMessage id="Date of leaving the company" />}
                name="Explanation_Date_Radio2"
                rules={[
                  {
                    required: showExplanation2,
                    message: <FormattedMessage id="This Field Is Required" />,
                  },
                ]}
              >
                <DatePicker
                  format="YYYY-MM-DD"
                  className={inputField}
                  disabled={readOnly}
                />
              </Form.Item>
            </div>
          )}
        </>
      ),
    },
    {
      title: <FormattedMessage id="step 8" />,
      caption: <FormattedMessage id="step 8" />,
      content: (
        <div>
          <div className={imagesContainerTitle}>
            <FormattedMessage id="Attached files" />
          </div>
          <div className={imagesContainer}>
            {userAttachments?.map((el) => {
              const extension = el?.split(".").pop().toLowerCase();
              const fileType = extensionToType[extension] || "Other";
              const icon = iconMap[fileType] || "other-icon.png";

              return (
                <div key={el?.ID}>
                  <a href={`${serverUrl}${el}`} target="_blank">
                    <img src={icon} alt={fileType} className={attachmentIcon} />
                  </a>
                </div>
              );
            })}
          </div>
          <div>
            <Form.Item
              name="Agree_Info"
              valuePropName="checked"
              rules={[
                {
                  required: true,
                  message: <FormattedMessage id="This Field Is Required" />,
                },
              ]}
            >
              <Checkbox disabled={readOnly}>
                <FormattedMessage id="agree1" />
              </Checkbox>
            </Form.Item>
            <Form.Item
              name="Agree_Address"
              valuePropName="checked"
              rules={[
                {
                  required: true,
                  message: <FormattedMessage id="This Field Is Required" />,
                },
              ]}
            >
              <Checkbox disabled={readOnly}>
                <FormattedMessage id="agree2" />
              </Checkbox>
            </Form.Item>
          </div>
        </div>
      ),
    },
  ];
  const handleNext = async () => {
    try {
      await form.validateFields();
      if (currentStep === 4) {
        if (workExperiences.length > 0) {
          setCurrentStep(currentStep + 1);
        } else {
        }
      } else {
        setCurrentStep(currentStep + 1);
      }
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

  const renderContent = () => {
    return formSteps[currentStep].content;
  };

  return (
    <div
      className={formContainer}
      style={{ direction: locale === "ar" ? "rtl" : "ltr" }}
    >
      <Card
        title={
          currentStep === 1 ||
          currentStep === 3 ||
          currentStep === 4 ||
          currentStep === 5 ? (
            <div className={centeredCardTitle}>
              {formSteps[currentStep].caption}
            </div>
          ) : null
        }
      >
        <Form form={form} layout="vertical" initialValues={{ Gender: "M" }}>
          {renderContent()}
          {
            <div className={formButtonContainer}>
              {currentStep > 0 && (
                <Button onClick={handlePrev}>
                  <FormattedMessage id="previous" />
                </Button>
              )}
              {currentStep < formSteps.length - 1 && (
                <Button
                  className={antBtnPrimary}
                  type="primary"
                  onClick={handleNext}
                >
                  <FormattedMessage id="Next" />
                </Button>
              )}
            </div>
          }
        </Form>
      </Card>
      <Steps
        current={currentStep}
        style={{ marginTop: "20px" }}
        onChange={handleStepClick}
      >
        {formSteps?.map((step, index) => (
          <Step key={step?.title} />
        ))}
      </Steps>
    </div>
  );
};

export default PreviewGeneralForm;
