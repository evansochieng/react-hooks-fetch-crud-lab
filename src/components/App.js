import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  // Fetch data from the API, set state to the results
  useEffect( () => {
    fetch('http://localhost:4000/questions')
    .then(response => response.json())
    .then(data => setQuestions(data))
  }, [])

  // Update the questions list when a user submits a new question
  // Set state to the new question list 
  function addNewQuestion(question){
    const newQuestionList = [...questions, question];
    setQuestions(newQuestionList);
  }

  // Delete a question when the delete button is clicked
  // Filter out questions which doesn't match the id that has been passed
  const deleteQuestion = (id) => {
    const remeiningQuestions = questions.filter(question => question.id !== id)
    //persist change to the server
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'DELETE'
    });

    // Add delete functionality on button
    setQuestions(remeiningQuestions)
  }

  // Update a question's answer (correct answer)
  const updateQuestion = (id, rightIndex) => {
    // change the value of correctIndex key
    const updatedQuestions = questions.map( (question) => {
      if (question.id === id){
        return {...question, correctIndex: rightIndex}
      } else {
        return question
      }
    })
    console.log(updatedQuestions)
    //setQuestions(updatedQuestions)

    // Update the question on the server
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        correctIndex: rightIndex
      })
    })
    .then(resp => resp.json())
    .then(data => setQuestions(data))
    //.then(data => setQuestions(data))

    // Set state to the updated list
    //setQuestions(updatedQuestions)
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm addNewQuestion={addNewQuestion}/> : <QuestionList questions={questions} deleteQuestion={deleteQuestion} updateQuestion={updateQuestion}/>}
    </main>
  );
}

export default App;
