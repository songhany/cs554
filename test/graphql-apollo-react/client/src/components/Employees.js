import React, { useState } from 'react';
import './App.css';
import AddModal from './modals/AddModal';
import EditEmployeeModal from './modals/EditEmployeeModal';
import DeleteEmployeeModal from './modals/DeleteEmployeeModal';

import { useQuery } from '@apollo/client';
import queries from '../queries';

function Employees() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [deleteEmployee, setDeleteEmployee] = useState(null);
  const [editEmployee, setEditEmployee] = useState(null);

  
  const { loading, error, data } = useQuery(queries.GET_EMPLOYEES, {
    fetchPolicy: 'cache-and-network'
  });

  const handleOpenAddModal = () => {
    setShowAddModal(true);
  };

  const handleOpenDeleteModal = (employee) => {
    setShowDeleteModal(true);
    setDeleteEmployee(employee);
  };

  const handleOpenEditModal = (employee) => {
    setShowEditModal(true);
    setEditEmployee(employee);
  };

  // close Modals
  const handleCloseModals = () => {
    setShowEditModal(false);
    setShowDeleteModal(false);
    setShowAddModal(false);
  };


  if (data) {
    const { employees } = data;

    return (
      <div>
        <button className="button" onClick={handleOpenAddModal}>
          Create Employee
        </button>
        <br />
        <br />
        
        {employees.map((employee) => {
          return (
            <div className="card" key={employee.id}>
              <div className="card-body">
                <h5 className="card-title">
                  {employee.firstName} {employee.lastName}
                </h5>
                Employer: {employee.employer.name}
                <br />
                <button className="button" onClick={() => {handleOpenEditModal(employee);} }>
                  Edit
                </button>
                <button className="button" onClick={() => {handleOpenDeleteModal(employee);} }>
                  Delete
                </button>
                <br />
              </div>
            </div>
          );
        })}

        {/*Add Employee Modal */}
        {showAddModal && 
          <AddModal modal='addEmployee' isOpen={showAddModal} handleClose={handleCloseModals} />}

        {/*Delete Employee Modal */}
        {showDeleteModal && (
          <DeleteEmployeeModal isOpen={showDeleteModal} handleClose={handleCloseModals} deleteEmployee={deleteEmployee} />
        )}

        {/*Edit Employee Modal*/}
        {showEditModal && (
          <EditEmployeeModal isOpen={showEditModal} handleClose={handleCloseModals} employee={editEmployee} />
        )}
      </div>
    )
  } else if (loading) {
    return <div>loading...</div>
  } else if (error) {
    return <div>{error.message}</div>
  }

  return <div className='App'>Employees</div>;
}

export default Employees;
