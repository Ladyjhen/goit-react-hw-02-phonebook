import { Component } from "react";
import {nanoid} from "nanoid";
import css from "./ContactForm.module.css";
import PropTypes from "prop-types";

export class ContactForm extends Component {
  static propTypes = {
    addContact: PropTypes.func.isRequired,
    contacts: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            number: PropTypes.string.isRequired,
        })
    ),
  };

  state = {
    name: '',
    number: '',
  };

  handleNameChange = e => {
    // code to handle name input
    this.setState({
        name: e.target.value,
    });
    console.log(this.state.name);
  };

  handleNumberChange = e => {
    // code to handle number input
    this.setState({
        number: e.target.value,
    });
  };

  handleSubmit = e => {
    // code to handle submit
    e.preventDefault();
    const {name, number} = this.state;
    const {addContact, contacts} = this.props;

    // if name or number is blank, will not submit
    if (name.trim() === '' || number.trim() === '') {
        return;
    }

    // check if name exist in contact list, will not submit
    const nameExist = contacts.find(
        contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (nameExist) {
        alert(`${name} already exists in contacts!`);
        return;
    }

    // add contact, will submit
    addContact({
        id: nanoid(),
        name: name.trim(),
        number: number.trim(),
    });

    // reset state upon submitting
    this.setState({
        name: '',
        number: '',
    });

  };

  render () {
    const {name, number} = this.state;
    return (
        <form className={css.form} onSubmit={this.handleSubmit}>
        <label className={css.formField}>
          <p className={css.formLabel}>Name</p>
          <input
            type="text"
            name="name"
            // add \ before - in [' \-] to make it work (LMS)
            pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan."
            required
            value={name}
            onChange={this.handleNameChange}
          />
        </label>

        <label className={css.formField}>
          <p className={css.formLabel}>Number</p>
          <input
            type="tel"
            name="number"
            // add \ before - in [\-.\s] to make it work (LMS)
            pattern="\+?\d{1,4}?[\-.\s]?\(?\d{1,3}?\)?[\-.\s]?\d{1,4}[\-.\s]?\d{1,4}[\-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={number}
            onChange={this.handleNumberChange}
          />
        </label>
        <button className={css.formButton} type="submit">
          Add Contact
        </button>
      </form>
    );
  }
}