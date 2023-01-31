export default function Die(prop){


    const dieVar = (
        <div className={prop.isHeld ? `dice held` : "dice"} onClick={()=> prop.functionOnHeld(prop.id)}>
            <p>{prop.value}</p>
        </div>
    )

    return dieVar
}