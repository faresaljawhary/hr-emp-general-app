import React from "react";
import {
  Form,
  Input,
  DatePicker,
  InputNumber,
  Select,
  Button,
  Upload,
} from "antd";

import { UploadOutlined } from "@ant-design/icons"; // Import the UploadOutlined icon
import { UserOutlined } from "@ant-design/icons";
import {
  arabicCountries,
  jordanCities,
  postions,
  locations,
  gender,
} from "./dropDownData";
import styles from "./styles.module.scss";

const {
  twoInOneLine,
  inputField,
  selectInputField,
  customSelect,
  imagesContainer,
  uploadeContainer,
} = styles;

const { Option } = Select;

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

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
              rules={[
                { required: true, message: "الرجاء إدخال الاسم كامل" },
                {
                  max: 250,
                  message: "يجب أن يكون طول الاسم أقل من 250 حرف",
                },
              ]}
            >
              <Input prefix={<UserOutlined />} className={inputField} />
            </Form.Item>
            <Form.Item
              label="مكان الولادة"
              name="Birth_Place"
              rules={[{ required: true, message: "الرجاء إدخال مكان الولادة" }]}
              className={inputField}
            >
              <Select className={customSelect}>
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
              rules={[
                { required: true, message: "الرجاء تحديد تاريخ الميلاد" },
              ]}
              className={inputField}
            >
              <DatePicker format="YYYY-MM-DD" className={inputField} />
            </Form.Item>

            <Form.Item
              label="الديانة"
              name="Relegin"
              rules={[
                { required: true, message: "الرجاء إدخال الديانة" },
                {
                  max: 50,
                  message: "يجب أن يكون طول الاسم أقل من 50 حرف",
                },
              ]}
              className={inputField}
            >
              <Input className={inputField} />
            </Form.Item>
          </div>
          <div>
            <Form.Item
              label="الجنسية"
              name="Nationality"
              rules={[{ required: true, message: "الرجاء إدخال الجنسية" }]}
            >
              <Select>
                {arabicCountries?.map((country, index) => (
                  <Option key={index} value={country}>
                    {country}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="الجنس"
              name="Gender"
              rules={[{ required: true, message: "الرجاء إدخال الجنس" }]}
              className={inputField}
            >
              <Select>
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
              rules={[{ required: true, message: "الرجاء إدخال المدينة" }]}
              className={inputField}
            >
              <Select>
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
              rules={[
                { required: true, message: "الرجاء إدخال الحي" },
                {
                  max: 150,
                  message: "يجب أن يكون طول الاسم أقل من 150 حرف",
                },
              ]}
              className={inputField}
            >
              <Input className={inputField} />
            </Form.Item>
          </div>
          <div>
            <Form.Item
              label="اسم الشارع"
              name="Address_Street"
              rules={[
                { required: true, message: "الرجاء إدخال اسم الشارع" },
                {
                  max: 150,
                  message: "يجب أن يكون طول الاسم أقل من 150 حرف",
                },
              ]}
              className={inputField}
            >
              <Input className={inputField} />
            </Form.Item>

            <Form.Item
              label="رقم البناية"
              name="Address_BuildingNo"
              rules={[
                {
                  required: true,
                  message: "الرجاء إدخال رقم البناية",
                },
              ]}
              className={inputField}
            >
              <InputNumber maxLength={10} className={inputField} />
            </Form.Item>
          </div>
          <div>
            <Form.Item
              label="رقم الهاتف"
              name="Address_Phone"
              rules={[
                {
                  required: true,
                  message: "الرجاء إدخال رقم الهاتف",
                },
                {
                  pattern: /^(\+\d{1,3}[- ]?)?\d{10}$/,
                  message: "تنسيق رقم الهاتف غير صحيح",
                },
              ]}
            >
              <Input className={inputField} placeholder="أدخل رقم الهاتف" />
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
              rules={[
                { required: true, message: "الرجاء إدخال الوظيفة المطلوبة" },
              ]}
              className={inputField}
            >
              <Select>
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
              rules={[
                {
                  required: true,
                  message: "الرجاء إدخال رقم الجواز",
                },
              ]}
              className={inputField}
            >
              <InputNumber
                minLength={0}
                maxLength={50}
                className={inputField}
              />
            </Form.Item>
          </div>
          <div>
            <Form.Item
              label="مكان العمل"
              name="Work_Place"
              rules={[{ required: true, message: "الرجاء إدخال مكان العمل" }]}
              className={inputField}
            >
              <Select>
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
              />
            </Form.Item>
          </div>
          <div>
            <Form.Item
              label="الرقم الوطني"
              name="National_Num"
              className={inputField}
            >
              <InputNumber
                minLength={0}
                maxLength={50}
                className={inputField}
              />
            </Form.Item>
            <Form.Item
              label="اسم الام"
              name="Mother_Name"
              rules={[
                {
                  required: true,
                  message: "الرجاء إدخال اسم الأم",
                },
                {
                  max: 350,
                  message: "يجب أن يكون طول الاسم أقل من 350 حرف",
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
    title: "الخطوة 4",
    caption: "الخطوة 4",
    content: (
      <>
        <div className={twoInOneLine}>
          <div>
            <Form.Item
              label="الحالة الاجتماعية"
              name="Marriage_Status"
              rules={[
                {
                  required: true,
                  message: "الرجاء تحديد الحالة الاجتماعية",
                },
              ]}
              className={inputField}
            >
              <Select className={selectInputField}>
                <Option value="Married">متزوج</Option>
                <Option value="Single">اعزب</Option>
              </Select>
            </Form.Item>
          </div>
          <div>
            <Form.Item
              label="تاريخ الزواج"
              name="Marriage_Date"
              rules={[
                ({ getFieldValue }) => ({
                  required: getFieldValue("Marriage_Status") === "متزوج",
                  message: "الرجاء تحديد تاريخ الزواج",
                }),
              ]}
              className={inputField}
            >
              <DatePicker format="YYYY-MM-DD" className={inputField} />
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
              />
            </Form.Item>
          </div>
        </div>
        <div>
          <Form.Item label="ملاحظات" name="Description" className={inputField}>
            <Input.TextArea className={inputField} maxLength={500} />
          </Form.Item>
        </div>
      </>
    ),
  },
  // {
  //   title: "الخطوة 5",
  //   caption: "تحميل صور",
  //   content: (
  //     <div className={imagesContainer}>
  //       <Form.Item
  //         label="تحميل صورة الهوية"
  //         name="IdImageUpload"
  //         valuePropName="fileList"
  //         getValueFromEvent={normFile}
  //         className={uploadeContainer}
  //         rules={[
  //           ({ getFieldValue }) => ({
  //             validator(_, fileList) {
  //               const validFiles = fileList?.every((file) => {
  //                 const isJPGorJPEGorPNG =
  //                   file.type === "image/jpeg" ||
  //                   file.type === "image/jpg" ||
  //                   file.type === "image/png";
  //                 const isLt2M = file.size / 1024 / 1024 <= 2; // 2MB

  //                 if (!isJPGorJPEGorPNG || !isLt2M) {
  //                   return false;
  //                 }

  //                 return true;
  //               });

  //               if (!validFiles && fileList?.length > 0) {
  //                 return Promise.reject(
  //                   "يمكن تحميل الصور بصيغة JPG، JPEG، أو PNG ويجب أن يكون حجم الصورة أقل من 2MB"
  //                 );
  //               }

  //               return Promise.resolve();
  //             },
  //           }),
  //         ]}
  //       >
  //         <Upload
  //           name="image"
  //           listType="picture-card"
  //           action="/your-upload-endpoint"
  //           beforeUpload={() => false}
  //           showUploadList={{ showPreviewIcon: false, showRemoveIcon: true }}
  //         >
  //           <Button icon={<UploadOutlined />}>انقر للتحميل</Button>
  //         </Upload>
  //       </Form.Item>
  //       <Form.Item
  //         label="تحميل صورة لرخصةالقيادة"
  //         name="DrivingLicenseImageUpload"
  //         valuePropName="fileList"
  //         getValueFromEvent={normFile}
  //         className={uploadeContainer}
  //         rules={[
  //           ({ getFieldValue }) => ({
  //             validator(_, fileList) {
  //               const validFiles = fileList?.every((file) => {
  //                 const isJPGorJPEGorPNG =
  //                   file.type === "image/jpeg" ||
  //                   file.type === "image/jpg" ||
  //                   file.type === "image/png";
  //                 const isLt2M = file.size / 1024 / 1024 <= 2; // 2MB

  //                 if (!isJPGorJPEGorPNG || !isLt2M) {
  //                   return false;
  //                 }

  //                 return true;
  //               });

  //               if (!validFiles && fileList?.length > 0) {
  //                 return Promise.reject(
  //                   "يمكن تحميل الصور بصيغة JPG، JPEG، أو PNG ويجب أن يكون حجم الصورة أقل من 2MB"
  //                 );
  //               }

  //               return Promise.resolve();
  //             },
  //           }),
  //         ]}
  //       >
  //         <Upload
  //           name="image"
  //           listType="picture-card"
  //           action="/your-upload-endpoint"
  //           beforeUpload={() => false}
  //           showUploadList={{ showPreviewIcon: false, showRemoveIcon: true }}
  //         >
  //           <Button icon={<UploadOutlined />}>انقر للتحميل</Button>
  //         </Upload>
  //       </Form.Item>
  //       <Form.Item
  //         label="تحميل لكشف الضمان الاجتماعي"
  //         name="SocialSecurityImageUpload"
  //         valuePropName="fileList"
  //         getValueFromEvent={normFile}
  //         className={uploadeContainer}
  //         rules={[
  //           ({ getFieldValue }) => ({
  //             validator(_, fileList) {
  //               const validFiles = fileList?.every((file) => {
  //                 const isJPGorJPEGorPNG =
  //                   file.type === "image/jpeg" ||
  //                   file.type === "image/jpg" ||
  //                   file.type === "image/png";
  //                 const isLt2M = file.size / 1024 / 1024 <= 2; // 2MB

  //                 if (!isJPGorJPEGorPNG || !isLt2M) {
  //                   return false;
  //                 }

  //                 return true;
  //               });

  //               if (!validFiles && fileList?.length > 0) {
  //                 return Promise.reject(
  //                   "يمكن تحميل الصور بصيغة JPG، JPEG، أو PNG ويجب أن يكون حجم الصورة أقل من 2MB"
  //                 );
  //               }

  //               return Promise.resolve();
  //             },
  //           }),
  //         ]}
  //       >
  //         <Upload
  //           name="image"
  //           listType="picture-card"
  //           action="/your-upload-endpoint"
  //           beforeUpload={() => false}
  //           showUploadList={{ showPreviewIcon: false, showRemoveIcon: true }}
  //         >
  //           <Button icon={<UploadOutlined />}>انقر للتحميل</Button>
  //         </Upload>
  //       </Form.Item>
  //     </div>
  //   ),
  // },
  // {
  //   title: "الخطوة 6",
  //   caption: "تحميل صور",
  //   content: (
  //     <div className={imagesContainer}>
  //       <Form.Item
  //         label="تحميل صورة لدفتر العائلة"
  //         name="FamilyBookImageUpload"
  //         valuePropName="fileList"
  //         getValueFromEvent={normFile}
  //         className={uploadeContainer}
  //         rules={[
  //           {
  //             required: true,
  //             message: "الرجاء تحميل صورة لدفتر العائلة",
  //           },
  //           ({ getFieldValue }) => ({
  //             validator(_, fileList) {
  //               const validFiles = fileList?.every((file) => {
  //                 const isJPGorJPEGorPNG =
  //                   file.type === "image/jpeg" ||
  //                   file.type === "image/jpg" ||
  //                   file.type === "image/png";
  //                 const isLt2M = file.size / 1024 / 1024 <= 2; // 2MB

  //                 if (!isJPGorJPEGorPNG || !isLt2M) {
  //                   return false;
  //                 }

  //                 return true;
  //               });
  //               if (!validFiles && fileList?.length > 0) {
  //                 return Promise.reject(
  //                   "يمكن تحميل الصور بصيغة JPG، JPEG، أو PNG ويجب أن يكون حجم الصورة أقل من 2MB"
  //                 );
  //               }

  //               return Promise.resolve();
  //             },
  //           }),
  //         ]}
  //       >
  //         <Upload
  //           name="image"
  //           listType="picture-card"
  //           action="/your-upload-endpoint"
  //           beforeUpload={() => false}
  //           showUploadList={{ showPreviewIcon: false, showRemoveIcon: true }}
  //         >
  //           <Button icon={<UploadOutlined />}>انقر للتحميل</Button>
  //         </Upload>
  //       </Form.Item>
  //       <Form.Item
  //         label="تحميل صورة للسيرة الذاتية"
  //         name="CvImageUpload"
  //         valuePropName="fileList"
  //         getValueFromEvent={normFile}
  //         className={uploadeContainer}
  //         rules={[
  //           ({ getFieldValue }) => ({
  //             validator(_, fileList) {
  //               const validFiles = fileList?.every((file) => {
  //                 const isJPGorJPEGorPNG =
  //                   file.type === "image/jpeg" ||
  //                   file.type === "image/jpg" ||
  //                   file.type === "image/png";
  //                 const isLt2M = file.size / 1024 / 1024 <= 2; // 2MB

  //                 if (!isJPGorJPEGorPNG || !isLt2M) {
  //                   return false;
  //                 }

  //                 return true;
  //               });
  //               if (!validFiles && fileList?.length > 0) {
  //                 return Promise.reject(
  //                   "يمكن تحميل الصور بصيغة JPG، JPEG، أو PNG ويجب أن يكون حجم الصورة أقل من 2MB"
  //                 );
  //               }
  //               return Promise.resolve();
  //             },
  //           }),
  //         ]}
  //       >
  //         <Upload
  //           name="image"
  //           listType="picture-card"
  //           action="/your-upload-endpoint"
  //           beforeUpload={() => false}
  //           showUploadList={{ showPreviewIcon: false, showRemoveIcon: true }}
  //         >
  //           <Button icon={<UploadOutlined />}>انقر للتحميل</Button>
  //         </Upload>
  //       </Form.Item>
  //     </div>
  //   ),
  // },
];

export default formSteps;
