import React, { useEffect, useState } from "react";
import ServiceCard from "./ServiceCard";
import CustomNavbar from "../dashboard/navbar/CustomNavbar";
import { ALL_SERVICES } from "../../api";
import axiosInstance from "../../axiosConfig";
import { Service } from "./common/types";

function ServicesContainer() {
  const [servicesData, setservicesData] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    axiosInstance.get(`${ALL_SERVICES}`).then((response) => {
      if (response.data.success === false) {
        setError(true);
        setErrorMsg(response.data.message);
      }
      setservicesData(response.data.data);
      setLoading(false);
    }); 
  }, []);

  return (
    <div>
      <CustomNavbar />
      <div className="container mt-2 d-flex justify-content-center flex-wrap gap-3">
      {servicesData.map((serviceGroup, index) => (
          <ServiceCard key={index} serviceGroupData={serviceGroup} />
        ))}
      </div>
    </div>
  );
}

export default ServicesContainer;
