import React from 'react';
import Radium from 'radium';
import {
  Card,
  CardHeader,
  CardText,
} from 'material-ui-old/Card';
import Avatar from 'material-ui-old/Avatar';
import FlatButton from 'material-ui-old/FlatButton';
import Checkbox from 'material-ui-old/Checkbox';
import Chip from 'material-ui-old/Chip';
import Dialog from 'material-ui-old/Dialog';
import CircularProgress from 'material-ui-old/CircularProgress';
import isArray from 'lodash/isArray';
import { connect } from 'react-redux';

import rest from '../utils/rest';

import XprtBackground from '../../assets/xprt-background.png';
import EditCompanyDetailsModal from './ProfileForm/EditCompanyDetailsModal';
import EditBasicInfoModal from './ProfileForm/EditBasicInfoModal';
import EditExpertDetailsModal from './ProfileForm/EditExpertModal';
import EditPictureModal from './ProfileForm/EditPictureModal';

import theme from '../utils/theme';

const styles = {
/*
These first element change the outlook
of the page overall
*/
  firstWrapper: {
    padding: '50px',
    color: theme.legacyPalette.textColor,
    backgroundImage: `url(${XprtBackground})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    textAlign: 'left',
  },
  secondWrapper: {
    boxShadow: '0 -20px 20px 0px #111',
    display: 'flex',
    flexDirection: 'row',
    color: theme.legacyPalette.textColor,
    background: '#262626',
    '@media (max-width: 900px)': {
      flexDirection: 'column',
    },
    mobileHide: {
      '@media (max-width: 900px)': {
        display: 'none',
      },
    },
  },
  profilePicture: {
    borderRadius: '50%',
    width: '150px',
    height: '150px',
  },
  /* Adds a little space between the end of the page and the last card */
  emptyFooter: {
    paddingBottom: '1px',
    background: '#262626',
  },
  // Admin user notification with red text
  adminText: {
    color: theme.legacyPalette.errorColor,
    fontSize: '16px',
    fontWeight: '300',
  },
  // Green titles for the page
  mainDivTextTitle: {
    color: theme.legacyPalette.primary1Color,
    fontSize: '16px',
    fontWeight: '300',
  },
  mainDivTextTitleSchool: {
    color: theme.legacyPalette.primary1Color,
    fontSize: '16px',
    fontWeight: '300',
    marginTop: '-15px',
    marginBottom: '-5px',
  },
  mainDivTextTitleLecture: {
    color: theme.legacyPalette.primary1Color,
    paddingTop: '15px',
    fontSize: '16px',
    fontWeight: '300',
    marginBottom: '-5px',
  },
  mainDivText: {
    color: theme.legacyPalette.textColor,
    fontSize: '16px',
    fontWeight: '300',
    marginTop: '-15px',
  },
/*
Next elements change the outlook of the left column.
*/
  leftDiv: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    paddingLeft: '25px',
    marginRight: 100,
    '@media (max-width: 900px)': {
      marginTop: 0,
      marginRight: 85,
    },
  },
  contentCardLeft: {
    width: '100%',
    background: 'rgba(68,68,68,1)',
    marginBottom: '2em',
    padding: '30px',
    boxShadow: '0px 2px 8px 1px rgba(0,0,0,0.16), 0 2px 8px 1px rgba(0,0,0,0.23)',
  },
  // My profile -title on the left
  mainDivTitle: {
    fontSize: '18px',
  },
  // Style for experts own subjects on left column
  chip: {
    margin: 4,
    backgroundColor: theme.legacyPalette.transparentColor,
    border: '1px solid #eab94e',
    padding: '1px',
    borderRadius: '20px',
    lineHeight: '0.4em',
  },
  // This wraps up subjects together next to each other
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
/*
Next elements change the outlook
of the right column.
*/
  contentCardRight: {
    width: '100%',
    background: 'rgba(68,68,68,1)',
    marginBottom: '1em',
    padding: '20px',
    boxShadow: '0px 2px 8px 1px rgba(0,0,0,0.16), 0 2px 8px 1px rgba(0,0,0,0.23)',
  },
  rightDivTitle: {
    fontSize: '18px',
    marginBottom: '18px',
  },
  rightDivTitleAccept: {
    color: theme.legacyPalette.primary1Color,
    fontSize: '18px',
  },
  rightDivTitleDecline: {
    opacity: '0.34',
    fontSize: '18px',
  },
// White headings
  mainDivTextBold: {
    color: theme.legacyPalette.textColor,
    fontSize: '18px',
    fontWeight: '450',
  },
  avatarStyle: {
    marginTop: '-10px',
  },
  // for decline/accept buttons
  buttonStyle: {
    // paddingTop: '25px',
    // paddingBottom: '27px',
    // paddingLeft: '20px',
    // paddingRight: '15px',
    borderRadius: '40px',
    // lineHeight: '0.4em',
    marginTop: '1em',
    fontSize: '18px',
  },
  // color and border for accept-button
  buttonGold: {
    border: '1px solid #CCCCCC',
    color: theme.legacyPalette.primary2Color,
  },
  buttonRed: {
    border: '1px solid #CCCCCC',
    color: theme.legacyPalette.errorColor,
  },
  ButtonAlignRight: {
    textAlign: 'right',
  },
// Yellow line for invitations that are not handled yet
  colorIndicatorYellow: {
    borderTop: 'solid',
    borderMargin: '#585858',
    borderOffset: { height: 10 },
    color: theme.legacyPalette.primary2Color,
  },
  // Green line for accpted invitations
  colorIndicatorGreen: {
    borderTop: 'solid',
    color: theme.legacyPalette.primary1Color,
  },
  rightDiv: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    marginRight: 25,
    '@media (max-width: 900px)': {
      marginTop: 0,
      marginLeft: 25,
    },
  },
  /*
Titlestyle & subtitleStyle are used to stylize
contentcards on the right side of page
*/
  titleStyle: {
    fontSize: '18px',
    color: theme.legacyPalette.textColor,
    fontWeight: '450',
  },
  subtitleStyle: {
    fontSize: '18px',
    textDecorationLine: 'underline',
    color: theme.legacyPalette.textColor,
    marginTop: '7px',
    fontWeight: '450',
  },
};


function LocationsList(props) {
  const locations = props.locations;
  if (!locations) {
    return null;
  }

  const length = locations.length;
  const list = locations.map((location, i) => {
    if (length === i + 1) {
      return <span key={location}>{location}</span>;
    }
    return <span key={location}>{location}, </span>;
  });
  return (
    <p style={styles.mainDivText}>{list}</p>
  );
}

function SubjectChips(props) {
  const subjects = props.subjects;
  if (!subjects) {
    return null;
  }
  if (!isArray(subjects)) {
    return subjects;
  }

  const list = subjects.map(subject =>
    <Chip key={subject} style={styles.chip}>{subject}</Chip>,
  );
  return (
    <div style={styles.wrapper}>{list}</div>
  );
}

function SubjectList(props) {
  const subjects = props.subjects;

  if (!subjects) {
    return <span>No subjects</span>;
  }

  if (!isArray(subjects)) {
    return <span>{subjects}</span>;
  }

  const length = subjects.length;
  const list = subjects.map((subject, i) => {
    if (length === i + 1) {
      return <span key={subject}>{subject}</span>;
    }
    return <span key={subject}>{subject}, </span>;
  });
  return (
    <span>{list}</span>
  );
}

function OfficeVisit(props) {
  if (!props.officeVisit) {
    return (
      <Checkbox label="Office visit possible" checked={false} disabled style={styles.checkbox} />
    );
  }
  return (
    <div>
      <p><Checkbox label="Office visit possible" checked disabled style={styles.checkbox} /></p>
      <p style={styles.mainDivTextTitle}>OFFICE ADDRESS:</p>
      <p style={styles.mainDivText}>{props.address}</p>
    </div>
  );
}

// makes dates be in format dd.mm.yyyy
function DateFormat(props) {
  const date = props.date;
  if (!date) {
    return <span>No date set</span>;
  }
  return <span>{new Date(date).toLocaleString()}</span>;
}

const mapStateToProps = state => ({
  profile: state.profile,
  lectures: state.expertLectures,
});

const mapDispatchToProps = dispatch => ({
  refresh() {
    dispatch(rest.actions.profile());
    dispatch(rest.actions.expertLectures());
  },
  editInvitation(lectureId, status, cb) {
    dispatch(rest.actions.invitations.patch({ lectureId }, { body: JSON.stringify(
      { status },
    ) }, cb));
  },
  editProfile(data, cb) {
    dispatch(rest.actions.profile.patch({}, {
      body: JSON.stringify(data),
    }, cb));
  },
});

@connect(mapStateToProps, mapDispatchToProps)
@Radium
export default class MyProfile extends React.Component {
  state = {
    selectedLecture: null,
    confirmationDialog: false,
  };

  componentDidMount() {
    this.props.refresh();
  }

  handleInvite = (id, status) => {
    this.props.editInvitation(id, status, () => {
      this.props.refresh();
    });
  };

  handleEdit = (values) => {
    this.props.editProfile(values, () => {
      this.props.refresh();
    });
  }

  render() {
    const expert = this.props.profile.data;
    const loading = this.props.profile.loading;
    const lectures = this.props.lectures.data;

    if (!expert || loading) {
      return (
        <div
          style={{
            textAlign: 'left',
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '200px',
          }}
        >
          <CircularProgress />
        </div>
      );
    }

    let invitations = lectures.filter((lecture) => {
      const status = lecture.status.toLowerCase();

      return status === 'pending';
    });

    let accepted = lectures.filter((lecture) => {
      const status = lecture.status.toLowerCase();

      return status === 'accepted';
    });

    let declined = lectures.filter((lecture) => {
      const status = lecture.status.toLowerCase();

      return status === 'declined';
    });

    invitations = invitations.map(lecture => (
      <Card
        key={lecture.id}
        style={{
          ...styles.contentCardRight,
          /*
            The next style attribute creates the yellow line
            at the top of the contentCard
          */
          ...styles.colorIndicatorYellow,
        }}
      >
        <CardHeader
          title={lecture.name}
          subtitle={lecture.lecturetheme}
          titleStyle={{
            ...styles.titleStyle,
          }}
          subtitleStyle={{
            ...styles.subtitleStyle,
          }}
          avatar={
            <Avatar
              src={lecture.expertImageUrl}
              size={60}
              style={styles.avatarStyle}
            />
          }
          actAsExpander
          showExpandableButton
        />
        <CardText expandable>
          <p style={styles.mainDivTextTitleSchool}>SCHOOL:</p>
          <p style={styles.mainDivTextBold}>Teacher:</p>
          <p style={styles.mainDivText}>{lecture.name}</p>
          <p style={styles.mainDivTextBold}>School name:</p>
          <p style={styles.mainDivText}>{lecture.school}</p>
          <p style={styles.mainDivTextBold}>Educational stage:</p>
          <p style={styles.mainDivText}>{lecture.educationalstage}</p>
          <p style={styles.mainDivTextTitleLecture}>LECTURE:</p>
          <p style={styles.mainDivTextBold}>Lecture title:</p>
          <p style={styles.mainDivText}>{lecture.lecturetheme}</p>
          <p style={styles.mainDivTextBold}>Short description of the lecture:</p>
          <p style={styles.mainDivText}>{lecture.description}</p>
          <p style={styles.mainDivTextBold}>Subjects:</p>
          <p style={styles.mainDivText}><SubjectList subjects={lecture.subjects} /></p>
          <p style={styles.mainDivTextBold}>Date:</p>
          <p style={styles.mainDivText}><DateFormat date={lecture.dateOption1} /></p>
          <p style={styles.mainDivTextBold}>Location:</p>
          <p style={styles.mainDivText}>{lecture.location}</p>
          <p style={styles.mainDivTextBold}>Teacher email:</p>
          <p style={styles.mainDivText}>{lecture.email}</p>
          <p style={styles.mainDivTextBold}>Teacher phone:</p>
          <p style={styles.mainDivText}>{lecture.phone}</p>
          <div style={styles.ButtonAlignRight}>
            <FlatButton
              onTouchTap={() => this.handleInvite(lecture.id, 'declined')}
              label="DECLINE"
              style={{
                ...styles.buttonStyle,
              }}
            />
            <FlatButton
              onTouchTap={() => this.handleInvite(lecture.id, 'accepted')}
              label="ACCEPT"
              style={{
                ...styles.buttonStyle,
                ...styles.buttonGold,
              }}
            />
          </div>
        </CardText>
      </Card>
    ));

    if (!invitations.length) {
      invitations = (
        <Card
          style={{
            ...styles.contentCardRight,
              /*
                The next style attribute creates the yellow line
                at the top of the contentCard
              */
            ...styles.colorIndicatorYellow,
          }}
        >
          <CardText>
            No new invitations
          </CardText>
        </Card>
      );
    }

    accepted = accepted.map(lecture => (
      <Card
        key={lecture.id}
        style={{
          ...styles.contentCardRight,
          ...styles.colorIndicatorGreen,
        }}
      >
        <CardHeader
          title={lecture.name}
          subtitle={lecture.lecturetheme}
          titleStyle={{
            ...styles.titleStyle,
          }}
          subtitleStyle={{
            ...styles.subtitleStyle,
          }}
          avatar={
            <Avatar
              src={lecture.expertImageUrl}
              size={60}
              style={styles.avatarStyle}
            />
          }
          actAsExpander
          showExpandableButton
        />
        <CardText expandable>
          <p style={styles.mainDivTextTitleSchool}>SCHOOL:</p>
          <p style={styles.mainDivTextBold}>Teacher:</p>
          <p style={styles.mainDivText}>{lecture.name} ({lecture.email})</p>
          <p style={styles.mainDivTextBold}>School name:</p>
          <p style={styles.mainDivText}>{lecture.school}</p>
          <p style={styles.mainDivTextBold}>Educational stage:</p>
          <p style={styles.mainDivText}>{lecture.educationalstage}</p>
          <p style={styles.mainDivTextTitleLecture}>LECTURE:</p>
          <p style={styles.mainDivTextBold}>Lecture title:</p>
          <p style={styles.mainDivText}>{lecture.lecturetheme}</p>
          <p style={styles.mainDivTextBold}>Subjects:</p>
          <p style={styles.mainDivText}><SubjectList subjects={lecture.subjects} /></p>
          <p style={styles.mainDivTextBold}>Date:</p>
          <p style={styles.mainDivText}><DateFormat date={lecture.dateOption1} /></p>
          <p style={styles.mainDivTextBold}>Location:</p>
          <p style={styles.mainDivText}>{lecture.location}</p>
          <p style={styles.mainDivTextBold}>Short description of the lecture:</p>
          <p style={styles.mainDivText}>{lecture.description}</p>
          <p style={styles.mainDivTextBold}>Teacher email:</p>
          <p style={styles.mainDivText}>{lecture.email}</p>
          <p style={styles.mainDivTextBold}>Teacher phone:</p>
          <p style={styles.mainDivText}>{lecture.phone}</p>
          <div style={styles.ButtonAlignRight}>
            <FlatButton
              onTouchTap={() => this.setState({
                selectedLecture: lecture,
                confirmationDialog: true,
              })}
              label="DECLINE"
              style={{
                ...styles.buttonStyle,
                ...styles.buttonRed,
              }}
            />
          </div>
        </CardText>
      </Card>
    ));

    if (!accepted.length) {
      accepted = (
        <Card
          style={{
            ...styles.contentCardRight,
              /*
                The next style attribute creates the green line
                at the top of the contentCard
              */
            ...styles.colorIndicatorGreen,
          }}
        >
          <CardText>
            No upcoming lectures
          </CardText>
        </Card>
      );
    }

    declined = declined.map(lecture => (
      <Card
        key={lecture.id}
        style={styles.contentCardRight}
      >
        <CardHeader
          title={lecture.name}
          subtitle={lecture.lecturetheme}
          titleStyle={{
            ...styles.titleStyle,
          }}
          subtitleStyle={{
            ...styles.subtitleStyle,
          }}
          avatar={
            <Avatar
              src={lecture.expertImageUrl}
              size={60}
              style={styles.avatarStyle}
            />
          }
          actAsExpander
          showExpandableButton
        />
        <CardText expandable>
          <p style={styles.mainDivTextTitleSchool}>SCHOOL:</p>
          <p style={styles.mainDivTextBold}>Teacher:</p>
          <p style={styles.mainDivText}>{lecture.name} ({lecture.email})</p>
          <p style={styles.mainDivTextBold}>School name:</p>
          <p style={styles.mainDivText}>{lecture.school}</p>
          <p style={styles.mainDivTextBold}>Educational stage:</p>
          <p style={styles.mainDivText}>{lecture.educationalstage}</p>
          <p style={styles.mainDivTextTitleLecture}>LECTURE:</p>
          <p style={styles.mainDivTextBold}>Lecture title:</p>
          <p style={styles.mainDivText}>{lecture.lecturetheme}</p>
          <p style={styles.mainDivTextBold}>Subjects:</p>
          <p style={styles.mainDivText}><SubjectList subjects={lecture.subjects} /></p>
          <p style={styles.mainDivTextBold}>Date:</p>
          <p style={styles.mainDivText}><DateFormat date={lecture.dateOption1} /></p>
          <p style={styles.mainDivTextBold}>Location:</p>
          <p style={styles.mainDivText}>{lecture.location}</p>
          <p style={styles.mainDivTextBold}>Short description of the lecture:</p>
          <p style={styles.mainDivText}>{lecture.description}</p>
          <p style={styles.mainDivTextBold}>Teacher email:</p>
          <p style={styles.mainDivText}>{lecture.email}</p>
          <p style={styles.mainDivTextBold}>Teacher phone:</p>
          <p style={styles.mainDivText}>{lecture.phone}</p>
        </CardText>
      </Card>
    ));

    if (!declined.length) {
      declined = (
        <Card style={styles.contentCardRight}>
          <CardText>
            No declined lectures
          </CardText>
        </Card>
      );
    }

    return (
      <div>
        <Dialog
          title="Are you sure you wish to decline the accepted lecture?"
          actions={
            <div>
              <FlatButton
                label="Cancel"
                primary
                keyboardFocused
                onTouchTap={() => this.setState({ confirmationDialog: false })}
              />
              <FlatButton
                label="Decline"
                primary
                onTouchTap={() => {
                  this.setState({ confirmationDialog: false });
                  this.handleInvite(this.state.selectedLecture.id, 'declined');
                }}
              />
            </div>
          }
          modal={false}
          open={this.state.confirmationDialog}
          onRequestClose={() => this.setState({ confirmationDialog: false })}
        >
          The lecture will be declined, and {this.state.selectedLecture &&
          this.state.selectedLecture.name} will receive an e-mail about the declined lecture. Note
          that this action is permanent and cannot be undone.
        </Dialog>
        <div style={styles.firstWrapper}>
          <img
            alt="Expert profile"
            src={`${expert.imageUrl}?${new Date().getTime()}`}
            style={styles.profilePicture}
          />
          <EditPictureModal doEdit={this.props.doEdit} />
        </div>

        <div style={styles.secondWrapper}>
          <div style={styles.leftDiv}>
            <p style={styles.mainDivTitle}>MY PROFILE</p>
            {/* start of left column */}
            {/* Next div contains Basic info, like name*/}
            <div style={styles.contentCardLeft}>
              {/* This modal opens up editing window of profile's basic info*/}
              <EditBasicInfoModal onSubmit={this.handleEdit} expert={expert} />
              {expert.scope === 'admin' && <p style={styles.adminText}>ADMIN USER</p>}
              <p style={styles.mainDivTextTitle}>NAME:</p>
              <p style={styles.mainDivText}>{expert.name}</p>
              <p style={styles.mainDivTextTitle}>PHONE:</p>
              <p style={styles.mainDivText}>{expert.phone}</p>
              <p style={styles.mainDivTextTitle}>E-MAIL:</p>
              <p style={styles.mainDivText}>{expert.email}</p>
              <p style={styles.mainDivTextTitle}>SUPPORTED LOCATIONS:</p>
              <LocationsList locations={expert.area} />
            </div>
            {/* next div contains company info */}
            <div style={styles.contentCardLeft}>
              {/* Opens editing modal*/}
              <EditCompanyDetailsModal onSubmit={this.handleEdit} expert={expert} />
              <p style={styles.mainDivTextTitle}>COMPANY NAME:</p>
              <p style={styles.mainDivText}>{expert.company}</p>
              <p style={styles.mainDivTextTitle}>JOB TITLE:</p>
              <p style={styles.mainDivText}>{expert.title}</p>

              <OfficeVisit officeVisit={expert.officeVisit} address={expert.address} />

            </div>
            {/* Contains short introductions, label, etc. */}
            <div style={styles.contentCardLeft}>
              {/* Opens editing modal*/}
              <EditExpertDetailsModal onSubmit={this.handleEdit} expert={expert} />
              <p style={styles.mainDivTextTitle}>SHORT INTRODUCTION:</p>
              <p style={styles.mainDivText}>{expert.description}</p>
              <p style={styles.mainDivTextTitle}>SUBJECTS:</p>
              {/* Next div wraps subjects chips close todether*/}
              <SubjectChips subjects={expert.subjects} />
              <p style={styles.mainDivTextTitle}>LECTURE PREFERENCES:
              </p>
              <p style={styles.mainDivText}>{expert.details}</p>
            </div>
            {/* End of left column*/}
          </div>

          {/* Start of right column*/}
          <div style={styles.rightDiv}>
            <p style={styles.rightDivTitle}>INVITATIONS</p>
            {invitations}

            <p style={styles.rightDivTitleAccept}>UPCOMING</p>
            {accepted}

            <p style={styles.rightDivTitleDecline}>DECLINED</p>
            {declined}
            {/* Adds a little space between the end of the page and the last card */}
            <div style={styles.emptyFooter} />
          </div>
        </div>

      </div>
    );
  }
}
