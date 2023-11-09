import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Select,
  Popover,
  Modal,
  Input,
  Tooltip,
  Typography,
  Checkbox,
} from "antd";
import download from "downloadjs";
import { useLocale } from "../../hooks/localeContext";

import {
  FilterOutlined,
  SearchOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { FormattedMessage } from "react-intl";
import axios from "axios";
import { serverPath, serverName } from "../../helpers/server/const";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  translatedCites,
  translateMarriageStatus,
  translatedNationality,
  translatedLocations,
  gender,
  genderEn,
} from "./dropDowns";
import styles from "./styles.module.scss";
import "./customTable.css";
import moment from "moment";
import { DownloadOutlined } from "@ant-design/icons";
import { CheckOutlined } from "@ant-design/icons";

import PreviewGeneralForm from "../PreviewGeneralForm";
import http from "../../shared/http/http";
const {
  tableContainer,
  customTable,
  filtersContent,
  popoverContainer,
  flexRow,
  filtersButton,
  applyFiltersButton,
  searchContainer,
  searchButton,
  resetButton,
  recordModal,
  modalTitle,
  closeModalIcon,
  header,
  toastConatiner,
  buttonsTopTable,
  filterAndResetButtons,
} = styles;
const { Option } = Select;
const { Title } = Typography;

const ViewGeneralApplications = () => {
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [filters, setFilters] = useState({
    Gender: "",
    Address_City: "",
    Nationality: "",
    Work_Place: "",
    Demand_Position: "",
    Marriage_Status: "",
  });
  const [visibleFilters, setVisibleFilters] = useState(false);
  const [clearingFilters, setClearingFilters] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [userData, setUserData] = useState({});
  const [userAttachments, setUserAttachments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [disableDownload, setDisableDownload] = useState(true);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { locale } = useLocale();

  const handleFilterChange = (name, value) => {
    console.log(value);
    setFilters({ ...filters, [name]: value });
  };
  const toggleFilterPopover = () => {
    setVisibleFilters(!visibleFilters);
    if (clearingFilters) {
      setFilters({ Gender: "", Address_City: "", Nationality: "" });
      setClearingFilters(false);
    }
  };

  const applyFilters = () => {
    fetchData();
    toggleFilterPopover();
  };

  const clearFilters = () => {
    setClearingFilters(true);
  };

  const resetAll = () => {
    setFilters({
      Gender: "",
      Address_City: "",
      Nationality: "",
      Work_Place: "",
      Demand_Position: "",
      Marriage_Status: "",
    });
    setSearchQuery("");
    fetchData();
    setCurrentPage(1);
  };

  const handleSearch = () => {
    fetchData();
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await http.get(`${serverPath}/general/general-from`, {
        params: {
          ...filters,
          Search_Query: searchQuery,
        },
      });

      setData(response.data.records);
      if (clearingFilters) {
        setClearingFilters(false);
        toggleFilterPopover();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!searchQuery) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clearingFilters, searchQuery]);

  const content = (
    <div
      className={filtersContent}
      style={{ direction: locale === "ar" ? "rtl" : "ltr" }}
    >
      <div className={flexRow}>
        <div>
          <div className="filter-caption">
            <FormattedMessage id="department" />
          </div>
          <Select
            value={filters.Work_Place || ""}
            onChange={(value) => handleFilterChange("Work_Place", value)}
            style={{ width: 240 }}
          >
            <Option value="">
              <FormattedMessage id="all" />
            </Option>
            {translatedLocations?.map((location, index) => (
              <Option key={index} value={JSON.stringify(location)}>
                {locale === "ar" ? location.ar : location.en}
              </Option>
            ))}
          </Select>
        </div>
      </div>
      <div className={flexRow}>
        <div>
          <div className="filter-caption">
            <FormattedMessage id="Nationality" />
          </div>
          <Select
            value={filters.Nationality || ""}
            onChange={(value) => handleFilterChange("Nationality", value)}
            style={{ width: 120 }}
          >
            <Option value="">
              <FormattedMessage id="all" />
            </Option>
            {translatedNationality?.map((country, index) => (
              <Option key={index} value={JSON.stringify(country)}>
                {locale === "ar" ? country.ar : country.en}
              </Option>
            ))}
          </Select>
        </div>
        <div>
          <div className="filter-caption">
            <FormattedMessage id="City of residence" />
          </div>
          <Select
            value={filters.Address_City || ""}
            onChange={(value) => handleFilterChange("Address_City", value)}
            style={{ width: 120 }}
          >
            <Option value="">
              <FormattedMessage id="all" />
            </Option>
            {translatedCites?.map((city, index) => (
              <Option key={index} value={JSON.stringify(city)}>
                {locale === "ar" ? city.ar : city.en}
              </Option>
            ))}
          </Select>
        </div>
      </div>
      <div className={flexRow}>
        <div>
          <div className="filter-caption">
            <FormattedMessage id="maritalStatus" />
          </div>
          <Select
            value={filters.Marriage_Status || ""}
            onChange={(value) => handleFilterChange("Marriage_Status", value)}
            style={{ width: 120 }}
          >
            <Option value="">
              <FormattedMessage id="all" />
            </Option>
            {translateMarriageStatus?.map((status, index) => (
              <Option key={index} value={JSON.stringify(status)}>
                {locale === "ar" ? status.ar : status.en}
              </Option>
            ))}
          </Select>
        </div>
        <div>
          <div className="filter-caption">
            <FormattedMessage id="Gender" />
          </div>
          <Select
            value={filters.Gender || ""}
            onChange={(value) => handleFilterChange("Gender", value)}
            style={{ width: 120 }}
          >
            <Option value="" d>
              <FormattedMessage id="all" />
            </Option>
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
        </div>
      </div>

      <div className={filtersButton}>
        <Button danger onClick={clearFilters}>
          <FormattedMessage id="Reset filters" />
        </Button>
        <Button
          type="primary"
          onClick={applyFilters}
          className={applyFiltersButton}
        >
          <FormattedMessage id="Apply filters" />
        </Button>
      </div>
    </div>
  );
  const handleRowSelection = (e, record) => {
    e.stopPropagation(); // Stop event propagation

    const selectedUUID = record.UUID;

    if (e.target.checked) {
      setSelectedRows((prevSelectedRows) => [
        ...prevSelectedRows,
        selectedUUID,
      ]);
    } else {
      setSelectedRows((prevSelectedRows) =>
        prevSelectedRows.filter((uuid) => uuid !== selectedUUID)
      );
    }
  };
  useEffect(() => {
    if (selectedRows.length > 0) {
      setDisableDownload(false);
    } else {
      setDisableDownload(true);
    }
  }, [selectedRows]);
  const handleDownload = async () => {
    console.log(selectedRows);
    // Log the data for selected rows
    const selectedData = data?.filter((record) =>
      selectedRows.includes(record?.UUID)
    );
    const attachmentFilesToDownload = selectedData?.map(
      (user) => user?.Attachments
    );
    const attachmentFilesReshape = []
      .concat(...attachmentFilesToDownload)
      ?.map((el) => `${serverName}/download/${el}`);
    console.log("Selected Data:", attachmentFilesReshape);

    try {
      setLoading(true);
      console.log("selectedRows", selectedRows);

      // Create promises for HTTP requests
      const requestPromise = http.put(`${serverPath}/general/general-from`, {
        usersIds: selectedRows,
      });

      // Download files using the downloadjs library
      attachmentFilesReshape.forEach((fileUrl) => {
        download(fileUrl);
      });

      // Wait for all HTTP requests to complete
      await Promise.all([requestPromise]);

      // Show a success toast with a custom message
      toast.success(<FormattedMessage id="Download successful" />, {
        position: "top-right",
        autoClose: 3000, // Auto-close the toast after 3 seconds
      });
    } catch (error) {
      console.error(error);
      // Show an error toast
      toast.error(<FormattedMessage id="Download error" />, {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
      fetchData();
      setDisableDownload(true);
      setSelectedRows([]);
    }
  };

  const columns = [
    {
      title: <FormattedMessage id="Select" />, // Add a new column for checkboxes
      dataIndex: "selected",
      key: "selected",
      render: (text, record) =>
        !record?.Download ? (
          <Checkbox
            onChange={(e) => handleRowSelection(e, record)}
            checked={selectedRows.includes(record?.UUID)}
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <Tooltip title={<FormattedMessage id="This User is Downloaded" />}>
            <CheckOutlined
              style={{ color: "green" }}
              onClick={(e) => e.stopPropagation()}
            />
          </Tooltip>
        ),
    },
    {
      title: "#",
      dataIndex: "Counter",
      key: "Counter",
      render: (text, record, index) => (currentPage - 1) * 7 + index + 1,
    },
    {
      title: <FormattedMessage id="Name" />,
      dataIndex: "Full_Name",
      key: "Full_Name",
    },
    {
      title: <FormattedMessage id="postion" />,
      dataIndex: "Demand_Position",
      key: "Demand_Position",
    },
    {
      title: <FormattedMessage id="department" />,
      dataIndex: "Work_Place",
      key: "Work_Place",
    },
    {
      title: <FormattedMessage id="Gender" />,
      dataIndex: "Gender",
      key: "Gender",
      render: (text) =>
        text === "M"
          ? locale === "ar"
            ? "ذكر"
            : "Male"
          : text === "F"
          ? locale === "ar"
            ? "انثى"
            : "Female"
          : text,
    },
    {
      title: <FormattedMessage id="Nationality" />,
      dataIndex: "Nationality",
      key: "Nationality",
    },
  ];

  const handleRowClick = async (record) => {
    console.log(record);
    if (!popoverOpen) {
      setSelectedRowId(record.UUID);
      setUserData({
        ...record,
        Explanation_Date_Radio2: record.Explanation_Date_Radio2
          ? moment(record.Explanation_Date_Radio2, "YYYY-MM-DD")
          : null,
      });
      setUserAttachments(record?.Attachments);
      setIsModalVisible(true);
    }
  };

  return (
    <div className={tableContainer}>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        className={toastConatiner}
      />
      <Title className={header}>
        <FormattedMessage id="View applications" />
      </Title>
      <div className={searchContainer}>
        <Tooltip
          title={<FormattedMessage id="searchTooltip" />}
          trigger="hover"
          placement="bottom"
          color="#707B7C"
        >
          <Input
            placeholder="search..."
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
          />
        </Tooltip>
        <Button
          type="primary"
          icon={<SearchOutlined />}
          className={searchButton}
          onClick={handleSearch}
        ></Button>
      </div>
      <div className={buttonsTopTable}>
        <div className={filterAndResetButtons}>
          <Popover
            content={content}
            title={<FormattedMessage id="filters" />}
            trigger="click"
            visible={visibleFilters}
            onOpenChange={toggleFilterPopover}
          >
            <Button icon={<FilterOutlined />} className={popoverContainer} />
          </Popover>

          <Button type="default" className={resetButton} onClick={resetAll}>
            <FormattedMessage id="reset" />
          </Button>
        </div>
        <div>
          <Button
            type="default"
            onClick={handleDownload}
            disabled={disableDownload}
          >
            <DownloadOutlined /> <FormattedMessage id="Download" />
          </Button>
        </div>
      </div>
      <Table
        loading={loading}
        pagination={{
          pageSize: 4,
          showSizeChanger: false,
          current: currentPage,
        }}
        columns={columns}
        dataSource={data}
        onRow={(record) => {
          return {
            onClick: () => handleRowClick(record),
          };
        }}
        onChange={(pagination) => {
          setCurrentPage(pagination.current);
          fetchData(); // Fetch data for the new page
        }}
        className={customTable}
      />
      <Modal
        title={
          <Title level={4} className={modalTitle}>
            <FormattedMessage id="ApplicationDetails" />
          </Title>
        }
        visible={isModalVisible}
        footer={null}
        closeIcon={
          <Button
            type="default"
            className={closeModalIcon}
            onClick={() => setIsModalVisible(false)}
          >
            <CloseCircleOutlined />
          </Button>
        }
        className={recordModal}
        destroyOnClose={true}
      >
        {selectedRowId && (
          <PreviewGeneralForm
            formData={userData}
            userAttachments={userAttachments?.filter(
              (file) => !file.endsWith(".json")
            )}
            readOnly={true}
          />
        )}
      </Modal>
    </div>
  );
};

export default ViewGeneralApplications;
