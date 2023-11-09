const commonRules = {
  Full_Name: [
    { required: true, message: "الرجاء إدخال الاسم كامل" },
    {
      max: 250,
      message: "يجب أن يكون طول الاسم أقل من 250 حرف",
    },
  ],
  Birth_Place: [{ required: true, message: "الرجاء إدخال مكان الولادة" }],
  Birth_Date: [{ required: true, message: "الرجاء تحديد تاريخ الميلاد" }],
  Relegin: [
    { required: true, message: "الرجاء إدخال الديانة" },
    {
      max: 50,
      message: "يجب أن يكون طول الاسم أقل من 50 حرف",
    },
  ],
  Nationality: [{ required: true, message: "الرجاء إدخال الجنسية" }],
  Gender: [{ required: true, message: "الرجاء إدخال الجنس" }],
  Address_City: [{ required: true, message: "الرجاء إدخال المدينة" }],
  Address_Region: [
    {
      required: true,
      message: "الرجاء إدخال الحي",
    },
    {
      max: 150,
      message: "يجب أن يكون طول الاسم أقل من 150 حرف",
    },
  ],
  Address_Street: [
    {
      required: true,
      message: "الرجاء إدخال اسم الشارع",
    },
    {
      max: 150,
      message: "يجب أن يكون طول الاسم أقل من 150 حرف",
    },
  ],
  Address_BuildingNo: [{ required: true, message: "الرجاء إدخال رقم البناية" }],
  Address_Phone1: [
    { required: true, message: "الرجاء إدخال رقم الهاتف" },
    {
      pattern: /^7\d{8}$/,
      message: "الصيغة : 99-999-999-7 (962+)",
    },
  ],
  Address_Phone2: [
    { required: true, message: "الرجاء إدخال رقم الهاتف" },
    {
      pattern: /^7\d{8}$/,
      message: "الصيغة : 99-999-999-7 (962+)",
    },
  ],
  Demand_Position: [
    {
      required: true,
      message: "الرجاء إدخال الوظيفة المطلوبة",
    },
  ],
  Work_Place: [{ required: true, message: "الرجاء إدخال مكان العمل" }],
  National_Num: [
    {
      required: true,
      message: "الرجاء إدخال الرقم الوطني/الرقم الشخصي",
    },
  ],
  Mother_Name: [
    {
      required: true,
      message: "الرجاء إدخال اسم الأم",
    },
    {
      max: 350,
      message: "يجب أن يكون طول الاسم أقل من 350 حرف",
    },
  ],
  Marriage_Status: [
    {
      required: true,
      message: "الرجاء تحديد الحالة الاجتماعية",
    },
  ],

  Chlidren_Num: [{ required: true, message: "الرجاء إدخال عدد الأبناء" }],
  Description: [
    { required: true, message: "الرجاء إدخال الملاحظات" },
    {
      max: 500,
      message: "يجب أن يكون طول الملاحظات أقل من 500 حرف",
    },
  ],
};
export default commonRules;
