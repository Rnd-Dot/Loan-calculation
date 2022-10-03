import { useForm, Controller } from "react-hook-form"
import Slider from '@mui/material/Slider'
import { useState } from "react"
import { Box, Button } from "@mui/material"
import "./Form.css"
import { postData } from "../api/api";


const Form = () => {
    const [price, setPrice] = useState(1000000)
    const [interest, setInterest] = useState(10)
    const [month, setMonth] = useState(1)

    const priceChange = (e, newValue) => {
        setPrice(newValue)
    }

    const contributionChange = (e, newValue) => {
        setInterest(newValue)
    }

    const monthsChange = (e, newValue) => {
        setMonth(newValue)
    }

    const initial = Math.floor((price / 100) * interest)

    const monthPay = Math.floor((price - initial) * ((0.035 * Math.pow((1 + 0.035), month)) / (Math.pow((1 + 0.035), month) - 1)))

    const sumTotal = Math.floor(initial + month * monthPay)

    const { control } = useForm()
    
    return (
        <div>
            <form >
                <label>
                    <Box id="box" width={427} position={"relative"}>
                        <div className="titel-text">Стоймость автомобиля</div>
                        <div className="wrapper-input">
                            <Controller
                                control={control}
                                name= "price"
                                render={() => (
                                    <input
                                    type="number" 
                                    min="1000000"
                                    max="6000000" 
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                                )}   
                            />
                            <div className="R">₽</div>
                        </div> 
                        <Slider
                            id= "slider"
                            size="small" 
                            min={1000000}
                            max={6000000}
                            value={price}
                            onChange={priceChange}/>
                    </Box>
                </label>

                <label>
                    <Box id="box" width={427} position={"relative"}>
                        <div className="titel-text">Первоначальный взнос</div>
                        <div className="wrapper-input">
                            <div className="R">{initial} ₽</div>
                            <div>
                            <Controller
                                control={control}
                                name= "vznos"
                                render={() => (
                                    <input
                                    id="input" 
                                    type="number" 
                                    min="10" 
                                    max="60"
                                    value={interest}
                                    onChange={(e) => setInterest(e.target.value)}
                                />
                                )}   
                            />   
                            <span className="R1">%</span>
                            </div>
                        </div>
                        <Slider
                            id= "slider"
                            size="small"
                            min={10}
                            max={60}
                            value={interest}
                            onChange={contributionChange} />
                    </Box>
                </label>
                <label>
                    <Box id="box" width={427} position={"relative"}>
                        <div className="titel-text">Срок лизинга</div>
                        <div className="wrapper-input">
                            <Controller
                                    control={control}
                                    name= "month"
                                    render={() => (
                                        <input
                                            type="number" 
                                            min="1" 
                                            max="60"
                                            value={month}
                                            onChange={(e) => setMonth(e.target.value)}
                                        />
                                        )}   
                            />
                            <div className="R">мес.</div>
                        </div>   
                        <Slider
                            id= "slider"
                            size="small"
                            min={1}
                            max={60}
                            value={month}
                            onChange={monthsChange}/>
                    </Box>
                </label>
            </form>
            <div className="wrapper-sum">
                <div>
                    <div className="titel-text">Сумма договора</div>
                    <div className="number">{sumTotal} ₽</div>
                </div>
                <div className="payment">
                    <div className="titel-text">Ежемесячный платеж</div>
                    <div className="number">{monthPay} ₽</div>
                </div>
                <Button variant="contained" id="button" onClick={() => postData(price, interest, month, monthPay, sumTotal)}>Отправить заявку</Button>
            </div>
        </div>
    )
}


export default Form;