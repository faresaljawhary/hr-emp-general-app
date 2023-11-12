import React, { useState } from "react";
import axios from "axios";
import { FormattedMessage } from "react-intl";
import { useLocale } from "../../hooks/localeContext";
import {
  Form,
  Input,
  DatePicker,
  InputNumber,
  Select,
  Button,
  Upload,
  Result,
  Steps,
  Card,
  Spin,
  Typography,
  Checkbox,
  Radio,
} from "antd";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UploadOutlined } from "@ant-design/icons";
import { UserOutlined } from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";
import {
  arabicCountries,
  arabicCountriesEn,
  jordanCities,
  jordanCitiesEn,
  gender,
  genderEn,
  ReligionsEn,
  Religions,
  nationalityCountries,
  nationalityCountriesEn,
  locationsObj,
  locationsObjEn,
  universityOptions,
  universityOptionsAr,
  majors,
  majorsAr,
  degreeOptions,
  degreeOptionsAr,
  languageLevels,
  languageLevelsAr,
  marriageStatusAr,
  marriageStatusEn,
} from "./dropDownData";
import "./customAntdStyle.css";
import styles from "./styles.module.scss";
import ToDoPracticalExperiences from "./ToDoExperince";
import { serverPath } from "../../helpers/server/const";
import http from "../../shared/http/http";
const {
  twoInOneLine,
  inputField,
  selectInputField,
  customSelect,
  imagesContainer,
  uploadeContainer,
  formContainer,
  antBtnPrimary,
  formButtonContainer,
  centeredCardTitle,
  phoneNumberContainer,
  countryCode,
  toastConatiner,
  passportNumContainer,
} = styles;

const { Step } = Steps;
const { Option } = Select;

const GeneralForm = () => {
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState(false);
  const [imageGroups, setImageGroups] = useState([]);
  const [workExperiences, setWorkExperiences] = useState([]);
  const [demandPositions, setDemandPositions] = useState([]);
  const [showExplanation1, setShowExplanation1] = useState(false);
  const [showExplanation2, setShowExplanation2] = useState(false);
  const [duplicate, setDuplicate] = useState(false);
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
  const workPlaceAndDemand = [];
  const uuid = uuidv4().substr(0, 18);
  let fileCounter = 2;

  if (locale === "ar") {
    for (const workPlace in locationsObj) {
      if (locationsObj.hasOwnProperty(workPlace)) {
        workPlaceAndDemand.push({
          Work_Place: workPlace,
          Demand_Positions: locationsObj[workPlace],
        });
      }
    }
  } else {
    for (const workPlace in locationsObjEn) {
      if (locationsObjEn.hasOwnProperty(workPlace)) {
        workPlaceAndDemand.push({
          Work_Place: workPlace,
          Demand_Positions: locationsObjEn[workPlace],
        });
      }
    }
  }
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  const handleDuplicateNumBlur = async (e) => {
    const value = e.target.value; // Get the input value
    try {
      if (value) {
        const response = await http.get(
          `${serverPath}/general/general-from/duplicate/${value}`
        );
        if (response?.data?.isDuplicate) {
          toast.error(<FormattedMessage id="duplicateNationalNum" />, {
            position: toast.POSITION.TOP_CENTER,
          });
          setDuplicate(true);
        } else {
          setDuplicate(false);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
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
  const onFileChange = (label, info) => {
    const newImageGroups = [...imageGroups];
    const groupIndex = newImageGroups.findIndex(
      (group) => group.label === label
    );

    if (groupIndex !== -1) {
      newImageGroups[groupIndex].images = info.fileList.map(
        (file) => file.originFileObj
      );
    } else {
      newImageGroups.push({
        label,
        images: info.fileList.map((file) => file.originFileObj),
      });
    }

    setImageGroups(newImageGroups);
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
                <Input prefix={<UserOutlined />} className={inputField} />
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
                <Select className={customSelect}>
                  {locale === "ar"
                    ? arabicCountries?.map((country, index) => (
                        <Option key={index} value={country}>
                          {country}
                        </Option>
                      ))
                    : arabicCountriesEn?.map((country, index) => (
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
                  {
                    validator: (rule, value) => {
                      if (value) {
                        const selectedDate = new Date(value);
                        const today = new Date();
                        const ageDiff = today - selectedDate;

                        // Calculate the number of years
                        const years = ageDiff / (365.25 * 24 * 60 * 60 * 1000);

                        if (years < 18) {
                          return Promise.reject(
                            <FormattedMessage id="graterThan18" />
                          );
                        }
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
                className={inputField}
              >
                <DatePicker format="YYYY-MM-DD" className={inputField} />
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
                >
                  {locale === "ar"
                    ? Religions?.map((country, index) => (
                        <Option key={index} value={country}>
                          {country}
                        </Option>
                      ))
                    : ReligionsEn?.map((country, index) => (
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
                  <Input />
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
                <Select>
                  {locale === "ar"
                    ? nationalityCountries?.map((country, index) => (
                        <Option key={index} value={country}>
                          {country}
                        </Option>
                      ))
                    : nationalityCountriesEn?.map((country, index) => (
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
                <Select>
                  {locale === "ar"
                    ? gender?.map((country, index) => (
                        <Option key={index} value={country?.value}>
                          {country?.title}
                        </Option>
                      ))
                    : genderEn?.map((country, index) => (
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
                <Select>
                  {locale === "ar"
                    ? jordanCities?.map((city, index) => (
                        <Option key={index} value={city}>
                          {city}
                        </Option>
                      ))
                    : jordanCitiesEn?.map((city, index) => (
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
                <InputNumber maxLength={10} className={inputField} />
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
                  {
                    max: 150,
                    message: <FormattedMessage id="AddressAreaLength" />,
                  },
                ]}
                className={inputField}
              >
                <Input className={inputField} />
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
                  {
                    max: 150,
                    message: <FormattedMessage id="AddressAreaLength" />,
                  },
                ]}
                className={inputField}
              >
                <Input className={inputField} />
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
          <div className={twoInOneLine}>
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
                  {
                    pattern: /^[0-9]{10}$/,
                    message: <FormattedMessage id="IdNumberLength" />,
                  },
                ]}
              >
                <InputNumber
                  minLength={0}
                  maxLength={50}
                  className={inputField}
                  onBlur={(e) => {
                    handleDuplicateNumBlur(e);
                  }}
                />
              </Form.Item>
              <div className={passportNumContainer} lang={locale}>
                <Form.Item
                  label={<FormattedMessage id="passportNum" />}
                  name="Passport_Num"
                  className={inputField}
                >
                  <InputNumber
                    minLength={0}
                    maxLength={50}
                    className={inputField}
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
                <Select onChange={handleWorkPlaceChange}>
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
                <Select className={selectInputField}>
                  {locale === "ar"
                    ? marriageStatusAr?.map((status, index) => (
                        <Option key={index} value={status}>
                          {status}
                        </Option>
                      ))
                    : marriageStatusEn?.map((status, index) => (
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
                <Select>
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
                  {
                    max: 350,
                    message: <FormattedMessage id="MotherNameLength" />,
                  },
                ]}
                className={inputField}
              >
                <Input className={inputField} />
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
              >
                {locale === "en"
                  ? degreeOptions?.map((option, index) => (
                      <Option key={index} value={option}>
                        {option}
                      </Option>
                    ))
                  : degreeOptionsAr?.map((option, index) => (
                      <Option key={index} value={option}>
                        {option}
                      </Option>
                    ))}
              </Select>
            </Form.Item>

            {(qualificationsFormData.Degree_Type === "Other" ||
              qualificationsFormData.Degree_Type === "أخرى") && (
              <Form.Item
                label={<FormattedMessage id="TheOtehrName" />}
                name="OtherDegree"
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id="DgreeReq" />,
                  },
                ]}
              >
                <Input />
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
              <Select onChange={(value) => handleSelectChange("Major", value)}>
                {locale === "en"
                  ? majors?.map((option, index) => (
                      <Option key={index} value={option}>
                        {option}
                      </Option>
                    ))
                  : majorsAr?.map((option, index) => (
                      <Option key={index} value={option}>
                        {option}
                      </Option>
                    ))}
              </Select>
            </Form.Item>

            {(qualificationsFormData.Major === "Other" ||
              qualificationsFormData.Major === "أخرى") && (
              <Form.Item
                label={<FormattedMessage id="TheOtehrName" />}
                name="OtherMajor"
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id="MajorReq" />,
                  },
                ]}
              >
                <Input />
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
              >
                {locale === "en"
                  ? universityOptions?.map((option, index) => (
                      <Option key={index} value={option}>
                        {option}
                      </Option>
                    ))
                  : universityOptionsAr?.map((option, index) => (
                      <Option key={index} value={option}>
                        {option}
                      </Option>
                    ))}
              </Select>
            </Form.Item>

            {(qualificationsFormData.University_Name === "Other" ||
              qualificationsFormData.University_Name === "أخرى") && (
              <Form.Item
                label={<FormattedMessage id="TheOtehrName" />}
                name="OtherUniversity"
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id="UniversityReq" />,
                  },
                ]}
              >
                <Input />
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
            <InputNumber maxLength={10} />
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
            <Select
              placeholder={
                <FormattedMessage id="select your English proficiency level" />
              }
            >
              {locale === "en"
                ? languageLevels.map((level) => (
                    <Select.Option key={level} value={level}>
                      {level}
                    </Select.Option>
                  ))
                : languageLevelsAr.map((level) => (
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
            <Select
              placeholder={
                <FormattedMessage id="select your Arabic proficiency level" />
              }
            >
              {locale === "en"
                ? languageLevels.map((level) => (
                    <Select.Option key={level} value={level}>
                      {level}
                    </Select.Option>
                  ))
                : languageLevelsAr.map((level) => (
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
            <Radio.Group onChange={handleRadioChange1}>
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
              <Input.TextArea rows={4} cols={50} />
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
            <Radio.Group onChange={handleRadioChange2}>
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
                <Input.TextArea rows={4} cols={50} />
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
                <DatePicker format="YYYY-MM-DD" className={inputField} />
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
          <div className={imagesContainer}>
            <Form.Item
              label={<FormattedMessage id="cvUpload" />}
              name="CV"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              className={uploadeContainer}
              rules={[
                ({ getFieldValue }) => ({
                  validator(_, fileList) {
                    const validFiles = fileList?.every((file) => {
                      // Check if the file is an image (JPEG or PNG)
                      const isImage =
                        file.type === "image/jpeg" ||
                        file.type === "image/jpg" ||
                        file.type === "image/png";

                      // Check if the file is a PDF, .doc, or .docx document
                      const isDocument =
                        file.type === "application/pdf" ||
                        file.type === "application/msword" || // .doc
                        file.type ===
                          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"; // .docx

                      const isLt2M = file.size / 1024 / 1024 <= 2; // 2MB

                      if (!(isImage || isDocument) || !isLt2M) {
                        return false;
                      }

                      return true;
                    });

                    if (!validFiles && fileList?.length > 0) {
                      return Promise.reject(<FormattedMessage id="imageReq" />);
                    }

                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <Upload
                multiple
                customRequest={() => {}}
                onChange={(info) => onFileChange("CV", info)}
                beforeUpload={() => false}
                accept=".pdf, .doc, .docx, .jpeg, .jpg, .png"
                listType="picture-card"
                maxCount={5}
              >
                <Button icon={<UploadOutlined />}>
                  <FormattedMessage id="select" />
                </Button>
              </Upload>
            </Form.Item>
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
              <Checkbox>
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
              <Checkbox>
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
          toast.warn(<FormattedMessage id="atLeastOneExp" />, {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      } else if (currentStep === 2 && duplicate) {
        toast.error(<FormattedMessage id="duplicateNationalNum" />, {
          position: toast.POSITION.TOP_CENTER,
        });
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
  const onFinish = async (values) => {
    setFormLoading(true);
    const formData = form.getFieldsValue(true);
    const formUploadData = new FormData();
    const formDataReshape = {
      ...formData,
      UUID: uuid,
      Work_Experiences: workExperiences,
      Degree_Type:
        formData.Degree_Type === "Other" || formData.Degree_Type === "أخرى"
          ? formData.OtherDegree
          : formData.Degree_Type,
      Major:
        formData.Major === "Other" || formData.Major === "أخرى"
          ? formData.OtherMajor
          : formData.Major,
      University_Name:
        formData.University_Name === "Other" ||
        formData.University_Name === "أخرى"
          ? formData.OtherUniversity
          : formData.University_Name,
      Relegin:
        formData.Relegin === "Other" || formData.Relegin === "أخرى"
          ? formData.OtherRelegin
          : formData.Relegin,
      Address_BuildingNo: formData?.Address_BuildingNo
        ? `${formData?.Address_BuildingNo}`
        : null,
      Address_Phone2: formData?.Address_Phone2
        ? `${formData?.Address_Phone2}`
        : null,
      National_Num: formData?.National_Num ? `${formData?.National_Num}` : null,
      Passport_Num: formData?.Passport_Num ? `${formData?.Passport_Num}` : null,
      Explanation_Radio1: formData?.Explanation_Radio1
        ? `${formData?.Explanation_Radio1}`
        : null,
      Explanation_Radio2: formData?.Explanation_Radio2
        ? `${formData?.Explanation_Radio2}`
        : null,
      Explanation_Date_Radio2: formData?.Explanation_Date_Radio2
        ? formData?.Explanation_Date_Radio2
        : null,
      GPA: formData?.GPA ? `${formData?.GPA}` : null,
      Agree_Info: formData?.Agree_Info ? "Y" : "N",
      Agree_Address: formData?.Agree_Address ? "Y" : "N",
    };
    const {
      OtherDegree,
      OtherMajor,
      OtherUniversity,
      OtherRelegin,
      CV,
      ...reshapedData
    } = formDataReshape;

    const labelObjects = imageGroups?.map((group) => {
      return { ...group };
    });
    const combinedData = labelObjects.map((group) => {
      group.images = group.images.map((file) => {
        const randomFileName = generateRandomName(file);
        formUploadData.append("images", file, randomFileName);
        return randomFileName;
      });
      return group;
    });
    formUploadData.append("labels", JSON.stringify(combinedData));
    formUploadData.append("finalFormData", JSON.stringify(reshapedData));

    try {
      const response = await http.post(
        `${serverPath}/general/general-from`,
        formUploadData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        setFormSubmitted(true);
      }
      // If you want to do something with the response data, add your logic here.
      // For example, updating the UI or navigating to another page.
    } catch (error) {
      setFormError(true);
      console.error("Error:", error);
    } finally {
      setImageGroups([]);
      setFormLoading(false);
    }
  };

  const generateRandomName = (file) => {
    const fileExtension = file.name.split(".").pop();
    const paddedCounter = String(fileCounter).padStart(2, "0"); // Add leading zeros if necessary
    fileCounter++; // Increment the counter for the next file
    return `HREMP_${uuid}-${paddedCounter}.${fileExtension}`;
  };

  const resetForm = () => {
    form.resetFields();
    setCurrentStep(0);
    setFormSubmitted(false);
    setFormError(false);
    setWorkExperiences([]);
    window.location.href = "/general-form";
  };

  const renderContent = () => {
    if (formSubmitted) {
      return (
        <Result
          status="success"
          title={<FormattedMessage id="Form submitted successfully!" />}
          subTitle={<FormattedMessage id="Will contact you" />}
          extra={[
            <Button
              type="primary"
              key="reset"
              onClick={resetForm}
              className={antBtnPrimary}
            >
              <FormattedMessage id="Refill the form" />
            </Button>,
          ]}
        />
      );
    } else if (formError) {
      return (
        <Result
          status="error"
          title={<FormattedMessage id="Sorry an error occurred!" />}
          subTitle={<FormattedMessage id="Please try again." />}
          extra={[
            <Button
              type="primary"
              key="reset"
              onClick={resetForm}
              className={antBtnPrimary}
            >
              <FormattedMessage id="Refill the form" />
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
      <ToastContainer
        position="top-center"
        autoClose={3000}
        className={toastConatiner}
      />
      <Typography.Title level={3} className={centeredCardTitle}>
        <FormattedMessage id="General Employment From" />
      </Typography.Title>
      <Spin spinning={formLoading}>
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
                {currentStep === formSteps.length - 1 && (
                  <Button
                    type="primary"
                    htmlType="submit"
                    className={antBtnPrimary}
                  >
                    <FormattedMessage id="save" />
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
            <Step key={step?.title} />
          ))}
        </Steps>
      </Spin>
    </div>
  );
};

export default GeneralForm;
