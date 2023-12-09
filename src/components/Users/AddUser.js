import React, { useState, useRef } from 'react';
import ErrorModal from '../UI/ErrorModal';
import Card from '../UI/Card';
import classes from './AddUser.module.css';
import Wrapper from '../Helpers/Wrapper';

const AddUser = (props) => {
     const nameInputRef = useRef();
     const ageInputRef = useRef();
     const collegeNameInputRef = useRef();
     const [error, setError] = useState();

     const addUserHandler = (event) => {
          event.preventDefault();
          const enteredName = nameInputRef.current.value;
          const enteredUserAge = ageInputRef.current.value;
          const enteredUserCollegeName = collegeNameInputRef.current.value;
          if (enteredName.trim().length === 0 || enteredUserAge.trim().length === 0) {
               setError({
                    title: 'Invalid input',
                    message: 'Please enter a valid name and age (non-empty values).'
               });
               return;
          };

          if (+enteredUserAge < 1) {
               setError({
                    title: 'Invalid age',
                    message: 'Please enter a valid age (> 0).'
               });
               return;
          };
          props.onAddUser(enteredName, enteredUserAge, enteredUserCollegeName);
          nameInputRef.current.value = '';
          ageInputRef.current.value = '';
          collegeNameInputRef.current.value = '';
     };

     const errorHandler = () => {
          setError(null);
     };

     return (
          <Wrapper>
               {error &&
                    <ErrorModal
                         title={error.title}
                         message={error.message}
                         onConfirm={errorHandler}
                    />
               }
               <Card className={classes.input}>
                    <form onSubmit={addUserHandler}>
                         <label htmlFor="username">Username</label>
                         <input id="username" type="text" ref={nameInputRef} />
                         <label htmlFor="age">Age (Years)</label>
                         <input id="age" type="number" ref={ageInputRef} />
                         <label htmlFor='collegeName'>College Name</label>
                         <input id="collegeName" type="text" ref={collegeNameInputRef} />
                         <button type="submit">Add User</button>
                    </form>
               </Card>
          </Wrapper>
     );
};

export default AddUser;