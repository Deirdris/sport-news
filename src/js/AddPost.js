import {
    Formik,
    Form,
    useField,
    Field,
    FieldConfig, ErrorMessage
} from 'formik';
import * as Yup from "yup";
import '../styles/form.scss';
import axios from "axios";
import {useHistory} from "react-router-dom";
function AddPost() {
    const history = useHistory();
    return(
        <main className="auth">
            <Formik
                initialValues={{title: '', body: ''}}
                validationSchema={Yup.object({
                    title: Yup.string()
                        .required('Podaj tytuł posta'),
                    body: Yup.string().required('Podaj treść posta'),
                })}
                onSubmit={async (values, {setSubmitting}) => {
                    const post = {title: values.title, body: values.body, userId: 1};
                    const result =  await axios.post('https://jsonplaceholder.typicode.com/posts', post);
                    console.log(result)
                    setSubmitting(false);
                    history.replace('/');
                }}
            >
                <Form className="auth-window">
                    <div className="auth-name form-name">Formularz dodawania posta</div>
                    <div className="group">
                        <label className="auth-label" htmlFor="title">Tytuł</label>
                        <Field className="auth-input" name="title" type="text"/>
                        <ErrorMessage name="title" component="div" className="error"/>
                    </div>
                    <div className="group">
                        <label className="auth-label" htmlFor="body">Treść</label>
                        <Field  className="auth-input" name="body" as="textarea" cols="40" rows="8"/>
                        <ErrorMessage name="body" component="div" className="error"/>
                    </div>
                    <input type="submit" className="btn btn-outline-orangered add" value="Dodaj post" />
                </Form>
            </Formik>
        </main>
    );
}

export default AddPost;