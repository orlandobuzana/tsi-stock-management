import React, { Component } from 'react';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import PageTitle from 'view/shared/styles/PageTitle';
import Breadcrumb from 'view/shared/Breadcrumb';
import LocationForm from 'view/location/form/LocationForm';
import { i18n } from 'i18n';
import { getHistory } from 'modules/store';
import actions from 'modules/location/form/locationFormActions';
import selectors from 'modules/location/form/locationFormSelectors';
import { connect } from 'react-redux';

class LocationFormPage extends Component {
  state = {
    dispatched: false,
  };

  componentDidMount() {
    const { dispatch, match } = this.props;

    if (this.isEditing()) {
      dispatch(actions.doFind(match.params.id));
    } else {
      dispatch(actions.doNew());
    }

    this.setState({ dispatched: true });
  }

  doSubmit = (id, data) => {
    const { dispatch } = this.props;
    if (this.isEditing()) {
      dispatch(actions.doUpdate(id, data));
    } else {
      dispatch(actions.doCreate(data));
    }
  };

  isEditing = () => {
    const { match } = this.props;
    return !!match.params.id;
  };

  title = () => {
    return this.isEditing()
      ? i18n('entities.location.edit.title')
      : i18n('entities.location.new.title');
  };

  render() {
    return (
      <React.Fragment>
        <Breadcrumb
          items={[
            [i18n('home.menu'), '/'],
            [i18n('entities.location.menu'), '/location'],
            [this.title()],
          ]}
        />

        <ContentWrapper>
          <PageTitle>{this.title()}</PageTitle>

          {this.state.dispatched && (
            <LocationForm
              saveLoading={this.props.saveLoading}
              findLoading={this.props.findLoading}
              record={this.props.record}
              isEditing={this.isEditing()}
              onSubmit={this.doSubmit}
              onCancel={() => getHistory().push('/location')}
            />
          )}
        </ContentWrapper>
      </React.Fragment>
    );
  }
}

function select(state) {
  return {
    findLoading: selectors.selectFindLoading(state),
    saveLoading: selectors.selectSaveLoading(state),
    record: selectors.selectRecord(state),
  };
}

export default connect(select)(LocationFormPage);
