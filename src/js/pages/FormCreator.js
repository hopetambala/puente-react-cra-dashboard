import React, { useState, useEffect } from 'react';
import { Form, Field } from 'react-final-form';

//Parse
import { postObjectsToClass } from '../providers/ParseProvider'

//Redux
import { connect } from "react-redux";
import { getAuthInfo } from '../reducers/login';

//Styling
import Styles from '../components/styles/Styles';
import 'bootstrap/dist/css/bootstrap.css';

const styles = {
	container: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center',
		//alignItems: 'flex-center',
		alignContent: 'flex-start',
		paddingTop: '5%'
	},
	row: {
		//height:'100vh',	
		justifyContent: 'center',
		flex:1,
		marginBottom:0,
		paddingBottom:0
	},
	button: {
		backgroundColor:'white'
	}
}

// const required = value => (value ? undefined : 'Required')
// const mustBeNumber = value => (isNaN(value) ? 'Must be a number' : undefined)
// const minValue = min => value => isNaN(value) || value >= min ? undefined : `Should be greater than ${min}`
// const maxValue = max => value => isNaN(value) || value <= max ? undefined : `Should be less than ${max}`

// const composeValidators = (...validators) => value =>
//   validators.reduce((error, validator) => error || validator(value), undefined)


const FormCreator = (props) => {
	const { authInfo } = props;
	const [form, setForm] = useState({});
	let [fields, setFields] = useState([]);


	const submitCustomForm = async (values) => {
		alert("Form Sent")
		let formValues = values
		formValues.class = formValues.name.replace(/\s/g, '')
		console.log(formValues)
		// postObjectsToClass(values, "FormSpecifications");
	}

	const addClick = () => {
		const field = {
			label: '',
			formikKey: '',
			value: '',
			fieldType: 'select',
			options: [
			  'lessThan1',
			  '1_2',
			  '3_4',
			  '5_10',
			  'moreThan10'
			]
		}
		
		let zip = [...fields,field]
		setFields(zip)
		console.log(fields)
	}

	const handleAddFields = () => {
		const values = [...fields];
		values.push({ firstName: '', lastName: '' });
		setFields(values);
	  };

	  const handleRemoveFields = index => {
		const values = [...fields];
		values.splice(index, 1);
		setFields(values);
	  };

		const removeClick = (i) => {
			fields.splice(i,1);
		}

        return(
			<Styles style={styles.container}>
			<h1>Form Creator</h1>
			<Form
				onSubmit={submitCustomForm}
				initialValues={{ 
					organizations:[authInfo.organization]
				}}
				render={({ handleSubmit, form, submitting, pristine, values }) => (
				<form onSubmit={handleSubmit}>
					<div>
						<Field name="name" component="input" placeholder="Name of Form" />
					</div>
					<div>
						<Field name="description" component="input" placeholder="Description of Form" />
					</div>
					<div>
						<input type='button' value='Add Question' onClick={handleAddFields}/>
					</div>
					{fields.map((field, index) => {
						return(
						<div key={index}>
							<label>Question Field {index}</label>
							<Field
								name={`fields[${index}].label`}
								component="textarea"
							/>
							<Field
								name={`fields[${index}].fieldType`}
								type="select" component="select">
								<option value="input">Input</option>
							</Field>
							<div>
								<input type='button' value='remove' onClick={()=> handleRemoveFields(index)}/>
							</div>
						</div>)
					})}
					
					<div className="buttons">
						<button type="submit" disabled={submitting || pristine}>
							Submit
						</button>

						<button
							type="button"
							onClick={form.reset}
							disabled={submitting || pristine}>
							Reset
						</button>

					</div>
					<pre>{JSON.stringify(values, 0, 2)}</pre>
				</form>	
			)}
			/>
			</Styles>
        )
}

const mapStateToProps = (state) => {
	return { 
		authInfo: getAuthInfo(state)
	}
};

export default connect(mapStateToProps,null)(FormCreator);