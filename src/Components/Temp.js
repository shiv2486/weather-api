import "./Temp.css";
export default function Temp(props){
    console.log(props.info, props.value, props.units);
    return(
        <div className="info">
            <p className="para para1">{props.info}</p>
            <p className="para">{props.value} {props.units}</p>
        </div>
    )
}