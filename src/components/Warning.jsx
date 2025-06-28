export default function Warning(props) {
    setTimeout(() => {props.setWarnings(prevWarnings => prevWarnings.filter(warning => warning.message !== props.warning.message))}, 5300);

    let icon;
    let color;
    if (props.warning.type === 'red') {
        icon = <i className="fa-solid fa-xmark"></i>;
        color = 'red';
    } else if (props.warning.type === 'orange') {
        icon = <i className="fa-solid fa-triangle-exclamation"></i>;
        color = 'orange';
    } else if (props.warning.type === 'green') {
        icon = <i className="fa-solid fa-check"></i>;
        color = 'green';
    }
    return (
        <div className={`warning-div ${color}`}>
            {icon}
            <p>{props.warning.message}</p>
        </div>
    )
}