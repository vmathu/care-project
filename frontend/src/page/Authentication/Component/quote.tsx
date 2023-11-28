import { Card, CardContent } from "@mui/material";


export default function Quote() {
  return (
    <Card sx={{ minWidth: '30%' }} 
    style={{
        width: '30vw',
        flexShrink: "0",
        borderRadius: '40px',
        border: '3px solid #FEFEFE4D',
        background: "rgba(254, 254, 254, 0.30)",
        backdropFilter: "blur(10px)",
        paddingTop: '5%',
    }}>
      <CardContent>
        <h1 style={{
            color: "#FFF",
            fontFamily: "Inter",
            fontSize: "32px",
            fontStyle: "normal",
            fontWeight: "600",
            lineHeight: "normal",
            textAlign: 'center',
            marginBottom: '3%'
        }}>
            "Coffee for a nice morning"
        </h1>
        <p style={{
            color: "#FFF",
            fontFamily: "Inter",
            fontSize: "20px",
            fontStyle: "italic",
            fontWeight: "600",
            lineHeight: "normal",
            textAlignLast: 'right',
        }}>
            - JCXDC team -
        </p>
      </CardContent>
    </Card>
  );
}