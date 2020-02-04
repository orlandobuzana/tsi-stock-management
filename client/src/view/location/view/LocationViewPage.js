import React, { Component } from 'react';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import PageTitle from 'view/shared/styles/PageTitle';
import Breadcrumb from 'view/shared/Breadcrumb';
import LocationView from 'view/location/view/LocationView';
import { i18n } from 'i18n';
import actions from 'modules/location/view/locationViewActions';
import { connect } from 'react-redux';
import selectors from 'modules/location/view/locationViewSelectors';
import LocationViewToolbar from 'view/location/view/LocationViewToolbar';

class LocationPage extends Component {
  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch(actions.doFind(match.params.id));
  }

  render() {
    return (
      <React.Fragment>
        <Breadcrumb
          items={[
            [i18n('home.menu'), '/'],
            [i18n('entities.location.menu'), '/location'],
            [i18n('entities.location.view.title')],
          ]}
        />

        <ContentWrapper>
          <PageTitle>
            {i18n('entities.location.view.title')}
          </PageTitle>

          <LocationViewToolbar match={this.props.match} />

          <LocationView
            loading={this.props.loading}
            record={this.props.record}
          />
        </ContentWrapper>
      </React.Fragment>
    );
  }
}

function select(state) {
  return {
    loading: selectors.selectLoading(state),
    record: selectors.selectRecord(state),
  };
}

export default connect(select)(LocationPage);
