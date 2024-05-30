export interface CustomerApplicationData {
  agentName: string;
  service: string;
  applyDate: string;
  deliveryDate: string;
  status: Status;
  reciept: string | null;
  deliveryDoc: string;
}

export interface Status {
  name: string;
  color: string;
  reason?: string;
}
