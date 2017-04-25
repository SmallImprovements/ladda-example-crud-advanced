import { Component } from 'react';
import { flow, map } from 'lodash';
import { Card } from 'components/Layout';
import Avatar from 'components/ui/Avatar';
import ContactEditForm from 'components/ContactEditForm';
import { withData } from 'ladda-react';
import withOwnerId from 'hocs/withOwnerId';

import api from 'api';

import styles from './styles.scss';

class ContactList extends Component {
  constructor(props) {
    super(props);
    this.state = { inEditMode: {} };
  }

  setEditMode(id, nextState) {
    this.setState((prevState) => ({
      ...prevState,
      inEditMode: {
        ...prevState.inEditMode,
        [id]: nextState
      }
    }));
  }

  render() {
    const { contacts } = this.props;
    const { inEditMode } = this.state;
    return (
      <div>
        { map(contacts, (contact) => (
          <Contact
            key={ contact.id }
            contact={ contact }
            inEditMode={ inEditMode[contact.id] }
            onEnterEditMode={ () => this.setEditMode(contact.id, true) }
            onLeaveEditMode={ () => this.setEditMode(contact.id, false) }
         />
        ))}
      </div>
    );
  }
}

function Contact({ contact, inEditMode, onEnterEditMode, onLeaveEditMode }) {
  if (inEditMode) {
    const onSave = (updatedContact) => {
      return api.contacts.updateContact({
        ...contact,
        ...updatedContact
      }).then(() => onLeaveEditMode());
    };

    const onRemove = () => api.contacts.deleteContact(contact.id).then(() => onLeaveEditMode());

    return (
      <ContactEditForm
        contact={ contact }
        onSave={ onSave }
        onRemove={ onRemove }
        onCancel={ onLeaveEditMode }
      />
    );
  }

  return (
    <Card className={ styles.contact } onClick={ onEnterEditMode }>
      <Avatar src={ contact.avatar } size="50" />
      <div className={ styles.details }>
        <div className={ styles.name }>{ contact.name }</div>
        <div className={ styles.email }>{ contact.email }</div>
      </div>
    </Card>
  );
}

export default flow(withData({
  observe: {
    contacts: ({ ownerId }) => api.contacts.getContacts.createObservable(ownerId)
  }
}), withOwnerId)(ContactList);
