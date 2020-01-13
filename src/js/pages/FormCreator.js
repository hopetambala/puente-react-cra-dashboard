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

// const required = value => (value ? undefined : 'Required')
// const mustBeNumber = value => (isNaN(value) ? 'Must be a number' : undefined)
// const minValue = min => value => isNaN(value) || value >= min ? undefined : `Should be greater than ${min}`
// const maxValue = max => value => isNaN(value) || value <= max ? undefined : `Should be less than ${max}`

// const composeValidators = (...validators) => value =>
//   validators.reduce((error, validator) => error || validator(value), undefined)


class FormCreator extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			values:[]
		}
		console.log(this.props.authInfo.organization)
	}

	submitCustomForm = async (values) => {
		console.log(values)
		alert("Form Sent")
		postObjectsToClass(values, "FormSpecifications");
	}

	addClick = () =>{
		this.setState(function(previousState, currentProps) {
			return {
				values: [...previousState.values,'']
			};
		  });
	}

	removeClick= (i) =>{
		let values = [...this.state.values];
		values.splice(i,1);
		this.setState({ values });
	}

	variableQuestionLengthUI(){
		return this.state.values.map((element, i) =>
			<div key={i}>
				<label>Question Field {i+1}</label>
				<Field
					name={"fields["+i+"].title"}
					component="textarea"
				/>
				<Field
					name={"fields["+i+"].titletype"}
					type="select" component="select">
					<option value="input">Input</option>
				</Field>
				<div>
					<input type='button' value='remove' onClick={this.removeClick.bind(this, i)}/>
				</div>
			</div>)
	}

    render(){
        return(
			<Styles style={styles.container}>
			<h1>Form Creator</h1>
			<Form
				onSubmit={this.submitCustomForm}
				initialValues={{ 
					organizations:[this.props.authInfo.organization]
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
						<input type='button' value='Add Question' onClick={this.addClick}/>
					</div>
					{this.variableQuestionLengthUI()}
					
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