import React, { Component } from 'react';
import LocationListFilter from 'view/location/list/LocationListFilter';
import LocationListTable from 'view/location/list/LocationListTable';
import LocationListToolbar from 'view/location/list/LocationListToolbar';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import PageTitle from 'view/shared/styles/PageTitle';
import Breadcrumb from 'view/shared/Breadcrumb';
import { i18n } from 'i18n';

class LocationListPage extends Component {
  render() {
    return (
      <React.Fragment>
        <Breadcrumb
          items={[
            [i18n('home.menu'), '/'],
            [i18n('entities.location.menu')],
          ]}
        />

        <ContentWrapper>
          <PageTitle>
            {i18n('entities.location.list.title')}
          </PageTitle>

          <LocationListToolbar />
          <LocationListFilter />
          <LocationListTable />
        </ContentWrapper>
      </React.Fragment>
    );
  }
}

export default LocationListPage;
