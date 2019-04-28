import gql from "graphql-tag";

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
