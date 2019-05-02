import gql from "graphql-tag";

export const all_records = gql`
    query{
        getPeople{
            fname
            lname
            nickname
            sex
            dob
            telephoneNumber
            educationLevel
            occupation
            city
            province
            clinicProvider
            cedulaNumber
            surveyingUser
            surveyingOrganization
            latitude
            longitude
        }
    }
`;

export const first_last_names = gql`
    query {
        getPeople{
            fname
            lname
        }
    }
`;

export const age_sex_chronic = gql`
    query{
        getEvalMedicalRecords{
            dob
            chronic_condition_diabetes
            chronic_condition_hypertension
            chronic_condition_other
            sex
        }
    }
`;

export const env_age_latrines_clinic = gql`
    query{
        getEnvRecords{
            sex
            dob
            latrineAccess
            clinicAccess
            numberofIndividualsLivingintheHouse
            numberofChildrenLivinginHouseUndertheAgeof5
        }
    }
`;

export const vitals = gql`
  query{
    getVitals{
            sex
            dob
            bmi
            bloodSugar
            bloodPressure
            Systolic
            Diastolic
            
        }
    }  
`;
