import React from 'react';
import Dialog from 'material-ui-old/Dialog';
import FlatButton from 'material-ui-old/FlatButton';
import Radium from 'radium';
import Checkbox from 'material-ui-old/Checkbox';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';

import EditPen from '../../../assets/edit.png';
import MUITextField from '../../components/MUITextField';
import styles from './editModalStyles';

const renderTextField = ({ input, label, meta: { touched, error }, ...rest }) => (
  <MUITextField
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...rest}
  />
);

const renderCheckbox = ({ input, label }) => (
  <Checkbox
    label={label}
    checked={!!input.value}
    onCheck={(e, checked) => input.onChange(checked)}
  />
);

const selector = formValueSelector('companyDetailsForm');
const mapStateToProps = (state, ownProps) => ({
  initialValues: ownProps.expert,
  officeVisit: selector(state, 'officeVisit'),
});

@connect(mapStateToProps)
@reduxForm({
  form: 'companyDetailsForm',
  destroyOnUnmount: false,
  enableReinitialize: true,
})
@Radium
export default class EditCompanyDetailsModal extends React.Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <a style={styles.link} label="Dialog" onTouchTap={this.handleOpen}>
          <img alt="edit" src={EditPen} style={styles.editPen} />
        </a>
        <Dialog
          modal={false}
          autoScrollBodyContent
          open={this.state.open}
          onRequestClose={this.handleClose}
          titleStyle={styles.noborder}
          actionsContainerStyle={styles.noborder}
        >

          <form onSubmit={this.props.handleSubmit}>
            <div>
              <Field
                name="company"
                label="Company name"
                component={renderTextField}
                id="companyName"
                floatingLabelFixed
              />

              <Field
                name="title"
                label="Title"
                component={renderTextField}
                id="title"
                floatingLabelFixed
              />

              <Field
                name="officeVisit"
                id="officeVisit"
                component={renderCheckbox}
                label="Office visit possible"
              />

              <p>
                Check this box if you agree that teachers can come to your office with
                a group of students
              </p>

              {
                this.props.officeVisit &&
                <Field
                  name="address"
                  label="Office address"
                  component={renderTextField}
                  id="officeAddress"
                  floatingLabelFixed
                />
              }
            </div>
            <FlatButton
              type="submit"
              label="Save"
              primary
              style={styles.button}
            />
            <FlatButton
              type="button"
              label="Cancel"
              primary
              onTouchTap={this.handleClose}
              style={styles.button}
            />
          </form>

        </Dialog>
      </div>
    );
  }
}
