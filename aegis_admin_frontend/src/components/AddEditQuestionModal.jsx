import React, { useState, useEffect } from 'react';

export default function AddEditQuestionModal({ question, onClose, onSubmit }) {
  const [questionText, setQuestionText] = useState('');
  const [options, setOptions] = useState(['', '', '', '']); // Default 4 options
  const [correctAnswer, setCorrectAnswer] = useState(0);

  useEffect(() => {
    if (question) {
      setQuestionText(question.question_text);
      setOptions(question.options);
      setCorrectAnswer(question.correct_answer + 1); // Adjust for human-readable index
    } else {
      setQuestionText('');
      setOptions(['', '', '', '']);
      setCorrectAnswer(1);
    }
  }, [question]);

  const handleSave = () => {
    if (!questionText || options.some(opt => !opt) || !correctAnswer) {
      alert('All fields are required.');
      return;
    }

    const updatedQuestion = {
      ...question,
      question_text: questionText,
      options,
      correct_answer: correctAnswer - 1, // Convert back to 0-based index
    };
    onSubmit(updatedQuestion);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">{question ? 'Edit Question' : 'Add Question'}</h2>
        <div className="mb-4">
          <label htmlFor="questionText" className="block text-gray-700 font-semibold mb-2">
            Question Text
          </label>
          <input
            type="text"
            id="questionText"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Options</label>
          {options.map((option, index) => (
            <input
              key={index}
              type="text"
              value={option}
              onChange={(e) => {
                const newOptions = [...options];
                newOptions[index] = e.target.value;
                setOptions(newOptions);
              }}
              placeholder={`Option ${index + 1}`}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
            />
          ))}
        </div>
        <div className="mb-4">
          <label htmlFor="correctAnswer" className="block text-gray-700 font-semibold mb-2">
            Correct Answer (1-{options.length})
          </label>
          <input
            type="number"
            id="correctAnswer"
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(Number(e.target.value))}
            min="1"
            max={options.length}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex justify-between">
          <button
            className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className="bg-gray-500 text-white rounded-lg px-4 py-2 hover:bg-gray-600"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
