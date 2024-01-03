import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import '../../style/feedback.css';

interface FeedbackState {
  text: string;
}

function Feedback() {
  const initialState: FeedbackState = { text: '' };
  const [textarea, setTextArea] = useState<FeedbackState>(initialState);
  const [isMessage, setIsMessage] = useState<boolean>(false);

  useEffect(() => {
    // Get state from local storage on component mount
    const storedState: string | null = localStorage.getItem('feedbackTextarea');
    if (storedState) {
      setTextArea(JSON.parse(storedState));
    }
  }, []);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const name: string = e.target.name;
    const value: string = e.target.value;
    setTextArea((values) => ({ ...values, [name]: value }));
    setIsMessage(false);
  };

  const handleSubmit =  (e: FormEvent) => {
    e.preventDefault();

    
      if (textarea.text.trim() === '') {
        setIsMessage(!isMessage);
      } else {
        // Log the inputs object
       
        // Handle the response as needed
    
        window.alert('Your feedback is successfully added');

        // Clear the text field
        setTextArea(initialState);

        // Save state to local storage after successful submission
        localStorage.setItem('feedbackTextarea', JSON.stringify(initialState));
      }}
    
    

  return (
    <div className='textArea'>
      <h2>Feedback</h2>
      <p className='feedback-p'>
        Your feedback regarding the e-attendance system is very needful. It will make us improve the system's functionality and give you a better experience.
      </p>
      <form onSubmit={handleSubmit}>
        <label htmlFor='text'>Feedback:</label>
        <textarea
          id='text'
          name='text'
          rows={6}
          cols={8}
          placeholder='Tell us your experience ...'
          value={textarea.text}
          onChange={handleChange}
        ></textarea>
        {isMessage && <p style={{ color: 'red', fontSize: '0.8rem' }}>Text area is empty</p>}

        <button type='submit'>Send</button>
      </form>
    </div>
  );
}

export default Feedback;
