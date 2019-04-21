import React from 'react';
import Header from '../Header';
import { Form, Field } from 'react-final-form'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const onSubmit = async values => {
  await sleep(300);
  window.alert(JSON.stringify(values, 0, 2));
};

const required = value => (value ? undefined : "Required");

const handleOnChange = ({onBlur, onChange}, event) => {
	onChange(event);
	onBlur(event);
  }

export default class CustomForm extends React.Component {
	
	render() {
		return (
			<div>
				<Form 
				validateOnBlur
				onSubmit={onSubmit}
				render={({ handleSubmit, reset, submitting, pristine, values }) => (
				<form onSubmit={handleSubmit}>

            <Field
              name='bug'
              validate={required}
              >
            {({ input, meta }) => (
              <div>
                <label>Checkbox</label>
                <input {...input} type="checkbox" />
                {meta.error && meta.touched && <span>{meta.error}</span>}
              </div>
            )}
            </Field>
            <Field
              name='workaround'
              validate={required}
            >
              {({ input, meta }) => (
                <div>
                  <label>Workaround</label>
                  <input onChange={(ev) => handleOnChange(input, ev)} type="checkbox" />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
            
          <div className="buttons">
            <button type="submit" disabled={submitting}>
              Submit
            </button>
            <button
              type="button"
              onClick={reset}
              disabled={submitting || pristine}
            >
              Reset
            </button>
          </div>
          <pre>{JSON.stringify(values, 0, 2)}</pre>
        </form> )}
		  />
			</div>
		);
	}
}