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
		paddingTop: '5%',
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

const regex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;


const FormCreator = (props) => {
	const { authInfo } = props;
	const [form, setForm] = useState({});
	const [fields, setFields] = useState([]);

	useEffect(()=>{
		console.log(fields);
	},[fields])


	const submitCustomForm = async (values) => {
		values.organizations = [authInfo.organization]
		let formValues = values
		formValues.fields.map((field)=>{
			field.formikKey = field.label.replace(regex, '') || "";
			field.value =  '';
		})
		formValues.class = formValues.name.replace(regex, '') || ""

		postObjectsToClass(formValues, "FormSpecificationsV2");
	}

	const handleAddFields = async () => {
		const values = [...fields];	
		values.push({});
		setFields(values);
	  };

	  const handleRemoveFields = index => {
		const values = [...fields];
		values.splice(index, 1);
		setFields(values);
	  };


        return(
			<Styles style={styles.container}>
			<h1>Form Creator</h1>
			<Form
				onSubmit={submitCustomForm}
				render={({ handleSubmit, form, submitting, pristine, values }) => (
				<form onSubmit={handleSubmit} >
					<div>
						<Field name="name" component="input" placeholder="Name of Form" />
					</div>
					<div>
						<Field name="description" component="input" placeholder="Description of Form" />
					</div>
					<div>
						<input type='button' value='Add Question' onClick={() => handleAddFields()}/>
					</div>
					{fields.map((field, index) => {
						return(
						<div key={`${field}~${index}`} >
							<label>Question Field {index+1}</label>
								<Field
									name={`fields[${index}].label`}
									component="textarea"
								/>
								<Field
									name={`fields[${index}].fieldtype`}
									component="select">
									<option value=""></option>
									<option value="input">Open-Ended Response</option>
									<option value="number">Number Response</option>
								</Field>
							<span>
								<input type='button' value='remove' onClick={()=> handleRemoveFields(index)}/>
							</span>
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
					{/* <pre>{JSON.stringify(values, 0, 2)}</pre> */}
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