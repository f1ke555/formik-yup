import {ErrorMessage, Field, Form, Formik, useField, useFormik} from "formik";
import * as Yup from 'yup'

const MyTextInput = ({label, ...props}) => {

    const [field, meta] = useField(props)
    return (
        <>
            <label htmlFor={props.name} >{label}</label>
            <input {...props} {...field}/>
            {meta.error && meta.touched ? (
                <div className='error'>{meta.error}</div>
            ) : null}

        </>
    )
}
const CustomForm = () => {

    return (
        <Formik
            initialValues={{
                    name: '',
                    email: '',
                    amount: 0,
                    text: '',
                    currency: '',
                    terms: false
            }}
            onSubmit={values => console.log(JSON.stringify(values, null, 2))}
            validationSchema = {Yup.object({
                name: Yup.string()
                    .min(2, 'Минимум 2 символа'),
                    email: Yup.string()
                    .email()
                    .required('Обязательное поле'),
                    amount: Yup.number()
                    .min(4)
                    .required('Обязательное поле'),
                    text: Yup.string()
                    .min(10, 'Минимум 2 символа'),
                    currency: Yup.string().required('Выберите валюту'),
                    terms: Yup.boolean()
                    .required('Необходимо согласие')
                    .oneOf([true], 'Необходимо согласие')
        })}>
                <Form className="form">
                    <h2>Отправить пожертвование</h2>
                    <MyTextInput
                        label='Ваше имя'
                        id="name"
                        name="name"
                        type="text"
                    />
                    <MyTextInput
                        label='Ваша почта'
                        id="email"
                        name="email"
                        type="email"
                    />
                    <MyTextInput
                        label='Количество'
                        id="amount"
                        name="amount"
                        type="number"
                    />
                    <label htmlFor="currency">Валюта</label>
                    <Field
                        id="currency"
                        name="currency"
                        as='select'>
                        <option value="">Выберите валюту</option>
                        <option value="USD">USD</option>
                        <option value="UAH">UAH</option>
                        <option value="RUB">RUB</option>
                    </Field>
                    <ErrorMessage className='error' name='currency' component='div'/>
                    <label htmlFor="text">Ваше сообщение</label>
                    <Field
                        id="text"
                        name="text"
                        as='textarea'
                    />
                    <ErrorMessage className='error' name='text' component='div'/>
                    <label className="checkbox">
                        <Field name="terms" type="checkbox"/>
                        Соглашаетесь с политикой конфиденциальности?
                    </label>
                    <ErrorMessage className='error' name='terms' component='div'/>
                    <button type="submit">Отправить</button>
                </Form>
        </Formik>
    )
}

export default CustomForm;