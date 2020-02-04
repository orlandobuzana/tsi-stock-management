import model from 'modules/product/productModel';
import React, { Component } from 'react';
import Spinner from 'view/shared/Spinner';
import ViewWrapper from 'view/shared/styles/ViewWrapper';
import TextViewItem from 'view/shared/view/TextViewItem';
import ImagesViewItem from 'view/shared/view/ImagesViewItem';
import LocationViewItem from 'view/location/view/LocationViewItem';

const { fields } = model;

class ProductView extends Component {
  renderView() {
    const { record } = this.props;

    return (
      <ViewWrapper>
        <TextViewItem
          label={fields.id.label}
          value={fields.id.forView(record.id)}
        />

        <LocationViewItem
          label={fields.productLocation.label}
          value={fields.productLocation.forView(record.productLocation)}
        />

        <TextViewItem
          label={fields.productName.label}
          value={fields.productName.forView(record.productName)}
        />

        <TextViewItem
          label={fields.productDescription.label}
          value={fields.productDescription.forView(record.productDescription)}
        />

        <TextViewItem
          label={fields.productNotes.label}
          value={fields.productNotes.forView(record.productNotes)}
        />

        <TextViewItem
          label={fields.productQt.label}
          value={fields.productQt.forView(record.productQt)}
        />

        <ImagesViewItem
          label={fields.productImg.label}
          value={fields.productImg.forView(record.productImg)}
        />

        <TextViewItem
          label={fields.productPrice.label}
          value={fields.productPrice.forView(record.productPrice)}
        />

        <TextViewItem
          label={fields.createdAt.label}
          value={fields.createdAt.forView(record.createdAt)}
        />

        <TextViewItem
          label={fields.updatedAt.label}
          value={fields.updatedAt.forView(record.updatedAt)}
        />
      </ViewWrapper>
    );
  }

  render() {
    const { record, loading } = this.props;

    if (loading || !record) {
      return <Spinner />;
    }

    return this.renderView();
  }
}

export default ProductView;
