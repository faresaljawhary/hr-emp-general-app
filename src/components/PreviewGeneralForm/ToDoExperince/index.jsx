import React, { useEffect, useState } from "react";
import { Row, Card } from "antd";
import moment from "moment";
import { FormattedMessage } from "react-intl";

import "react-toastify/dist/ReactToastify.css";
import styles from "./styles.module.scss";
const { cardsContainer, cardTitle, cardContent } = styles;

function ToDoPracticalExperiences({
  setWorkExperiences = () => {},
  workExperiences,
}) {
  const [experiences, setExperiences] = useState(workExperiences || []);

  useEffect(() => {
    setWorkExperiences(experiences);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [experiences]);

  return (
    <>
      <Row className={cardsContainer}>
        {experiences?.map((item, index) => (
          <Card
            key={index}
            style={{ marginBottom: "10px" }}
            className={cardContent}
            title={<div className={cardTitle}>{item.workplace}</div>}
          >
            <p>
              <span>
                <FormattedMessage id="postion" />:
              </span>{" "}
              {"  "}
              {item.position}
            </p>
            <p>
              <span>
                <FormattedMessage id="Start Date" />:
              </span>{" "}
              {"  "}
              {item.startDate
                ? moment(item.startDate).format("YYYY-MM")
                : "حاضر"}
            </p>
            <p>
              <span>
                {" "}
                <FormattedMessage id="End Date" />:
              </span>{" "}
              {"  "}
              {item.isPresent
                ? "حاضر"
                : (item.endDate && moment(item.endDate).format("YYYY-MM")) ||
                  "حاضر"}
            </p>
            <p>
              <span>
                {" "}
                <FormattedMessage id="Salary" />:
              </span>{" "}
              {"  "}
              {item.salary}
            </p>
          </Card>
        ))}
      </Row>
    </>
  );
}

export default ToDoPracticalExperiences;
