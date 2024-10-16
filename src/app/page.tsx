import Link from "next/link";

export default function Home(){
    return(
 <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
    <h1 style={{
        textAlign: "center",
        marginTop: "150px", 
        fontSize: "48px",
        fontWeight: "bold", 
        color: "#4A90E2", 
        textTransform: "uppercase", 
        letterSpacing: "2px",
        textShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)",
        background: "linear-gradient(to right, #f12711, #f5af19)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent" 
      }}>
        Welcome Dynamic Form 

      </h1><br/>
      <Link style={{
                 color: "blue", 
                 marginTop:"200px",
                 textDecoration: "none", 
                 borderRadius: "5px", 
                 fontWeight: "bold", 
        }} href="/Dynamicform">form</Link></div> 
    
     

      
    )   
}