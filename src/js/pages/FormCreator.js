import React from 'react';
//import { Row, Container, Col, ProgressBar, Dropdown } from 'react-bootstrap';

import Parse from 'parse';
import { postObjectsToClass } from '../providers/ParseProvider'

import { Form, Field } from 'react-final-form';

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
  


class FormCreator extends React.Component{
    constructor(props){
		super(props)
		
		this.submitCustomForm();
    }

    onSubmit = async (values) => {
		alert(values)
	}

	submitCustomForm(){
		let CustomForms = {
			title:"Title of Form",
			description:"Description of Form",
			type:"object",
			organizations:["Puente","One World Surgery"],
			properties:{
				field_1:{
					type:"input",
					title:"Question 1",
				},
				field_2:{
					type:"input",
					title:"Question 2",
				},
				field_3:{
					type:"input",
					title:"Question 3",
				},
			}
			
		}

		//postObjectsToClass(CustomForms,"FormSpecifications")
	}

    render(){
        return(
			<Styles style={styles.container}>
			<h1>🏁 Form Creator</h1>
			<Form
				onSubmit={this.onSubmit}
				initialValues={{ 
                    organization:""
                   
                }}
				render={({ handleSubmit, form, submitting, pristine, values }) => (
				<form onSubmit={handleSubmit}>
                <div>
                    <label>Organizations</label>
                    <Field name="organization" component="select" >
                        <option ></option>
                        <option value="Puente">Puente</option>
                        <option value="One World Surgery">One World Surgery</option>
                        <option value="WOF">World Outreach Foundation</option>
                        <option value="Constanza Medical Mission">Constanza Medical Mission</option>
                    </Field>
				</div>
                <div>---</div>
				<div>
					<label>Question Field 1</label>
					<Field name="field_1" component="input" placeholder="First Question" />
				</div>
				<div>
					<label>Question Field 2</label>
					<Field name="field_2" component="textarea" placeholder="Second Question" />
				</div>
                <div>
					<label>Question Field 3</label>
					<Field name="field_3" component="textarea" placeholder="Third Question" />
				</div>
				
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
}

export default FormCreator;