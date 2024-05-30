import React, { useEffect, useState } from "react";
import { Card, Button, Popover, OverlayTrigger } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { APP_BASE_URL, ASSET_BASE_URL } from "../../config";
import "../../css/customer/services/service_card.scss";
import { Service } from "./common/types";

const ServiceCard = ({
  serviceGroupData,
}: {
  serviceGroupData: [Service[]];
}) => {
  const navigate = useNavigate();
  const [showPopover, setShowPopover] = useState(false);

  const handleRedirect = (serviceId: number) => {
    navigate(`/apply/${serviceId}`)
    setShowPopover(false);
  };

  const popover = (
    <Popover
      id="popover-services"
      onMouseEnter={() => setShowPopover(true)}
      onMouseLeave={() => setShowPopover(false)}
      className="mobile-popover"
    >
      <Popover.Header as="h3">Available Services</Popover.Header>
      <Popover.Body>
        <ul>
          {serviceGroupData[0] &&
            serviceGroupData[0].map((service, index) => (
              <li key={index} onClick={() => handleRedirect(service.id)}>
                {service.name}
              </li>
            ))}
        </ul>
      </Popover.Body>
    </Popover>
  );

  return (
    <Card style={{ width: "22rem", height: "18rem" }} >
      <Card.Img
        variant="top"
        src={`${ASSET_BASE_URL}${serviceGroupData[0][0]?.groupPhoto}`}
        style={{ width: "22rem", height: "17rem" }}
      />
      <Card.Body>
        <Card.Title>{serviceGroupData[0][0].groupName}</Card.Title>
        <Card.Footer>
          <OverlayTrigger
            trigger="hover"
            placement="auto"
            overlay={popover}
            show={showPopover}
            onToggle={(nextShow) => setShowPopover(nextShow)}
          >
            <Button variant="primary">Services</Button>
          </OverlayTrigger>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};

export default ServiceCard;
