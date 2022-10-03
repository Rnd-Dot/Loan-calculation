import axios from "axios"

export const postData = (price, interest, month, monthPay, sumTotal) => {
    const url = "https://eoj3r7f3r4ef6v4.m.pipedream.net"
    return (
        axios.post(url, {
            data: {
                "price": price, 
                "interest": interest,
                "month": month,
                "monthPay": monthPay,
                "sumTotal": sumTotal
            }
            } ,
            {
                headers: {
                    "Content-Type": "application/json"
                } 
            })
    )
    .then((response) => {
        console.log(response)
    })
}