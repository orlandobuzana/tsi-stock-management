import { Button, Form } from 'antd';
import { Formik } from 'formik';
import { i18n } from 'i18n';
import model from 'modules/product/productModel';
import React, { Component } from 'react';
import ViewFormItem from 'view/shared/form/items/ViewFormItem';
import Spinner from 'view/shared/Spinner';
import FormWrapper, {
  tailFormItemLayout,
} from 'view/shared/styles/FormWrapper';
import FormSchema from 'view/shared/form/formSchema';
import InputFormItem from 'view/shared/form/items/InputFormItem';
import InputNumberFormItem from 'view/shared/form/items/InputNumberFormItem';
import ImagesFormItem from 'view/shared/form/items/ImagesFormItem';
import LocationAutocompleteFormItem from 'view/location/autocomplete/LocationAutocompleteFormItem';

const { fields } = model;

class ProductForm extends Component {
  schema = new FormSchema(fields.id, [
    fields.productLocation,
    fields.productName,
    fields.productDescription,
    fields.productNotes,
    fields.productQt,
    fields.productImg,
    fields.productPrice,
  ]);

  handleSubmit = (values) => {
    const { id, ...data } = this.schema.cast(values);
    this.props.onSubmit(id, data);
  };

  initialValues = () => {
    const record = this.props.record;
    return this.schema.initialValues(record || {});
  };

  renderForm() {
    const { saveLoading, isEditing } = this.props;

    return (
      <FormWrapper>
        <Formik
          initialValues={this.initialValues()}
          validationSchema={this.schema.schema}
          onSubmit={this.handleSubmit}
          render={(form) => {
            return (
              <Form onSubmit={form.handleSubmit}>
                {isEditing && (
                  <ViewFormItem
                    name={fields.id.name}
                    label={fields.id.label}
                  />
                )}

                <LocationAutocompleteFormItem
                  name={fields.productLocation.name}
                  label={fields.productLocation.label}
                  required={fields.productLocation.required}
                  showCreate={!this.props.modal}
                  form={form}
                />
                <InputFormItem
                  name={fields.productName.name}
                  label={fields.productName.label}
                  required={fields.productName.required}
                />
                <InputFormItem
                  name={fields.productDescription.name}
                  label={fields.productDescription.label}
                  required={fields.productDescription.required}
                />
                <InputFormItem
                  name={fields.productNotes.name}
                  label={fields.productNotes.label}
                  required={fields.productNotes.required}
                />
                <InputNumberFormItem
                  name={fields.productQt.name}
                  label={fields.productQt.label}
                  required={
                    fields.productQt.required
                  }
                />
                <ImagesFormItem
                  name={fields.productImg.name}
                  label={fields.productImg.label}
                  required={fields.productImg.required}
                  path={fields.productImg.path}
                  schema={{
                    size: fields.productImg.size,
                  }}
                  max={fields.productImg.max}
                />
                <InputFormItem
                  name={fields.productPrice.name}
                  label={fields.productPrice.label}
                  required={fields.productPrice.required}
                />

                <Form.Item
                  className="form-buttons"
                  {...tailFormItemLayout}
                >
                  <Button
                    loading={saveLoading}
                    type="primary"
                    onClick={form.handleSubmit}
                    icon="save"
                  >
                    {i18n('common.save')}
                  </Button>

                  <Button
                    disabled={saveLoading}
                    onClick={form.handleReset}
                    icon="undo"
                  >
                    {i18n('common.reset')}
                  </Button>

                  {this.props.onCancel ? (
                    <Button
                      disabled={saveLoading}
                      onClick={() => this.props.onCancel()}
                      icon="close"
                    >
                      {i18n('common.cancel')}
                    </Button>
                  ) : null}
                </Form.Item>
              </Form>
            );
          }}
        />
      </FormWrapper>
    );
  }

  render() {
    const { isEditing, findLoading, record } = this.props;

    if (findLoading) {
      return <Spinner />;
    }

    if (isEditing && !record) {
      return <Spinner />;
    }

    return this.renderForm();
  }
}

export default ProductForm;
