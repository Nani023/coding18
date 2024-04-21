import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    inputText: '',
    dateInput: '',
    appointmentsList: [],
    isFilterActive: false,
  }

  onFilter = () => {
    const {isFilterActive} = this.state
    this.setState({
      isFilterActive: !isFilterActive,
    })
  }

  toggleIsStarred = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  onSubmitAppointment = event => {
    event.preventDefault()
    const {inputText, dateInput} = this.state
    const formattedDate = dateInput
      ? format(new Date(dateInput), 'dd,MM,yyyy, MMMM')
      : ' '
    const newAppointments = {
      id: uuidv4(),
      title: inputText,
      date: formattedDate,
      isStarred: false,
    }
    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointments],
      inputText: '',
      dateInput: '',
    }))
  }

  onChangeInput = event => {
    this.setState({inputText: event.target.value})
  }

  onChangeDateInput = event => {
    this.setState({dateInput: event.target.value})
  }

  getFilteredAppointmentList = () => {
    const {appointmentsList, isFilterActive} = this.state
    if (isFilterActive) {
      return appointmentsList.filter(
        eachTransaction => eachTransaction.isStarred === true,
      )
    }
    return appointmentsList
  }

  render() {
    const {inputText, dateInput, isFilterActive} = this.state
    const isFilterActives = isFilterActive ? 'filter-filled' : 'filter-empty'
    const filteredAppointmentList = this.getFilteredAppointmentList()
    return (
      <div className="app-container">
        <div className="appointment-container">
          <h1 className="appointment-heading"> Add Appointment</h1>
          <div className="form-container">
            <form className="form" onSubmit={this.onSubmitAppointment}>
              <p className="title">TITLE</p>
              <input
                type="text"
                placeholder="Title"
                className="text-input"
                onChange={this.onChangeInput}
                value={inputText}
              />
              <p className="date">DATE</p>
              <input
                type="date"
                placeholder="Date"
                className="date-input"
                onChange={this.onChangeDateInput}
                value={dateInput}
              />
              <button type="submit" className="add-button">
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png "
              className="appointments-image"
              alt="appointments"
            />
          </div>
          <hr className="line" />
          <div className="Appointments-container">
            <div className="container">
              <h1 className="header">Appointments</h1>
              <button
                className={`starred-button ${isFilterActives}`}
                type="button"
                onClick={this.onFilter}
              >
                starred
              </button>
            </div>
            <ul className="all-appointments-container">
              {filteredAppointmentList.map(eachAppointment => (
                <AppointmentItem
                  key={eachAppointment.id}
                  appointmentDetails={eachAppointment}
                  toggleIsStarred={this.toggleIsStarred}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
export default Appointments
