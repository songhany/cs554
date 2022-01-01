import React, { useState } from 'react';
import '../App.css';
import ReactModal from 'react-modal';
import { useQuery, useMutation } from '@apollo/client';

//Import the file where my query constants are defined
import queries from '../../queries';

//For React-modal
ReactModal.setAppElement('#root');
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    border: '1px solid #28547a',
    borderRadius: '4px'
  }
};


function AddModal(props) {
  const [ showAddModal, setShowAddModal ] = useState(props.isOpen);

  const [ addEmployee ] = useMutation(queries.ADD_EMPLOYEE, {
    // ❤ without below part, it can add Employee successfully, but you have to refresh page to show data
    // with this part, you can see the data that you add immediately
    update(cache, { data: { addEmployee } }) {
      const { employees } = cache.readQuery({ query: queries.GET_EMPLOYEES });

      cache.writeQuery({
        query: queries.GET_EMPLOYEES,
        data: { employees: employees.concat([addEmployee]) }
      });
    }
  });

  const [ addEmployer ] = useMutation(queries.ADD_EMPLOYER, {
    update(cache, { data: { addEmployer } }) {
      const { employers } = cache.readQuery({
        query: queries.GET_EMPLOYERS_WITH_EMPLOYEES
      });

      cache.writeQuery({
        query: queries.GET_EMPLOYERS_WITH_EMPLOYEES,
        data: { employers: employers.concat([addEmployer]) }
      });
    }
  });


  const { loading, error, data } = useQuery(queries.GET_EMPLOYERS);

  const handleCloseAddModal = () => {
    setShowAddModal(false);
    props.handleClose();  // close Modal through handleCloseModals() in ./Employees.js
  };


  if (data) {
    var { employers } = data;
  }
  let body = null;
  if (props.modal === 'addEmployee') {
    //! render add Employee form
    let firstName;
    let lastName;
    let employerId;
    body = (  // form start
      <form className="form" id="add-employee" 
        onSubmit={(e)=>{
          e.preventDefault();
          addEmployee({
            variables: {
              firstName: firstName.value,
              lastName: lastName.value,
              employerId: parseInt(employerId.value)
            }
          });
          // reset all value
          firstName.value = ''
          lastName.value = ''
          employerId.value = '1'
          setShowAddModal(false);
          alert('Employee Added');
          props.handleClose();  // close Modal through handleCloseModals() in ./Employees.js
        }}
      > 

        <div className='form-group'>
          <label>
            First Name:
            <br />
            <input ref={(node)=>{
                firstName = node;
              }}
              required
              autoFocus={true}
            />
          </label>
        </div>
        <br />

        <div className='form-group'>
          <label>
            Last Name:
            <br />
            <input ref={(node)=>{lastName = node;}} required autoFocus={true} />
          </label>
        </div>

        <div className='form-group'>
          <label>
            Employer:
            <select className="form-control" ref={(node)=>{employerId = node;}}>
              {employers && employers.map((employer)=>{
                return (  // list option of employers
                  <option key={employer.id} value={employer.id}>
                    {employer.name}
                  </option>
                )
              })}
            </select>
          </label>
        </div>

        <br />
        <br />
        <button className="button add-button" type="submit">
          Add Employee
        </button>
      </form>  // form end
    );
  }
  
  else if (props.modal === 'addEmployer') {
    //! render add Employer form
    let name
    body = (
      <form className='form' id='add-employer'
        onSubmit={(e)=>{
          e.preventDefault();
          addEmployer({
            variables:{
              name: name.value
            }
          })
          name.value =''
          setShowAddModal(false)
          alert("Employer Added")
          props.handleClose()  // handleCloseModals() in ./Employers.js
        }}>

        <div className='form-group'>
          <label>
            Employer Name:
            <br />
            <input ref={(node)=>{name = node}} required autoFocus={true}/>
          </label>
        </div>

        <br/>
        <br/>
        <br/>
        <button className='button add-button' type='submit'>Add Employer</button>
      </form>
    )
  }

  return (
    <div>
      <ReactModal name='addModal' isOpen={showAddModal} contentLabel="Add Modal" style={customStyles}>
        {body}
        <button className='button cancel-button' onClick={handleCloseAddModal}>
          Cancel
        </button>
      </ReactModal>
    </div>
  );
}

export default AddModal;
