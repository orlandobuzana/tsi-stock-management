import { Button, Col, Form, Row } from 'antd';
import { Formik } from 'formik';
import { i18n } from 'i18n';
import actions from 'modules/product/list/productListActions';
import selectors from 'modules/product/list/productListSelectors';
import model from 'modules/product/productModel';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import FilterWrapper, {
  formItemLayout,
} from 'view/shared/styles/FilterWrapper';
import FormFilterSchema from 'view/shared/form/formFilterSchema';
import InputFormItem from 'view/shared/form/items/InputFormItem';
import DatePickerRangeFormItem from 'view/shared/form/items/DatePickerRangeFormItem';
import InputRangeFormItem from 'view/shared/form/items/InputRangeFormItem';
import InputNumberRangeFormItem from 'view/shared/form/items/InputNumberRangeFormItem';
import LocationAutocompleteFormItem from 'view/location/autocomplete/LocationAutocompleteFormItem';

const { fields } = model;

const schema = new FormFilterSchema([
  fields.productLocation,
  fields.productName,
  fields.productDescription,
  fields.productNotes,
  fields.productQtRange,
  fields.productPriceRange,
]);

class ProductListFilter extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(actions.doFetch(this.initialFilter()));
  }

  initialFilter = () => {
    return schema.initialValues(
      this.props.filter,
      this.props.location,
    );
  };

  handleSubmit = (values) => {
    const valuesToSubmit = schema.cast(values);
    const { dispatch } = this.props;
    dispatch(actions.doFetch(valuesToSubmit));
  };

  handleReset = (form) => {
    form.setValues({});
    const { dispatch } = this.props;
    dispatch(actions.doReset());
  };

  render() {
    const { loading } = this.props;

    return (
      <FilterWrapper>
        <Formik
          initialValues={this.initialFilter()}
          validationSchema={schema.schema}
          onSubmit={this.handleSubmit}
          render={(form) => {
            return (
              <Form onSubmit={form.handleSubmit}>
                <Row gutter={24}>
                  <Col md={24} lg={12}>
                    <LocationAutocompleteFormItem
                      name={fields.productLocation.name}
                      label={fields.productLocation.label}
                      layout={formItemLayout}
                    />
                  </Col>
                  <Col md={24} lg={12}>
                    <InputFormItem
                      name={fields.productName.name}
                      label={fields.productName.label}
                      layout={formItemLayout}
                    />
                  </Col>
                  <Col md={24} lg={12}>
                    <InputFormItem
                      name={fields.productDescription.name}
                      label={fields.productDescription.label}
                      layout={formItemLayout}
                    />
                  </Col>
                  <Col md={24} lg={12}>
                    <InputFormItem
                      name={fields.productNotes.name}
                      label={fields.productNotes.label}
                      layout={formItemLayout}
                    />
                  </Col>
                  <Col md={24} lg={12}>
                    <InputNumberRangeFormItem
                      name={
                        fields.productQtRange.name
                      }
                      label={
                        fields.productQtRange.label
                      }
                      layout={formItemLayout}
                    />
                  </Col>
                  <Col md={24} lg={12}>
                    <InputRangeFormItem
                      name={fields.productPriceRange.name}
                      label={fields.productPriceRange.label}
                      layout={formItemLayout}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col className="filter-buttons" span={24}>
                    <Button
                      loading={loading}
                      icon="search"
                      type="primary"
                      htmlType="submit"
                    >
                      {i18n('common.search')}
                    </Button>
                    <Button
                      loading={loading}
                      onClick={() => this.handleReset(form)}
                      icon="undo"
                    >
                      {i18n('common.reset')}
                    </Button>
                  </Col>
                </Row>
              </Form>
            );
          }}
        />
      </FilterWrapper>
    );
  }
}

function select(state) {
  return {
    filter: selectors.selectFilter(state),
  };
}

export default withRouter(connect(select)(ProductListFilter));
