import React from 'react';

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
    onSubmit = async (values) => {
		alert(values)
	}

	submitCustomForm = async (values) =>{
		console.log(values)
		alert("Form Sent")
		postObjectsToClass(values, "FormSpecifications")

	}

    render(){
        return(
			<Styles style={styles.container}>
			<h1>🏁 Form Creator</h1>
			<Form
				onSubmit={this.submitCustomForm}
				initialValues={{ 
					properties:{
						question_1:{
						   type:"input"
						},
						question_2:{
							type:"input"
						},
						question_3:{
							type:"input"
						}
					}
				}}
				render={({ handleSubmit, form, submitting, pristine, values }) => (
				<form onSubmit={handleSubmit}>
					<div>
						<label>Organizations</label>
						<Field name="organizations" type="select" component="select" multiple>
							<option ></option>
							<option value="Puente">Puente</option>
							<option value="One World Surgery">One World Surgery</option>
							<option value="WOF">World Outreach Foundation</option>
							<option value="Constanza Medical Mission">Constanza Medical Mission</option>
						</Field>
					</div>
					<div>---</div>
					<div>
						<Field name="title" component="input" placeholder="Name of Form" />
					</div>
					<div>
						<Field name="description" component="input" placeholder="Description of Form" />
					</div>
					<div>
						<label>Question Field 1</label>
						<Field name="properties.question_1.title" component="textarea" placeholder="First Question" />
						<Field name="properties.question_1.type" type="select" component="select">
							<option value="input">Input</option>
						</Field>
					</div>
					<div>
						<label>Question Field 2</label>
						<Field name="properties.question_2.title" component="textarea" placeholder="Second Question" />
						<Field name="properties.question_2.type" type="select" component="select">
							<option value="input">Input</option>
						</Field>
					</div>
					<div>
						<label>Question Field 3</label>
						<Field name="properties.question_3.title" component="textarea" placeholder="Third Question" />
						<Field name="properties.question_3.type" type="select" component="select">
							<option value="input">Input</option>
						</Field>
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