import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import MyAccordion from "../../common/MyAccordian";
import { CustomerApplicationData } from "./common/types";
import { ASSET_BASE_URL } from "../../config";
import "../../css/customer/dashboard/dashboard.scss"

export default function ApplicationCard({
  applicationData,
}: {
  applicationData: CustomerApplicationData;
}) {
  const reason = applicationData.status?.reason
    ? `Reason: ${applicationData.status.reason}`
    : "";
    const receipt = applicationData.reciept !== "Available Soon"
    ? `<a href ="${ASSET_BASE_URL}${applicationData.reciept}" target='_blank' > View </a> `
    : "Available Soon";
  const deliveryDocument =
    applicationData.deliveryDoc !== "Ask Agent to Unlock"
      ? `<a href ="${ASSET_BASE_URL}${applicationData.deliveryDoc}" target='_blank' > View </a> `
      : "Ask Agent to Unlock";
  return (
    <div className="mb-3 shadow p-3 bg-white rounded card">
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {applicationData.applyDate}
          </Typography> 
          <Typography variant="h5" component="div">
            {applicationData.service.toUpperCase()}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Agent: {applicationData.agentName}
          </Typography>
          <Typography variant="body2">
            Estimated Delivery Date:{" "}
            <strong>{applicationData.deliveryDate}</strong>
          </Typography>
        </CardContent>
        <MyAccordion
          content={`Status: <strong><span style="color:${applicationData.status.color};">${applicationData.status.name}</span></strong><br/> Receipt: ${receipt} <br/>${reason} `}
          heading="<strong>Details</strong>"
        />
        {applicationData.deliveryDoc && <MyAccordion heading="<strong>Get Document</strong>" content={deliveryDocument}/>}
      </Card>
    </div>
  );
}
