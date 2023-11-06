import { ChangeEvent, useEffect, useState } from 'react'
import axios from 'axios'

export default function Quiz() {
    const [formdata, setFormData] = useState({ id: '', theme: '', question: '' })
    const [quiz, setQuiz] = useState([])
    const [affichage, setAffichage] = useState(false)

    const handleChangeData = (e) => {
        setFormData((data) => ({ ...data, [e.target.name]: e.target.value }))
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
console.log(formdata)
        axios.put(`http://localhost:8000/question/${formdata.id}`,formdata)

    }

    const recup = async () => {
        await axios.get('http://localhost:8000/question/').then((res) => {
            console.log(res)
            setQuiz(res.data)
            setAffichage(true)
        })
    }
    useEffect(() => {
        recup()
    }, [])
    const supprimerQuestion = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/question/${id}`);
            recup(); // Rafraîchir la liste des questions après la suppression
        } catch (error) {
            console.error("Erreur lors de la suppression de la question : ", error);
        }
    }
 
    return (
        <div>
            <h1>Quiz</h1>
            {affichage ? (
                quiz.map((question) => (
                    <div>
                        <fieldset>
                            <p>id: {question.id}</p>
                            <p> Theme: {question.theme}</p>
                            <p> Question: {question.question}</p>
                            
                        </fieldset>
                    </div>
                ))
            ) : (
                <p>Chargement...</p>
            )}
            <div>
            <form onSubmit={handleSubmit} >
                    <input
                        onChange={handleChangeData}
                        type='text'
                        name='id'
                        placeholder='choose and id'
                    />
                    <input
                        onChange={handleChangeData}
                        type='text'
                        name='theme'
                        placeholder='choose a subject'
                    />
                    <input
                        onChange={handleChangeData}
                        type='text'
                        name='question'
                        placeholder='choose a question'
                    />
                        <button type='submit'> Submit form</button>
                </form>
            </div>
        </div>
    )
}










































/*import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Quiz() {
    const [quiz, setQuiz] = useState([])
    const [affichage, setAffichage] = useState(false)

        const recup = async () => {
                    await axios.get('http://localhost:8000/question/')
                    .then(res => {
                        console.log(res)
                        setQuiz(res.data)
                        setAffichage(true)
                    })
                }
    useEffect(() => {
        recup()
    },[])


  
            return (
                <div>
                    <h1>
                        Quiz
                    </h1>
                    {affichage ?
                    quiz.map(question => (
                        <div>
                            <fieldset>
                                <p>id: {question.id}</p>
                                <p> Theme: {question.theme}</p>
                                <p> Question: {question.question}</p>
                            </fieldset>
                        </div>
                    ))




            :<p>Chargement...</p>}
                <div>
                    <form>
                        <input type="text" id="name" name="choose and id" />
                        <input type="text" id="name" name="choose a subject" />
                        <input type="text" id="name" name="choose a question" />
                        <input type="submit" id="name" alt="Send"/> 
                    </form>
                </div>

        </div>
    )
}*/


