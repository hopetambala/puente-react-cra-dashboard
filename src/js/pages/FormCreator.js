import React from 'react';
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
			<h1>Form Creator</h1>
			<Form
				onSubmit={this.submitCustomForm}
				initialValues={{ 
					organizations:[this.props.authInfo.organization],
					fields:[
						{
						   type:"input"
						},
						{
							type:"input"
						},
						{
							type:"input"
						}
					]
				}}
				render={({ handleSubmit, form, submitting, pristine, values }) => (
				<form onSubmit={handleSubmit}>
					<div>
						<Field name="title" component="input" placeholder="Name of Form" />
					</div>
					<div>
						<Field name="description" component="input" placeholder="Description of Form" />
					</div>
					<div>
						<label>Question Field 1</label>
						<Field name="fields[0].title" component="textarea" placeholder="First Question" />
						<Field name="fields[0].titletype" type="select" component="select">
							<option value="input">Input</option>
						</Field>
					</div>
					<div>
						<label>Question Field 2</label>
						<Field name="fields[1].title" component="textarea" placeholder="Second Question" />
						<Field name="fields[1].type" type="select" component="select">
							<option value="input">Input</option>
						</Field>
					</div>
					<div>
						<label>Question Field 3</label>
						<Field name="fields[2].title" component="textarea" placeholder="Third Question" />
						<Field name="fields[2].type" type="select" component="select">
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

const mapStateToProps = (state) => {
	return { 
		authInfo: getAuthInfo(state)
	}
};

export default connect(mapStateToProps,null)(FormCreator);