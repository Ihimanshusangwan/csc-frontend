import React from 'react';
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface MyAccordionProps {
  heading: string;
  content: string;
}

const MyAccordion: React.FC<MyAccordionProps> = ({ heading, content }) => {
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <span dangerouslySetInnerHTML={{ __html: heading }} />
        </AccordionSummary>
        <AccordionDetails>
          <span dangerouslySetInnerHTML={{ __html: content }} />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default MyAccordion;
