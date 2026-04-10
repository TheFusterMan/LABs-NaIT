const GetTemp = (props) => {
    const celcius = props.valueK - 273;

    return (
        <>
            <p onClick={() => alert(`${props.valueK}°K = ${celcius}`)}>Температура {props.valueK}°K.</p>
            <p onclick={() => alert(`${props.valueF}°F = ${celcius}`)}>Температура {props.valueF}°F.</p>
        </>
    )
}

export default GetTemp;