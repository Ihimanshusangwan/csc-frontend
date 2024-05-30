import CustomNavbar from "./navbar/CustomNavbar";
import { useState, useEffect } from "react";
import Spinner from "react-bootstrap/esm/Spinner";
import { ALL_CUSTOMER_APPLICATIONS } from "../../api";
import axiosInstance from "../../axiosConfig";
import ErrorModal from "../../common/ErrorModal";
import { CustomerApplicationData } from "./common/types";
import ApplicationCard from "./ApplicationCard";

const Dashboard = () => {
  const [applicationData, setApplicationData] = useState<
    CustomerApplicationData[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    axiosInstance.get(`${ALL_CUSTOMER_APPLICATIONS}`).then((response) => {
      if (response.data.success === false) {
        setError(true);
        setErrorMsg(response.data.message);
      }
      setApplicationData(response.data);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <CustomNavbar />
      <div className="container mt-3">
        <div className="display-6 mb-2">All Applications</div>
        {loading && <Spinner animation="border" />}
        {error && <ErrorModal errorMessage={errorMsg} />}
        {applicationData.map((application, index) => (
          <ApplicationCard key={index} applicationData={application} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
