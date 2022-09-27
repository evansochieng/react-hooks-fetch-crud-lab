import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({questions}) {
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {/* display QuestionItem components here after fetching */}
        {questions.map( (question) => <QuestionItem question={question}/>)}
      </ul>
    </section>
  );
}

export default QuestionList;
