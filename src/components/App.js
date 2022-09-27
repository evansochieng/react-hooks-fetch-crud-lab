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

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm addNewQuestion={addNewQuestion}/> : <QuestionList questions={questions}/>}
    </main>
  );
}

export default App;
